
import type { User as FirebaseUser } from "firebase/auth";
import type { LucideIcon } from "lucide-react";
import type { Timestamp } from "firebase/firestore";

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
  icon?: LucideIcon; // For mock data, used by dashboard
  iconName?: string; // For Firestore data, used by other pages
  availableYears: number[];
}

export interface Exam {
  id: string;
  name: string;
  description: string;
  subjects: Subject[]; 
  icon?: LucideIcon; // For mock data, used by dashboard
  iconName?: string; // For Firestore data
  order?: number;
}

// Types for data fetched from Firestore
export interface FirestoreExamData {
  id: string; // Document ID
  name: string;
  description: string;
  iconName?: string;
  order?: number;
}

export interface FirestoreSubjectData {
  id:string; // Document ID
  name: string;
  description?: string;
  iconName?: string;
  availableYears: number[];
}
// Question type is reused for Firestore as it fits well.

// Extended User type for app-specific properties from Firestore
export interface AppUser extends FirebaseUser {
  // Fields from Firestore 'users' collection
  createdAt?: Timestamp;
  trialEndsAt?: number; // Converted from Firestore Timestamp to number (milliseconds)
  isSubscribed?: boolean;
  subscriptionEndsAt?: number; // Converted from Firestore Timestamp to number (milliseconds)
}
