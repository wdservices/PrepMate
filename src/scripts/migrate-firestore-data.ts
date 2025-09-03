// Script to help migrate Firestore data to correct structure
// Run this once to fix your data structure

import { db } from '../lib/firebase';
import { collection, doc, getDoc, setDoc, addDoc, serverTimestamp, getDocs, query, writeBatch } from 'firebase/firestore';

// Default image URL for questions - using a direct link to a placeholder image
const DEFAULT_IMAGE_URL = 'https://upload.wikimedia.org/wikipedia/commons/3/3f/Placeholder_view_vector.svg';

// Mock data for 2010 subjects
const mock2010Subjects = {
  biology: {
    id: 'biology',
    name: 'Biology',
    description: 'Biology subject for WAEC',
    iconName: 'Dna',
    order: 3,
    availableYears: [2010, 2011],
    questions: [
      {
        text: 'Which of the following is a characteristic of living organisms?',
        options: [
          { id: 'a', text: 'Crystallization' },
          { id: 'b', text: 'Respiration' },
          { id: 'c', text: 'Sublimation' },
          { id: 'd', text: 'Erosion' },
        ],
        answer: 'b',
        explanation: 'Respiration is a characteristic of living organisms as it is the process of releasing energy from food.',
        year: 2010,
      },
      {
        text: 'The part of the cell responsible for protein synthesis is the:',
        options: [
          { id: 'a', text: 'Nucleus' },
          { id: 'b', text: 'Mitochondrion' },
          { id: 'c', text: 'Ribosome' },
          { id: 'd', text: 'Golgi apparatus' },
        ],
        answer: 'c',
        explanation: 'Ribosomes are the cellular structures responsible for protein synthesis.',
        year: 2010,
        imageUrl: 'https://placehold.co/600x400.png',
      }
    ]
  },
  chemistry: {
    id: 'chemistry',
    name: 'Chemistry',
    description: 'Chemistry subject for WAEC',
    iconName: 'Flask',
    order: 2,
    availableYears: [2010, 2011],
    questions: [
      {
        text: 'What is the chemical symbol for Water?',
        options: [
          { id: 'a', text: 'O2' },
          { id: 'b', text: 'H2O' },
          { id: 'c', text: 'CO2' },
          { id: 'd', text: 'NaCl' },
        ],
        answer: 'b',
        explanation: 'The chemical formula for water is H₂O, which means each water molecule contains two hydrogen atoms and one oxygen atom.',
        year: 2010,
      },
      {
        text: 'An element with atomic number 12 has how many protons?',
        options: [
          { id: 'a', text: '6' },
          { id: 'b', text: '12' },
          { id: 'c', text: '24' },
          { id: 'd', text: '36' },
        ],
        answer: 'b',
        explanation: 'The atomic number of an element is equal to the number of protons in its nucleus.',
        year: 2010,
      }
    ]
  }
};

