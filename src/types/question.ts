import type { Question as FirestoreQuestion } from '@/lib/firestore-service';
import type { Question as UIDataQuestion } from '@/types';

// Unified Question type that works with both Firestore and UI components
export type UnifiedQuestion = {
  id: string;
  text: string;
  options: Array<{ id: string; text: string }> | string[];
  correctOptionId: string;
  explanation?: string;
  imageUrl?: string;
  year?: number;
};

// Convert Firestore question to UI question format
export function toUIQuestion(question: FirestoreQuestion): UIDataQuestion {
  return {
    ...question,
    options: Array.isArray(question.options) 
      ? question.options.map((opt, idx) => ({
          id: `opt-${idx + 1}`,
          text: typeof opt === 'string' ? opt : opt.text || `Option ${idx + 1}`
        }))
      : [],
    // Add any other necessary transformations
  };
}

// Convert UI question to Firestore format
export function toFirestoreQuestion(question: UIDataQuestion): FirestoreQuestion {
  return {
    ...question,
    options: question.options.map(opt => ({
      id: typeof opt === 'string' ? `opt-${opt}` : opt.id,
      text: typeof opt === 'string' ? opt : opt.text
    }))
  };
}
