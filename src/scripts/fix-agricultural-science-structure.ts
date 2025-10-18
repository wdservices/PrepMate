import 'dotenv/config';
import { doc, updateDoc, getDoc } from 'firebase/firestore';
import { getFirestoreDb } from '../lib/firebase';

async function fixAgriculturalScienceStructure() {
  try {
    const db = getFirestoreDb();
    console.log('🔧 Fixing Agricultural Science subject structure...');

    // Update the subject document to include hasYearBasedStructure flag
    const subjectRef = doc(db, 'exams', 'waec', 'subjects', 'agricultural-science');
    
    // First check current state
    const subjectDoc = await getDoc(subjectRef);
    if (!subjectDoc.exists()) {
      console.log('❌ Agricultural Science subject document not found');
      return;
    }
    
    console.log('📊 Current subject data:', subjectDoc.data());
    
    // Update the document with the missing fields
    await updateDoc(subjectRef, {
      hasYearBasedStructure: true,
      examId: 'waec',
      order: 3, // Set order after Biology (1) and Chemistry (2)
      updatedAt: new Date()
    });
    
    console.log('✅ Agricultural Science subject document updated successfully');
    
    // Verify the update
    const updatedDoc = await getDoc(subjectRef);
    if (updatedDoc.exists()) {
      console.log('📊 Updated subject data:', updatedDoc.data());
      
      const data = updatedDoc.data();
      if (data.hasYearBasedStructure === true) {
        console.log('✅ hasYearBasedStructure flag is now set to true');
        console.log('🎉 Agricultural Science questions should now load correctly!');
      } else {
        console.log('❌ hasYearBasedStructure flag was not set correctly');
      }
    }

  } catch (error) {
    console.error('❌ Error fixing Agricultural Science structure:', error);
    throw error;
  }
}

fixAgriculturalScienceStructure();