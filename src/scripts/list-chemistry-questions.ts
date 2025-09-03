import { db } from '../lib/firebase';
import { collection, getDocs, query, orderBy, where, DocumentData } from 'firebase/firestore';

if (!db) {
  throw new Error('Firebase not initialized');
}

async function listChemistryQuestions() {
  try {
    console.log('🔍 Listing JAMB Chemistry 2010 questions from Firestore...');
    
    // Get all questions from Firestore
    const questionsRef = collection(db, 'exams', 'jamb', 'subjects', 'chemistry', 'questions');
    const q = query(questionsRef, orderBy('id'));
    const querySnapshot = await getDocs(q);
    
    console.log(`\n📋 Found ${querySnapshot.size} questions in Firestore:`);
    
    // Track found and missing questions
    const foundIds = new Set<string>();
    const allQuestionIds = new Set(Array.from({length: 50}, (_, i) => `chem2010_q${i+1}`));
    
    // Process found questions
    querySnapshot.forEach((doc) => {
      const data = doc.data();
      const id = (data.id || doc.id) as string;
      const text = typeof data.text === 'string' ? data.text : 'No text';
      console.log(`- ${id} (${text.substring(0, 50)}...)`);
      foundIds.add(id);
    });
    
    // Find missing questions
    const missingQuestions: string[] = [];
    allQuestionIds.forEach((id: string) => {
      if (!foundIds.has(id)) {
        missingQuestions.push(id);
      }
    });
    
    // Display results
    if (missingQuestions.length > 0) {
      console.log(`\n❌ Missing ${missingQuestions.length} questions:`);
      console.log(missingQuestions.sort().join(', '));
      
      // Check if we can find these questions with different IDs
      console.log('\n🔍 Checking for questions with different IDs...');
      for (const missingId of missingQuestions) {
        const qNum = missingId.split('_q')[1];
        const textQuery = query(
          questionsRef, 
          where('text', '>=', `Question ${qNum}`),
          where('text', '<=', `Question ${qNum}~`)
        );
        const snapshot = await getDocs(textQuery);
        if (!snapshot.empty) {
          console.log(`\n⚠️ Found potential match for ${missingId}:`);
          snapshot.forEach(doc => {
            const data = doc.data();
            const text = typeof data.text === 'string' ? data.text : 'No text';
            console.log(`- ID: ${doc.id}, Text: ${text.substring(0, 80)}...`);
          });
        }
      }
    } else {
      console.log('\n✅ All 50 questions are present in Firestore!');
    }
    
  } catch (error) {
    console.error('Error listing questions:', error);
  } finally {
    process.exit(0);
  }
}

listChemistryQuestions();
