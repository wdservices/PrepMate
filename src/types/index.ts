
import type { User as FirebaseUser } from "firebase/auth";
import type { LucideIcon } from "lucide-react";

export interface QuestionOption {
  id: string;
  text: string;
}

export interface Question {
  id: string;
  text: string;
  options: QuestionOption[];
  correctOptionId: string;
  explanationFromAI?: string;
  year: number;
  imageUrl?: string;
}

export interface Subject {
  id: string;
  name: string;
  description?: string;
  iconName?: string; // Changed from icon
  availableYears: number[];
}

export interface Exam {
  id: string;
  name: string;
  description: string;
  subjects: Subject[]; // This will likely be fetched separately or structured differently in Firestore
  iconName?: string; // Changed from icon
  // Firestore specific fields if needed, e.g., order
  order?: number;
}

export interface FirestoreExamData {
  id: string; // Document ID
  name: string;
  description: string;
  iconName?: string;
  order?: number;
  // Subjects will be a subcollection, so not directly in this type for top-level exam doc
}

export interface FirestoreSubjectData {
  id:string; // Document ID
  name: string;
  description?: string;
  iconName?: string;
  availableYears: number[];
}


export interface PastQuestionForAnalysis {
  id: string;
  text: string;
  year: number;
  subject: string;
  exam: string;
}

// Extended User type for app-specific properties
export interface AppUser extends FirebaseUser {
  trialEndsAt?: number; // Timestamp
  isSubscribed?: boolean;
  subscriptionEndsAt?: number; // Timestamp
  // Add other app-specific user properties here if needed
}
