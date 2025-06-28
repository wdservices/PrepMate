
import { db } from '@/lib/firebase';
import { 
  collection, getDocs, query, orderBy, doc, getDoc, where, addDoc, serverTimestamp, setDoc, Timestamp
} from 'firebase/firestore';
import type { FirestoreExamData, FirestoreSubjectData, Question, AppUser } from '@/types';

// --- User Profile Functions ---

/**
 * Creates or updates a user profile in the 'users' collection.
 * Sets a 24-hour trial period for new users.
 * @param uid The user's unique ID from Firebase Auth.
 * @param userData Basic user data (email, displayName).
 */
export async function upsertUserProfile(uid: string, userData: { email: string | null; displayName: string | null }): Promise<void> {
  if (!db) throw new Error("Firestore is not initialized.");
  const userDocRef = doc(db, 'users', uid);
  const userDoc = await getDoc(userDocRef);

  if (!userDoc.exists()) {
    // User is new, create document with a trial period
    const trialEndsAt = Timestamp.fromDate(new Date(Date.now() + 24 * 60 * 60 * 1000)); // 24 hours from now
    await setDoc(userDocRef, {
      ...userData,
      uid: uid,
      createdAt: serverTimestamp(),
      trialEndsAt: trialEndsAt,
      isSubscribed: false,
    });
    console.log(`[firebase-service] New user profile created for ${uid} with 24-hour trial.`);
  } else {
    // User exists, no need to update on every login unless details changed
    console.log(`[firebase-service] User profile for ${uid} already exists.`);
  }
}

/**
 * Fetches a user's complete profile from Firestore.
 * @param uid The user's unique ID.
 * @returns The AppUser profile or null if not found.
 */
export async function getUserProfile(uid: string): Promise<AppUser | null> {
    if (!db) throw new Error("Firestore is not initialized.");
    const userDocRef = doc(db, 'users', uid);
    const docSnap = await getDoc(userDocRef);

    if (docSnap.exists()) {
        const data = docSnap.data();
        // Convert Firestore Timestamps to numbers for client-side use if they exist
        const profile: AppUser = {
            ...data,
            trialEndsAt: data.trialEndsAt instanceof Timestamp ? data.trialEndsAt.toMillis() : undefined,
            subscriptionEndsAt: data.subscriptionEndsAt instanceof Timestamp ? data.subscriptionEndsAt.toMillis() : undefined,
        } as AppUser;
        return profile;
    } else {
        return null;
    }
}


// --- Exam and Subject Functions ---

export async function getExamsFromFirestore(): Promise<FirestoreExamData[]> {
  if (!db) throw new Error("Firestore is not initialized.");
  const examsCollection = collection(db, 'exams');
  const examsQuery = query(examsCollection, orderBy('order', 'asc')); 
  const querySnapshot = await getDocs(examsQuery);
  return querySnapshot.docs.map(doc => ({
    id: doc.id,
    ...doc.data()
  } as FirestoreExamData));
}

export async function getExamByIdFromFirestore(examId: string): Promise<FirestoreExamData | null> {
  if (!db) throw new Error("Firestore is not initialized.");
  const examDocRef = doc(db, 'exams', examId);
  const docSnap = await getDoc(examDocRef);
  return docSnap.exists() ? { id: docSnap.id, ...docSnap.data() } as FirestoreExamData : null;
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

export async function getSubjectsForExamFromFirestore(examId: string): Promise<FirestoreSubjectData[]> {
  if (!db) throw new Error("Firestore is not initialized.");
  const subjectsCollectionRef = collection(db, `exams/${examId}/subjects`);
  const subjectsQuery = query(subjectsCollectionRef, orderBy('name', 'asc'));
  const querySnapshot = await getDocs(subjectsQuery);
  return querySnapshot.docs.map(doc => mapToSubject(doc.id, doc.data()));
}

export async function getSubjectByIdFromFirestore(examId: string, subjectId: string): Promise<FirestoreSubjectData | null> {
  if (!db) throw new Error("Firestore is not initialized.");
  const subjectDocRef = doc(db, `exams/${examId}/subjects`, subjectId);
  const docSnap = await getDoc(subjectDocRef);
  return docSnap.exists() ? mapToSubject(docSnap.id, docSnap.data()) : null;
}

// --- Question Functions ---

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
   if (!db) throw new Error("Firestore is not initialized.");
   const questionsCollectionRef = collection(db, `exams/${examId}/subjects/${subjectId}/questions`);
   const questionsQuery = query(questionsCollectionRef, where('year', '==', year));
   const querySnapshot = await getDocs(questionsQuery);
   return querySnapshot.docs.map(doc => mapToQuestion(doc.id, doc.data()));
}

/**
 * Adds a new question to the specified subject's question collection in Firestore.
 * @param examId The ID of the exam (e.g., 'jamb').
 * @param subjectId The ID of the subject (e.g., 'chemistry').
 * @param questionData The question object to add.
 * @returns The ID of the newly created question document.
 */
export async function addQuestionToFirestore(examId: string, subjectId: string, questionData: Omit<Question, 'id'>): Promise<string> {
    if (!db) {
        throw new Error("Firestore is not initialized.");
    }
    try {
        const questionsCollectionRef = collection(db, `exams/${examId}/subjects/${subjectId}/questions`);
        const docRef = await addDoc(questionsCollectionRef, {
            ...questionData,
            createdAt: serverTimestamp() // Add a timestamp for tracking
        });
        console.log(`[firebase-service] Question added successfully with ID: ${docRef.id} to ${examId}/${subjectId}`);
        return docRef.id;
    } catch (error) {
        console.error("[firebase-service] Error adding question to Firestore:", error);
        throw new Error("Failed to upload question to the database.");
    }
}