// JAMB Chemistry 2010 questions
const jambChemistry2010Questions = [
  {
    id: 'chem2010_q1',
    text: 'Which of the following is an example of a mixture?',
    imageUrl: DEFAULT_IMAGE_URL,
    options: [
      { id: 'a', text: 'Common salt' },
      { id: 'b', text: 'Blood' },
      { id: 'c', text: 'Sand' },
      { id: 'd', text: 'Washing soda' }
    ],
    answer: 'b',
    year: 2010,
    subjectId: 'chemistry',
    examId: 'jamb',
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp()
  },
  {
    id: 'chem2010_q3',
    text: 'Calculate the percentage by mass of nitrogen in calcium trioxonitrate (V) [Ca = 40, N = 14, O = 16]',
    options: [
      { id: 'a', text: '8.5%' },
      { id: 'b', text: '13.1%' },
      { id: 'c', text: '17.1%' },
      { id: 'd', text: '27.6%' }
    ],
    answer: 'c',
    year: 2010,
    subjectId: 'chemistry',
    examId: 'jamb',
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp()
  },
  {
    id: 'chem2010_q5',
    text: 'The volume of a given gas is V cm³ at P mm Hg. What is the new volume of the gas if the pressure is reduced to half at constant temperature?',
    options: [
      { id: 'a', text: '4 V cm³' },
      { id: 'b', text: '2 V cm³' },
      { id: 'c', text: '½ V cm³' },
      { id: 'd', text: 'V cm³' }
    ],
    answer: 'b',
    year: 2010,
    subjectId: 'chemistry',
    examId: 'jamb',
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp()
  },
  {
    id: 'chem2010_q6',
    text: 'Moving from left to right across a period, the general rise in the first ionization energy can be attributed to the',
    options: [
      { id: 'a', text: 'decrease in nuclear charge' },
      { id: 'b', text: 'increase in nuclear charge' },
      { id: 'c', text: 'decrease in screening effect' },
      { id: 'd', text: 'increase in screening effect' }
    ],
    answer: 'b',
    year: 2010,
    subjectId: 'chemistry',
    examId: 'jamb',
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp()
  },
  {
    id: 'chem2010_q7',
    text: 'How many unpaired electron(s) are there in the nitrogen sub-levels?',
    options: [
      { id: 'a', text: '3' },
      { id: 'b', text: '2' },
      { id: 'c', text: '1' },
      { id: 'd', text: 'None' }
    ],
    answer: 'a',
    year: 2010,
    subjectId: 'chemistry',
    examId: 'jamb',
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp()
  },
  {
    id: 'chem2010_q8',
    text: 'What quantity of electricity is required to liberate 1 mole of a substance during electrolysis?',
    options: [
      { id: 'a', text: '96500 C' },
      { id: 'b', text: '1 Faraday' },
      { id: 'c', text: '1 Coulomb' },
      { id: 'd', text: '2 Faradays' }
    ],
    answer: 'b',
    year: 2010,
    subjectId: 'chemistry',
    examId: 'jamb',
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp()
  },
  {
    id: 'chem2010_q9',
    text: 'Which of the following is a chemical property of matter?',
    imageUrl: DEFAULT_IMAGE_URL,
    options: [
      { id: 'a', text: 'Density' },
      { id: 'b', text: 'Boiling point' },
      { id: 'c', text: 'Combustibility' },
      { id: 'd', text: 'Melting point' }
    ],
    answer: 'c',
    year: 2010,
    subjectId: 'chemistry',
    examId: 'jamb',
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp()
  },
  {
    id: 'chem2010_q10',
    text: 'In which of the following does hydrogen bonding occur?',
    imageUrl: DEFAULT_IMAGE_URL,
    options: [
      { id: 'a', text: 'HCl' },
      { id: 'b', text: 'NH₃' },
      { id: 'c', text: 'CH₄' },
      { id: 'd', text: 'CO₂' }
    ],
    answer: 'b',
    year: 2010,
    subjectId: 'chemistry',
    examId: 'jamb',
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp()
  },
  {
    id: 'chem2010_q11',
    text: 'Which of the following substances contains both ionic and covalent bonds?',
    imageUrl: DEFAULT_IMAGE_URL,
    options: [
      { id: 'a', text: 'NH₄Cl' },
      { id: 'b', text: 'HCl' },
      { id: 'c', text: 'NaCl' },
      { id: 'd', text: 'CH₄' }
    ],
    answer: 'a',
    year: 2010,
    subjectId: 'chemistry',
    examId: 'jamb',
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp()
  },
  {
    id: 'chem2010_q12',
    text: 'When sodium is heated in free air, the product formed is',
    imageUrl: DEFAULT_IMAGE_URL,
    options: [
      { id: 'a', text: 'Na₂O' },
      { id: 'b', text: 'Na₂O₂' },
      { id: 'c', text: 'NaOH' },
      { id: 'd', text: 'Na₂CO₃' }
    ],
    answer: 'b',
    year: 2010,
    subjectId: 'chemistry',
    examId: 'jamb',
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp()
  },
  {
    id: 'chem2010_q13',
    text: 'Which of the following gases is not a pollutant?',
    imageUrl: DEFAULT_IMAGE_URL,
    options: [
      { id: 'a', text: 'Carbon monoxide' },
      { id: 'b', text: 'Sulphur dioxide' },
      { id: 'c', text: 'Nitrogen' },
      { id: 'd', text: 'Chlorofluorocarbon' }
    ],
    answer: 'c',
    year: 2010,
    subjectId: 'chemistry',
    examId: 'jamb',
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp()
  },
  {
    id: 'chem2010_q14',
    text: 'The major constituent of natural gas is',
    imageUrl: DEFAULT_IMAGE_URL,
    options: [
      { id: 'a', text: 'Methane' },
      { id: 'b', text: 'Ethane' },
      { id: 'c', text: 'Butane' },
      { id: 'd', text: 'Propane' }
    ],
    answer: 'a',
    year: 2010,
    subjectId: 'chemistry',
    examId: 'jamb',
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp()
  },
  {
    id: 'chem2010_q15',
    text: 'A gas that is collected over water is said to be',
    imageUrl: DEFAULT_IMAGE_URL,
    options: [
      { id: 'a', text: 'dry' },
      { id: 'b', text: 'saturated' },
      { id: 'c', text: 'unsaturated' },
      { id: 'd', text: 'pure' }
    ],
    answer: 'b',
    year: 2010,
    subjectId: 'chemistry',
    examId: 'jamb',
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp()
  },
  {
    id: 'chem2010_q16',
    text: 'An example of a non-polar compound is',
    imageUrl: DEFAULT_IMAGE_URL,
    options: [
      { id: 'a', text: 'NH₃' },
      { id: 'b', text: 'H₂O' },
      { id: 'c', text: 'CH₄' },
      { id: 'd', text: 'HCl' }
    ],
    answer: 'c',
    year: 2010,
    subjectId: 'chemistry',
    examId: 'jamb',
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp()
  },
  {
    id: 'chem2010_q17',
    text: 'The oxidation number of nitrogen in NO₃⁻ is',
    imageUrl: DEFAULT_IMAGE_URL,
    options: [
      { id: 'a', text: '+5' },
      { id: 'b', text: '+3' },
      { id: 'c', text: '+2' },
      { id: 'd', text: '0' }
    ],
    answer: 'a',
    year: 2010,
    subjectId: 'chemistry',
    examId: 'jamb',
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp()
  },
  {
    id: 'chem2010_q18',
    text: 'Which of the following is a reducing agent?',
    imageUrl: DEFAULT_IMAGE_URL,
    options: [
      { id: 'a', text: 'O₂' },
      { id: 'b', text: 'H₂' },
      { id: 'c', text: 'Cl₂' },
      { id: 'd', text: 'HNO₃' }
    ],
    answer: 'b',
    year: 2010,
    subjectId: 'chemistry',
    examId: 'jamb',
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp()
  },
  {
    id: 'chem2010_q19',
    text: 'Temporary hardness of water can be removed by',
    imageUrl: DEFAULT_IMAGE_URL,
    options: [
      { id: 'a', text: 'boiling' },
      { id: 'b', text: 'filtering' },
      { id: 'c', text: 'adding Ca(OH)₂' },
      { id: 'd', text: 'distillation' }
    ],
    answer: 'a',
    year: 2010,
    subjectId: 'chemistry',
    examId: 'jamb',
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp()
  },
  {
    id: 'chem2010_q20',
    text: 'Which of the following is used as a drying agent?',
    imageUrl: DEFAULT_IMAGE_URL,
    options: [
      { id: 'a', text: 'Conc. H₂SO₄' },
      { id: 'b', text: 'NaOH' },
      { id: 'c', text: 'NaCl' },
      { id: 'd', text: 'CaCO₃' }
    ],
    answer: 'a',
    year: 2010,
    subjectId: 'chemistry',
    examId: 'jamb',
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp()
  },
  {
    id: 'chem2010_q21',
    text: 'The colour of litmus in alkaline solution is',
    imageUrl: DEFAULT_IMAGE_URL,
    options: [
      { id: 'a', text: 'Red' },
      { id: 'b', text: 'Yellow' },
      { id: 'c', text: 'Blue' },
      { id: 'd', text: 'Green' }
    ],
    answer: 'c',
    year: 2010,
    subjectId: 'chemistry',
    examId: 'jamb',
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp()
  },
  {
    id: 'chem2010_q22',
    text: 'What is the pH of a 0.01 M HCl solution?',
    imageUrl: DEFAULT_IMAGE_URL,
    options: [
      { id: 'a', text: '1' },
      { id: 'b', text: '2' },
      { id: 'c', text: '3' },
      { id: 'd', text: '4' }
    ],
    answer: 'b',
    year: 2010,
    subjectId: 'chemistry',
    examId: 'jamb',
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp()
  },
  {
    id: 'chem2010_q23',
    text: 'Which of the following is a strong acid?',
    imageUrl: DEFAULT_IMAGE_URL,
    options: [
      { id: 'a', text: 'CH₃COOH' },
      { id: 'b', text: 'H₂CO₃' },
      { id: 'c', text: 'HNO₃' },
      { id: 'd', text: 'H₂S' }
    ],
    answer: 'c',
    year: 2010,
    subjectId: 'chemistry',
    examId: 'jamb',
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp()
  },
  {
    id: 'chem2010_q24',
    text: 'Which substance will react with both acids and bases?',
    imageUrl: DEFAULT_IMAGE_URL,
    options: [
      { id: 'a', text: 'NaCl' },
      { id: 'b', text: 'HCl' },
      { id: 'c', text: 'Al(OH)₃' },
      { id: 'd', text: 'NaOH' }
    ],
    answer: 'c',
    year: 2010,
    subjectId: 'chemistry',
    examId: 'jamb',
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp()
  },
  {
    id: 'chem2010_q25',
    text: 'Which of these oxides is amphoteric?',
    imageUrl: DEFAULT_IMAGE_URL,
    options: [
      { id: 'a', text: 'Na₂O' },
      { id: 'b', text: 'Al₂O₃' },
      { id: 'c', text: 'CO₂' },
      { id: 'd', text: 'SO₂' }
    ],
    answer: 'b',
    year: 2010,
    subjectId: 'chemistry',
    examId: 'jamb',
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp()
  },
  {
    id: 'chem2010_q26',
    text: 'Which of the following metals can be extracted by electrolysis?',
    imageUrl: DEFAULT_IMAGE_URL,
    options: [
      { id: 'a', text: 'Iron' },
      { id: 'b', text: 'Zinc' },
      { id: 'c', text: 'Lead' },
      { id: 'd', text: 'Aluminium' }
    ],
    answer: 'd',
    year: 2010,
    subjectId: 'chemistry',
    examId: 'jamb',
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp()
  },
  {
    id: 'chem2010_q27',
    text: 'In which of the following compounds is the carbon-carbon bond a double bond?',
    imageUrl: DEFAULT_IMAGE_URL,
    options: [
      { id: 'a', text: 'C₂H₂' },
      { id: 'b', text: 'C₂H₄' },
      { id: 'c', text: 'C₂H₆' },
      { id: 'd', text: 'CH₄' }
    ],
    answer: 'b',
    year: 2010,
    subjectId: 'chemistry',
    examId: 'jamb',
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp()
  },
  {
    id: 'chem2010_q28',
    text: 'Crude oil is separated into fractions by',
    imageUrl: DEFAULT_IMAGE_URL,
    options: [
      { id: 'a', text: 'Crystallization' },
      { id: 'b', text: 'Filtration' },
      { id: 'c', text: 'Fractional distillation' },
      { id: 'd', text: 'Sublimation' }
    ],
    answer: 'c',
    year: 2010,
    subjectId: 'chemistry',
    examId: 'jamb',
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp()
  },
  {
    id: 'chem2010_q29',
    text: 'Which of the following organic compounds will decolourize bromine water?',
    imageUrl: DEFAULT_IMAGE_URL,
    options: [
      { id: 'a', text: 'Ethane' },
      { id: 'b', text: 'Ethene' },
      { id: 'c', text: 'Ethanoic acid' },
      { id: 'd', text: 'Ethanol' }
    ],
    answer: 'b',
    year: 2010,
    subjectId: 'chemistry',
    examId: 'jamb',
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp()
  },
  {
    id: 'chem2010_q30',
    text: 'Which of these is an unsaturated hydrocarbon?',
    imageUrl: DEFAULT_IMAGE_URL,
    options: [
      { id: 'a', text: 'Butane' },
      { id: 'b', text: 'Propane' },
      { id: 'c', text: 'Ethene' },
      { id: 'd', text: 'Methane' }
    ],
    answer: 'c',
    year: 2010,
    subjectId: 'chemistry',
    examId: 'jamb',
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp()
  },
  {
    id: 'chem2010_q31',
    text: 'The brown ring test is used to confirm the presence of',
    imageUrl: DEFAULT_IMAGE_URL,
    options: [
      { id: 'a', text: 'CO' },
      { id: 'b', text: 'Cl⁻' },
      { id: 'c', text: 'SO₄²⁻' },
      { id: 'd', text: 'NO₃⁻' }
    ],
    answer: 'd',
    year: 2010,
    subjectId: 'chemistry',
    examId: 'jamb',
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp()
  },
  {
    id: 'chem2010_q32',
    text: 'The gas produced in the reaction between PH₃ and AgNO₃ is',
    imageUrl: DEFAULT_IMAGE_URL,
    options: [
      { id: 'a', text: 'NO' },
      { id: 'b', text: 'NO₂' },
      { id: 'c', text: 'N₂O' },
      { id: 'd', text: 'N₂O₄' }
    ],
    answer: 'a',
    year: 2010,
    subjectId: 'chemistry',
    examId: 'jamb',
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp()
  },
  {
    id: 'chem2010_q33',
    text: 'Which of the following is used in rocket fuels?',
    imageUrl: DEFAULT_IMAGE_URL,
    options: [
      { id: 'a', text: 'HNO₃' },
      { id: 'b', text: 'CH₃COOH' },
      { id: 'c', text: 'H₂SO₄' },
      { id: 'd', text: 'HCl' }
    ],
    answer: 'a',
    year: 2010,
    subjectId: 'chemistry',
    examId: 'jamb',
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp()
  },
  {
    id: 'chem2010_q34',
    text: 'The purpose of asbestos in laboratory setup is to',
    imageUrl: DEFAULT_IMAGE_URL,
    options: [
      { id: 'a', text: 'Absorb impurities' },
      { id: 'b', text: 'Catalyse the reaction' },
      { id: 'c', text: 'Solidify the gas' },
      { id: 'd', text: 'Dry the gas' }
    ],
    answer: 'b',
    year: 2010,
    subjectId: 'chemistry',
    examId: 'jamb',
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp()
  },
  {
    id: 'chem2010_q35',
    text: 'A constituent common to bronze and solder is',
    imageUrl: DEFAULT_IMAGE_URL,
    options: [
      { id: 'a', text: 'Lead' },
      { id: 'b', text: 'Silver' },
      { id: 'c', text: 'Copper' },
      { id: 'd', text: 'Tin' }
    ],
    answer: 'd',
    year: 2010,
    subjectId: 'chemistry',
    examId: 'jamb',
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp()
  },
  {
    id: 'chem2010_q36',
    text: 'When iron is exposed to moist air, it gradually rusts. This is due to the formation of',
    imageUrl: DEFAULT_IMAGE_URL,
    options: [
      { id: 'a', text: 'Hydrated iron (III) oxide' },
      { id: 'b', text: 'Anhydrous iron (III) oxide' },
      { id: 'c', text: 'Anhydrous iron (II) oxide' },
      { id: 'd', text: 'Hydrated iron (II) oxide' }
    ],
    answer: 'a',
    year: 2010,
    subjectId: 'chemistry',
    examId: 'jamb',
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp()
  },
  {
    id: 'chem2010_q37',
    text: 'A compound gives an orange-red colour to non-luminous flame. This compound is likely to contain',
    imageUrl: DEFAULT_IMAGE_URL,
    options: [
      { id: 'a', text: 'Na⁺' },
      { id: 'b', text: 'Ca²⁺' },
      { id: 'c', text: 'Fe³⁺' },
      { id: 'd', text: 'Fe²⁺' }
    ],
    answer: 'b',
    year: 2010,
    subjectId: 'chemistry',
    examId: 'jamb',
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp()
  },
  {
    id: 'chem2010_q38',
    text: 'Stainless steel is used for making',
    imageUrl: DEFAULT_IMAGE_URL,
    options: [
      { id: 'a', text: 'Magnets' },
      { id: 'b', text: 'Tools' },
      { id: 'c', text: 'Coins and medals' },
      { id: 'd', text: 'Moving parts of clocks' }
    ],
    answer: 'c',
    year: 2010,
    subjectId: 'chemistry',
    examId: 'jamb',
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp()
  },
  {
    id: 'chem2010_q39',
    text: 'The residual solids from the fractional distillation of petroleum are used as',
    imageUrl: DEFAULT_IMAGE_URL,
    options: [
      { id: 'a', text: 'Coatings of pipes' },
      { id: 'b', text: 'Raw materials for cracking' },
      { id: 'c', text: 'Fuel for tractors' },
      { id: 'd', text: 'Fuel for jet engines' }
    ],
    answer: 'a',
    year: 2010,
    subjectId: 'chemistry',
    examId: 'jamb',
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp()
  },
  {
    id: 'chem2010_q40',
    text: 'The IUPAC name of the compound shown is',
    imageUrl: DEFAULT_IMAGE_URL,
    options: [
      { id: 'a', text: '4-ethyloctane' },
      { id: 'b', text: '5-ethyloctane' },
      { id: 'c', text: '5-propylheptane' },
      { id: 'd', text: '3-propylheptane' }
    ],
    answer: 'd',
    year: 2010,
    subjectId: 'chemistry',
    examId: 'jamb',
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp()
  },
  {
    id: 'chem2010_q41',
    text: 'Which of the following is used as fuel in miners\' lamps?',
    imageUrl: DEFAULT_IMAGE_URL,
    options: [
      { id: 'a', text: 'Ethanal' },
      { id: 'b', text: 'Ethyne' },
      { id: 'c', text: 'Ethene' },
      { id: 'd', text: 'Ethane' }
    ],
    answer: 'b',
    year: 2010,
    subjectId: 'chemistry',
    examId: 'jamb',
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp()
  },
  {
    id: 'chem2010_q42',
    text: 'Which of the following organic compounds is very soluble in water?',
    imageUrl: DEFAULT_IMAGE_URL,
    options: [
      { id: 'a', text: 'CH₃COOH' },
      { id: 'b', text: 'C₂H₂' },
      { id: 'c', text: 'C₂H₄' },
      { id: 'd', text: 'CH₃COOC₂H₅' }
    ],
    answer: 'a',
    year: 2010,
    subjectId: 'chemistry',
    examId: 'jamb',
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp()
  },
  {
    id: 'chem2010_q43',
    text: 'Benzene reacts with hydrogen in the presence of a nickel catalyst at 180°C to give',
    imageUrl: DEFAULT_IMAGE_URL,
    options: [
      { id: 'a', text: 'Xylene' },
      { id: 'b', text: 'Toluene' },
      { id: 'c', text: 'Cyclopentane' },
      { id: 'd', text: 'Cyclohexane' }
    ],
    answer: 'd',
    year: 2010,
    subjectId: 'chemistry',
    examId: 'jamb',
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp()
  },
  {
    id: 'chem2010_q44',
    text: 'Which of the following is used to hasten the ripening of fruits?',
    imageUrl: DEFAULT_IMAGE_URL,
    options: [
      { id: 'a', text: 'Ethene' },
      { id: 'b', text: 'Ethanol' },
      { id: 'c', text: 'Ethyne' },
      { id: 'd', text: 'Ethane' }
    ],
    answer: 'a',
    year: 2010,
    subjectId: 'chemistry',
    examId: 'jamb',
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp()
  },
  {
    id: 'chem2010_q45',
    text: 'The final product of the reaction between methane and chlorine in the presence of UV light is',
    imageUrl: DEFAULT_IMAGE_URL,
    options: [
      { id: 'a', text: 'Trichloromethane' },
      { id: 'b', text: 'Dichloromethane' },
      { id: 'c', text: 'Tetrachloromethane' },
      { id: 'd', text: 'Chloromethane' }
    ],
    answer: 'c',
    year: 2010,
    subjectId: 'chemistry',
    examId: 'jamb',
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp()
  },
  {
    id: 'chem2010_q46',
    text: 'The correct order of increasing boiling points of the following compounds: C₃H₇OH, C₇H₁₆ and C₄H₁₀ is',
    options: [
      { id: 'a', text: 'C₃H₇OH → C₄H₁₀ → C₇H₁₆' },
      { id: 'b', text: 'C₄H₁₀ → C₇H₁₆ → C₃H₇OH' },
      { id: 'c', text: 'C₇H₁₆ → C₃H₇OH → C₄H₁₀' },
      { id: 'd', text: 'C₄H₁₀ → C₃H₇OH → C₇H₁₆' }
    ],
    answer: 'd',
    year: 2010,
    subjectId: 'chemistry',
    examId: 'jamb',
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp()
  },
  {
    id: 'chem2010_q47',
    text: 'One of the major uses of alkanes is',
    imageUrl: DEFAULT_IMAGE_URL,
    options: [
      { id: 'a', text: 'As domestic and industrial fuel' },
      { id: 'b', text: 'In the hydrogenation of oils' },
      { id: 'c', text: 'In textile industries' },
      { id: 'd', text: 'In the production of plastics' }
    ],
    answer: 'a',
    year: 2010,
    subjectId: 'chemistry',
    examId: 'jamb',
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp()
  },
  {
    id: 'chem2010_q48',
    text: 'The haloalkanes used in dry-cleaning industries are',
    options: [
      { id: 'a', text: 'Trichloromethane and tetrachloromethane' },
      { id: 'b', text: 'Chloroethene and dichloroethene' },
      { id: 'c', text: 'Trichloroethene and tetrachloroethene' },
      { id: 'd', text: 'Chloroethane and dichloroethane' }
    ],
    answer: 'a',
    year: 2010,
    subjectId: 'chemistry',
    examId: 'jamb',
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp()
  },
  {
    id: 'chem2010_q49',
    text: 'Two hydrocarbons X and Y were treated with bromine water. X decolourized the solution and Y did not. Which class of compound does Y belong?',
    options: [
      { id: 'a', text: 'Benzene' },
      { id: 'b', text: 'Alkynes' },
      { id: 'c', text: 'Alkenes' },
      { id: 'd', text: 'Alkanes' }
    ],
    answer: 'd',
    year: 2010,
    subjectId: 'chemistry',
    examId: 'jamb',
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp()
  },
  {
    id: 'chem2010_q50',
    text: 'The compound that is used as an anaesthetic is',
    options: [
      { id: 'a', text: 'CCl₄' },
      { id: 'b', text: 'CHCl₃' },
      { id: 'c', text: 'CH₂Cl₂' },
      { id: 'd', text: 'CH₃Cl' }
    ],
    answer: 'b',
    year: 2010,
    subjectId: 'chemistry',
    examId: 'jamb',
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp()
  }
];

