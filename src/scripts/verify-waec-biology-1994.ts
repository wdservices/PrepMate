import 'dotenv/config';
import { collection, getDocs, query, where, doc, getDoc } from 'firebase/firestore';
import { getFirestoreDb } from '../lib/firebase';

async function verifyWaecBiology1994Questions() {
  try {
    const db = getFirestoreDb();
    console.log('🔍 Verifying WAEC Biology 1994 questions...');

    // Check if biology subject exists with 1994 in availableYears
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
    
    if (!subjectData.availableYears?.includes(1994)) {
      console.log('❌ 1994 not found in available years');
      return;
    } else {
      console.log('✅ 1994 found in available years');
    }

    // Check year document for 1994
    const yearDocRef = doc(db, 'exams', 'waec', 'subjects', 'biology', 'years', '1994');
    const yearDoc = await getDoc(yearDocRef);
    
    if (yearDoc.exists()) {
      console.log('✅ Year 1994 document exists');
      const yearData = yearDoc.data();
      console.log(`📊 Year data:`, {
        year: yearData.year,
        totalQuestions: yearData.totalQuestions,
        examId: yearData.examId,
        subjectId: yearData.subjectId
      });
      
      // Check questions in year-based collection
      const yearQuestionsRef = collection(db, 'exams', 'waec', 'subjects', 'biology', 'years', '1994', 'questions');
      const yearQuestionsSnapshot = await getDocs(yearQuestionsRef);
      
      console.log(`📊 Found ${yearQuestionsSnapshot.size} questions in year-based collection`);
      
      if (yearQuestionsSnapshot.size > 0) {
        console.log('\n📝 Sample questions from year-based collection:');
        const sampleQuestions = yearQuestionsSnapshot.docs.slice(0, 3);
        sampleQuestions.forEach((doc, index) => {
          const question = doc.data();
          console.log(`${index + 1}. ID: ${doc.id}`);
          console.log(`   Text: ${question.text?.substring(0, 80)}...`);
          console.log(`   Year: ${question.year}`);
          console.log(`   Options: ${question.options?.length || 0}`);
          console.log(`   Correct: ${question.correctOptionId}`);
          console.log(`   Subject: ${question.subjectId}`);
          console.log(`   Exam: ${question.examId}`);
          console.log('');
        });
        
        // Verify all questions have year 1994
        let correctYearCount = 0;
        yearQuestionsSnapshot.forEach((doc) => {
          const question = doc.data();
          if (question.year === 1994) {
            correctYearCount++;
          }
        });
        
        console.log(`✅ Questions with correct year (1994): ${correctYearCount}/${yearQuestionsSnapshot.size}`);
        
        if (correctYearCount === yearQuestionsSnapshot.size) {
          console.log('🎉 All questions have the correct year!');
        } else {
          console.log('⚠️ Some questions have incorrect year values');
        }
        
        console.log('\n✅ WAEC Biology 1994 questions successfully verified in the database!');
      } else {
        console.log('❌ No questions found in year-based collection');
      }
    } else {
      console.log('❌ Year 1994 document not found');
    }
    
  } catch (error) {
    console.error('❌ Error verifying WAEC Biology 1994 questions:', error);
    throw error;
  }
}

// Run the verification
verifyWaecBiology1994Questions().then(() => {
  console.log('🏁 Verification script completed');
  process.exit(0);
}).catch((error) => {
  console.error('💥 Verification script failed:', error);
  process.exit(1);
});