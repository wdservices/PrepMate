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

async function verifyWaecAgriculturalScience2000() {
  try {
    console.log('🔍 Verifying WAEC Agricultural Science 2000 upload...');

    // Load original questions for comparison
    const jsonFilePath = path.join(process.cwd(), 'json questions', 'waec-agricultural-science-november-2000.txt');
    const jsonContent = fs.readFileSync(jsonFilePath, 'utf-8');
    const originalQuestions: Question[] = JSON.parse(jsonContent);
    
    console.log(`📚 Original file contains ${originalQuestions.length} questions`);

    let allTestsPassed = true;

    // 1. Verify Agricultural Science subject exists
    console.log('\n1. Verifying Agricultural Science subject...');
    const subjectRef = db.doc('exams/waec/subjects/agricultural-science');
    const subjectDoc = await subjectRef.get();
    
    if (subjectDoc.exists) {
      const subjectData = subjectDoc.data();
      console.log('✅ Agricultural Science subject exists');
      console.log(`   - Name: ${subjectData?.name}`);
      console.log(`   - Available Years: ${JSON.stringify(subjectData?.availableYears)}`);
      console.log(`   - Question Count: ${subjectData?.questionCount}`);
      
      if (subjectData?.name !== 'Agricultural Science') {
        console.log('❌ Subject name mismatch');
        allTestsPassed = false;
      }
      
      if (!subjectData?.availableYears?.includes(2000)) {
        console.log('❌ Year 2000 not in availableYears');
        allTestsPassed = false;
      }
      
      if (subjectData?.questionCount !== originalQuestions.length) {
        console.log(`❌ Question count mismatch: expected ${originalQuestions.length}, got ${subjectData?.questionCount}`);
        allTestsPassed = false;
      }
    } else {
      console.log('❌ Agricultural Science subject does not exist');
      allTestsPassed = false;
    }

    // 2. Verify WAEC exam document includes Agricultural Science
    console.log('\n2. Verifying WAEC exam document...');
    const waecRef = db.doc('exams/waec');
    const waecDoc = await waecRef.get();
    
    if (waecDoc.exists) {
      const waecData = waecDoc.data();
      const subjects = waecData?.subjects || [];
      const agricultureSubject = subjects.find((s: any) => s.id === 'agricultural-science');
      
      if (agricultureSubject) {
        console.log('✅ Agricultural Science found in WAEC subjects list');
        console.log(`   - ID: ${agricultureSubject.id}`);
        console.log(`   - Name: ${agricultureSubject.name}`);
        console.log(`   - Icon: ${agricultureSubject.icon}`);
      } else {
        console.log('❌ Agricultural Science not found in WAEC subjects list');
        allTestsPassed = false;
      }
    } else {
      console.log('❌ WAEC exam document does not exist');
      allTestsPassed = false;
    }

    // 3. Verify 2000 year document
    console.log('\n3. Verifying 2000 year document...');
    const yearRef = db.doc('exams/waec/subjects/agricultural-science/years/2000');
    const yearDoc = await yearRef.get();
    
    if (yearDoc.exists) {
      const yearData = yearDoc.data();
      console.log('✅ 2000 year document exists');
      console.log(`   - Year: ${yearData?.year}`);
      console.log(`   - Question Count: ${yearData?.questionCount}`);
      
      if (yearData?.year !== 2000) {
        console.log('❌ Year mismatch in year document');
        allTestsPassed = false;
      }
      
      if (yearData?.questionCount !== originalQuestions.length) {
        console.log(`❌ Question count mismatch in year document: expected ${originalQuestions.length}, got ${yearData?.questionCount}`);
        allTestsPassed = false;
      }
    } else {
      console.log('❌ 2000 year document does not exist');
      allTestsPassed = false;
    }

    // 4. Verify questions in database
    console.log('\n4. Verifying questions in database...');
    const questionsRef = db.collection('exams/waec/subjects/agricultural-science/years/2000/questions');
    const questionsSnapshot = await questionsRef.get();
    
    console.log(`📊 Found ${questionsSnapshot.size} questions in database`);
    
    if (questionsSnapshot.size !== originalQuestions.length) {
      console.log(`❌ Question count mismatch: expected ${originalQuestions.length}, got ${questionsSnapshot.size}`);
      allTestsPassed = false;
    } else {
      console.log('✅ Question count matches original file');
    }

    // 5. Verify question content
    console.log('\n5. Verifying question content...');
    let contentMatchCount = 0;
    let questionsWithCorrectAnswers = 0;
    
    for (const originalQuestion of originalQuestions) {
      const questionDoc = await db.doc(`exams/waec/subjects/agricultural-science/years/2000/questions/${originalQuestion.id}`).get();
      
      if (questionDoc.exists) {
        const dbQuestion = questionDoc.data();
        
        // Check if content matches
        if (dbQuestion?.text === originalQuestion.text && 
            dbQuestion?.year === originalQuestion.year &&
            JSON.stringify(dbQuestion?.options) === JSON.stringify(originalQuestion.options)) {
          contentMatchCount++;
        }
        
        // Count questions with correct answers
        if (dbQuestion?.correctOptionId !== null) {
          questionsWithCorrectAnswers++;
        }
      }
    }
    
    console.log(`✅ ${contentMatchCount}/${originalQuestions.length} questions have matching content`);
    console.log(`📝 ${questionsWithCorrectAnswers}/${originalQuestions.length} questions have correct answers set`);
    
    if (contentMatchCount !== originalQuestions.length) {
      console.log('❌ Some questions have content mismatches');
      allTestsPassed = false;
    }

    // 6. Summary
    console.log('\n📋 Verification Summary:');
    console.log(`   - Subject created: ${subjectDoc.exists ? '✅' : '❌'}`);
    console.log(`   - Added to WAEC subjects: ${waecDoc.exists ? '✅' : '❌'}`);
    console.log(`   - Year document created: ${yearDoc.exists ? '✅' : '❌'}`);
    console.log(`   - Questions uploaded: ${questionsSnapshot.size}/${originalQuestions.length}`);
    console.log(`   - Content matches: ${contentMatchCount}/${originalQuestions.length}`);
    console.log(`   - Questions with correct answers: ${questionsWithCorrectAnswers}/${originalQuestions.length}`);
    
    if (allTestsPassed) {
      console.log('\n🎉 VERIFICATION PASSED - Agricultural Science 2000 successfully added!');
      
      if (questionsWithCorrectAnswers === 0) {
        console.log('\n💡 Note: No questions have correct answers set yet.');
        console.log('   Use the add-correct-answers-agricultural-science-2000.ts script to add them later.');
      }
    } else {
      console.log('\n❌ VERIFICATION FAILED - Some issues found');
    }

  } catch (error) {
    console.error('❌ Error during verification:', error);
    throw error;
  }
}

verifyWaecAgriculturalScience2000();