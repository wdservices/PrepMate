import admin from 'firebase-admin';
import serviceAccount from '../../prepmate-6eb9d-firebase-adminsdk-fbsvc-bcfd6a3146.json';

// Initialize Firebase Admin
if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount as admin.ServiceAccount)
  });
}

const db = admin.firestore();

// Example correct answers mapping - this would need to be populated with actual correct answers
const correctAnswers: Record<string, string> = {
  // Format: questionId: correctOptionId
  // Example:
  // 'q1': 'a',
  // 'q2': 'b',
  // 'q3': 'c',
  // Add more as needed...
};

async function addCorrectAnswersToAgriculturalScience2000() {
  try {
    console.log('📝 Adding correct answers to WAEC Agricultural Science 2000 questions...');

    if (Object.keys(correctAnswers).length === 0) {
      console.log('⚠️  No correct answers defined in the correctAnswers object.');
      console.log('   Please update the correctAnswers object with the actual correct answers.');
      console.log('   Format: { "q1": "a", "q2": "b", "q3": "c", ... }');
      return;
    }

    console.log(`📊 Found ${Object.keys(correctAnswers).length} correct answers to update`);

    // Get all questions first to validate
    const questionsRef = db.collection('exams/waec/subjects/agricultural-science/years/2000/questions');
    const questionsSnapshot = await questionsRef.get();
    
    console.log(`📚 Found ${questionsSnapshot.size} questions in database`);

    // Update questions in batches
    const batchSize = 10;
    const questionIds = Object.keys(correctAnswers);
    const totalBatches = Math.ceil(questionIds.length / batchSize);
    
    let updatedCount = 0;
    let errorCount = 0;

    for (let i = 0; i < totalBatches; i++) {
      const batch = db.batch();
      const startIndex = i * batchSize;
      const endIndex = Math.min(startIndex + batchSize, questionIds.length);
      const batchQuestionIds = questionIds.slice(startIndex, endIndex);
      
      console.log(`   Processing batch ${i + 1}/${totalBatches} (questions ${startIndex + 1}-${endIndex})...`);
      
      for (const questionId of batchQuestionIds) {
        const correctOptionId = correctAnswers[questionId];
        const questionRef = db.doc(`exams/waec/subjects/agricultural-science/years/2000/questions/${questionId}`);
        
        // Verify the question exists
        const questionDoc = await questionRef.get();
        if (!questionDoc.exists) {
          console.log(`   ⚠️  Question ${questionId} not found, skipping...`);
          errorCount++;
          continue;
        }

        // Verify the correct option exists in the question
        const questionData = questionDoc.data();
        const hasOption = questionData?.options?.some((option: any) => option.id === correctOptionId);
        
        if (!hasOption) {
          console.log(`   ⚠️  Option ${correctOptionId} not found in question ${questionId}, skipping...`);
          errorCount++;
          continue;
        }

        batch.update(questionRef, {
          correctOptionId: correctOptionId,
          updatedAt: admin.firestore.FieldValue.serverTimestamp()
        });
        
        updatedCount++;
      }
      
      if (batchQuestionIds.length > errorCount) {
        await batch.commit();
        console.log(`   ✅ Batch ${i + 1} updated successfully`);
      }
    }

    console.log('\n🎉 Correct answers update completed!');
    console.log(`📊 Summary:`);
    console.log(`   - Questions updated: ${updatedCount}`);
    console.log(`   - Errors/Skipped: ${errorCount}`);
    
    if (errorCount > 0) {
      console.log('\n⚠️  Some questions had errors. Please check the logs above.');
    }

  } catch (error) {
    console.error('❌ Error adding correct answers:', error);
    throw error;
  }
}

// Example usage instructions
console.log('📋 Instructions for using this script:');
console.log('1. Update the correctAnswers object above with the actual correct answers');
console.log('2. Format: { "q1": "a", "q2": "b", "q3": "c", ... }');
console.log('3. Run the script: npx tsx src/scripts/add-correct-answers-agricultural-science-2000.ts');
console.log('');

addCorrectAnswersToAgriculturalScience2000();