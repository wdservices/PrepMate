import admin from 'firebase-admin';
import { readFileSync } from 'fs';
import { UnifiedQuestion } from '../types/question';
import serviceAccount from '../../prepmate-6eb9d-firebase-adminsdk-fbsvc-bcfd6a3146.json';

// Initialize Firebase Admin
if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount as admin.ServiceAccount)
  });
}

const db = admin.firestore();

async function updateWaecBiology2011() {
  try {
    console.log('Starting WAEC Biology 2011 questions update...');

    // Load questions from JSON file
    const filePath = 'c:\\Users\\spell\\Documents\\GitHub\\PrepMate\\json questions\\WAEC Biology June 2011.txt';
    console.log('Loading questions from:', filePath);
    
    const fileContent = readFileSync(filePath, 'utf-8');
    const questions: UnifiedQuestion[] = JSON.parse(fileContent);
    
    console.log(`Loaded ${questions.length} questions from file`);

    // Validate questions
    const invalidQuestions = questions.filter(q => q.year !== 2011);
    if (invalidQuestions.length > 0) {
      throw new Error(`Found ${invalidQuestions.length} questions with incorrect year`);
    }

    // Delete existing 2011 questions from year-based collection
    console.log('Deleting existing 2011 questions from year-based collection...');
    const yearQuestionsRef = db.collection('exams/waec/subjects/biology/years/2011/questions');
    const existingQuestions = await yearQuestionsRef.get();
    
    if (!existingQuestions.empty) {
      const batch = db.batch();
      existingQuestions.docs.forEach(doc => {
        batch.delete(doc.ref);
      });
      await batch.commit();
      console.log(`Deleted ${existingQuestions.size} existing questions`);
    }

    // Ensure biology subject has 2011 in availableYears
    console.log('Updating biology subject availableYears...');
    const biologyRef = db.doc('exams/waec/subjects/biology');
    const biologyDoc = await biologyRef.get();
    
    if (biologyDoc.exists) {
      const data = biologyDoc.data();
      const availableYears = data?.availableYears || [];
      if (!availableYears.includes(2011)) {
        await biologyRef.update({
          availableYears: [...availableYears, 2011].sort((a, b) => b - a)
        });
        console.log('Added 2011 to biology availableYears');
      }
    }

    // Create/update 2011 year document
    console.log('Creating/updating 2011 year document...');
    const yearRef = db.doc('exams/waec/subjects/biology/years/2011');
    await yearRef.set({
      year: 2011,
      questionCount: questions.length,
      lastUpdated: admin.firestore.FieldValue.serverTimestamp()
    });

    // Upload new questions in batches
    console.log('Uploading new questions...');
    const batchSize = 10;
    let uploadedCount = 0;

    for (let i = 0; i < questions.length; i += batchSize) {
      const batch = db.batch();
      const batchQuestions = questions.slice(i, i + batchSize);

      batchQuestions.forEach(question => {
        const questionRef = yearQuestionsRef.doc(question.id);
        batch.set(questionRef, question);
      });

      await batch.commit();
      uploadedCount += batchQuestions.length;
      console.log(`Uploaded ${uploadedCount}/${questions.length} questions`);
    }

    console.log('✅ Successfully updated WAEC Biology 2011 questions!');
    console.log(`Total questions: ${questions.length}`);
    
  } catch (error) {
    console.error('❌ Error updating questions:', error);
    throw error;
  }
}

updateWaecBiology2011();