
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

// These are generic 2010 Chemistry questions, not specific to an exam body.
const chemistryQuestions2010: Question[] = [
  {
    id: "chem-2010-q1", // Generic ID
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
    id: "chem-2010-q2", // Generic ID
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

const jambChemistry2010: Question[] = [
  {
    id: "jamb-chem-2010-q1",
    year: 2010,
    text: "Which chemistry paper type is given to you?",
    options: [
      { id: "opt1", text: "Type A" },
      { id: "opt2", text: "Type B" },
      { id: "opt3", text: "Type C" },
      { id: "opt4", text: "Type D" },
    ],
    correctOptionId: "opt1",
  },
  {
    id: "jamb-chem-2010-q2",
    year: 2010,
    text: "Which of the following is an example of a mixture?",
    options: [
      { id: "opt1", text: "Common salt" },
      { id: "opt2", text: "Blood" },
      { id: "opt3", text: "Sand" },
      { id: "opt4", text: "Washing soda" },
    ],
    correctOptionId: "opt2",
  },
  {
    id: "jamb-chem-2010-q3",
    year: 2010,
    text: "Calculate the percentage by mass of nitrogen in calcium trioxonitrate (V) [Ca = 40, N = 14, O = 16]",
    options: [
      { id: "opt1", text: "8.5%" },
      { id: "opt2", text: "13.1%" },
      { id: "opt3", text: "17.1%" },
      { id: "opt4", text: "27.6%" },
    ],
    correctOptionId: "opt3",
  },
  {
    id: "jamb-chem-2010-q4",
    year: 2010,
    text: "The droplets of water observed around a bottle of milk taken out of the refrigerator is due to the fact that the",
    options: [
      { id: "opt1", text: "water vapour in the air around the bottle gains some energy from the bottle" },
      { id: "opt2", text: "temperature of the milk drops as it loses heat into the surroundings" },
      { id: "opt3", text: "saturated vapour pressure of the milk is equal to the atmospheric pressure" },
      { id: "opt4", text: "water vapour in the air around the bottle loses some of its energy to the bottle" },
    ],
    correctOptionId: "opt4",
  },
  {
    id: "jamb-chem-2010-q5",
    year: 2010,
    text: "The volume of a given gas is Vcm³ at P mm Hg. What is the new volume of the gas if the pressure is reduced to half at constant temperature?",
    options: [
      { id: "opt1", text: "4V cm³" },
      { id: "opt2", text: "2V cm³" },
      { id: "opt3", text: "V/2 cm³" },
      { id: "opt4", text: "V cm³" },
    ],
    correctOptionId: "opt2",
  },
  {
    id: "jamb-chem-2010-q6",
    year: 2010,
    text: "Moving from left to right across a period, the general rise in the first ionization energy can be attributed to the",
    options: [
      { id: "opt1", text: "decrease in nuclear charge" },
      { id: "opt2", text: "increase in nuclear charge" },
      { id: "opt3", text: "decrease in screening effect" },
      { id: "opt4", text: "increase in screening effect" },
    ],
    correctOptionId: "opt2",
  },
  {
    id: "jamb-chem-2010-q7",
    year: 2010,
    text: "How many unpaired electron(s) are there in the nitrogen sub-levels?",
    options: [
      { id: "opt1", text: "3" },
      { id: "opt2", text: "2" },
      { id: "opt3", text: "1" },
      { id: "opt4", text: "none" },
    ],
    correctOptionId: "opt1",
  },
  {
    id: "jamb-chem-2010-q8",
    year: 2010,
    text: "The stability of the noble gases is due to the fact that they",
    options: [
      { id: "opt1", text: "have no electron in their outermost shells" },
      { id: "opt2", text: "have duplet or octet electron configurations" },
      { id: "opt3", text: "belong to group zero of the periodic table" },
      { id: "opt4", text: "are volatile in nature" },
    ],
    correctOptionId: "opt2",
  },
  {
    id: "jamb-chem-2010-q9",
    year: 2010,
    text: "The maximum number of electrons in the L shell of an atom is",
    options: [
      { id: "opt1", text: "2" },
      { id: "opt2", text: "8" },
      { id: "opt3", text: "18" },
      { id: "opt4", text: "32" },
    ],
    correctOptionId: "opt2",
  },
  {
    id: "jamb-chem-2010-q10",
    year: 2010,
    text: "Elements in the same period in the periodic table have the same",
    options: [
      { id: "opt1", text: "number of shells" },
      { id: "opt2", text: "atomic number" },
      { id: "opt3", text: "chemical properties" },
      { id: "opt4", text: "physical properties" },
    ],
    correctOptionId: "opt1",
  },
  {
    id: "jamb-chem-2010-q11",
    year: 2010,
    text: "The reaction ²₁D + ³₁T → ⁴₂He + ¹₀n + energy illustrates",
    options: [
      { id: "opt1", text: "alpha decay" },
      { id: "opt2", text: "artificial transmutation" },
      { id: "opt3", text: "nuclear fusion" },
      { id: "opt4", text: "nuclear fission" },
    ],
    correctOptionId: "opt3",
  },
  {
    id: "jamb-chem-2010-q12",
    year: 2010,
    text: "A noble gas with a high power of fog penetration used in aerodrome beacons is",
    options: [
      { id: "opt1", text: "krypton" },
      { id: "opt2", text: "argon" },
      { id: "opt3", text: "helium" },
      { id: "opt4", text: "neon" },
    ],
    correctOptionId: "opt1",
  },
  {
    id: "jamb-chem-2010-q13",
    year: 2010,
    text: "Permanent hardness of water can be removed by",
    options: [
      { id: "opt1", text: "filtration" },
      { id: "opt2", text: "adding slaked lime" },
      { id: "opt3", text: "adding caustic soda" },
      { id: "opt4", text: "boiling" },
    ],
    correctOptionId: "opt3",
  },
  {
    id: "jamb-chem-2010-q14",
    year: 2010,
    text: "Substances employed as drying agents are usually",
    options: [
      { id: "opt1", text: "amphoteric" },
      { id: "opt2", text: "hygroscopic" },
      { id: "opt3", text: "efflorescent" },
      { id: "opt4", text: "acidic" },
    ],
    correctOptionId: "opt2",
  },
  {
    id: "jamb-chem-2010-q15",
    year: 2010,
    text: "Calculate the solubility in mol dm⁻³ of 40g of CuSO₄ dissolved in 100g of water at 120°C. [Cu = 64, S = 32, O = 16]",
    options: [
      { id: "opt1", text: "4.00" },
      { id: "opt2", text: "2.50" },
      { id: "opt3", text: "0.40" },
      { id: "opt4", text: "0.25" },
    ],
    correctOptionId: "opt2",
  },
  {
    id: "jamb-chem-2010-q16",
    year: 2010,
    text: "Coffee stains can best be removed by",
    options: [
      { id: "opt1", text: "Kerosene" },
      { id: "opt2", text: "turpentine" },
      { id: "opt3", text: "a solution of borax in water" },
      { id: "opt4", text: "ammonia solution" },
    ],
    correctOptionId: "opt4",
  },
  {
    id: "jamb-chem-2010-q17",
    year: 2010,
    text: "Carbon (II) oxide is considered dangerous if inhaled mainly because it",
    options: [
      { id: "opt1", text: "can cause injury to the nervous system" },
      { id: "opt2", text: "competes with oxygen in the blood" },
      { id: "opt3", text: "competes with carbon (IV) oxide in the blood" },
      { id: "opt4", text: "can cause lung cancer" },
    ],
    correctOptionId: "opt2",
  },
  {
    id: "jamb-chem-2010-q18",
    year: 2010,
    text: "The acid that is used to remove rust is",
    options: [
      { id: "opt1", text: "boric" },
      { id: "opt2", text: "hydrochloric" },
      { id: "opt3", text: "trioxonitrate (V)" },
      { id: "opt4", text: "tetraoxosulphate (VI)" },
    ],
    correctOptionId: "opt2",
  },
  {
    id: "jamb-chem-2010-q19",
    year: 2010,
    text: "Calculate the volume of 0.5 mol dm⁻³ H₂SO₄ that is neutralized by 25 cm³ of 0.1 mol dm⁻³ NaOH",
    options: [
      { id: "opt1", text: "5.0 cm³" },
      { id: "opt2", text: "2.5 cm³" },
      { id: "opt3", text: "0.4 cm³" },
      { id: "opt4", text: "0.1 cm³" },
    ],
    correctOptionId: "opt2",
  },
  {
    id: "jamb-chem-2010-q20",
    year: 2010,
    text: "The colour of methyl orange in alkaline medium is",
    options: [
      { id: "opt1", text: "yellow" },
      { id: "opt2", text: "pink" },
      { id: "opt3", text: "orange" },
      { id: "opt4", text: "red" },
    ],
    correctOptionId: "opt1",
  },
  {
    id: "jamb-chem-2010-q21",
    year: 2010,
    text: "Which of the following salts is slightly soluble in water?",
    options: [
      { id: "opt1", text: "AgCl" },
      { id: "opt2", text: "CaSO₄" },
      { id: "opt3", text: "Na₂CO₃" },
      { id: "opt4", text: "PbCl₂" },
    ],
    correctOptionId: "opt2",
  },
  {
    id: "jamb-chem-2010-q22",
    year: 2010,
    text: "In the reaction 6AgNO₃(aq) + PH₃(g) + 3H₂O(l) → 6Ag(s) + H₃PO₃(aq) + 6HNO₃(aq), the reducing agent is",
    options: [
      { id: "opt1", text: "HNO₃(aq)" },
      { id: "opt2", text: "H₂O(l)" },
      { id: "opt3", text: "PH₃(g)" },
      { id: "opt4", text: "AgNO₃(aq)" },
    ],
    correctOptionId: "opt3",
  },
  {
    id: "jamb-chem-2010-q23",
    year: 2010,
    text: "The IUPAC nomenclature of the compound LiAlH₄ is",
    options: [
      { id: "opt1", text: "lithium tetrahydridoaluminate (III)" },
      { id: "opt2", text: "aluminium tetrahydrido lithium" },
      { id: "opt3", text: "tetrahydrido lithium aluminate (III)" },
      { id: "opt4", text: "lithium aluminium hydride" },
    ],
    correctOptionId: "opt1",
  },
  {
    id: "jamb-chem-2010-q24",
    year: 2010,
    text: "Iron can be protected from corrosion by coating the surface with",
    options: [
      { id: "opt1", text: "gold" },
      { id: "opt2", text: "silver" },
      { id: "opt3", text: "copper" },
      { id: "opt4", text: "zinc" },
    ],
    correctOptionId: "opt4",
  },
  {
    id: "jamb-chem-2010-q25",
    year: 2010,
    text: "What quantity of aluminium is deposited when a current of 10A is passed through a solution of an aluminium salt for 1930s? [Al = 27, F = 96500 C mol⁻¹]",
    options: [
      { id: "opt1", text: "0.2 g" },
      { id: "opt2", text: "1.8 g" },
      { id: "opt3", text: "5.4 g" },
      { id: "opt4", text: "14.2 g" },
    ],
    correctOptionId: "opt2",
  },
  {
    id: "jamb-chem-2010-q26",
    year: 2010,
    text: "In which of the following is the entropy change positive?",
    options: [
      { id: "opt1", text: "Thermal dissociation of ammonium chloride" },
      { id: "opt2", text: "Reaction between an acid and a base" },
      { id: "opt3", text: "Addition of concentrated acid to water" },
      { id: "opt4", text: "Dissolution of sodium metal in water" },
    ],
    correctOptionId: "opt1",
  },
  {
    id: "jamb-chem-2010-q27",
    year: 2010,
    text: "If a reaction is exothermic and there is a great disorder, it means that",
    options: [
      { id: "opt1", text: "the reaction is static" },
      { id: "opt2", text: "the reaction is in a state of equilibrium" },
      { id: "opt3", text: "there will be a large increase in free energy" },
      { id: "opt4", text: "there will be a large decrease in free energy" },
    ],
    correctOptionId: "opt4",
  },
  {
    id: "jamb-chem-2010-q28",
    year: 2010,
    text: "In the preparation of oxygen by heating KClO₃ in the presence of MnO₂, only moderate heat is needed because the catalyst acts by",
    options: [
      { id: "opt1", text: "lowering the pressure of the reaction" },
      { id: "opt2", text: "increasing the surface area of the reactant" },
      { id: "opt3", text: "increasing the rate of the reaction" },
      { id: "opt4", text: "lowering the energy barrier of the reaction" },
    ],
    correctOptionId: "opt4",
  },
  {
    id: "jamb-chem-2010-q29",
    year: 2010,
    text: "The graph demonstrates the effect of",
    options: [
      { id: "opt1", text: "surface area on the rate of reaction" },
      { id: "opt2", text: "catalyst on the rate of reaction" },
      { id: "opt3", text: "pressure on the rate reaction" },
      { id: "opt4", text: "concentration on the rate of reaction" },
    ],
    correctOptionId: "opt1",
  },
  {
    id: "jamb-chem-2010-q30",
    year: 2010,
    text: "For the reaction 2H₂(g) + O₂(g) ⇌ 2H₂O(g) ΔH = -ve, what happens to the equilibrium constant if the temperature is increased?",
    options: [
      { id: "opt1", text: "it is unaffected" },
      { id: "opt2", text: "it becomes zero" },
      { id: "opt3", text: "it decreases" },
      { id: "opt4", text: "it increases" },
    ],
    correctOptionId: "opt3",
  },
  {
    id: "jamb-chem-2010-q31",
    year: 2010,
    text: "The brown ring observed after adding concentrated H₂SO₄ to a solution containing FeSO₄ confirms the presence of",
    options: [
      { id: "opt1", text: "CO" },
      { id: "opt2", text: "Cl⁻" },
      { id: "opt3", text: "SO₄²⁻" },
      { id: "opt4", text: "NO₃⁻" },
    ],
    correctOptionId: "opt4",
  },
  {
    id: "jamb-chem-2010-q32",
    year: 2010,
    text: "In the diagram, the gas produced is",
    options: [
      { id: "opt1", text: "NO" },
      { id: "opt2", text: "NO₂" },
      { id: "opt3", text: "N₂O" },
      { id: "opt4", text: "N₂O₄" },
    ],
    correctOptionId: "opt1",
  },
  {
    id: "jamb-chem-2010-q33",
    year: 2010,
    text: "Which of the following is used in rocket fuels?",
    options: [
      { id: "opt1", text: "HNO₃" },
      { id: "opt2", text: "CH₃COOH" },
      { id: "opt3", text: "H₂SO₄" },
      { id: "opt4", text: "HCl" },
    ],
    correctOptionId: "opt1",
  },
  {
    id: "jamb-chem-2010-q34",
    year: 2010,
    text: "In the diagram, the purpose of the asbestos is to",
    options: [
      { id: "opt1", text: "absorb impurities" },
      { id: "opt2", text: "catalyse the reaction" },
      { id: "opt3", text: "solidify the gas" },
      { id: "opt4", text: "dry the gas" },
    ],
    correctOptionId: "opt2",
  },
  {
    id: "jamb-chem-2010-q35",
    year: 2010,
    text: "A constituent common to bronze and solder is",
    options: [
      { id: "opt1", text: "lead" },
      { id: "opt2", text: "silver" },
      { id: "opt3", text: "copper" },
      { id: "opt4", text: "tin" },
    ],
    correctOptionId: "opt4",
  },
  {
    id: "jamb-chem-2010-q36",
    year: 2010,
    text: "When iron is exposed to moist air, it gradually rusts. This is due to the formation of",
    options: [
      { id: "opt1", text: "hydrate iron (III) oxide" },
      { id: "opt2", text: "anhydrous iron (III) oxide" },
      { id: "opt3", text: "anhydrous iron (II) oxide" },
      { id: "opt4", text: "hydrate iron (II) oxide" },
    ],
    correctOptionId: "opt1",
  },
  {
    id: "jamb-chem-2010-q37",
    year: 2010,
    text: "A compound gives an orange-red colour to non-luminous flame. This compound is likely to contain",
    options: [
      { id: "opt1", text: "Na⁺" },
      { id: "opt2", text: "Ca²⁺" },
      { id: "opt3", text: "Fe³⁺" },
      { id: "opt4", text: "Fe²⁺" },
    ],
    correctOptionId: "opt2",
  },
  {
    id: "jamb-chem-2010-q38",
    year: 2010,
    text: "Stainless steel is used for making",
    options: [
      { id: "opt1", text: "magnets" },
      { id: "opt2", text: "tools" },
      { id: "opt3", text: "coins and medals" },
      { id: "opt4", text: "moving parts of clocks" },
    ],
    correctOptionId: "opt3",
  },
  {
    id: "jamb-chem-2010-q39",
    year: 2010,
    text: "The residual solids from the fractional distillation of petroleum are used as",
    options: [
      { id: "opt1", text: "coatings of pipes" },
      { id: "opt2", text: "raw materials for the cracking process" },
      { id: "opt3", text: "fuel for driving tractors" },
      { id: "opt4", text: "fuel for jet engines" },
    ],
    correctOptionId: "opt1",
  },
  {
    id: "jamb-chem-2010-q40",
    year: 2010,
    text: "The IUPAC nomenclature of the compound CH₃(CH₂)₃CHC₂H₅ is",
    options: [
      { id: "opt1", text: "4-ethyloctane" },
      { id: "opt2", text: "5-ethyloctane" },
      { id: "opt3", text: "5-propylheptane" },
      { id: "opt4", text: "3-propylheptane" },
    ],
    correctOptionId: "opt4",
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
  ...chemistryQuestions2010, // Generic chemistry 2010
  ...jambChemistry2010,   // JAMB specific chemistry 2010
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

  // Specific cases should come first
  if (examId === 'jamb' && subjectId === 'chemistry' && year === 2010) return jambChemistry2010;

  if (subjectId === 'biology' && year === 2010) return biologyQuestions2010;
  if (subjectId === 'biology' && year === 2011) return biologyQuestions2011;
  if (subjectId === 'chemistry' && year === 2010) return chemistryQuestions2010; // Generic/non-JAMB chemistry
  if (subjectId === 'english' && year === 2010) return englishQuestions2010;
  if (subjectId === 'mathematics' && year === 2010) return mathematicsQuestions2010;
  
  // Fallback or general logic for other subjects/years if they get added directly to allQuestions
  // This will need to be more sophisticated if subject data grows significantly.
  return allQuestions.filter(q => {
    // Attempt to match based on a convention like 'jamb-chem-2010-q1' or 'waec-bio-2011-qX'
    // This requires question IDs to follow a pattern: <examId>-<subjectIdAbbrev>-<year>-q<num>
    // Or, more simply, if we don't have specific examId prefixes in all question IDs:
    const questionSubjectId = q.id.split('-')[0]; // e.g., 'bio' from 'bio-2010-q1', or 'jamb' from 'jamb-chem-2010-q1'
    let matchesSubject = false;

    // This part needs to be more generic or rely on specific examId in question ID
    if (subjectId === 'biology' && (q.id.startsWith('bio-') || q.id.includes('-bio-'))) matchesSubject = true;
    else if (subjectId === 'chemistry' && (q.id.startsWith('chem-') || q.id.includes('-chem-'))) {
      // If examId is not JAMB, and it's chemistry 2010, it will hit the generic chem-2010 questions
      // if examId is JAMB, it's already handled by the specific case above.
      matchesSubject = true; 
    }
    else if (subjectId === 'english' && (q.id.startsWith('eng-') || q.id.includes('-eng-'))) matchesSubject = true;
    else if (subjectId === 'mathematics' && (q.id.startsWith('math-') || q.id.includes('-math-'))) matchesSubject = true;
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
      // Pass examId here to get exam-specific questions if available
      const questionsForYear = getQuestions(examId, subjectId, year); 
      relevantQuestions.push(...questionsForYear);
    });
  }
  
  // If still no questions (e.g. subject has no available years, or no questions for those years)
  // Fallback to broader filter if needed, though ideally availableYears should be accurate.
  if (relevantQuestions.length === 0) {
    // This fallback needs to be aware of examId too if question IDs are exam-specific
    relevantQuestions = allQuestions.filter(q => {
      // Example: q.id might be "jamb-chem-2010-q1" or "chem-2010-q1"
      const idParts = q.id.split('-');
      let qExamId = null;
      let qSubjectIdPart = idParts[0]; // Default to first part if not exam-prefixed

      if (exams.some(ex => ex.id === idParts[0])) { // Check if first part is a known exam ID
        qExamId = idParts[0];
        qSubjectIdPart = idParts[1]; // e.g., "chem" from "jamb-chem-2010"
      }
      
      const subjectMatches = (subjectId.startsWith(qSubjectIdPart) || qSubjectIdPart.startsWith(subjectId.substring(0,4)));
      const examMatches = (qExamId === null || qExamId === examId); // If question has no examId, or it matches

      return subjectMatches && examMatches;
    });
  }
  
  return relevantQuestions.map(q => ({
    questionText: q.text,
    year: q.year,
  }));
}

