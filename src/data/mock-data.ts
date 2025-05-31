
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
  {
    id: "jamb-chem-2010-q41",
    year: 2010,
    text: "Which of the following is used as fuel in miners' lamp?",
    options: [
      { id: "opt1", text: "Ethanal" },
      { id: "opt2", text: "Ethyne" },
      { id: "opt3", text: "Ethene" },
      { id: "opt4", text: "Ethane" },
    ],
    correctOptionId: "opt2",
  },
  {
    id: "jamb-chem-2010-q42",
    year: 2010,
    text: "Which of the following organic compounds is very soluble in water?",
    options: [
      { id: "opt1", text: "CH₃COOH" },
      { id: "opt2", text: "C₂H₂" },
      { id: "opt3", text: "C₂H₄" },
      { id: "opt4", text: "CH₃COOC₂H₅" },
    ],
    correctOptionId: "opt1",
  },
  {
    id: "jamb-chem-2010-q43",
    year: 2010,
    text: "Benzene reacts with hydrogen in the presence of nickel catalyst at 180°C to give",
    options: [
      { id: "opt1", text: "xylene" },
      { id: "opt2", text: "toluene" },
      { id: "opt3", text: "cyclopentane" },
      { id: "opt4", text: "cyclohexane" },
    ],
    correctOptionId: "opt4",
  },
  {
    id: "jamb-chem-2010-q44",
    year: 2010,
    text: "Which of the following is used to hasten the ripening of fruit?",
    options: [
      { id: "opt1", text: "Ethene" },
      { id: "opt2", text: "Ethanol" },
      { id: "opt3", text: "Ethyne" },
      { id: "opt4", text: "Ethane" },
    ],
    correctOptionId: "opt1",
  },
  {
    id: "jamb-chem-2010-q45",
    year: 2010,
    text: "The final products of the reaction between methane and chlorine in the presence of ultraviolet light are hydrogen chloride and",
    options: [
      { id: "opt1", text: "trichloromethane" },
      { id: "opt2", text: "dichloromethane" },
      { id: "opt3", text: "tetrachloromethane" },
      { id: "opt4", text: "chloromethane" },
    ],
    correctOptionId: "opt3",
  },
  {
    id: "jamb-chem-2010-q46",
    year: 2010,
    text: "The correct order of increasing boiling points of the following compounds C₃H₇OH, C₇H₁₆ and C₄H₁₀ is",
    options: [
      { id: "opt1", text: "C₃H₇OH → C₄H₁₀ → C₇H₁₆" },
      { id: "opt2", text: "C₄H₁₀ → C₇H₁₆ → C₃H₇OH" },
      { id: "opt3", text: "C₇H₁₆ → C₃H₇OH → C₄H₁₀" },
      { id: "opt4", text: "C₄H₁₀ → C₃H₇OH → C₇H₁₆" },
    ],
    correctOptionId: "opt4",
  },
  {
    id: "jamb-chem-2010-q47",
    year: 2010,
    text: "One of the major uses of alkane is",
    options: [
      { id: "opt1", text: "as domestic and industrial fuel" },
      { id: "opt2", text: "in the hydrogenation of oils" },
      { id: "opt3", text: "in the textile industries" },
      { id: "opt4", text: "in the production of plastics" },
    ],
    correctOptionId: "opt1",
  },
  {
    id: "jamb-chem-2010-q48",
    year: 2010,
    text: "The haloalkanes used in dry-cleaning industries are",
    options: [
      { id: "opt1", text: "trichloromethane and tetrachloromethane" },
      { id: "opt2", text: "chloroethene and dichloroethene" },
      { id: "opt3", text: "trichloroethene and tetrachloroethene" },
      { id: "opt4", text: "chloroethane and dichloroethane" },
    ],
    correctOptionId: "opt1",
  },
  {
    id: "jamb-chem-2010-q49",
    year: 2010,
    text: "Two hydrocarbons X and Y were treated with bromine water. X decolorized the solution and Y did not. Which class of compound does Y belong?",
    options: [
      { id: "opt1", text: "Benzene" },
      { id: "opt2", text: "Alkynes" },
      { id: "opt3", text: "Alkenes" },
      { id: "opt4", text: "Alkanes" },
    ],
    correctOptionId: "opt4",
  },
  {
    id: "jamb-chem-2010-q50",
    year: 2010,
    text: "The compound that is used as an anaesthetic is",
    options: [
      { id: "opt1", text: "CCl₄" },
      { id: "opt2", text: "CHCl₃" },
      { id: "opt3", text: "CH₂Cl₂" },
      { id: "opt4", text: "CH₃Cl" },
    ],
    correctOptionId: "opt2",
  }
];