async function migrateFirestoreData() {
  if (!db) {
    console.error('Firestore not initialized');
    return;
  }

  try {
    console.log('🔄 Starting Firestore data migration...');
    const batch = writeBatch(db);

    // 1. First, create the exam document if it doesn't exist
    const examId = 'waec';
    const examRef = doc(db, 'exams', examId);
    const examDoc = await getDoc(examRef);
    
    if (!examDoc.exists()) {
      batch.set(examRef, {
        name: 'WAEC',
        description: 'West African Examinations Council',
        iconName: 'BookOpen',
        order: 2,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp()
      });
      console.log(`✅ Will create exam document: ${examId}`);
    } else {
      console.log(`ℹ️ Exam document ${examId} already exists`);
    }

    // 2. Create subjects and questions for 2010
    console.log('\n📝 Processing 2010 subjects...');
    for (const subjectId in mock2010Subjects) {
      const subjectData = mock2010Subjects[subjectId as keyof typeof mock2010Subjects];
      const subjectRef = doc(db, 'exams', examId, 'subjects', subjectData.id);
      const subjectDoc = await getDoc(subjectRef);
      
      if (!subjectDoc.exists()) {
        // Add subject to batch
        batch.set(subjectRef, {
          name: subjectData.name,
          description: subjectData.description,
          iconName: subjectData.iconName,
          order: subjectData.order,
          availableYears: subjectData.availableYears,
          examId: examId,
          createdAt: serverTimestamp(),
          updatedAt: serverTimestamp()
        });
        console.log(`✅ Will create subject document: ${subjectData.id}`);

        // Add questions for this subject
        const questionsRef = collection(db, 'exams', examId, 'subjects', subjectData.id, 'questions');
        const querySnapshot = await getDocs(query(questionsRef));
        
        if (querySnapshot.empty) {
          for (const question of subjectData.questions) {
            const questionRef = doc(questionsRef);
            batch.set(questionRef, {
              ...question,
              subjectId: subjectData.id,
              examId: examId,
              createdAt: serverTimestamp(),
              updatedAt: serverTimestamp()
            });
            console.log(`   ✅ Will add question: ${question.text.substring(0, 30)}...`);
          }
        } else {
          console.log(`   ℹ️ Questions already exist for subject ${subjectData.id}`);
        }
      } else {
        console.log(`ℹ️ Subject document ${subjectData.id} already exists`);
      }
    }

    // 3. Create JAMB exam and subjects if they don't exist
    const jambExamId = 'jamb';
    const jambExamRef = doc(db, 'exams', jambExamId);
    const jambExamDoc = await getDoc(jambExamRef);
    
    if (!jambExamDoc.exists()) {
      batch.set(jambExamRef, {
        name: 'JAMB',
        description: 'Joint Admissions and Matriculation Board',
        iconName: 'BookOpen',
        order: 1,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp()
      });
      console.log(`✅ Will create exam document: ${jambExamId}`);
    } else {
      console.log(`ℹ️ Exam document ${jambExamId} already exists`);
    }

    // 4. Create or Update JAMB Chemistry subject
    const jambChemistryRef = doc(db, 'exams', jambExamId, 'subjects', 'chemistry');
    const jambChemistryDoc = await getDoc(jambChemistryRef);
    
    // Always update availableYears to include 2010
    const currentData = jambChemistryDoc.exists() ? jambChemistryDoc.data() : {};
    const currentYears = currentData.availableYears || [];
    const updatedYears = Array.from(new Set([...currentYears, 2010])); // Ensure 2010 is included
    
    batch.set(jambChemistryRef, {
      name: 'Chemistry',
      description: 'Chemistry subject for JAMB',
      iconName: 'Flask',
      order: 2,
      availableYears: updatedYears,
      examId: jambExamId,
      ...(jambChemistryDoc.exists() ? {} : { createdAt: serverTimestamp() }),
      updatedAt: serverTimestamp()
    }, { merge: true });
    
    console.log(`✅ Will ${jambChemistryDoc.exists() ? 'update' : 'create'} subject document: chemistry for JAMB with years: ${updatedYears.join(', ')}`);

    // 5. Add JAMB Chemistry 2010 questions
    const questionsRef = collection(db, 'exams', jambExamId, 'subjects', 'chemistry', 'questions');
    
    // Track processed question IDs
    const processedIds = new Set<string>();
    const duplicateIds = new Set<string>();
    
    // First pass: Check for duplicates in the source data
    for (const question of jambChemistry2010Questions) {
      if (processedIds.has(question.id)) {
        console.error(`❌ Duplicate question ID in source data: ${question.id}`);
        duplicateIds.add(question.id);
      }
      processedIds.add(question.id);
    }
    
    // Second pass: Process questions
    for (const question of jambChemistry2010Questions) {
      // Skip duplicates found in source data
      if (duplicateIds.has(question.id)) continue;
      
      const questionRef = doc(questionsRef, question.id);
      const questionDoc = await getDoc(questionRef);
      
      if (!questionDoc.exists()) {
        const { id, ...questionData } = question;
        batch.set(questionRef, questionData);
        console.log(`✅ Will add JAMB Chemistry 2010 question with ID: ${id}`);
      } else {
        console.log(`ℹ️ JAMB Chemistry 2010 question already exists with ID: ${question.id}`);
      }
    }
    
    // Log summary
    console.log(`\n📊 Migration Summary:`);
    console.log(`- Total questions in source data: ${jambChemistry2010Questions.length}`);
    console.log(`- Duplicate IDs in source data: ${duplicateIds.size}`);
    if (duplicateIds.size > 0) {
      console.log(`  Duplicate IDs: ${Array.from(duplicateIds).join(', ')}`);
    }

    // 6. Commit all changes in a single batch
    console.log('\n🚀 Committing all changes to Firestore...');
    await batch.commit();
    
    console.log('\n🎉 Migration completed successfully!');
    console.log('📊 Your data structure is now:');
    console.log(`exams/waec (exam document)`);
    console.log('   ├── subjects/biology (subject document)');
    console.log('   │   └── questions/ (subcollection)');
    console.log('   └── subjects/chemistry (subject document)');
    console.log('       └── questions/ (subcollection)');
    console.log('exams/jamb (exam document)');
    console.log('   └── subjects/chemistry (subject document)');
    console.log('       └── questions/ (subcollection)');
    console.log(`           └── ${jambChemistry2010Questions.length} JAMB Chemistry 2010 questions`);
    
    // Log the range of questions
    const questionNumbers = jambChemistry2010Questions.map(q => parseInt(q.id.split('_q')[1]));
    const minQ = Math.min(...questionNumbers);
    const maxQ = Math.max(...questionNumbers);
    console.log(`           Questions ${minQ}-${maxQ} (${jambChemistry2010Questions.length} total)`);

  } catch (error) {
    console.error('❌ Migration failed:', error);
    if (error instanceof ReferenceError && error.message.includes('jambChemistry2010Question')) {
      console.error('Error: There is a typo in the code. The correct variable name is jambChemistry2010Questions (plural)');
    }
  }
}

// Run the migration
migrateFirestoreData();
