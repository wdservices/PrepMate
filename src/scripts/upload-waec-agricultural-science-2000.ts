import admin from 'firebase-admin';
import serviceAccount from '../../prepmate-6eb9d-firebase-adminsdk-fbsvc-bcfd6a3146.json';
import * as fs from 'fs';
import * as path from 'path';

// Initialize Firebase Admin
if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount as admin.ServiceAccount)
  });
}

const db = admin.firestore();

interface QuestionOption {
  id: string;
  text: string;
}

interface Question {
  id: string;
  text: string;
  year: number;
  correctOptionId: string | null;
  options: QuestionOption[];
  imageUrl?: string;
}

async function uploadWaecAgriculturalScience2000() {
  try {
    console.log('🌾 Starting WAEC Agricultural Science 2000 upload...');

    // 1. Load questions from JSON file
    console.log('\n1. Loading questions from JSON file...');
    const jsonFilePath = path.join(process.cwd(), 'json questions', 'waec-agricultural-science-november-2000.txt');
    
    if (!fs.existsSync(jsonFilePath)) {
      throw new Error(`JSON file not found: ${jsonFilePath}`);
    }

    const jsonContent = fs.readFileSync(jsonFilePath, 'utf-8');
    const questions: Question[] = JSON.parse(jsonContent);
    
    console.log(`✅ Loaded ${questions.length} questions from file`);

    // Validate questions
    if (questions.length === 0) {
      throw new Error('No questions found in the file');
    }

    // Check if all questions are for year 2000
    const invalidYears = questions.filter(q => q.year !== 2000);
    if (invalidYears.length > 0) {
      throw new Error(`Found ${invalidYears.length} questions with invalid year (expected 2000)`);
    }

    // Note about correct answers
    const questionsWithoutCorrectAnswer = questions.filter(q => q.correctOptionId === null);
    if (questionsWithoutCorrectAnswer.length > 0) {
      console.log(`⚠️  Note: ${questionsWithoutCorrectAnswer.length} questions have no correct answer set (correctOptionId is null)`);
      console.log('   These questions will be uploaded as-is and can be updated later with correct answers');
    }

    // 2. Create Agricultural Science subject document
    console.log('\n2. Creating Agricultural Science subject...');
    const subjectRef = db.doc('exams/waec/subjects/agricultural-science');
    
    await subjectRef.set({
      name: 'Agricultural Science',
      availableYears: [2000],
      questionCount: questions.length,
      createdAt: admin.firestore.FieldValue.serverTimestamp(),
      updatedAt: admin.firestore.FieldValue.serverTimestamp()
    });
    
    console.log('✅ Agricultural Science subject created');

    // 3. Update WAEC exam document to include Agricultural Science
    console.log('\n3. Updating WAEC exam document...');
    const waecRef = db.doc('exams/waec');
    const waecDoc = await waecRef.get();
    
    let currentSubjects = [];
    if (waecDoc.exists) {
      const waecData = waecDoc.data();
      currentSubjects = waecData?.subjects || [];
    }

    // Add Agricultural Science to subjects list if not already present
    const hasAgriculture = currentSubjects.some((subject: any) => subject.id === 'agricultural-science');
    if (!hasAgriculture) {
      currentSubjects.push({
        id: 'agricultural-science',
        name: 'Agricultural Science',
        icon: '🌾'
      });

      await waecRef.set({
        subjects: currentSubjects,
        updatedAt: admin.firestore.FieldValue.serverTimestamp()
      }, { merge: true });
      
      console.log('✅ Added Agricultural Science to WAEC subjects list');
    } else {
      console.log('ℹ️  Agricultural Science already in WAEC subjects list');
    }

    // 4. Create 2000 year document
    console.log('\n4. Creating 2000 year document...');
    const yearRef = db.doc('exams/waec/subjects/agricultural-science/years/2000');
    
    await yearRef.set({
      year: 2000,
      questionCount: questions.length,
      createdAt: admin.firestore.FieldValue.serverTimestamp(),
      updatedAt: admin.firestore.FieldValue.serverTimestamp()
    });
    
    console.log('✅ 2000 year document created');

    // 5. Upload questions in batches
    console.log('\n5. Uploading questions in batches...');
    const batchSize = 10;
    const totalBatches = Math.ceil(questions.length / batchSize);
    
    for (let i = 0; i < totalBatches; i++) {
      const batch = db.batch();
      const startIndex = i * batchSize;
      const endIndex = Math.min(startIndex + batchSize, questions.length);
      const batchQuestions = questions.slice(startIndex, endIndex);
      
      console.log(`   Uploading batch ${i + 1}/${totalBatches} (questions ${startIndex + 1}-${endIndex})...`);
      
      for (const question of batchQuestions) {
        const questionRef = db.doc(`exams/waec/subjects/agricultural-science/years/2000/questions/${question.id}`);
        
        // Prepare question data with proper structure
        const questionData = {
          id: question.id,
          text: question.text,
          year: question.year,
          correctOptionId: question.correctOptionId, // Will be null for now
          options: question.options,
          imageUrl: question.imageUrl || null,
          createdAt: admin.firestore.FieldValue.serverTimestamp(),
          updatedAt: admin.firestore.FieldValue.serverTimestamp()
        };
        
        batch.set(questionRef, questionData);
      }
      
      await batch.commit();
      console.log(`   ✅ Batch ${i + 1} uploaded successfully`);
    }

    console.log('\n🎉 WAEC Agricultural Science 2000 upload completed successfully!');
    console.log(`📊 Summary:`);
    console.log(`   - Subject: Agricultural Science`);
    console.log(`   - Year: 2000`);
    console.log(`   - Questions uploaded: ${questions.length}`);
    console.log(`   - Questions with correct answers: ${questions.filter(q => q.correctOptionId !== null).length}`);
    console.log(`   - Questions without correct answers: ${questionsWithoutCorrectAnswer.length}`);
    
    if (questionsWithoutCorrectAnswer.length > 0) {
      console.log('\n💡 Next steps:');
      console.log('   - Review questions and add correct answers where missing');
      console.log('   - Use a separate script to update correctOptionId for questions');
    }

  } catch (error) {
    console.error('❌ Error uploading Agricultural Science 2000:', error);
    throw error;
  }
}

uploadWaecAgriculturalScience2000();