const jambChemistry2011: Question[] = [
  {
    id: "jamb-chem-2011-q1",
    year: 2011,
    text: "Which question Paper Type of Chemistry is given to you?",
    options: [
      { id: "opt1", text: "Type A" },
      { id: "opt2", text: "Type B" },
      { id: "opt3", text: "Type C" },
      { id: "opt4", text: "Type D" },
    ],
    correctOptionId: "opt2",
  },
  {
    id: "jamb-chem-2011-q2",
    year: 2011,
    text: "What is the concentration of a solution containing 2g of NaOH in 100 cm³ of solution? [Na = 23, O = 16, H = 1]",
    options: [
      { id: "opt1", text: "0.40 mol dm⁻³" },
      { id: "opt2", text: "0.50 mol dm⁻³" },
      { id: "opt3", text: "0.05 mol dm⁻³" },
      { id: "opt4", text: "0.30 mol dm⁻³" },
    ],
    correctOptionId: "opt2",
  },
  {
    id: "jamb-chem-2011-q3",
    year: 2011,
    text: "Which of the following properties is NOT peculiar to matter?",
    options: [
      { id: "opt1", text: "kinetic energy of particles increases from solid to gas" },
      { id: "opt2", text: "Random motion of particles increases from liquid to gas" },
      { id: "opt3", text: "Orderliness of particles increases from gas to liquid" },
      { id: "opt4", text: "Random motion of particles increases from gas to solid" },
    ],
    correctOptionId: "opt4",
  },
  {
    id: "jamb-chem-2011-q4",
    year: 2011,
    text: "The principle of column chromatography is based on the ability of the constituents to",
    options: [
      { id: "opt1", text: "move at different speeds in the column" },
      { id: "opt2", text: "dissolve in each other in the column" },
      { id: "opt3", text: "react with the solvent in the column" },
      { id: "opt4", text: "react with each other in the column" },
    ],
    correctOptionId: "opt1",
  },
  {
    id: "jamb-chem-2011-q5",
    year: 2011,
    text: "From the diagram above, an ideal gas can be represented by",
    options: [
      { id: "opt1", text: "M" },
      { id: "opt2", text: "N" },
      { id: "opt3", text: "K" },
      { id: "opt4", text: "L" },
    ],
    correctOptionId: "opt2",
  },
  {
    id: "jamb-chem-2011-q6",
    year: 2011,
    text: "Which of the following questions is correct about the periodic table?",
    options: [
      { id: "opt1", text: "The non-metallic properties of the elements tend to decrease across each period" },
      { id: "opt2", text: "The valence electrons of the elements increase progressively across the period" },
      { id: "opt3", text: "Elements in the same group have the same number of electron shells" },
      { id: "opt4", text: "Elements in the same period have the number of valence electrons" },
    ],
    correctOptionId: "opt2",
  },
  {
    id: "jamb-chem-2011-q7",
    year: 2011,
    text: "The relative atomic mass of a naturally occurring lithium consisting of 90% Li and 10% Li is",
    options: [
      { id: "opt1", text: "6.9" },
      { id: "opt2", text: "7.1" },
      { id: "opt3", text: "6.2" },
      { id: "opt4", text: "6.8" },
    ],
    correctOptionId: "opt1",
  },
  {
    id: "jamb-chem-2011-q8",
    year: 2011,
    text: "An isotope has an atomic number of 15 and a mass number of 31. The number of protons it contain is",
    options: [
      { id: "opt1", text: "16" },
      { id: "opt2", text: "15" },
      { id: "opt3", text: "46" },
      { id: "opt4", text: "31" },
    ],
    correctOptionId: "opt2",
  },
  {
    id: "jamb-chem-2011-q9",
    year: 2011,
    text: "The molecular lattice of iodine is held together by",
    options: [
      { id: "opt1", text: "dative bond" },
      { id: "opt2", text: "metallic bond" },
      { id: "opt3", text: "hydrogen bond" },
      { id: "opt4", text: "van der Waal's forces" },
    ],
    correctOptionId: "opt4",
  },
  {
    id: "jamb-chem-2011-q10",
    year: 2011,
    text: "The arrangement of particles in crystal lattices can be studied using",
    options: [
      { id: "opt1", text: "X - rays" },
      { id: "opt2", text: "Y - rays" },
      { id: "opt3", text: "α - rays" },
      { id: "opt4", text: "β - rays" },
    ],
    correctOptionId: "opt1",
  },
  {
    id: "jamb-chem-2011-q11",
    year: 2011,
    text: "From the diagram above, find the amount of solute deposited when 200 cm³ of the solution is cooled from 55°C to 40°C",
    options: [
      { id: "opt1", text: "0.10 mole" },
      { id: "opt2", text: "0.20mole" },
      { id: "opt3", text: "0.01 mole" },
      { id: "opt4", text: "0.02 mole" },
    ],
    correctOptionId: "opt2",
  },
  {
    id: "jamb-chem-2011-q12",
    year: 2011,
    text: "The importance of sodium aluminate (III) in the treatment of water is to",
    options: [
      { id: "opt1", text: "cause coagulation" },
      { id: "opt2", text: "neutralize acidity" },
      { id: "opt3", text: "prevent goitre and tooth decay" },
      { id: "opt4", text: "kill germs" },
    ],
    correctOptionId: "opt1",
  },
  {
    id: "jamb-chem-2011-q13",
    year: 2011,
    text: "What type of bond exits between an element X with atomic number 12 and Y with atomic number 17?",
    options: [
      { id: "opt1", text: "Electrovalent" },
      { id: "opt2", text: "Metallic" },
      { id: "opt3", text: "Covalent" },
      { id: "opt4", text: "Dative" },
    ],
    correctOptionId: "opt1",
  },
  {
    id: "jamb-chem-2011-q14",
    year: 2011,
    text: "Hardness of water is mainly due to the presence of",
    options: [
      { id: "opt1", text: "calcium hydroxide or magnesium hydroxide" },
      { id: "opt2", text: "calcium trioxocarbonate (IV) or calcium tetraoxosulphate (VI)" },
      { id: "opt3", text: "sodium hydroxide or magnesium Hydroxide" },
      { id: "opt4", text: "calcium chloride or sodium chloride salts" },
    ],
    correctOptionId: "opt2",
  },
  {
    id: "jamb-chem-2011-q15",
    year: 2011,
    text: "A suitable solvent for iodine and nephthalene is",
    options: [
      { id: "opt1", text: "carbon (IV) sulphide" },
      { id: "opt2", text: "ethanol" },
      { id: "opt3", text: "water" },
      { id: "opt4", text: "benzene" },
    ],
    correctOptionId: "opt2",
  },
  {
    id: "jamb-chem-2011-q16",
    year: 2011,
    text: "Which of the following noble gases is commonly found in the atmosphere?",
    options: [
      { id: "opt1", text: "Xenon" },
      { id: "opt2", text: "Neon" },
      { id: "opt3", text: "Helium" },
      { id: "opt4", text: "Argon" },
    ],
    correctOptionId: "opt4",
  },
  {
    id: "jamb-chem-2011-q17",
    year: 2011,
    text: "N₂O₄(g) ⇌ 2NO₂(g) ΔH = +ve. In the reaction above, an increase in temperature will",
    options: [
      { id: "opt1", text: "increase the value of the equilibrium constant" },
      { id: "opt2", text: "decreases the value of the equilibrium constant" },
      { id: "opt3", text: "increase in the reactant production" },
      { id: "opt4", text: "shift the equilibrium to the left" },
    ],
    correctOptionId: "opt1",
  },
  {
    id: "jamb-chem-2011-q18",
    year: 2011,
    text: "CH₃COOH(aq) + OH⁻(aq) ⇌ CH₃COO⁻(aq) + H₂O(l). In the reaction above, CH₃COO⁻(aq) is",
    options: [
      { id: "opt1", text: "conjugate base" },
      { id: "opt2", text: "acid" },
      { id: "opt3", text: "base" },
      { id: "opt4", text: "conjugate acid" },
    ],
    correctOptionId: "opt1",
  },
  {
    id: "jamb-chem-2011-q19",
    year: 2011,
    text: "How many cations will be produced from a solution of potassium aluminium tetraoxosulphate (VI)?",
    options: [
      { id: "opt1", text: "3" },
      { id: "opt2", text: "4" },
      { id: "opt3", text: "1" },
      { id: "opt4", text: "2" },
    ],
    correctOptionId: "opt4",
  },
  {
    id: "jamb-chem-2011-q20",
    year: 2011,
    text: "Which of the following is NOT an alkali?",
    options: [
      { id: "opt1", text: "NH₃" },
      { id: "opt2", text: "Mg(OH)₂" },
      { id: "opt3", text: "Ca(OH)₂" },
      { id: "opt4", text: "NaOH" },
    ],
    correctOptionId: "opt1",
  },
  {
    id: "jamb-chem-2011-q21",
    year: 2011,
    text: "An effect of thermal pollution on water bodies is that the",
    options: [
      { id: "opt1", text: "volume of water reduces" },
      { id: "opt2", text: "volume of chemical waste increase" },
      { id: "opt3", text: "level of oxides of nitrogen increase" },
      { id: "opt4", text: "level of oxygen reduces" },
    ],
    correctOptionId: "opt4",
  },
  {
    id: "jamb-chem-2011-q22",
    year: 2011,
    text: "Which of the following is a deliquescent compound?",
    options: [
      { id: "opt1", text: "Na₂CO₃" },
      { id: "opt2", text: "CaCl₂" },
      { id: "opt3", text: "CuO" },
      { id: "opt4", text: "Na₂CO₃.10H₂O" },
    ],
    correctOptionId: "opt2",
  },
  {
    id: "jamb-chem-2011-q23",
    year: 2011,
    text: "A chemical reaction which the hydration energy is greater than the lattice energy is referred to as",
    options: [
      { id: "opt1", text: "a spontaneous reaction" },
      { id: "opt2", text: "an endothermic reaction" },
      { id: "opt3", text: "an exothermic reaction" },
      { id: "opt4", text: "a reversible reaction" },
    ],
    correctOptionId: "opt3",
  },
  {
    id: "jamb-chem-2011-q24",
    year: 2011,
    text: "The function of zinc electrode in a galvanic cell is that it",
    options: [
      { id: "opt1", text: "undergoes reduction" },
      { id: "opt2", text: "serves as the positive electrode" },
      { id: "opt3", text: "production electrons" },
      { id: "opt4", text: "uses up electrons" },
    ],
    correctOptionId: "opt3",
  },
  {
    id: "jamb-chem-2011-q25",
    year: 2011,
    text: "CH₄(g) + Cl₂(g) → CH₃Cl(s) + HCl(g). The major factor that influence the rate of the reaction above is",
    options: [
      { id: "opt1", text: "catalyst" },
      { id: "opt2", text: "temperature" },
      { id: "opt3", text: "concentration" },
      { id: "opt4", text: "light" },
    ],
    correctOptionId: "opt4",
  },
  {
    id: "jamb-chem-2011-q26",
    year: 2011,
    text: "The condition required for corrosion to take place is the presence of",
    options: [
      { id: "opt1", text: "water and carbon (IV) oxide" },
      { id: "opt2", text: "water, carbon (IV) oxide and oxygen" },
      { id: "opt3", text: "oxygen and carbon (IV) oxide" },
      { id: "opt4", text: "water and oxygen" },
    ],
    correctOptionId: "opt4",
  },
  {
    id: "jamb-chem-2011-q27",
    year: 2011,
    text: "In the diagram above, X is the",
    options: [
      { id: "opt1", text: "enthalpy" },
      { id: "opt2", text: "enthalpy change" },
      { id: "opt3", text: "activation energy" },
      { id: "opt4", text: "activated complex" },
    ],
    correctOptionId: "opt2",
  },
  {
    id: "jamb-chem-2011-q28",
    year: 2011,
    text: "The diagram below best illustrates the effect of decrease in",
    options: [
      { id: "opt1", text: "concentration" },
      { id: "opt2", text: "temperature" },
      { id: "opt3", text: "surface area" },
      { id: "opt4", text: "pressure" },
    ],
    correctOptionId: "opt1",
  },
  {
    id: "jamb-chem-2011-q29",
    year: 2011,
    text: "MnO₄⁻(aq) + Y + 5Fe²⁺(aq) → Mn²⁺(aq) + 5Fe³⁺(aq) + 4H₂O(l). In the equation above, Y is",
    options: [
      { id: "opt1", text: "5H⁺(aq)" },
      { id: "opt2", text: "4H⁺(aq)" },
      { id: "opt3", text: "10H⁺(aq)" },
      { id: "opt4", text: "8H⁺(aq)" },
    ],
    correctOptionId: "opt1",
  },
  {
    id: "jamb-chem-2011-q30",
    year: 2011,
    text: "Given that M is the mass of a substance deposited during electrolysis and Q is the quantity of electricity consumed, then Faraday's first law can be written as",
    options: [
      { id: "opt1", text: "M = E/Q" },
      { id: "opt2", text: "M = EQ" },
      { id: "opt3", text: "M = Q/E" },
      { id: "opt4", text: "M = E/2Q" },
    ],
    correctOptionId: "opt2",
  },
  {
    id: "jamb-chem-2011-q31",
    year: 2011,
    text: "The impurities formed during the laboratory preparation of chlorine gas are removed by",
    options: [
      { id: "opt1", text: "H₂O" },
      { id: "opt2", text: "NH₃" },
      { id: "opt3", text: "H₂SO₄" },
      { id: "opt4", text: "HCl" },
    ],
    correctOptionId: "opt1",
  },
  {
    id: "jamb-chem-2011-q32",
    year: 2011,
    text: "The effect of the presence of impurities such as carbon and sulphur on iron is that they",
    options: [
      { id: "opt1", text: "give it high tensile strength" },
      { id: "opt2", text: "make it malleable and ductile" },
      { id: "opt3", text: "increase its melting point" },
      { id: "opt4", text: "lower its melting point" },
    ],
    correctOptionId: "opt4",
  },
  {
    id: "jamb-chem-2011-q33",
    year: 2011,
    text: "A few drops of concentrated HNO₃ is added to an unknown solution and boiled for a while. If this produces a brown solution, the cation presents are likely to be",
    options: [
      { id: "opt1", text: "Pb²⁺" },
      { id: "opt2", text: "Cu²⁺" },
      { id: "opt3", text: "Fe³⁺" },
      { id: "opt4", text: "Fe²⁺" },
    ],
    correctOptionId: "opt4",
  },
  {
    id: "jamb-chem-2011-q34",
    year: 2011,
    text: "The bleaching action of chlorine gas is effective due to the presence of",
    options: [
      { id: "opt1", text: "hydrogen chloride" },
      { id: "opt2", text: "water" },
      { id: "opt3", text: "air" },
      { id: "opt4", text: "oxygen" },
    ],
    correctOptionId: "opt2",
  },
  {
    id: "jamb-chem-2011-q35",
    year: 2011,
    text: "In the laboratory preparation of oxygen, dried oxygen is usually collected over",
    options: [
      { id: "opt1", text: "hydrochloric acid" },
      { id: "opt2", text: "mercury" },
      { id: "opt3", text: "calcium chloride" },
      { id: "opt4", text: "tetraoxosulphate (VI) acid" },
    ],
    correctOptionId: "opt4",
  },
  {
    id: "jamb-chem-2011-q36",
    year: 2011,
    text: "The property of concentrated H₂SO₄ that makes it suitable for preparing HNO₃ is its",
    options: [
      { id: "opt1", text: "boiling point" },
      { id: "opt2", text: "density" },
      { id: "opt3", text: "oxidizing properties" },
      { id: "opt4", text: "dehydrating properties" },
    ],
    correctOptionId: "opt3",
  },
  {
    id: "jamb-chem-2011-q37",
    year: 2011,
    text: "Bronze is preferred to copper in the making of medals because it",
    options: [
      { id: "opt1", text: "is stronger" },
      { id: "opt2", text: "can withstand low temperature" },
      { id: "opt3", text: "is lighter" },
      { id: "opt4", text: "has low tensile strength" },
    ],
    correctOptionId: "opt3",
  },
  {
    id: "jamb-chem-2011-q38",
    year: 2011,
    text: "The constituents of baking powder that makes the dough to rise is",
    options: [
      { id: "opt1", text: "NaHCO₃" },
      { id: "opt2", text: "NaOH" },
      { id: "opt3", text: "Na₂CO₃" },
      { id: "opt4", text: "NaCl" },
    ],
    correctOptionId: "opt1",
  },
  {
    id: "jamb-chem-2011-q39",
    year: 2011,
    text: "Which of the following compound is used as a gaseous fuel?",
    options: [
      { id: "opt1", text: "CH₃-C≡CH" },
      { id: "opt2", text: "CH₃-CH₂-CH₃" },
      { id: "opt3", text: "CH₃-CH₂-CH₂-COOH" },
      { id: "opt4", text: "CH₃-CH₂-CH₂-CH₃" },
    ],
    correctOptionId: "opt4",
  },
  {
    id: "jamb-chem-2011-q40",
    year: 2011,
    text: "The ability of carbon to form long chains is referred to as",
    options: [
      { id: "opt1", text: "alkylation" },
      { id: "opt2", text: "acylation" },
      { id: "opt3", text: "catenation" },
      { id: "opt4", text: "carbonation" },
    ],
    correctOptionId: "opt3",
  },
  {
    id: "jamb-chem-2011-q41",
    year: 2011,
    text: "Which of the following compounds will undergo polymerization reaction?",
    options: [
      { id: "opt1", text: "C₂H₄" },
      { id: "opt2", text: "C₂H₅COOH" },
      { id: "opt3", text: "C₂H₆" },
      { id: "opt4", text: "C₂H₅OH" },
    ],
    correctOptionId: "opt1",
  },
  {
    id: "jamb-chem-2011-q42",
    year: 2011,
    text: "The compound above exhibits",
    options: [
      { id: "opt1", text: "geometric isomerism" },
      { id: "opt2", text: "optical isomerism" },
      { id: "opt3", text: "structural isomerism" },
      { id: "opt4", text: "positional isomerism" },
    ],
    correctOptionId: "opt2",
  },
  {
    id: "jamb-chem-2011-q43",
    year: 2011,
    text: "An organic compound has an empirical formula CH₂O and vapour density of 45. What is the molecular formula? [C = 12, H = 1, O = 16]",
    options: [
      { id: "opt1", text: "C₃H₇OH" },
      { id: "opt2", text: "C₂H₅OH" },
      { id: "opt3", text: "C₃H₆O₃" },
      { id: "opt4", text: "C₂H₄O₂" },
    ],
    correctOptionId: "opt3",
  },
  {
    id: "jamb-chem-2011-q44",
    year: 2011,
    text: "C₆H₁₂O₆ → 2C₂H₅OH + 2CO₂ + energy. The reaction above represented by the equation above is useful in the production of",
    options: [
      { id: "opt1", text: "propanol" },
      { id: "opt2", text: "butanol" },
      { id: "opt3", text: "methanol" },
      { id: "opt4", text: "ethanol" },
    ],
    correctOptionId: "opt4",
  },
  {
    id: "jamb-chem-2011-q45",
    year: 2011,
    text: "The number of isomers that can be obtained from C₄H₁₀ is",
    options: [
      { id: "opt1", text: "3" },
      { id: "opt2", text: "4" },
      { id: "opt3", text: "1" },
      { id: "opt4", text: "2" },
    ],
    correctOptionId: "opt4",
  },
  {
    id: "jamb-chem-2011-q46",
    year: 2011,
    text: "The functional groups present in the compound above are",
    options: [
      { id: "opt1", text: "alkene and halo-group" },
      { id: "opt2", text: "hydroxyl and chloro-group" },
      { id: "opt3", text: "alkene and chloro-group" },
      { id: "opt4", text: "hydroxyl and halo-group" },
    ],
    correctOptionId: "opt2",
  },
  {
    id: "jamb-chem-2011-q47",
    year: 2011,
    text: "Which of the following is a primary amine?",
    options: [
      { id: "opt1", text: "A" },
      { id: "opt2", text: "B" },
      { id: "opt3", text: "C" },
      { id: "opt4", text: "D" },
    ],
    correctOptionId: "opt2",
  },
  {
    id: "jamb-chem-2011-q48",
    year: 2011,
    text: "Two organic compounds K and L were treated with a few drops of Fehling's solutions respectively. K formed a brick red precipitate while L remains unaffected. The compound K is an",
    options: [
      { id: "opt1", text: "alkanol" },
      { id: "opt2", text: "alkane" },
      { id: "opt3", text: "alkanal" },
      { id: "opt4", text: "alkanone" },
    ],
    correctOptionId: "opt3",
  },
  {
    id: "jamb-chem-2011-q49",
    year: 2011,
    text: "Which of the following statements is true about 2-methylpropane and butane",
    options: [
      { id: "opt1", text: "They are members of the same homologous series" },
      { id: "opt2", text: "They have the same boiling point" },
      { id: "opt3", text: "They have different number of carbon atoms" },
      { id: "opt4", text: "They have the same chemical properties" },
    ],
    correctOptionId: "opt1",
  },
  {
    id: "jamb-chem-2011-q50",
    year: 2011,
    text: "CH₃COOH + C₂H₅OH → CH₃COOC₂H₅ + H₂O. The reaction above is best described as",
    options: [
      { id: "opt1", text: "esterification" },
      { id: "opt2", text: "Condensation" },
      { id: "opt3", text: "saponification" },
      { id: "opt4", text: "neutralization" },
    ],
    correctOptionId: "opt1",
  },
];

