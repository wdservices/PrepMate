
import type { Exam, Subject, Question } from "@/types";
import { BookText, Atom, Languages, Calculator, Leaf, FlaskConical, Users, GraduationCap, BookOpenText, ClipboardCheck } from "lucide-react";

const biologyQuestions2010: Question[] = [
  {
    id: "bio-2010-q1",
    year: 2010,
    text: "Which of the following is a characteristic of living organisms?",
    options: [
      { id: "opt1", text: "Crystallization" },
      { id: "opt2", text: "Respiration" },
      { id: "opt3", text: "Sublimation" },
      { id: "opt4", text: "Erosion" },
    ],
    correctOptionId: "opt2",
  },
  {
    id: "bio-2010-q2",
    year: 2010,
    text: "The part of the cell responsible for protein synthesis is the:",
    options: [
      { id: "opt1", text: "Nucleus" },
      { id: "opt2", text: "Mitochondrion" },
      { id: "opt3", text: "Ribosome" },
      { id: "opt4", text: "Golgi apparatus" },
    ],
    correctOptionId: "opt3",
  },
];

const biologyQuestions2011: Question[] = [
  {
    id: "bio-2011-q1",
    year: 2011,
    text: "Photosynthesis primarily occurs in which part of a plant?",
    options: [
      { id: "opt1", text: "Roots" },
      { id: "opt2", text: "Stem" },
      { id: "opt3", text: "Leaves" },
      { id: "opt4", text: "Flowers" },
    ],
    correctOptionId: "opt3",
  },
];

const chemistryQuestions2010: Question[] = [
  {
    id: "chem-2010-q1",
    year: 2010,
    text: "What is the chemical symbol for Water?",
    options: [
      { id: "opt1", text: "O2" },
      { id: "opt2", text: "H2O" },
      { id: "opt3", text: "CO2" },
      { id: "opt4", text: "NaCl" },
    ],
    correctOptionId: "opt2",
  },
];


export const jambSubjects: Subject[] = [
  { id: "biology", name: "Biology", icon: Leaf, availableYears: [2010, 2011], description: "Study of life and living organisms." },
  { id: "chemistry", name: "Chemistry", icon: FlaskConical, availableYears: [2010], description: "Study of matter and its properties." },
  { id: "english", name: "English Language", icon: Languages, availableYears: [], description: "Language, literature, and communication." },
  { id: "mathematics", name: "Mathematics", icon: Calculator, availableYears: [], description: "Study of numbers, quantity, space, structure." },
  { id: "physics", name: "Physics", icon: Atom, availableYears: [], description: "Study of matter, energy, and their interactions." },
  { id: "government", name: "Government", icon: Users, availableYears: [], description: "Study of political systems and institutions." },
];

export const waecSubjects: Subject[] = [...jambSubjects]; // Assuming same subjects for simplicity
export const necoSubjects: Subject[] = [...jambSubjects]; // Assuming same subjects for simplicity


export const exams: Exam[] = [
  {
    id: "jamb",
    name: "JAMB",
    description: "Joint Admissions and Matriculation Board examination for tertiary-level education in Nigeria.",
    subjects: jambSubjects,
    icon: GraduationCap,
  },
  {
    id: "waec",
    name: "WAEC",
    description: "West African Examinations Council, a senior secondary school leaving examination.",
    subjects: waecSubjects,
    icon: BookOpenText,
  },
  {
    id: "neco",
    name: "NECO",
    description: "National Examinations Council, another senior secondary school certificate examination in Nigeria.",
    subjects: necoSubjects,
    icon: ClipboardCheck,
  },
];

export const allQuestions: Question[] = [
  ...biologyQuestions2010,
  ...biologyQuestions2011,
  ...chemistryQuestions2010,
];

export function getExamById(examId: string): Exam | undefined {
  return exams.find(exam => exam.id === examId);
}

export function getSubjectById(examId: string, subjectId: string): Subject | undefined {
  const exam = getExamById(examId);
  return exam?.subjects.find(subject => subject.id === subjectId);
}

export function getQuestions(examId: string, subjectId: string, year: number): Question[] {
  // In a real app, this would fetch from a database
  // For mock, filter allQuestions based on examId (implicit), subjectId and year
  // This mock data is simple, so we'll just filter by year and assume subject implies certain questions
  if (subjectId === 'biology' && year === 2010) return biologyQuestions2010;
  if (subjectId === 'biology' && year === 2011) return biologyQuestions2011;
  if (subjectId === 'chemistry' && year === 2010) return chemistryQuestions2010;
  return [];
}

export function getPastQuestionsForAnalysis(examId: string, subjectId: string): string[] {
  // Filter allQuestions for the given exam and subject across all years
  // This is a simplified mock version.
  let relevantQuestions: Question[] = [];
  if (subjectId === 'biology') {
    relevantQuestions = [...biologyQuestions2010, ...biologyQuestions2011];
  } else if (subjectId === 'chemistry') {
    relevantQuestions = [...chemistryQuestions2010];
  }
  
  return relevantQuestions.map(q => q.text);
}
