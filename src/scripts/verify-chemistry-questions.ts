import { db } from '@/lib/firebase';
import { collection, getDocs, query, where, orderBy } from 'firebase/firestore';

async function verifyChemistryQuestions() {
  try {
    console.log('🔍 Verifying JAMB Chemistry 2010 questions in Firestore...\n');
    
    // Query the questions collection
    const questionsRef = collection(db, 'exams', 'jamb', 'subjects', 'chemistry', 'questions');
    const q = query(questionsRef, orderBy('createdAt'));
    
    const querySnapshot = await getDocs(q);
    const questions: any[] = [];
    
    querySnapshot.forEach((doc) => {
      questions.push({
        id: doc.id,
        ...doc.data()
      });
    });
    
    console.log(`✅ Found ${questions.length} questions in Firestore`);
    
    // Check if we have all 50 questions
    if (questions.length === 50) {
      console.log('✅ All 50 JAMB Chemistry 2010 questions are present!');
    } else {
      console.log(`❌ Missing ${50 - questions.length} questions. Expected 50, found ${questions.length}.`);
      
      // Find missing question numbers
      const questionNumbers = new Set(questions.map(q => q.questionNumber));
      const missingNumbers = [];
      
      for (let i = 1; i <= 50; i++) {
        if (!questionNumbers.has(i)) {
          missingNumbers.push(i);
        }
      }
      
      if (missingNumbers.length > 0) {
        console.log('\nMissing question numbers:', missingNumbers.join(', '));
      }
    }
    
    // Log first few questions as a sample
    console.log('\nSample questions:');
    questions.slice(0, 3).forEach((q, index) => {
      console.log(`\nQuestion ${index + 1}:`);
      console.log(`ID: ${q.id}`);
      console.log(`Text: ${q.text?.substring(0, 50)}...`);
      console.log(`Answer: ${q.answer}`);
      console.log(`Has image: ${!!q.imageUrl}`);
    });
    
  } catch (error) {
    console.error('Error verifying questions:', error);
  } finally {
    process.exit(0);
  }
}

verifyChemistryQuestions();
