
import { db } from '@/lib/firebase';
import { collection, getDocs, query, orderBy, doc, getDoc, where } from 'firebase/firestore';
import type { FirestoreExamData, FirestoreSubjectData, Question, Subject, Exam } from '@/types';

// Helper to convert Firestore doc data to our Exam type
// For now, subjects are fetched separately.
const mapToExam = (docId: string, data: any): FirestoreExamData => {
  return {
    id: docId,
    name: data.name || 'Unnamed Exam',
    description: data.description || 'No description available.',
    iconName: data.iconName || undefined,
    order: data.order || 0,
  };
};

export async function getExamsFromFirestore(): Promise<FirestoreExamData[]> {
  console.log("[firebase-service] Attempting to fetch exams from Firestore...");
  if (!db) {
    console.error("[firebase-service] Firestore (db) is not initialized. Cannot fetch exams.");
    return [];
  }
  try {
    const examsCollection = collection(db, 'exams');
    const examsQuery = query(examsCollection, orderBy('order', 'asc'));
    console.log("[firebase-service] Executing exams query...");
    const querySnapshot = await getDocs(examsQuery);
    
    if (querySnapshot.empty) {
      console.warn("[firebase-service] No documents found in 'exams' collection.");
    } else {
      console.log(`[firebase-service] Found ${querySnapshot.size} documents in 'exams' collection.`);
    }

    const examsList = querySnapshot.docs.map(doc => {
      console.log(`[firebase-service] Mapping document ID: ${doc.id}, Data:`, doc.data());
      return mapToExam(doc.id, doc.data());
    });
    
    console.log("[firebase-service] Successfully fetched and mapped exams:", examsList);
    return examsList;
  } catch (error) {
    console.error("[firebase-service] Error fetching exams from Firestore:", error);
    return []; // Return empty array on error
  }
}

const mapToSubject = (docId: string, data: any): FirestoreSubjectData => {
  return {
    id: docId,
    name: data.name || 'Unnamed Subject',
    description: data.description || 'No description available.',
    iconName: data.iconName || undefined,
    availableYears: data.availableYears || [],
  };
};

export async function getSubjectsForExam(examId: string): Promise<FirestoreSubjectData[]> {
  if (!db) {
    console.error("Firestore (db) is not initialized. Cannot fetch subjects.");
    return [];
  }
  try {
    const subjectsCollectionRef = collection(db, `exams/${examId}/subjects`);
    const subjectsQuery = query(subjectsCollectionRef, orderBy('name', 'asc')); // Or some other order field
    const querySnapshot = await getDocs(subjectsQuery);
    return querySnapshot.docs.map(doc => mapToSubject(doc.id, doc.data()));
  } catch (error) {
    console.error(`Error fetching subjects for exam ${examId}:`, error);
    return [];
  }
}

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

export async function getQuestionsForSubjectYear(examId: string, subjectId: string, year: number): Promise<Question[]> {
   if (!db) {
    console.error("Firestore (db) is not initialized. Cannot fetch questions.");
    return [];
  }
  try {
    const questionsCollectionRef = collection(db, `exams/${examId}/subjects/${subjectId}/questions`);
    const questionsQuery = query(questionsCollectionRef, where('year', '==', year));
    const querySnapshot = await getDocs(questionsQuery);
    return querySnapshot.docs.map(doc => mapToQuestion(doc.id, doc.data()));
  } catch (error) {
    console.error(`Error fetching questions for ${examId}/${subjectId} year ${year}:`, error);
    return [];
  }
}


export async function getExamByIdFromFirestore(examId: string): Promise<FirestoreExamData | null> {
  if (!db) {
    console.error("Firestore (db) is not initialized. Cannot fetch exam.");
    return null;
  }
  try {
    const examDocRef = doc(db, 'exams', examId);
    const docSnap = await getDoc(examDocRef);
    if (docSnap.exists()) {
      return mapToExam(docSnap.id, docSnap.data());
    } else {
      console.log(`No such exam document! (ID: ${examId})`);
      return null;
    }
  } catch (error) {
    console.error(`Error fetching exam by ID ${examId}:`, error);
    return null;
  }
}

export async function getSubjectByIdFromFirestore(examId: string, subjectId: string): Promise<FirestoreSubjectData | null> {
  if (!db) {
    console.error("Firestore (db) is not initialized. Cannot fetch subject.");
    return null;
  }
  try {
    const subjectDocRef = doc(db, `exams/${examId}/subjects`, subjectId);
    const docSnap = await getDoc(subjectDocRef);
    if (docSnap.exists()) {
      return mapToSubject(docSnap.id, docSnap.data());
    } else {
      console.log(`No such subject document! (ExamID: ${examId}, SubjectID: ${subjectId})`);
      return null;
    }
  } catch (error) {
    console.error(`Error fetching subject by ID ${subjectId} for exam ${examId}:`, error);
    return null;
  }
}
