
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
  imageUrl?: string;
  subjects: Subject[];
}

export interface PastQuestionForAnalysis {
  id: string;
  text: string;
  year: number;
  subject: string;
  exam: string;
}
