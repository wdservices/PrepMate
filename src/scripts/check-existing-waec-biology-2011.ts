import { initializeApp } from 'firebase/app';
import { getFirestore, doc, getDoc, collection, getDocs } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

async function checkExisting2011Questions() {
  try {
    console.log('🔍 Checking existing WAEC Biology 2011 questions in Firestore...\n');

    // Check if biology subject has 2011 in availableYears
    const subjectRef = doc(db, 'exams/waec/subjects/biology');
    const subjectDoc = await getDoc(subjectRef);
    
    if (subjectDoc.exists()) {
      const subjectData = subjectDoc.data();
      console.log('📚 Biology subject data:');
      console.log('   Available Years:', subjectData.availableYears);
      console.log('   Has 2011:', subjectData.availableYears?.includes(2011) ? '✅ Yes' : '❌ No');
    } else {
      console.log('❌ Biology subject document does not exist');
      return;
    }

    // Check if 2011 year document exists
    const yearRef = doc(db, 'exams/waec/subjects/biology/years/2011');
    const yearDoc = await getDoc(yearRef);
    
    if (yearDoc.exists()) {
      const yearData = yearDoc.data();
      console.log('\n📅 2011 year document:');
      console.log('   Question Count:', yearData.questionCount || 0);
      console.log('   Created At:', yearData.createdAt?.toDate?.() || 'Unknown');
      console.log('   Updated At:', yearData.updatedAt?.toDate?.() || 'Unknown');
    } else {
      console.log('\n❌ 2011 year document does not exist');
    }

    // Check questions in year-based collection
    const questionsRef = collection(db, 'exams/waec/subjects/biology/years/2011/questions');
    const questionsSnapshot = await getDocs(questionsRef);
    
    console.log('\n📝 Questions in year-based collection:');
    console.log('   Total Questions:', questionsSnapshot.size);
    
    if (questionsSnapshot.size > 0) {
      console.log('\n   Sample questions:');
      let count = 0;
      questionsSnapshot.forEach((doc) => {
        if (count < 3) { // Show first 3 questions
          const data = doc.data();
          console.log(`   ${count + 1}. ID: ${doc.id}, Year: ${data.year}, Text: "${data.text?.substring(0, 50)}..."`);
          count++;
        }
      });
      
      if (questionsSnapshot.size > 3) {
        console.log(`   ... and ${questionsSnapshot.size - 3} more questions`);
      }
    }

    // Check legacy questions collection (if exists)
    try {
      const legacyQuestionsRef = collection(db, 'exams/waec/subjects/biology/questions');
      const legacySnapshot = await getDocs(legacyQuestionsRef);
      
      if (legacySnapshot.size > 0) {
        let legacy2011Count = 0;
        legacySnapshot.forEach((doc) => {
          const data = doc.data();
          if (data.year === 2011) {
            legacy2011Count++;
          }
        });
        
        console.log('\n🗂️ Legacy questions collection:');
        console.log('   Total Questions:', legacySnapshot.size);
        console.log('   2011 Questions:', legacy2011Count);
      }
    } catch (error) {
      console.log('\n🗂️ Legacy questions collection: Not found or inaccessible');
    }

    console.log('\n✅ Check completed successfully!');

  } catch (error) {
    console.error('❌ Error checking existing 2011 questions:', error);
  }
}

checkExisting2011Questions();