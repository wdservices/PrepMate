
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
  correctOptionId?: string; // Made optional for backward compatibility
  answer?: string; // Added to match Firestore data
  explanationFromAI?: string;
  year?: number; // Made optional as it's not always available
  imageUrl?: string;
  subjectId?: string; // Added for easier reference
  examId?: string; // Added for easier reference
  createdAt?: any; // Firestore timestamp
  updatedAt?: any; // Firestore timestamp
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
  role?: 'admin' | 'student'; // Added role property
  // Add other app-specific user properties here if needed
}

export interface AdminStats {
  todaysUsers: number;
  monthlyUsers: number;
  totalUsers: number;
  mostViewedExam: string;
  mostViewedSubject: string;
}

export interface RecentUserActivity {
  id: string;
  name: string;
  email: string;
  lastSeen: string;
  examsTaken: number;
  role: string;
}

export interface RevenueStats {
  totalRevenue: number;
  monthlyRevenue: number;
  annualRevenue: number;
}

export interface Payment {
  id?: string;
  userId: string;
  amount: number;
  currency: string;
  status: 'pending' | 'completed' | 'failed';
  timestamp: any; // Firestore Timestamp
  // Add other relevant payment details like paymentMethod, transactionId, etc.
}

