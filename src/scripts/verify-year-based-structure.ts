import 'dotenv/config';
import { collection, getDocs, query, where, doc, getDoc } from 'firebase/firestore';
import { getFirestoreDb } from '../lib/firebase';

async function verifyYearBasedStructure() {
  const db = getFirestoreDb();
  if (!db) {
    console.error('❌ Firestore not initialized');
    return;
  }

  console.log('🔍 Verifying year-based structure...');

  try {
    // Test with WAEC Biology 1993
    console.log('\n📋 Testing WAEC Biology 1993:');
    
    // Check if year document exists
    const yearDocRef = doc(db, 'exams', 'waec', 'subjects', 'biology', 'years', '1993');
    const yearDoc = await getDoc(yearDocRef);
    
    if (yearDoc.exists()) {
      console.log('✅ Year 1993 document exists');
      console.log(`📊 Year data:`, yearDoc.data());
      
      // Check questions in year-based collection
      const yearQuestionsRef = collection(db, 'exams', 'waec', 'subjects', 'biology', 'years', '1993', 'questions');
      const yearQuestionsSnapshot = await getDocs(yearQuestionsRef);
      
      console.log(`📊 Found ${yearQuestionsSnapshot.size} questions in year-based collection`);
      
      if (yearQuestionsSnapshot.size > 0) {
        console.log('\n📝 Sample questions from year-based collection:');
        const sampleQuestions = yearQuestionsSnapshot.docs.slice(0, 2);
        sampleQuestions.forEach((doc, index) => {
          const question = doc.data();
          console.log(`${index + 1}. ID: ${doc.id}`);
          console.log(`   Text: ${question.text?.substring(0, 60)}...`);
          console.log(`   Year: ${question.year}`);
          console.log(`   Options: ${question.options?.length || 0}`);
          console.log('');
        });
      }
    } else {
      console.log('❌ Year 1993 document not found');
    }

    // Test with JAMB Chemistry 2010
    console.log('\n📋 Testing JAMB Chemistry 2010:');
    
    const chemYearDocRef = doc(db, 'exams', 'jamb', 'subjects', 'chemistry', 'years', '2010');
    const chemYearDoc = await getDoc(chemYearDocRef);
    
    if (chemYearDoc.exists()) {
      console.log('✅ Year 2010 document exists for Chemistry');
      
      const chemQuestionsRef = collection(db, 'exams', 'jamb', 'subjects', 'chemistry', 'years', '2010', 'questions');
      const chemQuestionsSnapshot = await getDocs(chemQuestionsRef);
      
      console.log(`📊 Found ${chemQuestionsSnapshot.size} questions in year-based collection`);
    } else {
      console.log('❌ Year 2010 document not found for Chemistry');
    }

    // Check subject documents for year-based structure flag
    console.log('\n📋 Checking subject documents:');
    
    const waecBiologyRef = doc(db, 'exams', 'waec', 'subjects', 'biology');
    const waecBiologyDoc = await getDoc(waecBiologyRef);
    
    if (waecBiologyDoc.exists()) {
      const subjectData = waecBiologyDoc.data();
      console.log(`✅ WAEC Biology hasYearBasedStructure: ${subjectData.hasYearBasedStructure || false}`);
      console.log(`📅 Available years: ${subjectData.availableYears?.join(', ')}`);
    }

    const jambChemistryRef = doc(db, 'exams', 'jamb', 'subjects', 'chemistry');
    const jambChemistryDoc = await getDoc(jambChemistryRef);
    
    if (jambChemistryDoc.exists()) {
      const subjectData = jambChemistryDoc.data();
      console.log(`✅ JAMB Chemistry hasYearBasedStructure: ${subjectData.hasYearBasedStructure || false}`);
      console.log(`📅 Available years: ${subjectData.availableYears?.join(', ')}`);
    }

    // Test querying by year
    console.log('\n📋 Testing year-based queries:');
    
    // This would be the new way to get questions for a specific year
    const biology1993Questions = await getQuestionsByYear('waec', 'biology', 1993);
    console.log(`✅ Retrieved ${biology1993Questions.length} questions for WAEC Biology 1993 using new structure`);

    console.log('\n🎉 Verification completed!');

  } catch (error) {
    console.error('❌ Verification failed:', error);
  }
}

async function getQuestionsByYear(examId: string, subjectId: string, year: number) {
  const db = getFirestoreDb();
  const questionsRef = collection(db, 'exams', examId, 'subjects', subjectId, 'years', year.toString(), 'questions');
  const snapshot = await getDocs(questionsRef);
  
  return snapshot.docs.map(doc => ({
    id: doc.id,
    ...doc.data()
  }));
}

// Run the verification
verifyYearBasedStructure().catch(console.error);