const jambChemistry2012: Question[] = [
  {
    id: "jamb-chem-2012-q1",
    year: 2012,
    text: "Which Question Paper Type of Chemistry is given to you?",
    options: [
      { id: "opt1", text: "Type Green" },
      { id: "opt2", text: "Type Purple" },
      { id: "opt3", text: "Type Red" },
      { id: "opt4", text: "Type Yellow" },
    ],
    correctOptionId: "opt3",
  },
  {
    id: "jamb-chem-2012-q2",
    year: 2012,
    text: "Which of the following methods can be used to obtain pure water from a mixture of sand, water and methanoic acid?",
    options: [
      { id: "opt1", text: "neutralization with NaOH followed by filtration" },
      { id: "opt2", text: "neutralization with NaOH followed by distillation" },
      { id: "opt3", text: "fractional distillation" },
      { id: "opt4", text: "filtration followed by distillation" },
    ],
    correctOptionId: "opt4",
  },
  {
    id: "jamb-chem-2012-q3",
    year: 2012,
    text: "How many atoms are present in 6.0g of magnesium? [Mg = 24, NA = 6.02 × 10²³ mol⁻¹]",
    options: [
      { id: "opt1", text: "1.20 × 10²²" },
      { id: "opt2", text: "2.41 × 10²²" },
      { id: "opt3", text: "1.51 × 10²³" },
      { id: "opt4", text: "3.02 × 10²³" },
    ],
    correctOptionId: "opt3",
  },
  {
    id: "jamb-chem-2012-q4",
    year: 2012,
    text: "50 cm³ of gas was collected over water at 10°C and 765 mm Hg. Calculate the volume of the gas at s.t.p. if the saturated vapour pressure of water at 10°C is 5mm Hg",
    options: [
      { id: "opt1", text: "49.19 cm³" },
      { id: "opt2", text: "48.87 cm³" },
      { id: "opt3", text: "48.55 cm³" },
      { id: "opt4", text: "48.23 cm³" },
    ],
    correctOptionId: "opt4",
  },
  {
    id: "jamb-chem-2012-q5",
    year: 2012,
    text: "An increase in the pressure exerted on gas at a constant temperature results in",
    options: [
      { id: "opt1", text: "a decrease in the number of effective collisions" },
      { id: "opt2", text: "a decrease in volume" },
      { id: "opt3", text: "an increase in the average intermolecular distance" },
      { id: "opt4", text: "an increase in volume" },
    ],
    correctOptionId: "opt2",
  },
  {
    id: "jamb-chem-2012-q6",
    year: 2012,
    text: "In the reaction 2H₂(g) + O₂(g) → 2H₂O(g), what volume of hydrogen would be left over when 300 cm³ of oxygen and 1000 cm³ of hydrogen are exploded in a sealed tube?",
    options: [
      { id: "opt1", text: "200 cm³" },
      { id: "opt2", text: "400 cm³" },
      { id: "opt3", text: "600 cm³" },
      { id: "opt4", text: "700 cm³" },
    ],
    correctOptionId: "opt2",
  },
  {
    id: "jamb-chem-2012-q7",
    year: 2012,
    text: "Which of the following can correctly be listed as evidences for the particulate nature of matter? I. Evaporation II. Sublimation III. Diffusion IV. Brownian motion",
    options: [
      { id: "opt1", text: "I and III only" },
      { id: "opt2", text: "II and IV only" },
      { id: "opt3", text: "I, II and III only" },
      { id: "opt4", text: "I, II, III and IV" },
    ],
    correctOptionId: "opt4",
  },
  {
    id: "jamb-chem-2012-q8",
    year: 2012,
    text: "If the elements X and Y have atomic numbers 11 and 17 respectively, what type of bond can they form?",
    options: [
      { id: "opt1", text: "Dative" },
      { id: "opt2", text: "Covalent" },
      { id: "opt3", text: "Ionic" },
      { id: "opt4", text: "Metallic" },
    ],
    correctOptionId: "opt3",
  },
  {
    id: "jamb-chem-2012-q9",
    year: 2012,
    text: "A hydrogen atom which has lost an electron contains",
    options: [
      { id: "opt1", text: "one proton only" },
      { id: "opt2", text: "one neutron only" },
      { id: "opt3", text: "one proton and one neutron" },
      { id: "opt4", text: "one proton, one electron and one neutron" },
    ],
    correctOptionId: "opt3",
  },
  {
    id: "jamb-chem-2012-q10",
    year: 2012,
    text: "The electronic configuration of Mg²⁺ is",
    options: [
      { id: "opt1", text: "1s² 2s² 2p⁶ 3s² 3p²" },
      { id: "opt2", text: "1s² 2s² 2p⁶ 3s²" },
      { id: "opt3", text: "1s² 2s² 2p⁶" },
      { id: "opt4", text: "1s² 2s² 2p⁴" },
    ],
    correctOptionId: "opt3",
  },
  {
    id: "jamb-chem-2012-q11",
    year: 2012,
    text: "Group VII elements are",
    options: [
      { id: "opt1", text: "monoatomic" },
      { id: "opt2", text: "good oxidizing agents" },
      { id: "opt3", text: "highly electropositive" },
      { id: "opt4", text: "electron donors" },
    ],
    correctOptionId: "opt2",
  },
  {
    id: "jamb-chem-2012-q12",
    year: 2012,
    text: "Which of the following is used to study the arrangement of particles in crystal lattices?",
    options: [
      { id: "opt1", text: "Alpha-particles" },
      { id: "opt2", text: "Beta-particles" },
      { id: "opt3", text: "Gamma-rays" },
      { id: "opt4", text: "X-rays" },
    ],
    correctOptionId: "opt4",
  },
  {
    id: "jamb-chem-2012-q13",
    year: 2012,
    text: "Which of the following shows that air is a mixture? I. It has a varied composition from one place to another. II. Its constituents can be separated by physical means III. It contains unreactive noble gases",
    options: [
      { id: "opt1", text: "I and II only" },
      { id: "opt2", text: "II and III only" },
      { id: "opt3", text: "I and III only" },
      { id: "opt4", text: "I, II and III" },
    ],
    correctOptionId: "opt1",
  },
  {
    id: "jamb-chem-2012-q14",
    year: 2012,
    text: "The chemicals used to soften hard water involves the addition of",
    options: [
      { id: "opt1", text: "insoluble sodium compounds which form soluble solutions of calcium and magnesium ions" },
      { id: "opt2", text: "soluble sodium compounds which form soluble solutions of calcium and magnesium ions" },
      { id: "opt3", text: "soluble sodium compounds which form insoluble precipitates of calcium and magnesium ions" },
      { id: "opt4", text: "insoluble precipitates of calcium and magnesium ions" },
    ],
    correctOptionId: "opt3",
  },
  {
    id: "jamb-chem-2012-q15",
    year: 2012,
    text: "Chlorination of water for town supply is carried out to",
    options: [
      { id: "opt1", text: "make the water colourless" },
      { id: "opt2", text: "remove germs from the water" },
      { id: "opt3", text: "make the water tasteful" },
      { id: "opt4", text: "remove odour from the water" },
    ],
    correctOptionId: "opt2",
  },
  {
    id: "jamb-chem-2012-q16",
    year: 2012,
    text: "The solubilities of different solutes in a given solvent can be compared by",
    options: [
      { id: "opt1", text: "plotting their solubility curves on separate axes" },
      { id: "opt2", text: "plotting their solubility curves on the same axes" },
      { id: "opt3", text: "plotting some of the solubility curves on the x-axis and others on the y-axis" },
      { id: "opt4", text: "plotting their solubility curves on the x-axis only" },
    ],
    correctOptionId: "opt2",
  },
  {
    id: "jamb-chem-2012-q17",
    year: 2012,
    text: "Potassium trioxochlorate (V) has a solubility of 1.5 mol/dm³ at 45°C. On cooling this solution to a temperature of 20°C, the solubility was found to be 0.5 mol/dm³. What mass of KClO₃ was crystallized out? [K = 39, Cl = 35.5, O = 16]",
    options: [
      { id: "opt1", text: "1.00g" },
      { id: "opt2", text: "10.00g" },
      { id: "opt3", text: "12.25g" },
      { id: "opt4", text: "122.50g" },
    ],
    correctOptionId: "opt4",
  },
  {
    id: "jamb-chem-2012-q18",
    year: 2012,
    text: "Which of the following pollutants is associated with brain damage?",
    options: [
      { id: "opt1", text: "Carbon (II) oxide" },
      { id: "opt2", text: "Radioactive fallout" },
      { id: "opt3", text: "Biodegradable waste" },
      { id: "opt4", text: "Sulphur (IV) oxide" },
    ],
    correctOptionId: "opt2",
  },
  {
    id: "jamb-chem-2012-q19",
    year: 2012,
    text: "Which of the following will produce a solution with pH less than 7 at equivalent point?",
    options: [
      { id: "opt1", text: "HNO₃ + NaOH" },
      { id: "opt2", text: "H₂SO₄ + KOH" },
      { id: "opt3", text: "HCl + Mg(OH)₂" },
      { id: "opt4", text: "HNO₃ + KOH" },
    ],
    correctOptionId: "opt3",
  },
  {
    id: "jamb-chem-2012-q20",
    year: 2012,
    text: "The number of hydroxonium ions produced by one molecule of an acid in aqueous solution is its",
    options: [
      { id: "opt1", text: "basicity" },
      { id: "opt2", text: "acid strength" },
      { id: "opt3", text: "pH" },
      { id: "opt4", text: "concentration" },
    ],
    correctOptionId: "opt2",
  },
  {
    id: "jamb-chem-2012-q21",
    year: 2012,
    text: "During a titration experiment, 0.05 moles of carbon (IV) oxide is liberated. What is the volume of gas liberated?",
    options: [
      { id: "opt1", text: "22.40 dm³" },
      { id: "opt2", text: "11.20 dm³" },
      { id: "opt3", text: "2.24 dm³" },
      { id: "opt4", text: "1.12 dm³" },
    ],
    correctOptionId: "opt4",
  },
  {
    id: "jamb-chem-2012-q22",
    year: 2012,
    text: "A major factor considered in selecting a suitable method for preparing a simple salt is its",
    options: [
      { id: "opt1", text: "Crystalline form" },
      { id: "opt2", text: "melting point" },
      { id: "opt3", text: "reactivity with dilute acids" },
      { id: "opt4", text: "solubility in water" },
    ],
    correctOptionId: "opt4",
  },
  {
    id: "jamb-chem-2012-q23",
    year: 2012,
    text: "The oxidation number of boron in NaBH₄ is",
    options: [
      { id: "opt1", text: "-3" },
      { id: "opt2", text: "-1" },
      { id: "opt3", text: "+1" },
      { id: "opt4", text: "+3" },
    ],
    correctOptionId: "opt4",
  },
  {
    id: "jamb-chem-2012-q24",
    year: 2012,
    text: "2Na₂O₂(s) + 2H₂O(l) → 4NaOH(s) + O₂(s). The substance that is oxidized in the reaction above is",
    options: [
      { id: "opt1", text: "2NaO₂(s)" },
      { id: "opt2", text: "NaOH(aq)" },
      { id: "opt3", text: "H₂O(l)" },
      { id: "opt4", text: "O₂(g)" },
    ],
    correctOptionId: "opt1",
  },
  {
    id: "jamb-chem-2012-q25",
    year: 2012,
    text: "What number of moles of Cu²⁺ will be deposited by 360 coulombs of electricity? [F = 96500 C mol⁻¹]",
    options: [
      { id: "opt1", text: "5.36 × 10⁻⁴ mole" },
      { id: "opt2", text: "1.87 × 10⁻³ mole" },
      { id: "opt3", text: "9.35 × 10⁻⁴ mole" },
      { id: "opt4", text: "3.73 × 10⁻³ mole" },
    ],
    correctOptionId: "opt2",
  },
  {
    id: "jamb-chem-2012-q26",
    year: 2012,
    text: "A metal M displaces zinc from ZnCl₂ solution. This shows that",
    options: [
      { id: "opt1", text: "electrons flow from zinc to M" },
      { id: "opt2", text: "M is more electronegative than zinc" },
      { id: "opt3", text: "M is more electronegative than zinc" },
      { id: "opt4", text: "zinc is more electronegative than M" },
    ],
    correctOptionId: "opt2",
  },
  {
    id: "jamb-chem-2012-q27",
    year: 2012,
    text: "CO(g) + H₂O(g) → CO₂(g) + H₂(g). Calculate the standard heat change of the reaction above, if the standard enthalpies of formation of CO₂(g), H₂O(g) and CO(g) in kJ mol⁻¹ are -394, -242 and -110 respectively.",
    options: [
      { id: "opt1", text: "+ 262 kJ mol⁻¹" },
      { id: "opt2", text: "- 262 kJ mol⁻¹" },
      { id: "opt3", text: "+ 42 kJ mol⁻¹" },
      { id: "opt4", text: "- 42 kJ mol⁻¹" },
    ],
    correctOptionId: "opt3",
  },
  {
    id: "jamb-chem-2012-q28",
    year: 2012,
    text: "An increase in entropy can best be illustrated by",
    options: [
      { id: "opt1", text: "mixing of gases" },
      { id: "opt2", text: "freezing of water" },
      { id: "opt3", text: "the condensation of vapour" },
      { id: "opt4", text: "solidifying candle wax" },
    ],
    correctOptionId: "opt1",
  },
  {
    id: "jamb-chem-2012-q29",
    year: 2012,
    text: "The highest rate of production of carbon (IV) oxide can be achieved using",
    options: [
      { id: "opt1", text: "0.05 mol⁻³ HCl and 5g powdered CaCO₃" },
      { id: "opt2", text: "0.05 mol⁻³ HCl and 5g lump CaCO₃" },
      { id: "opt3", text: "0.10 mol⁻³ HCl and 5g powdered CaCO₃" },
      { id: "opt4", text: "0.025 mol⁻³ HCl and 5g powdered CaCO₃" },
    ],
    correctOptionId: "opt3",
  },
  {
    id: "jamb-chem-2012-q30",
    year: 2012,
    text: "From the reaction 2HCl(aq) + CaCO₃(s) → CaCl₂(s) + CO₂(g) + H₂O(l), which of the curves represents the production of CO₂ gas as dilute HCl is added?",
    options: [
      { id: "opt1", text: "L" },
      { id: "opt2", text: "M" },
      { id: "opt3", text: "N" },
      { id: "opt4", text: "P" },
    ],
    correctOptionId: "No answer",
  },
  {
    id: "jamb-chem-2012-q31",
    year: 2012,
    text: "2CO(g) + O₂(g) ⇌ 2CO₂(g). In the reaction above, high pressure will favour the forward reaction because",
    options: [
      { id: "opt1", text: "high pressure favours gas formation" },
      { id: "opt2", text: "the reaction is in dynamic equilibrium" },
      { id: "opt3", text: "the reaction is exothermic" },
      { id: "opt4", text: "the process occurs with a decrease in volume" },
    ],
    correctOptionId: "opt4",
  },
  {
    id: "jamb-chem-2012-q32",
    year: 2012,
    text: "A piece of filter paper moistened with lead (II) ethanoate solution turns black when the paper is dropped into a gas likely to be",
    options: [
      { id: "opt1", text: "sulphur (VI) oxide" },
      { id: "opt2", text: "hydrogen chloride" },
      { id: "opt3", text: "sulphur (VI) oxide" },
      { id: "opt4", text: "hydrogen sulphide" },
    ],
    correctOptionId: "opt4",
  },
  {
    id: "jamb-chem-2012-q33",
    year: 2012,
    text: "Which of the following gases has a characteristic pungent smell, turns red litmus paper blue and forms dense white fumes with hydrogen chloride gas?",
    options: [
      { id: "opt1", text: "N₂" },
      { id: "opt2", text: "N₂O" },
      { id: "opt3", text: "Cl₂" },
      { id: "opt4", text: "NH₃" },
    ],
    correctOptionId: "opt4",
  },
  {
    id: "jamb-chem-2012-q34",
    year: 2012,
    text: "Commercial bleaching can be carried out using",
    options: [
      { id: "opt1", text: "sulphur (IV) oxide and ammonia" },
      { id: "opt2", text: "hydrogen sulphide and chlorine" },
      { id: "opt3", text: "chlorine and sulphur (IV) oxide" },
      { id: "opt4", text: "ammonia and chlorine" },
    ],
    correctOptionId: "opt3",
  },
  {
    id: "jamb-chem-2012-q35",
    year: 2012,
    text: "Mineral acids are usually added to commercial hydrogen peroxide to",
    options: [
      { id: "opt1", text: "oxidize it" },
      { id: "opt2", text: "decompose it" },
      { id: "opt3", text: "minimize its decomposition" },
      { id: "opt4", text: "reduce it to water and oxygen" },
    ],
    correctOptionId: "opt3",
  },
  {
    id: "jamb-chem-2012-q36",
    year: 2012,
    text: "Which of the following compounds will burn with a brick-red colour in a nonluminous Bunsen flame?",
    options: [
      { id: "opt1", text: "LiCl" },
      { id: "opt2", text: "NaCl" },
      { id: "opt3", text: "CaCl₂" },
      { id: "opt4", text: "MgCl₂" },
    ],
    correctOptionId: "opt3",
  },
  {
    id: "jamb-chem-2012-q37",
    year: 2012,
    text: "The purest form of iron which contains only about 0.1% carbon is",
    options: [
      { id: "opt1", text: "pig iron" },
      { id: "opt2", text: "wrought iron" },
      { id: "opt3", text: "cast iron" },
      { id: "opt4", text: "iron pyrite" },
    ],
    correctOptionId: "opt2",
  },
  {
    id: "jamb-chem-2012-q38",
    year: 2012,
    text: "A common characteristic between zinc and the other transition elements is the ability to",
    options: [
      { id: "opt1", text: "have variable oxidation states" },
      { id: "opt2", text: "form complex ions" },
      { id: "opt3", text: "act as a catalyst" },
      { id: "opt4", text: "form coloured ions" },
    ],
    correctOptionId: "opt2",
  },
  {
    id: "jamb-chem-2012-q39",
    year: 2012,
    text: "Which of the following metals is the least reactive?",
    options: [
      { id: "opt1", text: "Pb" },
      { id: "opt2", text: "Sn" },
      { id: "opt3", text: "Hg" },
      { id: "opt4", text: "Au" },
    ],
    correctOptionId: "opt4",
  },
  {
    id: "jamb-chem-2012-q40",
    year: 2012,
    text: "Geometric isomerism can exist in",
    options: [
      { id: "opt1", text: "hex-3-ene" },
      { id: "opt2", text: "hexane" },
      { id: "opt3", text: "prop-1-ene" },
      { id: "opt4", text: "3-methyl but-1-ene" },
    ],
    correctOptionId: "opt1",
  },
  {
    id: "jamb-chem-2012-q41",
    year: 2012,
    text: "Alkanals can be distinguished from alkanones by the reaction with",
    options: [
      { id: "opt1", text: "Sudan III stain" },
      { id: "opt2", text: "starch iodide paper" },
      { id: "opt3", text: "lithium tetrahydrido aluminate (III)" },
      { id: "opt4", text: "Fehling's solution" },
    ],
    correctOptionId: "opt4",
  },
  {
    id: "jamb-chem-2012-q42",
    year: 2012,
    text: "The isomers of C₃H₈O are",
    options: [
      { id: "opt1", text: "1-propanol and 2-propanol" },
      { id: "opt2", text: "1-propanol and 1-propanol" },
      { id: "opt3", text: "2-propanol and 2-propanone" },
      { id: "opt4", text: "2-propanol and 1-propanol" },
    ],
    correctOptionId: "opt1",
  },
  {
    id: "jamb-chem-2012-q43",
    year: 2012,
    text: "Carbohydrates are large molecules with the molecular formula Cₓ(H₂O)ᵧ. In which of the following pairs is x not equal to y?",
    options: [
      { id: "opt1", text: "glucose and starch" },
      { id: "opt2", text: "maltose and starch" },
      { id: "opt3", text: "sucrose and fructose" },
      { id: "opt4", text: "maltose and starch" },
    ],
    correctOptionId: "opt1",
  },
  {
    id: "jamb-chem-2012-q44",
    year: 2012,
    text: "A compound contains 40.0% C, 6.7% H and 53.3% O. If the molecular mass of the compound is 180, its molecular formula is [C = 12, H = 1, O = 16]",
    options: [
      { id: "opt1", text: "CH₂O" },
      { id: "opt2", text: "C₃H₆O₃" },
      { id: "opt3", text: "C₆H₆O₃" },
      { id: "opt4", text: "C₆H₁₂O₆" },
    ],
    correctOptionId: "opt4",
  },
  {
    id: "jamb-chem-2012-q45",
    year: 2012,
    text: "The alkyne that will give a white precipitate with silver trioxonitrate (V) is",
    options: [
      { id: "opt1", text: "CH₃CH₂C≡CCH₂CH₃" },
      { id: "opt2", text: "CH₃C≡CCH₂CH₂CH₃" },
      { id: "opt3", text: "CH₃CH₂CH₂CH₂C≡CH" },
      { id: "opt4", text: "CH₃CH₂CH₂C≡CCH₂CH₃" },
    ],
    correctOptionId: "opt3",
  },
  {
    id: "jamb-chem-2012-q46",
    year: 2012,
    text: "The saponification of an alkanoate to produce soap and alkanol involves",
    options: [
      { id: "opt1", text: "dehydration" },
      { id: "opt2", text: "esterification" },
      { id: "opt3", text: "hydrolysis" },
      { id: "opt4", text: "oxidation" },
    ],
    correctOptionId: "opt3",
  },
  {
    id: "jamb-chem-2012-q47",
    year: 2012,
    text: "2-methylpropan-2-ol is an example of a",
    options: [
      { id: "opt1", text: "primary alkanol" },
      { id: "opt2", text: "secondary alkanol" },
      { id: "opt3", text: "tertiary alkanol" },
      { id: "opt4", text: "quaternary alkanol" },
    ],
    correctOptionId: "opt3",
  },
  {
    id: "jamb-chem-2012-q48",
    year: 2012,
    text: "The final oxidation product of alkanol, alkanal and alkanoes is",
    options: [
      { id: "opt1", text: "alkanoic acid" },
      { id: "opt2", text: "alkanoyl halide" },
      { id: "opt3", text: "alkanoate" },
      { id: "opt4", text: "alkanamide" },
    ],
    correctOptionId: "opt1",
  },
  {
    id: "jamb-chem-2012-q49",
    year: 2012,
    text: "Ethanol reacts with concentrated tetraoxosulphate (V) acid at a temperature above 170°C to form",
    options: [
      { id: "opt1", text: "ethanone" },
      { id: "opt2", text: "ethene" },
      { id: "opt3", text: "ethyne" },
      { id: "opt4", text: "ethanol" },
    ],
    correctOptionId: "opt2",
  },
  {
    id: "jamb-chem-2012-q50",
    year: 2012,
    text: "An example of oxidation-reduction enzyme is",
    options: [
      { id: "opt1", text: "amylase" },
      { id: "opt2", text: "protease" },
      { id: "opt3", text: "lipase" },
      { id: "opt4", text: "dehydrogenase" },
    ],
    correctOptionId: "opt4",
  }
];

