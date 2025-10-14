
import { db } from '@/lib/firebase';
import { collection, getDocs, query, orderBy, doc, getDoc, setDoc, where } from 'firebase/firestore';
import type { FirestoreExamData, FirestoreSubjectData, Question } from '@/types';
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import type { User } from "firebase/auth";

export async function upsertUserProfile(user: User, role: 'admin' | 'student') {
  if (!db) {
    console.error("[firebase-service] Firestore (db) is not initialized. Cannot upsert user profile.");
    return;
  }
  if (!user.uid) {
    console.error("[firebase-service] User UID is missing. Cannot upsert user profile.");
    return;
  }
  const userRef = doc(db, "users", user.uid);
  await setDoc(userRef, { 
    uid: user.uid,
    email: user.email,
    displayName: user.displayName,
    photoURL: user.photoURL,
    role: role,
    lastLogin: new Date().toISOString(),
  }, { merge: true });
}

export async function getUserProfile(uid: string) {
  if (!db) {
    console.error("[firebase-service] Firestore (db) is not initialized. Cannot get user profile.");
    return null;
  }
  const userRef = doc(db, "users", uid);
  const docSnap = await getDoc(userRef);
  if (docSnap.exists()) {
    return docSnap.data();
  } else {
    return null;
  }
}

const FIRESTORE_DELETED_ERROR_PREFIX = "[firebase-service] CRITICAL WARNING: Firestore database is presumed deleted. ";
const FIRESTORE_DELETED_SUFFIX = " This function will likely return no data or an error, and should not be relied upon.";

// Fetches top-level exam documents
export async function getExamsFromFirestore(): Promise<FirestoreExamData[]> {
  console.error(FIRESTORE_DELETED_ERROR_PREFIX + "getExamsFromFirestore called." + FIRESTORE_DELETED_SUFFIX);
  const db = db;
  if (!db) {
    console.error("[firebase-service] Firestore (db) is not initialized. Cannot fetch exams.");
    return [];
  }
  try {
    const examsCollection = collection(db, 'exams');
    const examsQuery = query(examsCollection, orderBy('order', 'asc')); 
    const querySnapshot = await getDocs(examsQuery);
    const examsList = querySnapshot.docs.map(doc => {
      const data = doc.data();
      return {
        id: doc.id,
        name: data.name || 'Unnamed Exam',
        description: data.description || 'No description available.',
        iconName: data.iconName || undefined,
        order: data.order || 0,
      } as FirestoreExamData;
    });
    return examsList;
  } catch (error) {
    console.error("[firebase-service] Error during getExamsFromFirestore (expected due to deleted DB):", error);
    return []; 
  }
}

// Fetches a single exam document by ID
export async function getExamByIdFromFirestore(examId: string): Promise<FirestoreExamData | null> {
  console.error(FIRESTORE_DELETED_ERROR_PREFIX + `getExamByIdFromFirestore called for examId: ${examId}.` + FIRESTORE_DELETED_SUFFIX);
  const db = db;
  if (!db) {
    console.error("[firebase-service] Firestore (db) is not initialized. Cannot fetch exam.");
    return null;
  }
  try {
    const examDocRef = doc(db, 'exams', examId);
    const docSnap = await getDoc(examDocRef);
    if (docSnap.exists()) {
      const data = docSnap.data();
      return {
        id: docSnap.id,
        name: data.name || 'Unnamed Exam',
        description: data.description || 'No description',
        iconName: data.iconName || undefined,
        order: data.order || 0,
      } as FirestoreExamData;
    } else {
      return null;
    }
  } catch (error) {
    console.error(`[firebase-service] Error during getExamByIdFromFirestore for ID ${examId} (expected due to deleted DB):`, error);
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
  console.error(FIRESTORE_DELETED_ERROR_PREFIX + `getSubjectsForExamFromFirestore called for examId: ${examId}.` + FIRESTORE_DELETED_SUFFIX);
  const db = db;
  if (!db) {
    console.error("[firebase-service] Firestore (db) is not initialized. Cannot fetch subjects.");
    return [];
  }
  try {
    const subjectsCollectionRef = collection(db, `exams/${examId}/subjects`);
    const subjectsQuery = query(subjectsCollectionRef, orderBy('name', 'asc'));
    const querySnapshot = await getDocs(subjectsQuery);
    const subjectsList = querySnapshot.docs.map(doc => mapToSubject(doc.id, doc.data()));
    return subjectsList;
  } catch (error) {
    console.error(`[firebase-service] Error during getSubjectsForExamFromFirestore for exam ${examId} (expected due to deleted DB):`, error);
    return [];
  }
}

// Fetches a single subject document by exam ID and subject ID
export async function getSubjectByIdFromFirestore(examId: string, subjectId: string): Promise<FirestoreSubjectData | null> {
  console.error(FIRESTORE_DELETED_ERROR_PREFIX + `getSubjectByIdFromFirestore called for examId: ${examId}, subjectId: ${subjectId}.` + FIRESTORE_DELETED_SUFFIX);
  const db = db;
  if (!db) {
    console.error("[firebase-service] Firestore (db) is not initialized. Cannot fetch subject.");
    return null;
  }
  try {
    const subjectDocRef = doc(db, `exams/${examId}/subjects`, subjectId);
    const docSnap = await getDoc(subjectDocRef);
    if (docSnap.exists()) {
      return mapToSubject(docSnap.id, docSnap.data());
    } else {
      return null;
    }
  } catch (error) {
    console.error(`[firebase-service] Error during getSubjectByIdFromFirestore for ${examId}/${subjectId} (expected due to deleted DB):`, error);
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
  console.error(FIRESTORE_DELETED_ERROR_PREFIX + `getQuestionsForSubjectYearFromFirestore called for ${examId}/${subjectId}/${year}.` + FIRESTORE_DELETED_SUFFIX);
   if (!db) {
    console.error("[firebase-service] Firestore (db) is not initialized. Cannot fetch questions.");
    return [];
  }
  try {
    const questionsCollectionRef = collection(db, `exams/${examId}/subjects/${subjectId}/questions`);
    const questionsQuery = query(questionsCollectionRef, where('year', '==', year));
    const querySnapshot = await getDocs(questionsQuery);
    const questionsList = querySnapshot.docs.map(doc => mapToQuestion(doc.id, doc.data()));
    return questionsList;
  } catch (error) {
    console.error(`[firebase-service] Error during getQuestionsForSubjectYearFromFirestore for ${examId}/${subjectId} year ${year} (expected due to deleted DB):`, error);
    return [];
  }
}


export const storageService = {
  async uploadImage(file: File, path: string): Promise<string> {
    const db = getFirestoreDb();
    if (!db) {
      console.error('Firebase not initialized - db is null');
      return null;
    }
    const storage = getStorage();
    const storageRef = ref(storage, `images/${file.name}`);
    await uploadBytes(storageRef, file);
    return getDownloadURL(storageRef);
  }
};

