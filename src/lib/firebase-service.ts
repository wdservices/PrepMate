
import { db } from '@/lib/firebase';
import { collection, getDocs, query, orderBy, doc, getDoc, where } from 'firebase/firestore';
import type { FirestoreExamData, FirestoreSubjectData, Question } from '@/types';

// Fetches top-level exam documents
export async function getExamsFromFirestore(): Promise<FirestoreExamData[]> {
  console.log("[firebase-service] Attempting to fetch exams from Firestore...");
  if (!db) {
    console.error("[firebase-service] Firestore (db) is not initialized. Cannot fetch exams.");
    return [];
  }
  try {
    const examsCollection = collection(db, 'exams');
    const examsQuery = query(examsCollection, orderBy('order', 'asc')); // Assuming 'order' field exists
    console.log("[firebase-service] Executing exams query...");
    const querySnapshot = await getDocs(examsQuery);
    
    if (querySnapshot.empty) {
      console.warn("[firebase-service] No documents found in 'exams' collection.");
    } else {
      console.log(`[firebase-service] Found ${querySnapshot.size} documents in 'exams' collection.`);
    }

    const examsList = querySnapshot.docs.map(doc => {
      const data = doc.data();
      console.log(`[firebase-service] Mapping exam document ID: ${doc.id}, Data:`, data);
      return {
        id: doc.id,
        name: data.name || 'Unnamed Exam',
        description: data.description || 'No description available.',
        iconName: data.iconName || undefined,
        order: data.order || 0,
      } as FirestoreExamData;
    });
    
    console.log("[firebase-service] Successfully fetched and mapped exams:", examsList);
    return examsList;
  } catch (error) {
    console.error("[firebase-service] Error fetching exams from Firestore:", error);
    return []; 
  }
}

// Fetches a single exam document by ID
export async function getExamByIdFromFirestore(examId: string): Promise<FirestoreExamData | null> {
  console.log(`[firebase-service] Attempting to fetch exam by ID: ${examId}`);
  if (!db) {
    console.error("[firebase-service] Firestore (db) is not initialized. Cannot fetch exam.");
    return null;
  }
  try {
    const examDocRef = doc(db, 'exams', examId);
    const docSnap = await getDoc(examDocRef);
    if (docSnap.exists()) {
      const data = docSnap.data();
      console.log(`[firebase-service] Found exam ID: ${examId}, Data:`, data);
      return {
        id: docSnap.id,
        name: data.name || 'Unnamed Exam',
        description: data.description || 'No description',
        iconName: data.iconName || undefined,
        order: data.order || 0,
      } as FirestoreExamData;
    } else {
      console.warn(`[firebase-service] No exam found with ID: ${examId}`);
      return null;
    }
  } catch (error) {
    console.error(`[firebase-service] Error fetching exam by ID ${examId}:`, error);
    return null;
  }
}


// Fetches subjects for a given exam ID
const mapToSubject = (docId: string, data: any): FirestoreSubjectData => {
  return {
    id: docId,
    name: data.name || 'Unnamed Subject',
    description: data.description || 'No description available.',
    iconName: data.iconName || undefined,
    availableYears: data.availableYears || [],
  };
};

export async function getSubjectsForExamFromFirestore(examId: string): Promise<FirestoreSubjectData[]> {
  console.log(`[firebase-service] Attempting to fetch subjects for exam ID: ${examId}`);
  if (!db) {
    console.error("[firebase-service] Firestore (db) is not initialized. Cannot fetch subjects.");
    return [];
  }
  try {
    const subjectsCollectionRef = collection(db, `exams/${examId}/subjects`);
    const subjectsQuery = query(subjectsCollectionRef, orderBy('name', 'asc')); // Or some other order field
    const querySnapshot = await getDocs(subjectsQuery);

    if (querySnapshot.empty) {
      console.warn(`[firebase-service] No subjects found for exam ID: ${examId}.`);
    } else {
      console.log(`[firebase-service] Found ${querySnapshot.size} subjects for exam ID: ${examId}.`);
    }
    
    const subjectsList = querySnapshot.docs.map(doc => {
      console.log(`[firebase-service] Mapping subject document ID: ${doc.id} under exam ${examId}, Data:`, doc.data());
      return mapToSubject(doc.id, doc.data());
    });

    console.log(`[firebase-service] Successfully fetched and mapped subjects for exam ${examId}:`, subjectsList);
    return subjectsList;
  } catch (error) {
    console.error(`[firebase-service] Error fetching subjects for exam ${examId}:`, error);
    return [];
  }
}

// Fetches a single subject document by exam ID and subject ID
export async function getSubjectByIdFromFirestore(examId: string, subjectId: string): Promise<FirestoreSubjectData | null> {
  console.log(`[firebase-service] Attempting to fetch subject ID: ${subjectId} for exam ID: ${examId}`);
  if (!db) {
    console.error("[firebase-service] Firestore (db) is not initialized. Cannot fetch subject.");
    return null;
  }
  try {
    const subjectDocRef = doc(db, `exams/${examId}/subjects`, subjectId);
    const docSnap = await getDoc(subjectDocRef);
    if (docSnap.exists()) {
      const data = docSnap.data();
      console.log(`[firebase-service] Found subject ID: ${subjectId} for exam ${examId}, Data:`, data);
      return mapToSubject(docSnap.id, data);
    } else {
      console.warn(`[firebase-service] No subject found with ID: ${subjectId} for exam ${examId}`);
      return null;
    }
  } catch (error) {
    console.error(`[firebase-service] Error fetching subject by ID ${subjectId} for exam ${examId}:`, error);
    return null;
  }
}

// Fetches questions for a given exam, subject, and year
const mapToQuestion = (docId: string, data: any): Question => {
  return {
    id: docId,
    text: data.text || '',
    options: data.options || [],
    correctOptionId: data.correctOptionId || '',
    year: data.year || 0,
    imageUrl: data.imageUrl || undefined,
    explanationFromAI: data.explanationFromAI || undefined,
  };
};

export async function getQuestionsForSubjectYearFromFirestore(examId: string, subjectId: string, year: number): Promise<Question[]> {
  console.log(`[firebase-service] Attempting to fetch questions for exam: ${examId}, subject: ${subjectId}, year: ${year}`);
   if (!db) {
    console.error("[firebase-service] Firestore (db) is not initialized. Cannot fetch questions.");
    return [];
  }
  try {
    const questionsCollectionRef = collection(db, `exams/${examId}/subjects/${subjectId}/questions`);
    const questionsQuery = query(questionsCollectionRef, where('year', '==', year));
    const querySnapshot = await getDocs(questionsQuery);

    if (querySnapshot.empty) {
      console.warn(`[firebase-service] No questions found for exam: ${examId}, subject: ${subjectId}, year: ${year}.`);
    } else {
      console.log(`[firebase-service] Found ${querySnapshot.size} questions for exam: ${examId}, subject: ${subjectId}, year: ${year}.`);
    }

    const questionsList = querySnapshot.docs.map(doc => {
      console.log(`[firebase-service] Mapping question document ID: ${doc.id} for ${examId}/${subjectId}/${year}, Data:`, doc.data());
      return mapToQuestion(doc.id, doc.data());
    });
    console.log(`[firebase-service] Successfully fetched and mapped questions for ${examId}/${subjectId}/${year}:`, questionsList);
    return questionsList;
  } catch (error) {
    console.error(`[firebase-service] Error fetching questions for ${examId}/${subjectId} year ${year}:`, error);
    return [];
  }
}