const jambChemistry2013: Question[] = [
  {
    id: "jamb-chem-2013-q1",
    year: 2013,
    text: "Which Question Paper Type of Chemistry is given to you?",
    options: [
      { id: "opt1", text: "Type D" },
      { id: "opt2", text: "Type I" },
      { id: "opt3", text: "Type B" },
      { id: "opt4", text: "Type U" },
    ],
    correctOptionId: "opt2",
  },
  {
    id: "jamb-chem-2013-q2",
    year: 2013,
    text: "The presence of an impurity in substance will cause the melting point to",
    options: [
      { id: "opt1", text: "be zero" },
      { id: "opt2", text: "reduce" },
      { id: "opt3", text: "increase" },
      { id: "opt4", text: "be stable" },
    ],
    correctOptionId: "opt2",
  },
  {
    id: "jamb-chem-2013-q3",
    year: 2013,
    text: "What volume of carbon (II) oxide is produced by reacting excess carbon with 10 dm³ of oxygen?",
    options: [
      { id: "opt1", text: "5 dm³" },
      { id: "opt2", text: "20 dm³" },
      { id: "opt3", text: "15 dm³" },
      { id: "opt4", text: "10 dm³" },
    ],
    correctOptionId: "opt2",
  },
  {
    id: "jamb-chem-2013-q4",
    year: 2013,
    text: "From the diagram above, an ideal gas is represented by",
    options: [
      { id: "opt1", text: "M" },
      { id: "opt2", text: "N" },
      { id: "opt3", text: "K" },
      { id: "opt4", text: "L" },
    ],
    correctOptionId: "opt1",
  },
  {
    id: "jamb-chem-2013-q5",
    year: 2013,
    text: "The rate of diffusion of a gas Y is twice that of Z. If the relative molecular mass of Y is 64 and the two gases diffuse under the same conditions, find the relative molecular mass of Z",
    options: [
      { id: "opt1", text: "32" },
      { id: "opt2", text: "4" },
      { id: "opt3", text: "8" },
      { id: "opt4", text: "16" },
    ],
    correctOptionId: "opt4",
  },
  {
    id: "jamb-chem-2013-q6",
    year: 2013,
    text: "The radioisotope used in industrial radiography for the rapid checking of faults in welds and casting is",
    options: [
      { id: "opt1", text: "Carbon-14" },
      { id: "opt2", text: "phosphorus-32" },
      { id: "opt3", text: "cobalt-60" },
      { id: "opt4", text: "iodine-131" },
    ],
    correctOptionId: "opt3",
  },
  {
    id: "jamb-chem-2013-q7",
    year: 2013,
    text: "How many unpaired electrons are in the p-orbitals of a fluorine atom?",
    options: [
      { id: "opt1", text: "3" },
      { id: "opt2", text: "0" },
      { id: "opt3", text: "1" },
      { id: "opt4", text: "2" },
    ],
    correctOptionId: "opt3",
  },
  {
    id: "jamb-chem-2013-q8",
    year: 2013,
    text: "The radioactive emission with the least ionization power is",
    options: [
      { id: "opt1", text: "α-particles" },
      { id: "opt2", text: "X-rays" },
      { id: "opt3", text: "γ-rays" },
      { id: "opt4", text: "β-particles" },
    ],
    correctOptionId: "opt3",
  },
  {
    id: "jamb-chem-2013-q9",
    year: 2013,
    text: "The shape of the carbon (IV) oxide molecule is",
    options: [
      { id: "opt1", text: "pyramidal" },
      { id: "opt2", text: "linear" },
      { id: "opt3", text: "angular" },
      { id: "opt4", text: "tetrahedral" },
    ],
    correctOptionId: "opt2",
  },
  {
    id: "jamb-chem-2013-q10",
    year: 2013,
    text: "Which of the following molecules is held together by hydrogen bond?",
    options: [
      { id: "opt1", text: "CH₄" },
      { id: "opt2", text: "HBr" },
      { id: "opt3", text: "H₂SO₄" },
      { id: "opt4", text: "HF" },
    ],
    correctOptionId: "opt4",
  },
  {
    id: "jamb-chem-2013-q11",
    year: 2013,
    text: "The bond formed between two elements with electron configurations 1s² 2s² 2p⁶ 3s² and 1s² 2s² 2p⁴ is",
    options: [
      { id: "opt1", text: "metallic" },
      { id: "opt2", text: "covalent" },
      { id: "opt3", text: "native" },
      { id: "opt4", text: "ionic" },
    ],
    correctOptionId: "opt4",
  },
  {
    id: "jamb-chem-2013-q12",
    year: 2013,
    text: "The constituent of air that acts as a diluent is",
    options: [
      { id: "opt1", text: "nitrogen" },
      { id: "opt2", text: "carbon (IV) oxide" },
      { id: "opt3", text: "noble gases" },
      { id: "opt4", text: "oxygen" },
    ],
    correctOptionId: "opt1",
  },
  {
    id: "jamb-chem-2013-q13",
    year: 2013,
    text: "Steam changes the colour of anhydrous cobalt (II) chloride from",
    options: [
      { id: "opt1", text: "white to red" },
      { id: "opt2", text: "blue to white" },
      { id: "opt3", text: "blue to pink" },
      { id: "opt4", text: "white to blue" },
    ],
    correctOptionId: "opt3",
  },
  {
    id: "jamb-chem-2013-q14",
    year: 2013,
    text: "An example of a hygroscopic substance is",
    options: [
      { id: "opt1", text: "CuO(s)" },
      { id: "opt2", text: "MgCl₂(s)" },
      { id: "opt3", text: "CaCl₂(s)" },
      { id: "opt4", text: "NaOH(s)" },
    ],
    correctOptionId: "opt1",
  },
  {
    id: "jamb-chem-2013-q15",
    year: 2013,
    text: "If 24.4g of lead (II) trioxonitrate (V) were dissolved in 100g of distilled water at 20°C; calculate the solubility of the solute in gdm⁻³ [Pb = 207, N = 14, O = 16]",
    options: [
      { id: "opt1", text: "581.000" },
      { id: "opt2", text: "0.581" },
      { id: "opt3", text: "5.810" },
      { id: "opt4", text: "58.100" },
    ],
    correctOptionId: "opt1",
  },
  {
    id: "jamb-chem-2013-q16",
    year: 2013,
    text: "The solvent used for removing grease stain is",
    options: [
      { id: "opt1", text: "turpentine" },
      { id: "opt2", text: "ammonia solution" },
      { id: "opt3", text: "ethanol" },
      { id: "opt4", text: "solution of borax in water" },
    ],
    correctOptionId: "opt2",
  },
  {
    id: "jamb-chem-2013-q17",
    year: 2013,
    text: "In a water body, too much sewage leads to",
    options: [
      { id: "opt1", text: "a decrease in the temperature of the water which cause in death of aquatic animals" },
      { id: "opt2", text: "an increase in the number of aquatic animals in the water" },
      { id: "opt3", text: "an increase in the bacterial population which reduces the level of oxygen in the water" },
      { id: "opt4", text: "a decrease in the bacterial population which increases the level of oxygen in the water" },
    ],
    correctOptionId: "opt3",
  },
  {
    id: "jamb-chem-2013-q18",
    year: 2013,
    text: "10.0 dm³ of water was added to 2.0 moldm⁻³ of 2.5dm³ solution of HCl. What is the concentration of the final solution in mol dm⁻³?",
    options: [
      { id: "opt1", text: "0.4" },
      { id: "opt2", text: "8.0" },
      { id: "opt3", text: "2.0" },
      { id: "opt4", text: "0.5" },
    ],
    correctOptionId: "opt1",
  },
  {
    id: "jamb-chem-2013-q19",
    year: 2013,
    text: "Three drops of a 1.0 mol dm⁻³ solution of HCl was added to 20cm³ of a solution of pH6.4. The pH of the resulting solution will be",
    options: [
      { id: "opt1", text: "close to that of pure water" },
      { id: "opt2", text: "less than 6.4" },
      { id: "opt3", text: "greater than 6.4" },
      { id: "opt4", text: "unaltered" },
    ],
    correctOptionId: "opt2",
  },
  {
    id: "jamb-chem-2013-q20",
    year: 2013,
    text: "Which of the following substances is not a salt?",
    options: [
      { id: "opt1", text: "Aluminium oxide" },
      { id: "opt2", text: "Sodium hydrogen trioxosulphate (V)" },
      { id: "opt3", text: "Sodium trioxocarbonate (V)" },
      { id: "opt4", text: "Zinc chloride" },
    ],
    correctOptionId: "opt1",
  },
  {
    id: "jamb-chem-2013-q21",
    year: 2013,
    text: "An insoluble salt can be prepared by",
    options: [
      { id: "opt1", text: "the reaction of trioxocarbonate (V) with an acid" },
      { id: "opt2", text: "double decomposition" },
      { id: "opt3", text: "the action of dilute acid on an insoluble base" },
      { id: "opt4", text: "the reaction of metals with an acid" },
    ],
    correctOptionId: "opt2",
  },
  {
    id: "jamb-chem-2013-q22",
    year: 2013,
    text: "2H₂O(l) + 2F₂(g) → 4HF(aq) + O₂(g). In the reaction above, the substance that is being reduced is",
    options: [
      { id: "opt1", text: "O₂(g)" },
      { id: "opt2", text: "H₂O(l)" },
      { id: "opt3", text: "F₂(g)" },
      { id: "opt4", text: "HF(aq)" },
    ],
    correctOptionId: "opt3",
  },
  {
    id: "jamb-chem-2013-q23",
    year: 2013,
    text: "Zn(s) + CuSO₄(aq) → ZnSO₄(aq) + Cu(s). In the reaction above, the oxidizing agent is",
    options: [
      { id: "opt1", text: "CuSO₄(aq)" },
      { id: "opt2", text: "ZnSO₄(aq)" },
      { id: "opt3", text: "Cu(s)" },
      { id: "opt4", text: "Zn(s)" },
    ],
    correctOptionId: "opt1",
  },
  {
    id: "jamb-chem-2013-q24",
    year: 2013,
    text: "In an electrochemical cell, polarization is caused by",
    options: [
      { id: "opt1", text: "chlorine" },
      { id: "opt2", text: "oxygen" },
      { id: "opt3", text: "tetraoxosulphate (VI) acid" },
      { id: "opt4", text: "hydrogen" },
    ],
    correctOptionId: "opt4",
  },
  {
    id: "jamb-chem-2013-q25",
    year: 2013,
    text: "Calculate the volume in cm³ of oxygen evolved at s.t.p. when a current of 5 A is passed through acidified water for 193s [F = 96500 Cmol⁻¹, Molar volume of a gas at s.t.p. = 22.4 dm³]",
    options: [
      { id: "opt1", text: "224.000 dm³" },
      { id: "opt2", text: "0.056 dm³" },
      { id: "opt3", text: "0.224 dm³" },
      { id: "opt4", text: "56.000 dm³" },
    ],
    correctOptionId: "opt2",
  },
  {
    id: "jamb-chem-2013-q26",
    year: 2013,
    text: "In an endothermic reaction, if there is a loss in entropy the reaction will",
    options: [
      { id: "opt1", text: "be indeterminate" },
      { id: "opt2", text: "be spontaneous" },
      { id: "opt3", text: "not be spontaneous" },
      { id: "opt4", text: "be at equilibrium" },
    ],
    correctOptionId: "opt3",
  },
  {
    id: "jamb-chem-2013-q27",
    year: 2013,
    text: "2SO₂(g) + O₂(g) ⇌ 2SO₃(g) ΔH = -395.7 kJmol⁻¹. In the reaction above, the concentration of SO₃(g) can be increased by",
    options: [
      { id: "opt1", text: "decreasing the pressure" },
      { id: "opt2", text: "decreasing the temperature" },
      { id: "opt3", text: "increasing the temperature" },
      { id: "opt4", text: "the addition of catalyst" },
    ],
    correctOptionId: "opt2",
  },
  {
    id: "jamb-chem-2013-q28",
    year: 2013,
    text: "The minimum amount of energy required for a reaction to take place is",
    options: [
      { id: "opt1", text: "lattice energy" },
      { id: "opt2", text: "ionization energy" },
      { id: "opt3", text: "activation energy" },
      { id: "opt4", text: "kinetic energy" },
    ],
    correctOptionId: "opt3",
  },
  {
    id: "jamb-chem-2013-q29",
    year: 2013,
    text: "In the graph above, the activation energy of the catalyzed reaction is",
    options: [
      { id: "opt1", text: "100KJ" },
      { id: "opt2", text: "300KJ" },
      { id: "opt3", text: "250KJ" },
      { id: "opt4", text: "200KJ" },
    ],
    correctOptionId: "opt1",
  },
  {
    id: "jamb-chem-2013-q30",
    year: 2013,
    text: "3Fe(s) + 4H₂O(g) ⇌ Fe₃O₄(s) + 4H₂(g). The equilibrium constant, K, of the reaction above is represented as",
    options: [
      { id: "opt1", text: "[Fe₃O₄][H₂]/[Fe][H₂O]" },
      { id: "opt2", text: "[H₂O]⁴/[H₂]⁴" },
      { id: "opt3", text: "[H₂]⁴/[H₂O]⁴" },
      { id: "opt4", text: "[Fe]³[H₂O]²/[Fe₃O₄][H₂]⁴" },
    ],
    correctOptionId: "opt3",
  },
  {
    id: "jamb-chem-2013-q31",
    year: 2013,
    text: "Which of the following compounds is a neutral oxide?",
    options: [
      { id: "opt1", text: "Carbon (IV) oxide" },
      { id: "opt2", text: "Sulphur (VI) oxide" },
      { id: "opt3", text: "Sulphur (IV) oxide" },
      { id: "opt4", text: "Carbon (II) oxide" },
    ],
    correctOptionId: "opt4",
  },
  {
    id: "jamb-chem-2013-q32",
    year: 2013,
    text: "In the laboratory preparation of ammonia, the flask is placed in a slanting position so as to",
    options: [
      { id: "opt1", text: "prevent condensed water from breaking the reaction flask" },
      { id: "opt2", text: "enable the proper mixing of the reactions in the flask" },
      { id: "opt3", text: "enhance the speed of the reaction" },
      { id: "opt4", text: "prevent formation of precipitate" },
    ],
    correctOptionId: "opt1",
  },
  {
    id: "jamb-chem-2013-q33",
    year: 2013,
    text: "Which of the gases is employed as an anaesthesia?",
    options: [
      { id: "opt1", text: "N₂O" },
      { id: "opt2", text: "NO₂" },
      { id: "opt3", text: "NH₃" },
      { id: "opt4", text: "NO" },
    ],
    correctOptionId: "opt1",
  },
  {
    id: "jamb-chem-2013-q34",
    year: 2013,
    text: "Sulphur (IV) oxide is a strong reducing agent in the presence of water due to the formation of",
    options: [
      { id: "opt1", text: "hydroxide ion" },
      { id: "opt2", text: "sulphur (VI) oxide" },
      { id: "opt3", text: "hydrogen sulphide" },
      { id: "opt4", text: "trioxosulphate (IV) salt" },
    ],
    correctOptionId: "opt4",
  },
  {
    id: "jamb-chem-2013-q35",
    year: 2013,
    text: "A metal that forms soluble trioxosulphate (IV) ion is",
    options: [
      { id: "opt1", text: "barium" },
      { id: "opt2", text: "potassium" },
      { id: "opt3", text: "manganese" },
      { id: "opt4", text: "aluminium" },
    ],
    correctOptionId: "opt2",
  },
  {
    id: "jamb-chem-2013-q36",
    year: 2013,
    text: "Copper is displaced from the solution of its salts by most metals because it",
    options: [
      { id: "opt1", text: "is a transition element" },
      { id: "opt2", text: "is at the bottom of the activity series" },
      { id: "opt3", text: "is very reactive" },
      { id: "opt4", text: "has completely filled 3d-orbitals" },
    ],
    correctOptionId: "opt1",
  },
  {
    id: "jamb-chem-2013-q37",
    year: 2013,
    text: "The coloured nature of transition metal ions are associated with their partially filled",
    options: [
      { id: "opt1", text: "f-orbital" },
      { id: "opt2", text: "s-orbital" },
      { id: "opt3", text: "p-orbital" },
      { id: "opt4", text: "d-orbital" },
    ],
    correctOptionId: "opt4",
  },
  {
    id: "jamb-chem-2013-q38",
    year: 2013,
    text: "Aluminium containers are frequently used to transport trioxonitrate (V) acid because aluminium",
    options: [
      { id: "opt1", text: "has a silvery-white appearance" },
      { id: "opt2", text: "has a low density" },
      { id: "opt3", text: "does not react with the acid" },
      { id: "opt4", text: "does not corrode" },
    ],
    correctOptionId: "opt2",
  },
  {
    id: "jamb-chem-2013-q39",
    year: 2013,
    text: "2-methylbutan-2-ol is an example of a",
    options: [
      { id: "opt1", text: "dihydric alkanol" },
      { id: "opt2", text: "tertiary alkanol" },
      { id: "opt3", text: "secondary alkanol" },
      { id: "opt4", text: "primary alkanol" },
    ],
    correctOptionId: "opt4",
  },
  {
    id: "jamb-chem-2013-q40",
    year: 2013,
    text: "The reaction between ammonia and ethyl ethanoate produces",
    options: [
      { id: "opt1", text: "propanol and ethanamide" },
      { id: "opt2", text: "propanol and propanamide" },
      { id: "opt3", text: "ethanol and propanamide" },
      { id: "opt4", text: "ethanol and ethanamide" },
    ],
    correctOptionId: "opt4",
  },
  {
    id: "jamb-chem-2013-q41",
    year: 2013,
    text: "The decarboxylation of ethanoic acid will produce carbon (IV) oxide and",
    options: [
      { id: "opt1", text: "methane" },
      { id: "opt2", text: "ethane" },
      { id: "opt3", text: "propane" },
      { id: "opt4", text: "butane" },
    ],
    correctOptionId: "opt1",
  },
  {
    id: "jamb-chem-2013-q42",
    year: 2013,
    text: "The compound above is an",
    options: [
      { id: "opt1", text: "alkanone" },
      { id: "opt2", text: "alkanoate" },
      { id: "opt3", text: "alkanal" },
      { id: "opt4", text: "alkanol" },
    ],
    correctOptionId: "opt1",
  },
  {
    id: "jamb-chem-2013-q43",
    year: 2013,
    text: "The compound that will react with sodium hydroxide to form salt and water is",
    options: [
      { id: "opt1", text: "C₆H₁₂O₆" },
      { id: "opt2", text: "(CH₃)₃COH" },
      { id: "opt3", text: "CH₃CH=CH₂" },
      { id: "opt4", text: "CH₃CH₂COOH" },
    ],
    correctOptionId: "opt4",
  },
  {
    id: "jamb-chem-2013-q44",
    year: 2013,
    text: "Which of the following compounds in solution will turn red litmus paper blue?",
    options: [
      { id: "opt1", text: "R'OR''" },
      { id: "opt2", text: "R-C-N-R" },
      { id: "opt3", text: "RNH₂" },
      { id: "opt4", text: "R-C-O-R" },
    ],
    correctOptionId: "opt3",
  },
  {
    id: "jamb-chem-2013-q45",
    year: 2013,
    text: "The dehydration of ammonium salt of alkanoic acids produces a compound with the general formula",
    options: [
      { id: "opt1", text: "R-C-O" },
      { id: "opt2", text: "R-C-O" },
      { id: "opt3", text: "R-NH₂" },
      { id: "opt4", text: "R-C-R" },
    ],
    correctOptionId: "opt2",
  },
  {
    id: "jamb-chem-2013-q46",
    year: 2013,
    text: "Which of the following fraction is used as raw material for the cracking process?",
    options: [
      { id: "opt1", text: "kerosene" },
      { id: "opt2", text: "lubricating oil" },
      { id: "opt3", text: "bitumen" },
      { id: "opt4", text: "diesel oils" },
    ],
    correctOptionId: "opt2",
  },
  {
    id: "jamb-chem-2013-q47",
    year: 2013,
    text: "An organic compound with a pleasant smell is likely to have a general formula",
    options: [
      { id: "opt1", text: "CₙH₂ₙ₊₁CHO" },
      { id: "opt2", text: "CₙH₂ₙ₊₁COOH" },
      { id: "opt3", text: "CₙH₂ₙ₊₁COOCₙH₂ₙ₊₁" },
      { id: "opt4", text: "CₙH₂ₙ₊₁COCₙH₂ₙ₊₁" },
    ],
    correctOptionId: "opt2",
  },
  {
    id: "jamb-chem-2013-q48",
    year: 2013,
    text: "A primary amide is generally represented by the formula",
    options: [
      { id: "opt1", text: "RCOOR" },
      { id: "opt2", text: "RCONH₂" },
      { id: "opt3", text: "RCONHR" },
      { id: "opt4", text: "RCONR₂" },
    ],
    correctOptionId: "opt2",
  },
  {
    id: "jamb-chem-2013-q49",
    year: 2013,
    text: "The IUPAC nomenclature for the compound above is",
    options: [
      { id: "opt1", text: "4-methylpent-1-ene" },
      { id: "opt2", text: "3-methylpent-2-ene" },
      { id: "opt3", text: "2-methylpent-1-ene" },
      { id: "opt4", text: "2-methylpent-4-ene" },
    ],
    correctOptionId: "opt1",
  },
  {
    id: "jamb-chem-2013-q50",
    year: 2013,
    text: "An organic compound contains 60% carbon, 13.3% hydrogen and 26.7% oxygen. Calculate the empirical formula (C=12, H=1, O=16)",
    options: [
      { id: "opt1", text: "C₅H₁₂O" },
      { id: "opt2", text: "C₃H₈O" },
      { id: "opt3", text: "C₆H₁₃O₂" },
      { id: "opt4", text: "C₄H₉O" },
    ],
    correctOptionId: "opt2",
  }
];

