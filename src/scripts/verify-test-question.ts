import 'dotenv/config';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { getFirestoreDb } from '../lib/firebase';

async function verifyTestQuestion() {
  try {
    const db = getFirestoreDb();
    console.log('🔍 Verifying the test question upload...');

    // Check if the test question exists
    const questionsRef = collection(db, 'exams', 'waec', 'subjects', 'biology', 'questions');
    const questionsQuery = query(questionsRef, where('year', '==', 2024));
    const questionsSnapshot = await getDocs(questionsQuery);
    
    console.log(`📊 Found ${questionsSnapshot.size} questions for WAEC Biology 2024`);
    
    if (questionsSnapshot.size > 0) {
      console.log('\n📝 Test question details:');
      questionsSnapshot.forEach((doc, index) => {
        const question = doc.data();
        console.log(`${index + 1}. ID: ${doc.id}`);
        console.log(`   Text: ${question.text}`);
        console.log(`   Year: ${question.year}`);
        console.log(`   Options: ${question.options?.length || 0}`);
        console.log(`   Correct: ${question.correctOptionId}`);
        console.log('');
      });
      
      console.log('✅ Test question successfully verified in the database!');
    } else {
      console.log('❌ No 2024 questions found');
    }
    
    // Also check the available years for Biology
    const subjectRef = collection(db, 'exams', 'waec', 'subjects');
    const subjectQuery = query(subjectRef, where('name', '==', 'Biology'));
    const subjectSnapshot = await getDocs(subjectQuery);
    
    if (!subjectSnapshot.empty) {
      const biologySubject = subjectSnapshot.docs[0];
      const subjectData = biologySubject.data();
      console.log(`📅 Biology subject available years: ${subjectData.availableYears?.join(', ')}`);
      
      if (subjectData.availableYears?.includes(2024)) {
        console.log('✅ Year 2024 is included in available years');
      } else {
        console.log('⚠️  Year 2024 is not in available years (this is expected for manual upload)');
      }
    }
    
  } catch (error) {
    console.error('❌ Verification failed:', error);
  }
}

verifyTestQuestion();