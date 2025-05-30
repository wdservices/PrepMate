
import type { Exam, Subject, Question } from "@/types";
import { BookText, Atom, Languages, Calculator, Leaf, FlaskConical, Users, GraduationCap, BookOpenText, ClipboardCheck, Landmark, Scale } from "lucide-react";

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
  {
    id: "chem-2010-q2",
    year: 2010,
    text: "An element with atomic number 12 has how many protons?",
    options: [
      { id: "opt1", text: "6" },
      { id: "opt2", text: "12" },
      { id: "opt3", text: "24" },
      { id: "opt4", text: "0" },
    ],
    correctOptionId: "opt2",
  },
];

const englishQuestions2010: Question[] = [
  {
    id: "eng-2010-q1",
    year: 2010,
    text: "Choose the word that is nearest in meaning to 'Ubiquitous'.",
    options: [
      { id: "opt1", text: "Scarce" },
      { id: "opt2", text: "Commonplace" },
      { id: "opt3", text: "Hidden" },
      { id: "opt4", text: "Unique" },
    ],
    correctOptionId: "opt2",
  },
];

const mathematicsQuestions2010: Question[] = [
  {
    id: "math-2010-q1",
    year: 2010,
    text: "If 2x + 5 = 15, what is the value of x?",
    options: [
      { id: "opt1", text: "5" },
      { id: "opt2", text: "10" },
      { id: "opt3", text: "7.5" },
      { id: "opt4", text: "2.5" },
    ],
    correctOptionId: "opt1",
  },
];


export const commonSubjects: Subject[] = [
  { id: "biology", name: "Biology", icon: Leaf, availableYears: [2010, 2011], description: "Study of life and living organisms, their structure, function, growth, origin, evolution, distribution, and taxonomy." },
  { id: "chemistry", name: "Chemistry", icon: FlaskConical, availableYears: [2010], description: "Scientific discipline involved with elements and compounds composed of atoms, molecules and ions: their composition, structure, properties, behavior and the changes they undergo during a reaction with other substances." },
  { id: "english", name: "English Language", icon: Languages, availableYears: [2010], description: "Core subject focusing on grammar, comprehension, literature, and effective communication skills." },
  { id: "mathematics", name: "Mathematics", icon: Calculator, availableYears: [2010], description: "Abstract science of number, quantity, and space, either as abstract concepts (pure mathematics) or as applied to other disciplines such as physics and engineering (applied mathematics)." },
  { id: "physics", name: "Physics", icon: Atom, availableYears: [], description: "Natural science that studies matter, its motion and behavior through space and time, and the related entities of energy and force." },
  { id: "government", name: "Government", icon: Users, availableYears: [], description: "Study of political systems, institutions, processes, and behavior, and the analysis of political ideas and theories." },
];

export const exams: Exam[] = [
  {
    id: "jamb",
    name: "JAMB",
    description: "Joint Admissions and Matriculation Board examination for tertiary-level education in Nigeria.",
    subjects: commonSubjects,
    icon: GraduationCap,
  },
  {
    id: "waec",
    name: "WAEC",
    description: "West African Examinations Council, a senior secondary school leaving examination.",
    subjects: commonSubjects, // Assuming same subjects for simplicity, can be customized
    icon: BookOpenText,
  },
  {
    id: "neco",
    name: "NECO",
    description: "National Examinations Council, another senior secondary school certificate examination in Nigeria.",
    subjects: commonSubjects, // Assuming same subjects for simplicity, can be customized
    icon: ClipboardCheck,
  },
];

// Consolidate all questions for easier lookup
export const allQuestions: Question[] = [
  ...biologyQuestions2010,
  ...biologyQuestions2011,
  ...chemistryQuestions2010,
  ...englishQuestions2010,
  ...mathematicsQuestions2010,
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
  if (subjectId === 'biology' && year === 2010) return biologyQuestions2010;
  if (subjectId === 'biology' && year === 2011) return biologyQuestions2011;
  if (subjectId === 'chemistry' && year === 2010) return chemistryQuestions2010;
  if (subjectId === 'english' && year === 2010) return englishQuestions2010;
  if (subjectId === 'mathematics' && year === 2010) return mathematicsQuestions2010;
  
  // Fallback for other combinations if needed or return empty array
  return allQuestions.filter(q => 
    q.year === year &&
    (
      (subjectId === 'biology' && q.id.startsWith('bio-')) ||
      (subjectId === 'chemistry' && q.id.startsWith('chem-')) ||
      (subjectId === 'english' && q.id.startsWith('eng-')) ||
      (subjectId === 'mathematics' && q.id.startsWith('math-'))
      // Add other subjects here
    )
  );
}

export function getPastQuestionsForAnalysis(examId: string, subjectId: string): string[] {
  // Filter allQuestions for the given exam and subject across all years
  // This is a simplified mock version.
  let relevantQuestions: Question[] = [];
  if (subjectId === 'biology') {
    relevantQuestions = allQuestions.filter(q => q.id.startsWith('bio-'));
  } else if (subjectId === 'chemistry') {
    relevantQuestions = allQuestions.filter(q => q.id.startsWith('chem-'));
  } else if (subjectId === 'english') {
    relevantQuestions = allQuestions.filter(q => q.id.startsWith('eng-'));
  } else if (subjectId === 'mathematics') {
    relevantQuestions = allQuestions.filter(q => q.id.startsWith('math-'));
  }
  // Add more subject filters as needed
  
  return relevantQuestions.map(q => q.text);
}

