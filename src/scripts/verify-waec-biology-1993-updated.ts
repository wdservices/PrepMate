import 'dotenv/config';
import { collection, getDocs, query, where, doc, getDoc } from 'firebase/firestore';
import { getFirestoreDb } from '../lib/firebase';

async function verifyWaecBiology1993QuestionsUpdated() {
  try {
    const db = getFirestoreDb();
    console.log('🔍 Verifying WAEC Biology 1993 questions (updated for year-based structure)...');

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
    console.log(`✅ Has year-based structure: ${subjectData.hasYearBasedStructure || false}`);
    
    if (!subjectData.availableYears?.includes(1993)) {
      console.log('⚠️  1993 not found in available years');
    } else {
      console.log('✅ 1993 found in available years');
    }

    // Check questions for 1993 using new year-based structure
    const yearDocRef = doc(db, 'exams', 'waec', 'subjects', 'biology', 'years', '1993');
    const yearDoc = await getDoc(yearDocRef);
    
    if (yearDoc.exists()) {
      console.log('✅ Year 1993 document exists');
      console.log(`📊 Year data:`, yearDoc.data());
      
      // Check questions in year-based collection
      const questionsRef = collection(db, 'exams', 'waec', 'subjects', 'biology', 'years', '1993', 'questions');
      const questionsSnapshot = await getDocs(questionsRef);
      
      console.log(`📊 Total WAEC Biology 1993 questions found: ${questionsSnapshot.size}`);
      
      if (questionsSnapshot.size > 0) {
        // Show sample questions
        console.log('\n📝 Sample questions:');
        const sampleQuestions = questionsSnapshot.docs.slice(0, 3);
        sampleQuestions.forEach((doc, index) => {
          const question = doc.data();
          console.log(`${index + 1}. ID: ${doc.id}`);
          console.log(`   Text: ${question.text?.substring(0, 80)}...`);
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
        console.log('❌ No 1993 questions found in year-based collection');
      }
    } else {
      console.log('❌ Year 1993 document not found');
    }
    
  } catch (error) {
    console.error('❌ Verification failed:', error);
  }
}

verifyWaecBiology1993QuestionsUpdated();