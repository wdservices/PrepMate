
export interface QuestionOption {
  id: string;
  text: string;
}

export interface Question {
  id: string;
  text: string;
  options: QuestionOption[];
  correctOptionId: string;
  explanationFromAI?: string; // For AI generated explanation after wrong answer
  year: number;
  imageUrl?: string; // Optional URL for an image associated with the question
}

export interface Subject {
  id: string;
  name: string;
  description?: string;
  icon?: React.ComponentType<React.SVGProps<SVGSVGElement>>; // Lucide icon
  availableYears: number[];
}

export interface Exam {
  id: string;
  name: string;
  description: string;
  subjects: Subject[];
  icon?: React.ComponentType<React.SVGProps<SVGSVGElement>>; // Lucide icon for the exam itself
}

export interface PastQuestionForAnalysis {
  id: string;
  text: string;
  year: number;
  subject: string;
  exam: string;
}
