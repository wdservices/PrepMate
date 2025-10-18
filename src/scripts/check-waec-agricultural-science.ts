import admin from 'firebase-admin';
import serviceAccount from '../../prepmate-6eb9d-firebase-adminsdk-fbsvc-bcfd6a3146.json';

// Initialize Firebase Admin
if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount as admin.ServiceAccount)
  });
}

const db = admin.firestore();

async function checkWaecAgriculturalScience() {
  try {
    console.log('🔍 Checking WAEC Agricultural Science subject...');

    // 1. Check if Agricultural Science subject exists
    console.log('\n1. Checking Agricultural Science subject document...');
    const agricultureRef = db.doc('exams/waec/subjects/agricultural-science');
    const agricultureDoc = await agricultureRef.get();
    
    if (agricultureDoc.exists) {
      const data = agricultureDoc.data();
      console.log('✅ Agricultural Science subject exists with data:', {
        name: data?.name,
        availableYears: data?.availableYears,
        questionCount: data?.questionCount
      });
    } else {
      console.log('❌ Agricultural Science subject does not exist');
    }

    // 2. Check WAEC exam document for subjects list
    console.log('\n2. Checking WAEC exam document...');
    const waecRef = db.doc('exams/waec');
    const waecDoc = await waecRef.get();
    
    if (waecDoc.exists) {
      const waecData = waecDoc.data();
      const subjects = waecData?.subjects || [];
      console.log('WAEC subjects:', subjects);
      
      const hasAgriculture = subjects.some((subject: any) => 
        subject.id === 'agricultural-science' || 
        subject.name?.toLowerCase().includes('agricultural')
      );
      
      if (hasAgriculture) {
        console.log('✅ Agricultural Science found in WAEC subjects list');
      } else {
        console.log('❌ Agricultural Science not found in WAEC subjects list');
      }
    } else {
      console.log('❌ WAEC exam document does not exist');
    }

    // 3. Check for any existing Agricultural Science questions
    console.log('\n3. Checking for existing Agricultural Science questions...');
    
    // Check year-based structure
    const yearRef = db.doc('exams/waec/subjects/agricultural-science/years/2000');
    const yearDoc = await yearRef.get();
    
    if (yearDoc.exists) {
      console.log('✅ 2000 year document exists for Agricultural Science');
      
      const questionsRef = db.collection('exams/waec/subjects/agricultural-science/years/2000/questions');
      const questionsSnapshot = await questionsRef.get();
      console.log(`Found ${questionsSnapshot.size} questions in year-based collection`);
    } else {
      console.log('❌ 2000 year document does not exist for Agricultural Science');
    }

    // 4. List all existing WAEC subjects
    console.log('\n4. Listing all existing WAEC subjects...');
    const subjectsRef = db.collection('exams/waec/subjects');
    const subjectsSnapshot = await subjectsRef.get();
    
    console.log(`Found ${subjectsSnapshot.size} WAEC subjects:`);
    subjectsSnapshot.forEach(doc => {
      const data = doc.data();
      console.log(`- ${doc.id}: ${data.name} (${data.availableYears?.length || 0} years)`);
    });

  } catch (error) {
    console.error('❌ Error checking Agricultural Science:', error);
    throw error;
  }
}

checkWaecAgriculturalScience();