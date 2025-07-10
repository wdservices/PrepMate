// WAEC mock data

import type { Question } from "@/types";

export const biologyQuestions2010: Question[] = [
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
    imageUrl: "https://placehold.co/600x400.png", // Example image
  },
];

export const biologyQuestions2011: Question[] = [
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
  { 
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

export const chemistryQuestions2010: Question[] = [
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

export function getQuestions(subjectId: string, year: number): Question[] {
  if (subjectId === "biology") {
    if (year === 2010) return biologyQuestions2010;
    if (year === 2011) return biologyQuestions2011;
  }
  if (subjectId === "chemistry") {
    if (year === 2010) return chemistryQuestions2010;
  }
  // Add other WAEC subjects and years here
  return [];
} 