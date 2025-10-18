import 'dotenv/config';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { getFirestoreDb } from '../lib/firebase';

async function verifyWaecBiology1993Questions() {
  try {
    const db = getFirestoreDb();
    console.log('🔍 Verifying WAEC Biology 1993 questions...');

    // Check if biology subject exists with 1993 in availableYears
    const subjectRef = collection(db, 'exams', 'waec', 'subjects');
    const subjectQuery = query(subjectRef, where('name', '==', 'Biology'));
    const subjectSnapshot = await getDocs(subjectQuery);
    
    if (subjectSnapshot.empty) {
      console.log('❌ Biology subject not found');
      return;
    }
    
    const biologySubject = subjectSnapshot.docs[0];
    const subjectData = biologySubject.data();
    console.log(`✅ Biology subject found with available years: ${subjectData.availableYears?.join(', ')}`);
    
    if (!subjectData.availableYears?.includes(1993)) {
      console.log('⚠️  1993 not found in available years');
    } else {
      console.log('✅ 1993 found in available years');
    }

    // Check questions for 1993
    const questionsRef = collection(db, 'exams', 'waec', 'subjects', 'biology', 'questions');
    const questionsQuery = query(questionsRef, where('year', '==', 1993));
    const questionsSnapshot = await getDocs(questionsQuery);
    
    console.log(`📊 Total WAEC Biology 1993 questions found: ${questionsSnapshot.size}`);
    
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
        console.log(`   Image: ${question.imageUrl || 'None'}`);
        console.log('');
      });
      
      // Check for questions with images
      const questionsWithImages = questionsSnapshot.docs.filter(doc => doc.data().imageUrl);
      console.log(`📷 Questions with images: ${questionsWithImages.length}`);
      
      // Verify question IDs are in correct format
      const invalidIds = questionsSnapshot.docs.filter(doc => !doc.id.startsWith('q'));
      if (invalidIds.length > 0) {
        console.log(`⚠️  Found ${invalidIds.length} questions with invalid IDs`);
      } else {
        console.log('✅ All question IDs are valid');
      }
      
      console.log('\n🎉 Verification completed successfully!');
    } else {
      console.log('❌ No 1993 questions found');
    }
    
  } catch (error) {
    console.error('❌ Verification failed:', error);
  }
}

verifyWaecBiology1993Questions();