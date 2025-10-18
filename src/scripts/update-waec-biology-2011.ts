import { initializeApp } from 'firebase/app';
import { getFirestore, doc, setDoc, collection, getDocs, deleteDoc, writeBatch } from 'firebase/firestore';
import * as fs from 'fs';
import * as path from 'path';

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

interface Question {
  id: string;
  text: string;
  year: number;
  correctOptionId: string;
  options: Array<{
    id: string;
    text: string;
  }>;
  imageUrl: string | null;
}

async function updateWAECBiology2011() {
  try {
    console.log('🔄 Starting WAEC Biology 2011 questions update...\n');

    // Load questions from the JSON file
    const questionsFilePath = path.join(process.cwd(), 'json questions', 'WAEC Biology June 2011.txt');
    
    if (!fs.existsSync(questionsFilePath)) {
      throw new Error(`Questions file not found: ${questionsFilePath}`);
    }

    const questionsData = fs.readFileSync(questionsFilePath, 'utf-8');
    const questions: Question[] = JSON.parse(questionsData);

    console.log(`📚 Loaded ${questions.length} questions from file`);

    // Validate that all questions have year 2011
    const invalidQuestions = questions.filter(q => q.year !== 2011);
    if (invalidQuestions.length > 0) {
      console.warn(`⚠️ Found ${invalidQuestions.length} questions with incorrect year. Fixing...`);
      invalidQuestions.forEach(q => q.year = 2011);
    }

    // Step 1: Delete existing 2011 questions from year-based collection
    console.log('\n🗑️ Deleting existing 2011 questions...');
    const questionsRef = collection(db, 'exams/waec/subjects/biology/years/2011/questions');
    const existingSnapshot = await getDocs(questionsRef);
    
    if (existingSnapshot.size > 0) {
      console.log(`   Found ${existingSnapshot.size} existing questions to delete`);
      
      // Use batch to delete existing questions
      const deleteBatch = writeBatch(db);
      existingSnapshot.forEach((doc) => {
        deleteBatch.delete(doc.ref);
      });
      await deleteBatch.commit();
      console.log('   ✅ Existing questions deleted');
    } else {
      console.log('   No existing questions found');
    }

    // Step 2: Ensure biology subject has 2011 in availableYears
    console.log('\n📝 Updating biology subject...');
    const subjectRef = doc(db, 'exams/waec/subjects/biology');
    await setDoc(subjectRef, {
      id: 'biology',
      name: 'Biology',
      description: 'Biology past questions and practice tests',
      iconName: 'Microscope',
      availableYears: [1993, 1994, 2011], // Ensure 2011 is included
      updatedAt: new Date()
    }, { merge: true });
    console.log('   ✅ Biology subject updated with 2011 in availableYears');

    // Step 3: Create/update 2011 year document
    console.log('\n📅 Creating/updating 2011 year document...');
    const yearRef = doc(db, 'exams/waec/subjects/biology/years/2011');
    await setDoc(yearRef, {
      year: 2011,
      questionCount: questions.length,
      createdAt: new Date(),
      updatedAt: new Date()
    });
    console.log(`   ✅ 2011 year document created with ${questions.length} questions`);

    // Step 4: Upload new questions in batches
    console.log('\n📤 Uploading new questions...');
    const batchSize = 500; // Firestore batch limit
    let uploadedCount = 0;

    for (let i = 0; i < questions.length; i += batchSize) {
      const batch = writeBatch(db);
      const batchQuestions = questions.slice(i, i + batchSize);

      for (const question of batchQuestions) {
        const questionRef = doc(questionsRef, question.id);
        batch.set(questionRef, {
          ...question,
          createdAt: new Date(),
          updatedAt: new Date()
        });
      }

      await batch.commit();
      uploadedCount += batchQuestions.length;
      console.log(`   Uploaded batch: ${uploadedCount}/${questions.length} questions`);
    }

    console.log('\n✅ WAEC Biology 2011 questions update completed successfully!');
    console.log(`📊 Summary:`);
    console.log(`   - Total questions updated: ${questions.length}`);
    console.log(`   - Year: 2011`);
    console.log(`   - Subject: Biology`);
    console.log(`   - Exam: WAEC`);
    console.log(`   - Collection: exams/waec/subjects/biology/years/2011/questions`);

  } catch (error) {
    console.error('❌ Error updating WAEC Biology 2011 questions:', error);
    throw error;
  }
}

updateWAECBiology2011();