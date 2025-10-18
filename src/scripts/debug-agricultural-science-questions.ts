import admin from 'firebase-admin';
import serviceAccount from '../../prepmate-6eb9d-firebase-adminsdk-fbsvc-bcfd6a3146.json';

// Initialize Firebase Admin
if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount as admin.ServiceAccount)
  });
}

const db = admin.firestore();

async function debugAgriculturalScienceQuestions() {
  try {
    console.log('🔍 Debugging Agricultural Science 2000 questions...');

    // 1. Check subject document
    console.log('\n1. Checking subject document...');
    const subjectRef = db.doc('exams/waec/subjects/agricultural-science');
    const subjectDoc = await subjectRef.get();
    
    if (subjectDoc.exists) {
      console.log('✅ Subject document exists:', subjectDoc.data());
    } else {
      console.log('❌ Subject document does not exist');
      return;
    }

    // 2. Check year document
    console.log('\n2. Checking year document...');
    const yearRef = db.doc('exams/waec/subjects/agricultural-science/years/2000');
    const yearDoc = await yearRef.get();
    
    if (yearDoc.exists) {
      console.log('✅ Year document exists:', yearDoc.data());
    } else {
      console.log('❌ Year document does not exist');
      return;
    }

    // 3. Check questions collection
    console.log('\n3. Checking questions collection...');
    const questionsRef = db.collection('exams/waec/subjects/agricultural-science/years/2000/questions');
    const questionsSnapshot = await questionsRef.limit(5).get();
    
    console.log(`📊 Found ${questionsSnapshot.size} questions (showing first 5)`);
    
    questionsSnapshot.forEach((doc, index) => {
      const data = doc.data();
      console.log(`\nQuestion ${index + 1} (${doc.id}):`);
      console.log(`  Text: ${data.text?.substring(0, 100)}...`);
      console.log(`  Year: ${data.year}`);
      console.log(`  Options: ${data.options?.length} options`);
      console.log(`  Correct Answer: ${data.correctOptionId || 'null'}`);
    });

    // 4. Get total count
    console.log('\n4. Getting total question count...');
    const allQuestionsSnapshot = await questionsRef.get();
    console.log(`📈 Total questions in collection: ${allQuestionsSnapshot.size}`);

    // 5. Check WAEC exam document
    console.log('\n5. Checking WAEC exam document...');
    const waecRef = db.doc('exams/waec');
    const waecDoc = await waecRef.get();
    
    if (waecDoc.exists) {
      const waecData = waecDoc.data();
      const subjects = waecData?.subjects || [];
      console.log('WAEC subjects:', subjects.map((s: any) => `${s.id} (${s.name})`));
      
      const agricultureSubject = subjects.find((s: any) => s.id === 'agricultural-science');
      if (agricultureSubject) {
        console.log('✅ Agricultural Science found in subjects list:', agricultureSubject);
      } else {
        console.log('❌ Agricultural Science not found in subjects list');
      }
    }

    // 6. Test a specific question
    console.log('\n6. Testing specific question access...');
    const specificQuestionRef = db.doc('exams/waec/subjects/agricultural-science/years/2000/questions/q1');
    const specificQuestionDoc = await specificQuestionRef.get();
    
    if (specificQuestionDoc.exists) {
      console.log('✅ Question q1 exists:', {
        id: specificQuestionDoc.data()?.id,
        text: specificQuestionDoc.data()?.text?.substring(0, 50) + '...',
        optionsCount: specificQuestionDoc.data()?.options?.length
      });
    } else {
      console.log('❌ Question q1 does not exist');
    }

  } catch (error) {
    console.error('❌ Error debugging Agricultural Science questions:', error);
    throw error;
  }
}

debugAgriculturalScienceQuestions();