const jambChemistry2014: Question[] = [
  {
    id: "jamb-chem-2014-q1",
    year: 2014,
    text: "Which Question Paper Type of Chemistry is given to you?",
    options: [
      { id: "opt1", text: "Type F" },
      { id: "opt2", text: "Type E" },
      { id: "opt3", text: "Type L" },
      { id: "opt4", text: "Type S" },
    ],
    correctOptionId: "opt2",
  },
  {
    id: "jamb-chem-2014-q2",
    year: 2014,
    text: "A mixture is different from a compound because",
    options: [
      { id: "opt1", text: "the properties of a compound are those of its individual constituents while those of a mixture differ from its constituents" },
      { id: "opt2", text: "a mixture is always homogeneous while a compound is not" },
      { id: "opt3", text: "the constituent of a compound are chemically bound together while those of a mixture are not" },
      { id: "opt4", text: "a mixture can be represented by a chemical formula while a compound cannot" },
    ],
    correctOptionId: "opt3",
  },
  {
    id: "jamb-chem-2014-q3",
    year: 2014,
    text: "What is the percentage of sulphur in sulphur (IV) oxide?",
    options: [
      { id: "opt1", text: "66%" },
      { id: "opt2", text: "25%" },
      { id: "opt3", text: "40%" },
      { id: "opt4", text: "50%" },
    ],
    correctOptionId: "opt4",
  },
  {
    id: "jamb-chem-2014-q4",
    year: 2014,
    text: "A gas X diffuses twice as fast as gas Y. If the relative molecular mass of X is 32, calculate the relative molecular mass of Y.",
    options: [
      { id: "opt1", text: "128" },
      { id: "opt2", text: "8" },
      { id: "opt3", text: "16" },
      { id: "opt4", text: "64" },
    ],
    correctOptionId: "opt1",
  },
  {
    id: "jamb-chem-2014-q5",
    year: 2014,
    text: "200 cm³ of a gas at 25°C exerts a pressure of 700 mmHg. Calculate its pressure if its volume increases 350 cm³ at 75°C.",
    options: [
      { id: "opt1", text: "342.53 mmHg" },
      { id: "opt2", text: "1430.54 mmHg" },
      { id: "opt3", text: "467.11 mmHg" },
      { id: "opt4", text: "400.00 mmHg" },
    ],
    correctOptionId: "opt3",
  },
  {
    id: "jamb-chem-2014-q6",
    year: 2014,
    text: "An element X has electron configuration 1s² 2s² 2p⁶ 3s² 3p⁵. Which of the following statements is correct about the element?",
    options: [
      { id: "opt1", text: "It has a completely filled p-orbital" },
      { id: "opt2", text: "It has 5 electrons in its outermost shell" },
      { id: "opt3", text: "It belongs to group II on the periodic table" },
      { id: "opt4", text: "It is a halogen" },
    ],
    correctOptionId: "opt4",
  },
  {
    id: "jamb-chem-2014-q7",
    year: 2014,
    text: "Beryllium and aluminium have similar properties because they",
    options: [
      { id: "opt1", text: "are both metals" },
      { id: "opt2", text: "belong to the same group" },
      { id: "opt3", text: "belong to the same period" },
      { id: "opt4", text: "are positioned diagonally to each other" },
    ],
    correctOptionId: "opt1",
  },
  {
    id: "jamb-chem-2014-q8",
    year: 2014,
    text: "If the difference in electronegativity of elements P and Q is 3.0. The bond that will be formed between them is",
    options: [
      { id: "opt1", text: "metallic" },
      { id: "opt2", text: "covalent" },
      { id: "opt3", text: "co-ordinate" },
      { id: "opt4", text: "ionic" },
    ],
    correctOptionId: "opt4",
  },
  {
    id: "jamb-chem-2014-q9",
    year: 2014,
    text: "How many protons, neutrons and electrons respectively are present in the element ²⁷Co⁶⁰?",
    options: [
      { id: "opt1", text: "27, 33 and 33" },
      { id: "opt2", text: "33, 27 and 27" },
      { id: "opt3", text: "27, 33, and 27" },
      { id: "opt4", text: "60, 33 and 60" },
    ],
    correctOptionId: "opt3",
  },
  {
    id: "jamb-chem-2014-q10",
    year: 2014,
    text: "The radioactive radiation used in studying the arrangement of particles in giant organic molecules is",
    options: [
      { id: "opt1", text: "γ-rays" },
      { id: "opt2", text: "α-particles" },
      { id: "opt3", text: "X-rays" },
      { id: "opt4", text: "β-particles" },
    ],
    correctOptionId: "opt3",
  },
  {
    id: "jamb-chem-2014-q11",
    year: 2014,
    text: "A silicon-containing ore has 92% ²⁸Si, 5% ²⁹Si and 3% ³⁰Si. Calculate the relative atomic mass of the silicon.",
    options: [
      { id: "opt1", text: "14.00" },
      { id: "opt2", text: "29.00" },
      { id: "opt3", text: "28.11" },
      { id: "opt4", text: "28.00" },
    ],
    correctOptionId: "opt4",
  },
  {
    id: "jamb-chem-2014-q12",
    year: 2014,
    text: "The nitrogen obtained from air has a density higher than the one from nitrogen-containing compounds because the one from air is contaminated with",
    options: [
      { id: "opt1", text: "water vapour" },
      { id: "opt2", text: "oxygen" },
      { id: "opt3", text: "rare gases" },
      { id: "opt4", text: "carbon (IV) oxide" },
    ],
    correctOptionId: "opt3",
  },
  {
    id: "jamb-chem-2014-q13",
    year: 2014,
    text: "Water is said to be temporarily hard when it contains",
    options: [
      { id: "opt1", text: "Ca(HCO₃)₂ and Mg(HCO₃)₂ salts" },
      { id: "opt2", text: "Ca(HCO₃)₂ and CaCO₃ salts" },
      { id: "opt3", text: "Mg(HCO₃)₂ and CaSO₄ salts" },
      { id: "opt4", text: "CaSO₄ and Ca(HCO₃)₂ salts" },
    ],
    correctOptionId: "opt1",
  },
  {
    id: "jamb-chem-2014-q14",
    year: 2014,
    text: "On exposure to the atmosphere, a hydrated salt loses its water of crystallization to become anhydrous. This phenomenon is referred to as",
    options: [
      { id: "opt1", text: "efflorescence" },
      { id: "opt2", text: "deliquescence" },
      { id: "opt3", text: "hygroscopy" },
      { id: "opt4", text: "hydrolysis" },
    ],
    correctOptionId: "opt1",
  },
  {
    id: "jamb-chem-2014-q15",
    year: 2014,
    text: "16.55g of lead (II) trioxonitrate (V) were dissolved in 100g of distilled water at 20°C; calculate the solubility of the solute in gdm⁻³ [Pb = 207, N = 14, O = 16]",
    options: [
      { id: "opt1", text: "0.05 g" },
      { id: "opt2", text: "2.00 g" },
      { id: "opt3", text: "1.00 g" },
      { id: "opt4", text: "0.50 g" },
    ],
    correctOptionId: "opt1",
  },
  {
    id: "jamb-chem-2014-q16",
    year: 2014,
    text: "The dispersion of a liquid in a liquid medium will give",
    options: [
      { id: "opt1", text: "an emulsion" },
      { id: "opt2", text: "a fog" },
      { id: "opt3", text: "a gel" },
      { id: "opt4", text: "an aerosol" },
    ],
    correctOptionId: "opt3",
  },
  {
    id: "jamb-chem-2014-q17",
    year: 2014,
    text: "The major and most effective way of controlling pollution is to",
    options: [
      { id: "opt1", text: "improve machinery so that the substances released from combustion are less harmful" },
      { id: "opt2", text: "pass strict laws against it by individuals and companies" },
      { id: "opt3", text: "educate people on the causes and effects of pollution" },
      { id: "opt4", text: "convert chemical wastes to harmless substances before releasing them into the environment" },
    ],
    correctOptionId: "opt3",
  },
  {
    id: "jamb-chem-2014-q18",
    year: 2014,
    text: "The basicity of CH₃COOH is",
    options: [
      { id: "opt1", text: "4" },
      { id: "opt2", text: "1" },
      { id: "opt3", text: "2" },
      { id: "opt4", text: "3" },
    ],
    correctOptionId: "opt2",
  },
  {
    id: "jamb-chem-2014-q19",
    year: 2014,
    text: "The colour of litmus in a neutral medium is",
    options: [
      { id: "opt1", text: "purple" },
      { id: "opt2", text: "pink" },
      { id: "opt3", text: "yellow" },
      { id: "opt4", text: "orange" },
    ],
    correctOptionId: "opt2",
  },
  {
    id: "jamb-chem-2014-q20",
    year: 2014,
    text: "The mathematical expression of pH is",
    options: [
      { id: "opt1", text: "log₁₀ [OH⁻]" },
      { id: "opt2", text: "log₁₀ 1/[H₃O⁺]" },
      { id: "opt3", text: "log₁₀ [H₃O⁺]" },
      { id: "opt4", text: "log₁₀ 1/[OH⁻]" },
    ],
    correctOptionId: "opt2",
  },
  {
    id: "jamb-chem-2014-q21",
    year: 2014,
    text: "Which of the following salts will turn blue litmus red?",
    options: [
      { id: "opt1", text: "Sodium tetrahydroxozincate (II)" },
      { id: "opt2", text: "Potassium hydrogen tetraoxosulphate (IV)" },
      { id: "opt3", text: "Sodium trioxocarbonate (IV)" },
      { id: "opt4", text: "Zinc chloride hydroxide" },
    ],
    correctOptionId: "opt2",
  },
  {
    id: "jamb-chem-2014-q22",
    year: 2014,
    text: "Zn(s) + CuSO4(aq) → ZnSO4(aq) + Cu(s). In the reaction above, the oxidation number of the reducing agent changes from",
    options: [
      { id: "opt1", text: "0 to +4" },
      { id: "opt2", text: "0 to +2" },
      { id: "opt3", text: "+1 to +2" },
      { id: "opt4", text: "+1 to +3" },
    ],
    correctOptionId: "opt2",
  },
  {
    id: "jamb-chem-2014-q23",
    year: 2014,
    text: "H2O(g) + C(s) → H2(g) + CO(g). The oxidizing agent in the reaction above is",
    options: [
      { id: "opt1", text: "CO(g)" },
      { id: "opt2", text: "C(s)" },
      { id: "opt3", text: "H2O(g)" },
      { id: "opt4", text: "H2(g)" },
    ],
    correctOptionId: "opt3",
  },
  {
    id: "jamb-chem-2014-q24",
    year: 2014,
    text: "Calculate the quantity of electricity in coulombs required to liberate 10g of copper from a copper compound [Cu=64, F = 96500 Cmol-1]",
    options: [
      { id: "opt1", text: "32395.5" },
      { id: "opt2", text: "30156.3" },
      { id: "opt3", text: "60784.5" },
      { id: "opt4", text: "15196.5" },
    ],
    correctOptionId: "opt2",
  },
  {
    id: "jamb-chem-2014-q25",
    year: 2014,
    text: "How many faraday of electricity is required to produce 0.25 mole of copper?",
    options: [
      { id: "opt1", text: "1.00F" },
      { id: "opt2", text: "0.01F" },
      { id: "opt3", text: "0.05F" },
      { id: "opt4", text: "0.50F" },
    ],
    correctOptionId: "opt4",
  },
  {
    id: "jamb-chem-2014-q26",
    year: 2014,
    text: "Z in diagram below represents...",
    options: [
      { id: "opt1", text: "heat of reaction" },
      { id: "opt2", text: "activation energy" },
      { id: "opt3", text: "free energy" },
      { id: "opt4", text: "entropy of reaction" },
    ],
    correctOptionId: "opt1",
  },
  {
    id: "jamb-chem-2014-q27",
    year: 2014,
    text: "If the change in free energy of a system is -899 Jmol-1 and the entropy change is 10Jmol-1k-1 at 25°C, calculate the enthalpy change.",
    options: [
      { id: "opt1", text: "+2081 Jmol-1" },
      { id: "opt2", text: "-2081 Jmol-1" },
      { id: "opt3", text: "-649 Jmol-1" },
      { id: "opt4", text: "+649 Jmol-1" },
    ],
    correctOptionId: "opt1",
  },
  {
    id: "jamb-chem-2014-q28",
    year: 2014,
    text: "In an equilibrium reaction, which of the following conditions indicates that maximum yield of the product will be obtained?",
    options: [
      { id: "opt1", text: "Equilibrium constant is very large" },
      { id: "opt2", text: "ΔH - TΔS = 0" },
      { id: "opt3", text: "ΔH > T ΔS" },
      { id: "opt4", text: "Equilibrium constant is less than zero" },
    ],
    correctOptionId: "opt1",
  },
  {
    id: "jamb-chem-2014-q29",
    year: 2014,
    text: "In a chemical reaction, the change in concentration of a reactant with time is",
    options: [
      { id: "opt1", text: "entropy of reaction" },
      { id: "opt2", text: "enthalpy of reaction" },
      { id: "opt3", text: "rate of reaction" },
      { id: "opt4", text: "order of reaction" },
    ],
    correctOptionId: "opt3",
  },
  {
    id: "jamb-chem-2014-q30",
    year: 2014,
    text: "Cr2O7²⁻(aq) + H2O(l) ⇌ 2CrO4²⁻(aq) + 2H⁺(aq). What happens to the reaction above when the hydrogen ion concentration is increased?",
    options: [
      { id: "opt1", text: "more of the products will be formed" },
      { id: "opt2", text: "the reaction will not proceed" },
      { id: "opt3", text: "the equilibrium position will shift to the right" },
      { id: "opt4", text: "the equilibrium position will shift to the left" },
    ],
    correctOptionId: "opt4",
  },
  {
    id: "jamb-chem-2014-q31",
    year: 2014,
    text: "Which of the following will liberate hydrogen from dilute tetraoxosulphate (VI) acid?",
    options: [
      { id: "opt1", text: "Lead" },
      { id: "opt2", text: "Magnesium" },
      { id: "opt3", text: "Copper" },
      { id: "opt4", text: "Gold" },
    ],
    correctOptionId: "opt2",
  },
  {
    id: "jamb-chem-2014-q32",
    year: 2014,
    text: "In the diagram, the function of the concentrated H2SO4 is to",
    options: [
      { id: "opt1", text: "purify the gas" },
      { id: "opt2", text: "dry the gas" },
      { id: "opt3", text: "liquefy the gas" },
      { id: "opt4", text: "remove odour" },
    ],
    correctOptionId: "opt2",
  },
  {
    id: "jamb-chem-2014-q33",
    year: 2014,
    text: "The gas that is removed by the water in the flask is",
    options: [
      { id: "opt1", text: "O2" },
      { id: "opt2", text: "SO2" },
      { id: "opt3", text: "HCl" },
      { id: "opt4", text: "H2" },
    ],
    correctOptionId: "opt3",
  },
  {
    id: "jamb-chem-2014-q34",
    year: 2014,
    text: "Fluorine does not occur in the free state in nature because",
    options: [
      { id: "opt1", text: "it is a poisonous gas" },
      { id: "opt2", text: "it belongs to the halogen family" },
      { id: "opt3", text: "it is inert" },
      { id: "opt4", text: "of its high reactivity" },
    ],
    correctOptionId: "opt4",
  },
  {
    id: "jamb-chem-2014-q35",
    year: 2014,
    text: "In the extraction of sodium from fused sodium chloride, the anode is made of platinum because",
    options: [
      { id: "opt1", text: "sodium is formed at the anode" },
      { id: "opt2", text: "chlorine is formed at the anode" },
      { id: "opt3", text: "sodium does not react with platinum" },
      { id: "opt4", text: "chlorine does not react with platinum" },
    ],
    correctOptionId: "opt3",
  },
  {
    id: "jamb-chem-2014-q36",
    year: 2014,
    text: "A compound that gives a brick-red colour to a non-luminous flame is likely to contain",
    options: [
      { id: "opt1", text: "copper ions" },
      { id: "opt2", text: "sodium ions" },
      { id: "opt3", text: "calcium ions" },
      { id: "opt4", text: "aluminium ions" },
    ],
    correctOptionId: "opt3",
  },
  {
    id: "jamb-chem-2014-q37",
    year: 2014,
    text: "In the electrolytic extraction of calcium from calcium chloride, the cathode is",
    options: [
      { id: "opt1", text: "zinc" },
      { id: "opt2", text: "graphite" },
      { id: "opt3", text: "platinum" },
      { id: "opt4", text: "iron" },
    ],
    correctOptionId: "opt4",
  },
  {
    id: "jamb-chem-2014-q38",
    year: 2014,
    text: "A few drops of NaOH solution was added to an unknown salt forming a white precipitate which is insoluble in excess solution. The cation likely present is",
    options: [
      { id: "opt1", text: "Zn²⁺" },
      { id: "opt2", text: "Pb²⁺" },
      { id: "opt3", text: "Ca²⁺" },
      { id: "opt4", text: "Al³⁺" },
    ],
    correctOptionId: "opt3",
  },
  {
    id: "jamb-chem-2014-q39",
    year: 2014,
    text: "The general formula of haloalkanes where X represents the halide is",
    options: [
      { id: "opt1", text: "CnH2n₁X" },
      { id: "opt2", text: "CnH2nX" },
      { id: "opt3", text: "CnH2n+2X" },
      { id: "opt4", text: "CnH2n+1X" },
    ],
    correctOptionId: "opt4",
  },
  {
    id: "jamb-chem-2014-q40",
    year: 2014,
    text: "The IUPAC nomenclature of the compound CH3CH(Br)CH(Cl)CH2OH is",
    options: [
      { id: "opt1", text: "2-bromo-3-chlorobutanol" },
      { id: "opt2", text: "3-bromo-2-chlorobutanol" },
      { id: "opt3", text: "3-chloro-2-bromobutanol" },
      { id: "opt4", text: "2-chloro-3-bromobutanol" },
    ],
    correctOptionId: "opt4",
  },
  {
    id: "jamb-chem-2014-q41",
    year: 2014,
    text: "The alkanol obtained from the production of soap is",
    options: [
      { id: "opt1", text: "propanol" },
      { id: "opt2", text: "ethanol" },
      { id: "opt3", text: "glycerol" },
      { id: "opt4", text: "methanol" },
    ],
    correctOptionId: "opt3",
  },
  {
    id: "jamb-chem-2014-q42",
    year: 2014,
    text: "Ethyne is passed through a hot tube containing organo-nickel catalyst to produce",
    options: [
      { id: "opt1", text: "isoprene" },
      { id: "opt2", text: "polythene" },
      { id: "opt3", text: "ethanol" },
      { id: "opt4", text: "benzene" },
    ],
    correctOptionId: "opt4",
  },
  {
    id: "jamb-chem-2014-q43",
    year: 2014,
    text: "Due to the unstable nature of ethyne, it is stored by dissolving in",
    options: [
      { id: "opt1", text: "ethane-1,2-diol" },
      { id: "opt2", text: "propanol" },
      { id: "opt3", text: "ethanoic acid" },
      { id: "opt4", text: "propanone" },
    ],
    correctOptionId: "opt4",
  },
  {
    id: "jamb-chem-2014-q44",
    year: 2014,
    text: "The process of converting starch to ethanol is",
    options: [
      { id: "opt1", text: "cracking" },
      { id: "opt2", text: "distillation" },
      { id: "opt3", text: "fermentation" },
      { id: "opt4", text: "oxidation" },
    ],
    correctOptionId: "opt3",
  },
  {
    id: "jamb-chem-2014-q45",
    year: 2014,
    text: "The polymer used in making car rear lights is",
    options: [
      { id: "opt1", text: "Perspex" },
      { id: "opt2", text: "Bakelite" },
      { id: "opt3", text: "polystyrene" },
      { id: "opt4", text: "polyacrylonitrile" },
    ],
    correctOptionId: "opt4",
  },
  {
    id: "jamb-chem-2014-q46",
    year: 2014,
    text: "CH3COOC2H5(l) + H2O(l) ⇌ CH3COOH(aq) + C2H5OH(aq). The purpose of H⁺ in the reaction above is to",
    options: [
      { id: "opt1", text: "increase the yield of products" },
      { id: "opt2", text: "maintain the solution at a constant pH" },
      { id: "opt3", text: "increase the rate of the hydrolysis" },
      { id: "opt4", text: "decrease the rate of the reverse reaction" },
    ],
    correctOptionId: "opt1",
  },
  {
    id: "jamb-chem-2014-q47",
    year: 2014,
    text: "A hydrocarbon has an empirical formula CH and a vapour density of 39. Determine its molecular formula. [C = 12, H = 1]",
    options: [
      { id: "opt1", text: "C2H6" },
      { id: "opt2", text: "C3H8" },
      { id: "opt3", text: "C3H4" },
      { id: "opt4", text: "C6H6" },
    ],
    correctOptionId: "opt4",
  },
  {
    id: "jamb-chem-2014-q48",
    year: 2014,
    text: "Polystyrene is widely used as packaging materials for fragile objects during transportation because of its",
    options: [
      { id: "opt1", text: "lightness" },
      { id: "opt2", text: "low density" },
      { id: "opt3", text: "high density" },
      { id: "opt4", text: "high compressibility" },
    ],
    correctOptionId: "opt2",
  },
  {
    id: "jamb-chem-2014-q49",
    year: 2014,
    text: "The process of converting linear alkanes to branched chain and cyclic hydrocarbons by heating in the presence of a catalyst to improve the quality of petrol is referred to as",
    options: [
      { id: "opt1", text: "refining" },
      { id: "opt2", text: "cracking" },
      { id: "opt3", text: "reforming" },
      { id: "opt4", text: "blending" },
    ],
    correctOptionId: "opt3",
  },
  {
    id: "jamb-chem-2014-q50",
    year: 2014,
    text: "The petroleum fraction that is used in heating furnaces in industries is",
    options: [
      { id: "opt1", text: "diesel oil" },
      { id: "opt2", text: "gasoline" },
      { id: "opt3", text: "kerosene" },
      { id: "opt4", text: "lubricating oil" },
    ],
    correctOptionId: "opt1",
  }
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
  { id: "chemistry", name: "Chemistry", icon: FlaskConical, availableYears: [2010, 2011, 2012, 2013], description: "Scientific discipline involving elements and compounds and their transformations." },
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

export const commonSubjects: Subject[] = [...prioritizedSubjects, ...otherSubjects].map(subject => {
  if (subject.id === 'chemistry') {
    const updatedYears = new Set([...subject.availableYears, 2010, 2011, 2012, 2013]); // Ensure these are included
    return { ...subject, availableYears: Array.from(updatedYears).sort((a,b) => a - b) };
  }
   if (subject.id === 'biology') {
    const updatedYears = new Set([...subject.availableYears, 2010, 2011]);
    return { ...subject, availableYears: Array.from(updatedYears).sort((a,b) => a - b) };
  }
   if (subject.id === 'english') {
    const updatedYears = new Set([...subject.availableYears, 2010]);
    return { ...subject, availableYears: Array.from(updatedYears).sort((a,b) => a - b) };
  }
   if (subject.id === 'mathematics') {
    const updatedYears = new Set([...subject.availableYears, 2010]);
    return { ...subject, availableYears: Array.from(updatedYears).sort((a,b) => a - b) };
  }
  return subject;
});


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
  ...jambChemistry2010,   
  ...jambChemistry2011,
  ...jambChemistry2012,   
  ...jambChemistry2013,
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
  // Specific cases should come first
  if (examId === 'jamb' && subjectId === 'chemistry' && year === 2010) return jambChemistry2010;
  if (examId === 'jamb' && subjectId === 'chemistry' && year === 2011) return jambChemistry2011;
  if (examId === 'jamb' && subjectId === 'chemistry' && year === 2012) return jambChemistry2012;
  if (examId === 'jamb' && subjectId === 'chemistry' && year === 2013) return jambChemistry2013;

  if (subjectId === 'biology' && year === 2010) return biologyQuestions2010;
  if (subjectId === 'biology' && year === 2011) return biologyQuestions2011;
  if (subjectId === 'chemistry' && year === 2010) return chemistryQuestions2010; // Generic/non-JAMB chemistry
  if (subjectId === 'english' && year === 2010) return englishQuestions2010;
  if (subjectId === 'mathematics' && year === 2010) return mathematicsQuestions2010;
  
  // Fallback or general logic for other subjects/years if they get added directly to allQuestions
  // This will need to be more sophisticated if subject data grows significantly.
  return allQuestions.filter(q => {
    const questionSubjectId = q.id.split('-')[0]; 
    let matchesSubject = false;

    if (subjectId === 'biology' && (q.id.startsWith('bio-') || q.id.includes('-bio-'))) matchesSubject = true;
    else if (subjectId === 'chemistry' && (q.id.startsWith('chem-') || q.id.includes('-chem-'))) {
      matchesSubject = true; 
    }
    else if (subjectId === 'english' && (q.id.startsWith('eng-') || q.id.includes('-eng-'))) matchesSubject = true;
    else if (subjectId === 'mathematics' && (q.id.startsWith('math-') || q.id.includes('-math-'))) matchesSubject = true;

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
  
  if (relevantQuestions.length === 0) {
    relevantQuestions = allQuestions.filter(q => {
      const idParts = q.id.split('-');
      let qExamId = null;
      let qSubjectIdPart = idParts[0]; 

      if (exams.some(ex => ex.id === idParts[0])) { 
        qExamId = idParts[0];
        qSubjectIdPart = idParts[1]; 
      }
      
      const subjectMatches = (subjectId.startsWith(qSubjectIdPart) || qSubjectIdPart.startsWith(subjectId.substring(0,4)));
      const examMatches = (qExamId === null || qExamId === examId);

      return subjectMatches && examMatches;
    });
  }
  
  return relevantQuestions.map(q => ({
    questionText: q.text,
    year: q.year,
  }));
}
    

    

  
