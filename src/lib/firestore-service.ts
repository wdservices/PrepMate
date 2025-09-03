import { 
  collection, 
  doc, 
  getDocs, 
  getDoc, 
  query, 
  orderBy,
  where,
  type DocumentData,
  type QueryDocumentSnapshot
} from 'firebase/firestore';
import { db } from './firebase';

// Types matching our Firestore structure
export interface Exam {
  id: string;
  name: string;
  description?: string;
  iconName?: string;
  order?: number;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface Subject {
  id: string;
  name: string;
  description?: string;
  iconName?: string;
  availableYears?: number[];
}

export interface Question {
  id: string;
  text: string;
  year: number;
  correctOptionId: string;
  options: Array<{
    id: string;
    text: string;
  }>;
  imageUrl?: string;
}

export const examService = {
  // Get all exams
  async getAllExams(): Promise<Exam[]> {
    if (!db) {
      console.error('Firestore not initialized - db is null');
      throw new Error('Firestore not initialized');
    }
    
    try {
      console.log("[FirestoreService] Getting all exams from Firestore...");
      const examsRef = collection(db, 'exams');
      const q = query(examsRef); 
      
      console.log("[FirestoreService] Executing query...");
      const querySnapshot = await getDocs(q);
      console.log(`Query executed, number of docs: ${querySnapshot.size}`);
      
      const exams: Exam[] = [];
      
      querySnapshot.forEach((doc) => {
        console.log("Document ID:", doc.id);
        console.log("Document data:", doc.data());
        
        const data = doc.data();
        // Handle both 'order' and 'order ' field names
        const orderValue = data.order !== undefined ? data.order : data['order '];
        
        exams.push({
          id: doc.id,
          name: data.name || data.title || 'Unnamed Exam', 
          description: data.description || data['description '] || '',
          iconName: data.iconName || 'BookOpen',
          order: typeof orderValue === 'number' ? orderValue : 0,
          createdAt: data.createdAt?.toDate() || new Date(),
          updatedAt: data.updatedAt?.toDate() || new Date(),
        });
      });
      
      console.log("Mapped exams:", exams);
      return exams;
    } catch (error) {
      console.error("Error getting exams:", error);
      throw error;
    }
  },

  // Get a single exam by ID
  async getExamById(examId: string): Promise<Exam | null> {
    if (!db) throw new Error('Firestore not initialized');
    
    try {
      const examRef = doc(db, 'exams', examId);
      const docSnap = await getDoc(examRef);
      
      if (!docSnap.exists()) return null;
      
      return {
        id: docSnap.id,
        ...docSnap.data()
      } as Exam;
    } catch (error) {
      console.error(`Error fetching exam ${examId}:`, error);
      throw error;
    }
  },

  // Get all subjects for a specific exam
  async getSubjectsByExam(examId: string): Promise<Subject[]> {
    console.log(`[FirestoreService] Getting all subjects for exam ${examId} from Firestore...`);
    
    if (!examId) {
      console.error('[FirestoreService] No examId provided to getSubjectsByExam');
      throw new Error('Exam ID is required');
    }
    
    try {
      // Convert examId to lowercase to match Firestore document ID
      const normalizedExamId = examId.toLowerCase();
      console.log(`[FirestoreService] Normalized exam ID: ${normalizedExamId}`);
      
      console.log(`[FirestoreService] Building collection reference for: exams/${normalizedExamId}/subjects`);
      const subjectsRef = collection(db, 'exams', normalizedExamId, 'subjects');
      
      console.log(`[FirestoreService] Fetching subjects collection...`);
      const querySnapshot = await getDocs(subjectsRef);
      console.log(`[FirestoreService] Found ${querySnapshot.size} subjects for exam ${normalizedExamId}`);
      
      if (querySnapshot.empty) {
        console.warn(`[FirestoreService] No subjects found in collection for exam ${normalizedExamId}. Checking direct document access...`);
        
        // Try to get the subject document directly as a fallback
        try {
          const subjectDoc = await getDoc(doc(db, 'exams', normalizedExamId, 'subjects', 'chemistry'));
          if (subjectDoc.exists()) {
            const data = subjectDoc.data();
            console.log(`[FirestoreService] Found subject via direct document access:`, data);
            
            // Validate and map the document data to Subject type
            const subject: Subject = {
              id: subjectDoc.id,
              name: data?.name || 'Chemistry',
              description: data?.description || '',
              iconName: data?.iconName || 'Flask',
              order: data?.order || 1,
              availableYears: Array.isArray(data?.availableYears) ? data.availableYears : [],
              examId: normalizedExamId,
              createdAt: data?.createdAt?.toDate() || new Date(),
              updatedAt: data?.updatedAt?.toDate() || new Date(),
            };
            return [subject];
          }
          console.warn(`[FirestoreService] No subject document found at path: exams/${normalizedExamId}/subjects/chemistry`);
        } catch (directAccessError) {
          console.error(`[FirestoreService] Error accessing subject document directly:`, directAccessError);
          // Don't throw here, return empty array as fallback
        }
        return [];
      }

      // Process the query results
      const subjects: Subject[] = [];
      querySnapshot.forEach((doc) => {
        const data = doc.data();
        subjects.push({
          id: doc.id,
          name: data.name || `Subject ${doc.id}`,
          description: data.description || '',
          iconName: data.iconName || 'BookOpen',
          order: data.order || 0,
          availableYears: Array.isArray(data.availableYears) ? data.availableYears : [],
          examId: normalizedExamId,
          createdAt: data.createdAt?.toDate() || new Date(),
          updatedAt: data.updatedAt?.toDate() || new Date(),
        });
      });

      return subjects;
    } catch (error) {
      console.error(`[FirestoreService] Error in getSubjectsByExam for exam ${examId}:`, error);
      // Consider whether to re-throw or return an empty array based on your error handling strategy
      throw error; // Re-throw to let the caller handle the error
    }
  },

  // Get a single subject by ID
  async getSubjectById(examId: string, subjectId: string): Promise<Subject | null> {
    if (!db) throw new Error('Firestore not initialized');
    
    try {
      console.log(`Fetching subject ${subjectId} for exam ${examId}...`);
      const subjectRef = doc(db, 'exams', examId, 'subjects', subjectId);
      const subjectSnap = await getDoc(subjectRef);
      
      if (!subjectSnap.exists()) {
        console.warn(`Subject ${subjectId} not found in exam ${examId}`);
        return null;
      }
      
      const subjectData = subjectSnap.data();
      console.log('Fetched subject data:', subjectData);
      
      return {
        id: subjectSnap.id,
        name: subjectData.name,
        description: subjectData.description || '',
        iconName: subjectData.iconName || 'BookOpen',
        availableYears: subjectData.availableYears || [],
        order: subjectData.order || 0
      };
    } catch (error) {
      console.error(`Error fetching subject ${subjectId} for exam ${examId}:`, error);
      throw error;
    }
  },

  // Get all questions for a subject
  async getQuestionsBySubject(
    examId: string, 
    subjectId: string, 
    year?: number
  ): Promise<Question[]> {
    if (!db) throw new Error('Firestore not initialized');
    
    try {
      const questionsRef = collection(db, 'exams', examId, 'subjects', subjectId, 'questions');
      let q = questionsRef;
      
      if (year) {
        q = query(questionsRef, where('year', '==', year));
      }
      
      const snapshot = await getDocs(q);
      
      return snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as Question[];
    } catch (error) {
      console.error(`Error fetching questions for subject ${subjectId}:`, error);
      throw error;
    }
  },

  // Get a single question by ID
  async getQuestionById(
    examId: string, 
    subjectId: string, 
    questionId: string
  ): Promise<Question | null> {
    if (!db) throw new Error('Firestore not initialized');
    
    try {
      const questionRef = doc(db, 'exams', examId, 'subjects', subjectId, 'questions', questionId);
      const docSnap = await getDoc(questionRef);
      
      if (!docSnap.exists()) return null;
      
      return {
        id: docSnap.id,
        ...docSnap.data()
      } as Question;
    } catch (error) {
      console.error(`Error fetching question ${questionId}:`, error);
      throw error;
    }
  }
};
