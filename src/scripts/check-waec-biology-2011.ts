import 'dotenv/config';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { getFirestoreDb } from '../lib/firebase';

async function checkWaecBiology2011Questions() {
  try {
    const db = getFirestoreDb();
    console.log('🔍 Checking WAEC Biology 2011 questions...');

    // Check if biology subject exists for WAEC
    const subjectRef = collection(db, 'exams', 'waec', 'subjects');
    const subjectQuery = query(subjectRef, where('name', '==', 'Biology'));
    const subjectSnapshot = await getDocs(subjectQuery);
    
    if (subjectSnapshot.empty) {
      console.log('❌ WAEC Biology subject not found');
      console.log('📋 Recommendation: WAEC Biology 2011 questions need to be uploaded');
      return;
    }
    
    const biologySubject = subjectSnapshot.docs[0];
    const subjectData = biologySubject.data();
    console.log(`✅ WAEC Biology subject found with available years: ${subjectData.availableYears?.join(', ')}`);
    
    // Check if 2011 is in available years
    if (!subjectData.availableYears?.includes(2011)) {
      console.log('⚠️  2011 not found in available years');
    } else {
      console.log('✅ 2011 found in available years');
    }

    // Check questions for 2011
    const questionsRef = collection(db, 'exams', 'waec', 'subjects', 'biology', 'questions');
    const questionsQuery = query(questionsRef, where('year', '==', 2011));
    const questionsSnapshot = await getDocs(questionsQuery);
    
    console.log(`📊 Total WAEC Biology 2011 questions found: ${questionsSnapshot.size}`);
    
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
      
      console.log('✅ WAEC Biology 2011 questions already exist in the database');
      console.log('📋 Recommendation: No need to upload again');
    } else {
      console.log('❌ No WAEC Biology 2011 questions found');
      console.log('📋 Recommendation: WAEC Biology 2011 questions need to be uploaded');
    }
    
  } catch (error) {
    console.error('❌ Check failed:', error);
  }
}

checkWaecBiology2011Questions();