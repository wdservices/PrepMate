
import type { Exam, Subject, Question } from "@/types";
import { PastQuestionWithYear as AIPastQuestionInput } from "@/ai/flows/predictive-analysis"; // Import type from AI flow
import { 
  BookText, Atom, Languages, Calculator, Leaf, FlaskConical, Users, GraduationCap, 
  BookOpenText, ClipboardCheck, Landmark, Scale, TrendingUp, DollarSign, Tractor, Sprout, 
  Store, ShoppingBag, Globe2, Map as MapIcon, NotebookText, BookHeart, Feather, Cross, 
  FunctionSquare, InfinityIcon, MessagesSquare, Palette, Brush, Laptop, Code, CookingPot, 
  Apple, ScrollText, MoonStar, BookOpen, Milestone 
} from "lucide-react";

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
  { // Adding a repeated question for testing
    id: "bio-2011-q2",
    year: 2011,
    text: "Which of the following is a characteristic of living organisms?",
    options: [
      { id: "opt1", text: "Melting" },
      { id: "opt2", text: "Respiration" },
      { id: "opt3", text: "Boiling" },
      { id: "opt4", text: "Rusting" },
    ],
    correctOptionId: "opt2",
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


const allListedSubjects: Subject[] = [
  { id: "mathematics", name: "Mathematics", icon: Calculator, availableYears: [2010], description: "Abstract science of number, quantity, and space, fundamental to all sciences." },
  { id: "english", name: "English Language", icon: Languages, availableYears: [2010], description: "Core subject focusing on grammar, comprehension, literature, and effective communication skills." },
  { id: "chemistry", name: "Chemistry", icon: FlaskConical, availableYears: [2010], description: "Scientific discipline involving elements and compounds and their transformations." },
  { id: "biology", name: "Biology", icon: Leaf, availableYears: [2010, 2011], description: "Study of life and living organisms, their structure, function, growth, and evolution." },
  { id: "physics", name: "Physics", icon: Atom, availableYears: [], description: "Natural science that studies matter, its motion and behavior through space and time." },
  { id: "geography", name: "Geography", icon: Globe2, availableYears: [], description: "Study of the earth's landscapes, environments, and the relationship between people and their environments." },
  { id: "economics", name: "Economics", icon: TrendingUp, availableYears: [], description: "Study of production, distribution, and consumption of goods and services." },
  { id: "further-mathematics", name: "Further Mathematics", icon: FunctionSquare, availableYears: [], description: "Advanced mathematical concepts beyond standard mathematics." },
  { id: "crs", name: "Christian Religious Studies", icon: Cross, availableYears: [], description: "Study of Christian beliefs, practices, and history." },
  { id: "agricultural-science", name: "Agricultural Science", icon: Sprout, availableYears: [], description: "Application of scientific principles to agriculture." },
  { id: "arts", name: "Fine Arts", icon: Palette, availableYears: [], description: "Study and creation of visual arts." },
  { id: "civics", name: "Civic Education", icon: Landmark, availableYears: [], description: "Study of the rights and responsibilities of citizens and the workings of government." },
  { id: "commerce", name: "Commerce", icon: Store, availableYears: [], description: "Study of trade and business activities." },
  { id: "computer-studies", name: "Computer Studies", icon: Laptop, availableYears: [], description: "Study of computers and algorithmic processes, including their principles, hardware/software designs, applications, and societal impact." },
  { id: "english-literature", name: "English Literature", icon: BookHeart, availableYears: [], description: "Study of literary works written in the English language." },
  { id: "financial-accounting", name: "Financial Accounting", icon: NotebookText, availableYears: [], description: "Process of recording, summarizing, and reporting the myriad of a company's business transactions." },
  { id: "food-nutrition", name: "Food and Nutrition", icon: CookingPot, availableYears: [], description: "Study of food composition, diet, and health." },
  { id: "french", name: "French Language", icon: Milestone, availableYears: [], description: "Study of the French language, literature, and culture. Using 'Milestone' as a proxy for 'Languages' for variety." },
  { id: "government", name: "Government", icon: Users, availableYears: [], description: "Study of political systems, institutions, processes, and behavior." },
  { id: "history", name: "History", icon: ScrollText, availableYears: [], description: "Study of past events, particularly in human affairs." },
  { id: "igbo", name: "Igbo Language", icon: MessagesSquare, availableYears: [], description: "Study of the Igbo language, literature, and culture." },
  { id: "islamic-studies", name: "Islamic Studies", icon: MoonStar, availableYears: [], description: "Study of Islamic beliefs, practices, and history." },
  { id: "yoruba", name: "Yoruba Language", icon: MessagesSquare, availableYears: [], description: "Study of the Yoruba language, literature, and culture." },
];

const priorityOrder = [
  "Mathematics",
  "English Language",
  "Chemistry",
  "Biology",
  "Physics",
  "Geography",
  "Economics",
  "Further Mathematics",
  "Christian Religious Studies",
];

// Sort the subjects based on priority
const prioritizedSubjects = allListedSubjects
  .filter(subject => priorityOrder.includes(subject.name))
  .sort((a, b) => priorityOrder.indexOf(a.name) - priorityOrder.indexOf(b.name));

const otherSubjects = allListedSubjects
  .filter(subject => !priorityOrder.includes(subject.name))
  .sort((a, b) => a.name.localeCompare(b.name)); // Sort remaining alphabetically

export const commonSubjects: Subject[] = [...prioritizedSubjects, ...otherSubjects];


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
    subjects: commonSubjects, 
    icon: BookOpenText,
  },
  {
    id: "neco",
    name: "NECO",
    description: "National Examinations Council, another senior secondary school certificate examination in Nigeria.",
    subjects: commonSubjects, 
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
  // This filtering logic needs to be robust if more questions are added.
  // For now, it uses the specific arrays for known data and then a general filter.

  if (subjectId === 'biology' && year === 2010) return biologyQuestions2010;
  if (subjectId === 'biology' && year === 2011) return biologyQuestions2011;
  if (subjectId === 'chemistry' && year === 2010) return chemistryQuestions2010;
  if (subjectId === 'english' && year === 2010) return englishQuestions2010;
  if (subjectId === 'mathematics' && year === 2010) return mathematicsQuestions2010;
  
  // Fallback or general logic for other subjects/years if they get added directly to allQuestions
  // This will need to be more sophisticated if subject data grows significantly.
  return allQuestions.filter(q => {
    const questionSubjectId = q.id.split('-')[0]; // e.g., 'bio' from 'bio-2010-q1'
    let matchesSubject = false;

    if (subjectId === 'biology' && questionSubjectId === 'bio') matchesSubject = true;
    else if (subjectId === 'chemistry' && questionSubjectId === 'chem') matchesSubject = true;
    else if (subjectId === 'english' && questionSubjectId === 'eng') matchesSubject = true;
    else if (subjectId === 'mathematics' && questionSubjectId === 'math') matchesSubject = true;
    // Add more conditions here if you add more subjects with specific id prefixes

    return matchesSubject && q.year === year;
  });
}

export function getPastQuestionsForAnalysis(examId: string, subjectId: string): AIPastQuestionInput[] {
  let relevantQuestions: Question[] = [];
  const exam = getExamById(examId);
  const subject = exam?.subjects.find(s => s.id === subjectId);

  if (subject) {
    subject.availableYears.forEach(year => {
      const questionsForYear = getQuestions(examId, subjectId, year);
      relevantQuestions.push(...questionsForYear);
    });
  }
  
  // If still no questions (e.g. subject has no available years, or no questions for those years)
  // Fallback to broader filter if needed, though ideally availableYears should be accurate.
  if (relevantQuestions.length === 0) {
    const questionSubjectIdPrefix = subjectId.substring(0,4); // Basic prefix like 'biol', 'chem'
    relevantQuestions = allQuestions.filter(q => q.id.startsWith(questionSubjectIdPrefix + '-') || q.id.startsWith(subjectId + '-'));
  }
  
  return relevantQuestions.map(q => ({
    questionText: q.text,
    year: q.year,
  }));
}

