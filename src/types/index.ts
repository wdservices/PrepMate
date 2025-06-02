
import type { User as FirebaseUser } from "firebase/auth";

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
  icon?: React.ComponentType<React.SVGProps<SVGSVGElement>>; 
  availableYears: number[];
}

export interface Exam {
  id: string;
  name: string;
  description: string;
  subjects: Subject[];
  icon?: React.ComponentType<React.SVGProps<SVGSVGElement>>;
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
