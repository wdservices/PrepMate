import 'dotenv/config';
import { UnifiedQuestion } from '../types/question';
import { collection, doc, setDoc, getDoc, serverTimestamp } from 'firebase/firestore';
import { getFirestoreDb } from '../lib/firebase';
import * as fs from 'fs';
import * as path from 'path';

async function loadQuestionsFromFile(): Promise<UnifiedQuestion[]> {
  try {
    const filePath = path.join(process.cwd(), 'json questions', 'WAEC Biology June 1994.txt');
    const fileContent = fs.readFileSync(filePath, 'utf-8');
    const questions = JSON.parse(fileContent);
    
    console.log(`📖 Loaded ${questions.length} questions from file`);
    return questions;
  } catch (error) {
    console.error('❌ Error loading questions from file:', error);
    throw error;
  }
}

async function uploadQuestions() {
  try {
    const db = getFirestoreDb();
    const waecBiology1994Questions = await loadQuestionsFromFile();
    
    console.log(`🚀 Uploading ${waecBiology1994Questions.length} WAEC Biology 1994 questions...`);

    // First, create/update the biology subject document with 1994 in availableYears
    const subjectRef = doc(db, 'exams', 'waec', 'subjects', 'biology');
    const subjectDoc = await getDoc(subjectRef);
    
    const currentData = subjectDoc.exists() ? subjectDoc.data() : {};
    const currentYears = currentData.availableYears || [];
    const updatedYears = Array.from(new Set([...currentYears, 1994])).sort((a, b) => a - b); // Ensure 1994 is included and sorted
    
    await setDoc(subjectRef, {
      name: 'Biology',
      description: 'Biology subject for WAEC',
      iconName: 'Leaf',
      order: 1,
      availableYears: updatedYears,
      examId: 'waec',
      hasYearBasedStructure: true,
      ...(subjectDoc.exists() ? {} : { createdAt: serverTimestamp() }),
      updatedAt: serverTimestamp()
    }, { merge: true });
    
    console.log(`✅ Biology subject updated with available years: ${updatedYears.join(', ')}`);

    // Create year document for 1994
    const yearDocRef = doc(db, 'exams', 'waec', 'subjects', 'biology', 'years', '1994');
    await setDoc(yearDocRef, {
      year: 1994,
      totalQuestions: waecBiology1994Questions.length,
      examId: 'waec',
      subjectId: 'biology',
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp()
    }, { merge: true });
    
    console.log(`✅ Year 1994 document created with ${waecBiology1994Questions.length} total questions`);

    // Now upload the questions to year-based collection
    let uploadedCount = 0;
    let skippedCount = 0;
    
    for (const question of waecBiology1994Questions) {
      // Validate question has required fields
      if (!question || !question.id || !question.text) {
        console.warn(`⚠️ Skipping question with missing ID or text`);
        skippedCount++;
        continue;
      }
      
      // Upload to year-based collection
      const questionRef = doc(collection(db, 'exams', 'waec', 'subjects', 'biology', 'years', '1994', 'questions'), question.id);
      await setDoc(questionRef, {
        ...question,
        subjectId: 'biology',
        examId: 'waec',
        year: 1994, // Ensure year is set correctly
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp()
      }, { merge: true });
      
      uploadedCount++;
      
      // Log progress every 10 questions
      if (uploadedCount % 10 === 0) {
        console.log(`📤 Uploaded ${uploadedCount}/${waecBiology1994Questions.length} questions...`);
      }
    }

    console.log('\n🎉 WAEC Biology 1994 questions uploaded successfully!');
    console.log(`📊 Total questions processed: ${waecBiology1994Questions.length}`);
    console.log(`✅ Successfully uploaded: ${uploadedCount}`);
    console.log(`⚠️ Skipped: ${skippedCount}`);
    console.log(`📍 Questions stored in: exams/waec/subjects/biology/years/1994/questions`);
    
  } catch (error) {
    console.error('❌ Error uploading WAEC Biology 1994 questions:', error);
    throw error;
  }
}

// Run the upload
uploadQuestions().then(() => {
  console.log('🏁 Upload script completed');
  process.exit(0);
}).catch((error) => {
  console.error('💥 Upload script failed:', error);
  process.exit(1);
});