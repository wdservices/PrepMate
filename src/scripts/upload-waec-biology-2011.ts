import admin from 'firebase-admin';
import { UnifiedQuestion } from '../types/question';
import serviceAccount from '../../prepmate-6eb9d-firebase-adminsdk-fbsvc-bcfd6a3146.json';

// Initialize Firebase Admin
if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount as admin.ServiceAccount)
  });
}

const db = admin.firestore();

const waecBiology2011Questions: UnifiedQuestion[] = [
  { 
    "id": "q1", 
    "text": "Which of the following structures is found in animal cells?", 
    "year": 2011, 
    "correctOptionId": "optB", 
    "options": [ 
      { "id": "optA", "text": "Cell wall" }, 
      { "id": "optB", "text": "Ribosome" }, 
      { "id": "optC", "text": "Middle lamella" }, 
      { "id": "optD", "text": "Pyrenoids" } 
    ], 
    "imageUrl": null 
  }, 
  { 
    "id": "q2", 
    "text": "An organism with no membrane-bounded organelles in its cell, belongs to the kingdom", 
    "year": 2011, 
    "correctOptionId": "optB", 
    "options": [ 
      { "id": "optA", "text": "Protista" }, 
      { "id": "optB", "text": "Monera" }, 
      { "id": "optC", "text": "Animalia" }, 
      { "id": "optD", "text": "Plantae" } 
    ], 
    "imageUrl": null 
  }, 
  { 
    "id": "q3", 
    "text": "Which of the following attributes can be regarded as an advantage of complexity in higher organisms?", 
    "year": 2011, 
    "correctOptionId": "optC", 
    "options": [ 
      { "id": "optA", "text": "There is no cellular differentiation" }, 
      { "id": "optB", "text": "Cellular differentiation leads to loss of independence of cells" }, 
      { "id": "optC", "text": "Cellular differentiation leads to internal structural specialization" }, 
      { "id": "optD", "text": "Cellular differentiation occurs in only few cells" } 
    ], 
    "imageUrl": null 
  }, 
  { 
    "id": "q4", 
    "text": "One characteristic feature of Chlamydomonas is", 
    "year": 2011, 
    "correctOptionId": "optC", 
    "options": [ 
      { "id": "optA", "text": "its star-shaped chloroplast" }, 
      { "id": "optB", "text": "the presence of pseudopodia" }, 
      { "id": "optC", "text": "its cup-shaped chloroplast" }, 
      { "id": "optD", "text": "the presence of nucleus in its cell" } 
    ], 
    "imageUrl": null 
  }, 
  { 
    "id": "q5", 
    "text": "Movement in Euglena is brought about by", 
    "year": 2011, 
    "correctOptionId": "optC", 
    "options": [ 
      { "id": "optA", "text": "rhythmic movement of endoplasm" }, 
      { "id": "optB", "text": "hairs on the flagellum" }, 
      { "id": "optC", "text": "whip-like action of the flagellum" }, 
      { "id": "optD", "text": "contraction of pellicle" } 
    ], 
    "imageUrl": null 
  }, 
  { 
    "id": "q6", 
    "text": "The major difference between osmosis and diffusion is that in osmosis", 
    "year": 2011, 
    "correctOptionId": "optD", 
    "options": [ 
      { "id": "optA", "text": "cells take up nutrients and water" }, 
      { "id": "optB", "text": "oxygen and water move from one part of the organism to another" }, 
      { "id": "optC", "text": "carbon dioxide and water are eliminated from the organism" }, 
      { "id": "optD", "text": "water moves through the cell membrane" } 
    ], 
    "imageUrl": null 
  }, 
  { 
    "id": "q7", 
    "text": "The smell of perfume perceived from a distance is made possible by the process of", 
    "year": 2011, 
    "correctOptionId": "optD", 
    "options": [ 
      { "id": "optA", "text": "osmosis" }, 
      { "id": "optB", "text": "haemolysis" }, 
      { "id": "optC", "text": "cyclosis" }, 
      { "id": "optD", "text": "diffusion" } 
    ], 
    "imageUrl": null 
  }, 
  { 
    "id": "q8", 
    "text": "Aerobic respiration in the cell takes place in the", 
    "year": 2011, 
    "correctOptionId": "optD", 
    "options": [ 
      { "id": "optA", "text": "cytoplasm" }, 
      { "id": "optB", "text": "lysosome" }, 
      { "id": "optC", "text": "nucleus" }, 
      { "id": "optD", "text": "mitochondrion" } 
    ], 
    "imageUrl": null 
  }, 
  { 
    "id": "q9", 
    "text": "The mimosa plant shows nastie movement whenever it is touched, this is due to changes in", 
    "year": 2011, 
    "correctOptionId": "optB", 
    "options": [ 
      { "id": "optA", "text": "transpiration pull on the petal base" }, 
      { "id": "optB", "text": "tugor pressure at the leaf base" }, 
      { "id": "optC", "text": "suction pressure at the roots" }, 
      { "id": "optD", "text": "root pressure at the base" } 
    ], 
    "imageUrl": null 
  }, 
  { 
    "id": "q10", 
    "text": "Which of the following statements is not true of asexual reproduction in a living organism? It", 
    "year": 2011, 
    "correctOptionId": "optC", 
    "options": [ 
      { "id": "optA", "text": "results in the formation of two daughter cells" }, 
      { "id": "optB", "text": "involves only division of somatic cells" }, 
      { "id": "optC", "text": "involves fusion of opposite gametes" }, 
      { "id": "optD", "text": "involves mitotic division of a cell" } 
    ], 
    "imageUrl": null 
  }, 
  { 
    "id": "q11", 
    "text": "In which of the following vessels will a drug injected into the upper arm enters the heart?", 
    "year": 2011, 
    "correctOptionId": "optB", 
    "options": [ 
      { "id": "optA", "text": "Inferior vena cava" }, 
      { "id": "optB", "text": "Superior vena cava" }, 
      { "id": "optC", "text": "Renal artery" }, 
      { "id": "optD", "text": "Pulmonary artery" } 
    ], 
    "imageUrl": null 
  }, 
  { 
    "id": "q12", 
    "text": "Which of the following cells is not an animal cell?", 
    "year": 2011, 
    "correctOptionId": "optD", 
    "options": [ 
      { "id": "optA", "text": "I" }, 
      { "id": "optB", "text": "II" }, 
      { "id": "optC", "text": "IV" }, 
      { "id": "optD", "text": "V" } 
    ], 
    "imageUrl": "cell_diagram.jpg" 
  }, 
  { 
    "id": "q13", 
    "text": "Which pair of cells perform similar functions?", 
    "year": 2011, 
    "correctOptionId": "optD", 
    "options": [ 
      { "id": "optA", "text": "I and II" }, 
      { "id": "optB", "text": "II and III" }, 
      { "id": "optC", "text": "III and IV" }, 
      { "id": "optD", "text": "II and IV" } 
    ], 
    "imageUrl": "cell_diagram.jpg" 
  } ,
  { 
    "id": "q14", 
    "text": "Which of the following cells transmits impulses?", 
    "year": 2011, 
    "correctOptionId": "optB", 
    "options": [ 
      { "id": "optA", "text": "I" }, 
      { "id": "optB", "text": "II" }, 
      { "id": "optC", "text": "III" }, 
      { "id": "optD", "text": "V" } 
    ], 
    "imageUrl": "cell_diagram.jpg" 
  }, 
  { 
    "id": "q15", 
    "text": "In which of the cells is anaerobic respiration likely to take place?", 
    "year": 2011, 
    "correctOptionId": "optB", 
    "options": [ 
      { "id": "optA", "text": "I" }, 
      { "id": "optB", "text": "III" }, 
      { "id": "optC", "text": "IV" }, 
      { "id": "optD", "text": "V" } 
    ], 
    "imageUrl": "cell_diagram.jpg" 
  }, 
  { 
    "id": "q16", 
    "text": "The 'Lub' sound of the heartbeat is due to the flapping close of the", 
    "year": 2011, 
    "correctOptionId": "optB", 
    "options": [ 
      { "id": "optA", "text": "semilunar and bicuspid valves" }, 
      { "id": "optB", "text": "tricuspid and bicuspid valves" }, 
      { "id": "optC", "text": "bicuspid and vena cava valves" }, 
      { "id": "optD", "text": "semilunar and tricuspid valves" } 
    ], 
    "imageUrl": null 
  }, 
  { 
    "id": "q17", 
    "text": "Which of the following hormones is used to prevent stored potatoes from sprouting?", 
    "year": 2011, 
    "correctOptionId": "optD", 
    "options": [ 
      { "id": "optA", "text": "Auxin" }, 
      { "id": "optB", "text": "Cytokinin" }, 
      { "id": "optC", "text": "Ethylene" }, 
      { "id": "optD", "text": "Abscisic acid" } 
    ], 
    "imageUrl": null 
  }, 
  { 
    "id": "q18", 
    "text": "A flower has its stigma above the anther and the anther always ripens before the stigma. What type of pollination will be possible in this type of floral arrangement?", 
    "year": 2011, 
    "correctOptionId": "optB", 
    "options": [ 
      { "id": "optA", "text": "Self pollination" }, 
      { "id": "optB", "text": "Cross pollination" }, 
      { "id": "optC", "text": "Wind pollination" }, 
      { "id": "optD", "text": "Water pollination" } 
    ], 
    "imageUrl": null 
  }, 
  { 
    "id": "q19", 
    "text": "A monoecious plant bears", 
    "year": 2011, 
    "correctOptionId": "optB", 
    "options": [ 
      { "id": "optA", "text": "perfect staminate flowers on the same plant" }, 
      { "id": "optB", "text": "staminate and pistillate flowers on the same plant" }, 
      { "id": "optC", "text": "perfect and pistillate flowers on different plants" }, 
      { "id": "optD", "text": "pistillate and staminate flowers on different plants" } 
    ], 
    "imageUrl": null 
  }, 
  { 
    "id": "q20", 
    "text": "Which of the following insects is not an agent of pollination?", 
    "year": 2011, 
    "correctOptionId": "optC", 
    "options": [ 
      { "id": "optA", "text": "Bees" }, 
      { "id": "optB", "text": "Butterflies" }, 
      { "id": "optC", "text": "Termites" }, 
      { "id": "optD", "text": "Moths" } 
    ], 
    "imageUrl": null 
  }, 
  { 
    "id": "q21", 
    "text": "A plant with one seed leaf in its seed and the floral parts of its flowers in groups of three will likely be", 
    "year": 2011, 
    "correctOptionId": "optC", 
    "options": [ 
      { "id": "optA", "text": "dicotyledonous" }, 
      { "id": "optB", "text": "a gymnosperm" }, 
      { "id": "optC", "text": "monocotyledonous" }, 
      { "id": "optD", "text": "a fern" } 
    ], 
    "imageUrl": null 
  }, 
  { 
    "id": "q22", 
    "text": "A boy puts a straw inside a bottle of coke and observed that the liquid moved up the straw to a level higher than that of the liquid in the bottle. What is the importance of the observed process to the movement of water in plants? It helps plants to", 
    "year": 2011, 
    "correctOptionId": "optB", 
    "options": [ 
      { "id": "optA", "text": "absorb water from the soil" }, 
      { "id": "optB", "text": "move water up the xylem vessels" }, 
      { "id": "optC", "text": "loose water through the leaves" }, 
      { "id": "optD", "text": "move water from the root hairs to the cortex" } 
    ], 
    "imageUrl": null 
  }, 
  { 
    "id": "q23", 
    "text": "Energy is required for each of the following activities except", 
    "year": 2011, 
    "correctOptionId": "optD", 
    "options": [ 
      { "id": "optA", "text": "oxidation of digested food" }, 
      { "id": "optB", "text": "active transport" }, 
      { "id": "optC", "text": "muscular contraction" }, 
      { "id": "optD", "text": "gaseous exchange" } 
    ], 
    "imageUrl": null 
  }, 
  { 
    "id": "q24", 
    "text": "The elements necessary for the formation of chlorophyll in the leaf of a plant are", 
    "year": 2011, 
    "correctOptionId": "optA", 
    "options": [ 
      { "id": "optA", "text": "nitrogen, iron and magnesium" }, 
      { "id": "optB", "text": "nitrogen, calcium, sulphur and iron" }, 
      { "id": "optC", "text": "potassium, calcium and nitrogen" }, 
      { "id": "optD", "text": "manganese, sulphur and phosphorus" } 
    ], 
    "imageUrl": null 
  }, 
  { 
    "id": "q25", 
    "text": "The function of number 5 in the experiment is to eliminate", 
    "year": 2011, 
    "correctOptionId": "optC", 
    "options": [ 
      { "id": "optA", "text": "carbon dioxide" }, 
      { "id": "optB", "text": "oxygen" }, 
      { "id": "optC", "text": "light rays" }, 
      { "id": "optD", "text": "water" } 
    ], 
    "imageUrl": "leaf_experiment.jpg" 
  }, 
  { 
    "id": "q26", 
    "text": "Which parts of the leaf tested positive for starch at the end of the experiment?", 
    "year": 2011, 
    "correctOptionId": "optB", 
    "options": [ 
      { "id": "optA", "text": "1, 2, 3 and 4" }, 
      { "id": "optB", "text": "1, 2, 3 and 6" }, 
      { "id": "optC", "text": "1, 2, 4 and 5" }, 
      { "id": "optD", "text": "1, 2, 5 and 6" } 
    ], 
    "imageUrl": "leaf_experiment.jpg" 
  }
,
  { 
     "id": "q27", 
     "text": "Attachment of the leaf to the parent plant enables it to obtain", 
     "year": 2011, 
     "correctOptionId": "optB", 
     "options": [ 
       { "id": "optA", "text": "chlorophyll" }, 
       { "id": "optB", "text": "water and mineral salts" }, 
       { "id": "optC", "text": "carbon dioxide" }, 
       { "id": "optD", "text": "oxygen" } 
     ], 
     "imageUrl": "leaf_experiment.jpg" 
   }, 
   { 
     "id": "q28", 
     "text": "The title which could be given to the above experiment is", 
     "year": 2011, 
     "correctOptionId": "optC", 
     "options": [ 
       { "id": "optA", "text": "starch is formed after photosynthesis" }, 
       { "id": "optB", "text": "water is necessary for photosynthesis" }, 
       { "id": "optC", "text": "sunlight is necessary for photosynthesis" }, 
       { "id": "optD", "text": "carbon dioxide is necessary for photosynthesis" } 
     ], 
     "imageUrl": "leaf_experiment.jpg" 
   }, 
   { 
     "id": "q29", 
     "text": "A patient's blood was unable to clot on time so the doctor advised him to take more of vitamin", 
     "year": 2011, 
     "correctOptionId": "optD", 
     "options": [ 
       { "id": "optA", "text": "C" }, 
       { "id": "optB", "text": "D" }, 
       { "id": "optC", "text": "E" }, 
       { "id": "optD", "text": "K" } 
     ], 
     "imageUrl": null 
   }, 
   { 
     "id": "q30", 
     "text": "A person suffering from exophthalmic goitre would have all of the following symptoms except", 
     "year": 2011, 
     "correctOptionId": "optA", 
     "options": [ 
       { "id": "optA", "text": "bleeding gums" }, 
       { "id": "optB", "text": "nervousness" }, 
       { "id": "optC", "text": "swollen neck" }, 
       { "id": "optD", "text": "sluggishness" } 
     ], 
     "imageUrl": null 
   }, 
   { 
     "id": "q31", 
     "text": "Which of the following organisms passes more energy to its consumer per unit gram consumed?", 
     "year": 2011, 
     "correctOptionId": "optA", 
     "options": [ 
       { "id": "optA", "text": "Beans" }, 
       { "id": "optB", "text": "Insects" }, 
       { "id": "optC", "text": "Chickens" }, 
       { "id": "optD", "text": "Goats" } 
     ], 
     "imageUrl": null 
   }, 
   { 
     "id": "q32", 
     "text": "The ultimate source of energy is", 
     "year": 2011, 
     "correctOptionId": "optB", 
     "options": [ 
       { "id": "optA", "text": "food" }, 
       { "id": "optB", "text": "sun" }, 
       { "id": "optC", "text": "coal" }, 
       { "id": "optD", "text": "petrol" } 
     ], 
     "imageUrl": null 
   }, 
   { 
     "id": "q33", 
     "text": "Organisms that occupy the second trophic level are called", 
     "year": 2011, 
     "correctOptionId": "optA", 
     "options": [ 
       { "id": "optA", "text": "herbivores" }, 
       { "id": "optB", "text": "carnivores" }, 
       { "id": "optC", "text": "decomposers" }, 
       { "id": "optD", "text": "scavengers" } 
     ], 
     "imageUrl": null 
   }, 
   { 
     "id": "q34", 
     "text": "The feature that prevents water loss from the body of a lizard is the", 
     "year": 2011, 
     "correctOptionId": "optD", 
     "options": [ 
       { "id": "optA", "text": "nuchal crest" }, 
       { "id": "optB", "text": "gular fold" }, 
       { "id": "optC", "text": "nietating membrane" }, 
       { "id": "optD", "text": "horny scales" } 
     ], 
     "imageUrl": null 
   }, 
   { 
     "id": "q35", 
     "text": "Which of the following characteristics is not found in arid land animals?", 
     "year": 2011, 
     "correctOptionId": "optD", 
     "options": [ 
       { "id": "optA", "text": "Nocturnal habits" }, 
       { "id": "optB", "text": "Hard impermeable body covering" }, 
       { "id": "optC", "text": "Production of dry waste materials" }, 
       { "id": "optD", "text": "Broad flattened body" } 
     ], 
     "imageUrl": null 
   }, 
   { 
     "id": "q36", 
     "text": "The following conditions are associated with smoking of cigarettes except", 
     "year": 2011, 
     "correctOptionId": "optD", 
     "options": [ 
       { "id": "optA", "text": "heart diseases" }, 
       { "id": "optB", "text": "slow reflexes" }, 
       { "id": "optC", "text": "poor development of foetus" }, 
       { "id": "optD", "text": "arthritic pains" } 
     ], 
     "imageUrl": null 
   }, 
   { 
     "id": "q37", 
     "text": "Which of the following organisms may bring about reduction in human population?", 
     "year": 2011, 
     "correctOptionId": "optC", 
     "options": [ 
       { "id": "optA", "text": "Trees" }, 
       { "id": "optB", "text": "Butterflies" }, 
       { "id": "optC", "text": "Houseflies" }, 
       { "id": "optD", "text": "Shrubs" } 
     ], 
     "imageUrl": null 
   }, 
   { 
     "id": "q38", 
     "text": "Population is defined as", 
     "year": 2011, 
     "correctOptionId": "optC", 
     "options": [ 
       { "id": "optA", "text": "the number of individual organisms per unit area" }, 
       { "id": "optB", "text": "a progressive series of changes over a period of time in a human community" }, 
       { "id": "optC", "text": "the total number of organisms of the same species living together in a given period of time" }, 
       { "id": "optD", "text": "the total number of different species of communities living in an environment in a given period of time" } 
     ], 
     "imageUrl": null 
   }, 
   { 
     "id": "q39", 
     "text": "The following statements are characteristic of succession except that it", 
     "year": 2011, 
     "correctOptionId": "optD", 
     "options": [ 
       { "id": "optA", "text": "takes place in newly formed habitats" }, 
       { "id": "optB", "text": "involves gradual progressive increase of species over a period of time" }, 
       { "id": "optC", "text": "always involves competition among organisms" }, 
       { "id": "optD", "text": "can start with complex communities" } 
     ], 
     "imageUrl": null 
   }
,
  { 
     "id": "q40", 
     "text": "The following statements are true about climax communities except that", 
     "year": 2011, 
     "correctOptionId": "optC", 
     "options": [ 
       { "id": "optA", "text": "the community is at its equilibrium" }, 
       { "id": "optB", "text": "the community is stable" }, 
       { "id": "optC", "text": "species of plants and animals can change from year to year" }, 
       { "id": "optD", "text": "the vegetation reaches the highest development" } 
     ], 
     "imageUrl": null 
   }, 
   { 
     "id": "q41", 
     "text": "Poisonous substances produced by bacteria in plants or animal bodies are called", 
     "year": 2011, 
     "correctOptionId": "optD", 
     "options": [ 
       { "id": "optA", "text": "antibodies" }, 
       { "id": "optB", "text": "antiseptics" }, 
       { "id": "optC", "text": "hormones" }, 
       { "id": "optD", "text": "toxins" } 
     ], 
     "imageUrl": null 
   }, 
   { 
     "id": "q42", 
     "text": "Which of the following natural resources is non-renewable?", 
     "year": 2011, 
     "correctOptionId": "optC", 
     "options": [ 
       { "id": "optA", "text": "Soil" }, 
       { "id": "optB", "text": "Water" }, 
       { "id": "optC", "text": "Solid mineral" }, 
       { "id": "optD", "text": "Wildlife" } 
     ], 
     "imageUrl": null 
   }, 
   { 
     "id": "q43", 
     "text": "Which of the following occurrences is not an advantage of forest conservation?", 
     "year": 2011, 
     "correctOptionId": "optC", 
     "options": [ 
       { "id": "optA", "text": "Increased rainfall" }, 
       { "id": "optB", "text": "Purification of the atmosphere" }, 
       { "id": "optC", "text": "Production of timber" }, 
       { "id": "optD", "text": "Preservation of natural habitats" } 
     ], 
     "imageUrl": null 
   }, 
   { 
     "id": "q44", 
     "text": "Importance of conservation of wildlife include the following except", 
     "year": 2011, 
     "correctOptionId": "optC", 
     "options": [ 
       { "id": "optA", "text": "generation of income through tourism" }, 
       { "id": "optB", "text": "preservation of natural habitats" }, 
       { "id": "optC", "text": "generation of income through sale of ivory" }, 
       { "id": "optD", "text": "maintaining the balance of the ecosystem" } 
     ], 
     "imageUrl": null 
   }, 
   { 
     "id": "q45", 
     "text": "A mother is likely to be able to distinguish between her identical twin daughters because of", 
     "year": 2011, 
     "correctOptionId": "optA", 
     "options": [ 
       { "id": "optA", "text": "physiological variations" }, 
       { "id": "optB", "text": "morphological variations" }, 
       { "id": "optC", "text": "character variations" }, 
       { "id": "optD", "text": "genetic variations" } 
     ], 
     "imageUrl": null 
   }, 
   { 
     "id": "q46", 
     "text": "Which of the following factors does not contribute to variations in living organisms?", 
     "year": 2011, 
     "correctOptionId": "optA", 
     "options": [ 
       { "id": "optA", "text": "Mitosis" }, 
       { "id": "optB", "text": "Meiosis" }, 
       { "id": "optC", "text": "Mutation" }, 
       { "id": "optD", "text": "Environment" } 
     ], 
     "imageUrl": null 
   }, 
   { 
     "id": "q47", 
     "text": "Which of the following traits shows clear-cut differences with no intermediate forms?", 
     "year": 2011, 
     "correctOptionId": "optB", 
     "options": [ 
       { "id": "optA", "text": "Intelligence" }, 
       { "id": "optB", "text": "Sex" }, 
       { "id": "optC", "text": "Skin colour" }, 
       { "id": "optD", "text": "Comb shape" } 
     ], 
     "imageUrl": null 
   }, 
   { 
     "id": "q48", 
     "text": "Variation in organisms can be described as when the", 
     "year": 2011, 
     "correctOptionId": "optB", 
     "options": [ 
       { "id": "optA", "text": "organisms feed on different types of food" }, 
       { "id": "optB", "text": "organisms show different traits from each other" }, 
       { "id": "optC", "text": "offspring resemble the parents" }, 
       { "id": "optD", "text": "organisms are living in different communities" } 
     ], 
     "imageUrl": null 
   }, 
   { 
     "id": "q49", 
     "text": "The simplest unit for transfer of character from parents to offspring is the", 
     "year": 2011, 
     "correctOptionId": "optB", 
     "options": [ 
       { "id": "optA", "text": "chromosome" }, 
       { "id": "optB", "text": "gene" }, 
       { "id": "optC", "text": "DNA" }, 
       { "id": "optD", "text": "ribosome" } 
     ], 
     "imageUrl": null 
   }, 
   { 
     "id": "q50", 
     "text": "Which of the following statements about chromosomes is correct?", 
     "year": 2011, 
     "correctOptionId": "optD", 
     "options": [ 
       { "id": "optA", "text": "In kidney cells of diploid organisms, chromosomes occur singly" }, 
       { "id": "optB", "text": "In gametes, chromosomes occur in pairs" }, 
       { "id": "optC", "text": "A given species always has a varying number of homologous chromosomes" }, 
       { "id": "optD", "text": "In gonads, chromosomes occur in pairs" } 
     ], 
     "imageUrl": null 
   }, 
   { 
     "id": "q51", 
     "text": "Deoxyribonucleic acid is most suitable for the transmission of information from generation to generation through chromosomes because it", 
     "year": 2011, 
     "correctOptionId": "optC", 
     "options": [ 
       { "id": "optA", "text": "is made up of anti-parallel chains" }, 
       { "id": "optB", "text": "is made up of nucleotides" }, 
       { "id": "optC", "text": "has the ability to replicate" }, 
       { "id": "optD", "text": "is made up of a sugar, an acid and a base" } 
     ], 
     "imageUrl": null
  },
  { 
     "id": "q52", 
     "text": "Which of the following statements is correct about genes? They", 
     "year": 2011, 
     "correctOptionId": "optC", 
     "options": [ 
       { "id": "optA", "text": "diminish with ageing" }, 
       { "id": "optB", "text": "are usually affected by the environment" }, 
       { "id": "optC", "text": "remain constant throughout life" }, 
       { "id": "optD", "text": "grow with ageing" } 
     ], 
     "imageUrl": null 
   }, 
   { 
     "id": "q53", 
     "text": "The major difference between genotype and phenotype is that phenotype", 
     "year": 2011, 
     "correctOptionId": "optC", 
     "options": [ 
       { "id": "optA", "text": "is an observable trait while genotype is a dominant character" }, 
       { "id": "optB", "text": "is an observable trait while genotype is a recessive character" }, 
       { "id": "optC", "text": "is the sum total of observable traits while genotype is the sum total of dominant and recessive genes" }, 
       { "id": "optD", "text": "is an observed feature in female offspring while genotype is the sum total of genes inherited in male offspring" } 
     ], 
     "imageUrl": null 
   }, 
   { 
     "id": "q54", 
     "text": "Which of the following statements is true about carriers of sickle cell trait?", 
     "year": 2011, 
     "correctOptionId": "optC", 
     "options": [ 
       { "id": "optA", "text": "They are often short of blood" }, 
       { "id": "optB", "text": "They have joint pains" }, 
       { "id": "optC", "text": "They are resistant to malaria" }, 
       { "id": "optD", "text": "All their blood cells are sickle-shaped" } 
     ], 
     "imageUrl": null 
   }, 
   { 
     "id": "q55", 
     "text": "A pregnant woman was successfully transfused with blood from her husband who has blood group AB. What is the blood group of the woman?", 
     "year": 2011, 
     "correctOptionId": "optD", 
     "options": [ 
       { "id": "optA", "text": "A" }, 
       { "id": "optB", "text": "B" }, 
       { "id": "optC", "text": "AB" }, 
       { "id": "optD", "text": "O" } 
     ], 
     "imageUrl": null 
   }, 
   { 
     "id": "q56", 
     "text": "The caste that carries out tail-waggling dance in bees is the", 
     "year": 2011, 
     "correctOptionId": "optC", 
     "options": [ 
       { "id": "optA", "text": "drone" }, 
       { "id": "optB", "text": "queen" }, 
       { "id": "optC", "text": "worker" }, 
       { "id": "optD", "text": "soldier termite" } 
     ], 
     "imageUrl": null 
   }, 
   { 
     "id": "q57", 
     "text": "The process of natural selection results in", 
     "year": 2011, 
     "correctOptionId": "optC", 
     "options": [ 
       { "id": "optA", "text": "cattle with high milk yield" }, 
       { "id": "optB", "text": "disease resistant crops" }, 
       { "id": "optC", "text": "insecticide resistant mosquitoes" }, 
       { "id": "optD", "text": "seedless oranges" } 
     ], 
     "imageUrl": null 
   }, 
   { 
     "id": "q58", 
     "text": "Larmack's theory of evolution consists of the following except", 
     "year": 2011, 
     "correctOptionId": "optC", 
     "options": [ 
       { "id": "optA", "text": "influence of the environment" }, 
       { "id": "optB", "text": "use and disuse of body parts" }, 
       { "id": "optC", "text": "survival of the fittest" }, 
       { "id": "optD", "text": "inheritance of acquired characters" } 
     ], 
     "imageUrl": null 
   }, 
   { 
     "id": "q59", 
     "text": "The major reason why Mendel covered artificially pollinated flowers with small paper bag was to", 
     "year": 2011, 
     "correctOptionId": "optD", 
     "options": [ 
       { "id": "optA", "text": "prevent pollen grains from being carried away by insects" }, 
       { "id": "optB", "text": "provide suitable temperature for germination" }, 
       { "id": "optC", "text": "prevent pollen grains from being carried away by rainwater" }, 
       { "id": "optD", "text": "prevent the chance of natural pollution" } 
     ], 
     "imageUrl": null 
   }, 
   { 
     "id": "q60", 
     "text": "A student defined chromosome as a thread-like material found in the cytoplasm. What is wrong with the definition? Its", 
     "year": 2011, 
     "correctOptionId": "optA", 
     "options": [ 
       { "id": "optA", "text": "location" }, 
       { "id": "optB", "text": "shape" }, 
       { "id": "optC", "text": "size" }, 
       { "id": "optD", "text": "structure" } 
     ], 
     "imageUrl": null 
   }
];

async function uploadQuestions() {
  try {
    const collectionRef = db.collection('exams/waec/subjects/biology/questions');
    for (const question of waecBiology2011Questions) {
      await collectionRef.doc(question.id).set(question);
      console.log(`Uploaded question ${question.id}`);
    }
    console.log('Bulk upload completed successfully');
  } catch (error) {
    console.error('Error uploading questions:', error);
  }
}

uploadQuestions();