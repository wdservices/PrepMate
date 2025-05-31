
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
  { id: "chemistry", name: "Chemistry", icon: FlaskConical, availableYears: [2010, 2011], description: "Scientific discipline involving elements and compounds and their transformations." },
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
    // Ensure 2011 is in availableYears for Chemistry if not already present
    const updatedYears = new Set([...subject.availableYears, 2011]);
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
  ...chemistryQuestions2010, // Generic chemistry 2010
  ...jambChemistry2010,   // JAMB specific chemistry 2010
  ...jambChemistry2011,   // JAMB specific chemistry 2011
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
    
