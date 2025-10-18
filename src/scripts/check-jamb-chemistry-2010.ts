import 'dotenv/config';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { getFirestoreDb } from '../lib/firebase';

async function checkJambChemistry2010Questions() {
  try {
    const db = getFirestoreDb();
    console.log('🔍 Checking JAMB Chemistry 2010 questions...');

    // Check if chemistry subject exists for JAMB
    const subjectRef = collection(db, 'exams', 'jamb', 'subjects');
    const subjectQuery = query(subjectRef, where('name', '==', 'Chemistry'));
    const subjectSnapshot = await getDocs(subjectQuery);
    
    if (subjectSnapshot.empty) {
      console.log('❌ JAMB Chemistry subject not found');
      console.log('📋 Recommendation: JAMB Chemistry 2010 questions need to be uploaded');
      return;
    }
    
    const chemistrySubject = subjectSnapshot.docs[0];
    const subjectData = chemistrySubject.data();
    console.log(`✅ JAMB Chemistry subject found with available years: ${subjectData.availableYears?.join(', ')}`);
    
    // Check if 2010 is in available years
    if (!subjectData.availableYears?.includes(2010)) {
      console.log('⚠️  2010 not found in available years');
    } else {
      console.log('✅ 2010 found in available years');
    }

    // Check questions for 2010
    const questionsRef = collection(db, 'exams', 'jamb', 'subjects', 'chemistry', 'questions');
    const questionsQuery = query(questionsRef, where('year', '==', 2010));
    const questionsSnapshot = await getDocs(questionsQuery);
    
    console.log(`📊 Total JAMB Chemistry 2010 questions found: ${questionsSnapshot.size}`);
    
    if (questionsSnapshot.size > 0) {
      // Show sample questions
      console.log('\n📝 Sample questions:');
      const sampleQuestions = questionsSnapshot.docs.slice(0, 3);
      sampleQuestions.forEach((doc, index) => {
        const question = doc.data();
        console.log(`${index + 1}. ID: ${doc.id}`);
        console.log(`   Text: ${question.text.substring(0, 80)}...`);
        console.log(`   Options: ${question.options?.length || 0} options`);
        console.log(`   Correct: ${question.correctOptionId}`);
        console.log('');
      });
      
      console.log('✅ JAMB Chemistry 2010 questions already exist in the database');
      console.log('📋 Recommendation: No need to upload again');
    } else {
      console.log('❌ No JAMB Chemistry 2010 questions found');
      console.log('📋 Recommendation: JAMB Chemistry 2010 questions need to be uploaded');
    }
    
  } catch (error) {
    console.error('❌ Check failed:', error);
  }
}

checkJambChemistry2010Questions();