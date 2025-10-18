import 'dotenv/config';
import { doc, getDoc } from 'firebase/firestore';
import { getFirestoreDb } from '../lib/firebase';

async function checkAgriculturalScienceStructure() {
  try {
    const db = getFirestoreDb();
    console.log('🔍 Checking Agricultural Science subject structure...');

    // Check the subject document
    const subjectRef = doc(db, 'exams', 'waec', 'subjects', 'agricultural-science');
    const subjectDoc = await getDoc(subjectRef);
    
    if (subjectDoc.exists()) {
      const subjectData = subjectDoc.data();
      console.log('✅ Agricultural Science subject document found');
      console.log('📊 Subject data:', {
        name: subjectData.name,
        hasYearBasedStructure: subjectData.hasYearBasedStructure,
        availableYears: subjectData.availableYears,
        examId: subjectData.examId,
        order: subjectData.order
      });
      
      if (!subjectData.hasYearBasedStructure) {
        console.log('❌ hasYearBasedStructure is missing or false!');
        console.log('🔧 This is likely why questions are not loading.');
      } else {
        console.log('✅ hasYearBasedStructure is set to true');
      }
    } else {
      console.log('❌ Agricultural Science subject document not found');
    }

  } catch (error) {
    console.error('❌ Error checking Agricultural Science structure:', error);
    throw error;
  }
}

checkAgriculturalScienceStructure();