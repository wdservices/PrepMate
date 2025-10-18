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

async function verifyWaecBiology2011Update() {
  try {
    console.log('🔍 Verifying WAEC Biology 2011 questions update...');

    // Load expected questions from JSON file
    const filePath = 'c:\\Users\\spell\\Documents\\GitHub\\PrepMate\\json questions\\WAEC Biology June 2011.txt';
    const fileContent = readFileSync(filePath, 'utf-8');
    const expectedQuestions: UnifiedQuestion[] = JSON.parse(fileContent);
    
    console.log(`Expected ${expectedQuestions.length} questions from file`);

    // 1. Check biology subject availableYears
    console.log('\n1. Checking biology subject availableYears...');
    const biologyRef = db.doc('exams/waec/subjects/biology');
    const biologyDoc = await biologyRef.get();
    
    if (!biologyDoc.exists) {
      throw new Error('Biology subject document does not exist');
    }
    
    const biologyData = biologyDoc.data();
    const availableYears = biologyData?.availableYears || [];
    
    if (availableYears.includes(2011)) {
      console.log('✅ 2011 is present in biology availableYears:', availableYears);
    } else {
      console.log('❌ 2011 is missing from biology availableYears:', availableYears);
    }

    // 2. Check 2011 year document
    console.log('\n2. Checking 2011 year document...');
    const yearRef = db.doc('exams/waec/subjects/biology/years/2011');
    const yearDoc = await yearRef.get();
    
    if (yearDoc.exists) {
      const yearData = yearDoc.data();
      console.log('✅ 2011 year document exists with data:', {
        year: yearData?.year,
        questionCount: yearData?.questionCount,
        lastUpdated: yearData?.lastUpdated?.toDate()
      });
    } else {
      console.log('❌ 2011 year document does not exist');
    }

    // 3. Check questions in year-based collection
    console.log('\n3. Checking questions in year-based collection...');
    const yearQuestionsRef = db.collection('exams/waec/subjects/biology/years/2011/questions');
    const questionsSnapshot = await yearQuestionsRef.get();
    
    console.log(`Found ${questionsSnapshot.size} questions in year-based collection`);
    
    if (questionsSnapshot.size === expectedQuestions.length) {
      console.log('✅ Question count matches expected count');
    } else {
      console.log(`❌ Question count mismatch. Expected: ${expectedQuestions.length}, Found: ${questionsSnapshot.size}`);
    }

    // 4. Verify question content
    console.log('\n4. Verifying question content...');
    const actualQuestions: UnifiedQuestion[] = [];
    questionsSnapshot.forEach(doc => {
      actualQuestions.push(doc.data() as UnifiedQuestion);
    });

    // Sort both arrays by id for comparison
    expectedQuestions.sort((a, b) => a.id.localeCompare(b.id));
    actualQuestions.sort((a, b) => a.id.localeCompare(b.id));

    let contentMatches = 0;
    let contentMismatches = 0;

    for (let i = 0; i < Math.min(expectedQuestions.length, actualQuestions.length); i++) {
      const expected = expectedQuestions[i];
      const actual = actualQuestions[i];

      if (expected.id === actual.id && 
          expected.text === actual.text && 
          expected.year === actual.year &&
          expected.correctOptionId === actual.correctOptionId) {
        contentMatches++;
      } else {
        contentMismatches++;
        console.log(`❌ Content mismatch for question ${expected.id}`);
      }
    }

    console.log(`✅ ${contentMatches} questions have matching content`);
    if (contentMismatches > 0) {
      console.log(`❌ ${contentMismatches} questions have content mismatches`);
    }

    // 5. Display sample questions
    console.log('\n5. Sample questions from database:');
    actualQuestions.slice(0, 3).forEach((question, index) => {
      console.log(`\nQuestion ${index + 1} (${question.id}):`);
      console.log(`Text: ${question.text.substring(0, 100)}...`);
      console.log(`Year: ${question.year}`);
      console.log(`Correct Option: ${question.correctOptionId}`);
      console.log(`Options: ${question.options.length}`);
    });

    // Summary
    console.log('\n📊 VERIFICATION SUMMARY:');
    console.log(`- Biology subject has 2011 in availableYears: ${availableYears.includes(2011) ? '✅' : '❌'}`);
    console.log(`- 2011 year document exists: ${yearDoc.exists ? '✅' : '❌'}`);
    console.log(`- Question count matches: ${questionsSnapshot.size === expectedQuestions.length ? '✅' : '❌'}`);
    console.log(`- Content matches: ${contentMismatches === 0 ? '✅' : '❌'}`);
    
    if (availableYears.includes(2011) && yearDoc.exists && 
        questionsSnapshot.size === expectedQuestions.length && contentMismatches === 0) {
      console.log('\n🎉 WAEC Biology 2011 questions update verification PASSED!');
    } else {
      console.log('\n⚠️ WAEC Biology 2011 questions update verification FAILED!');
    }

  } catch (error) {
    console.error('❌ Error during verification:', error);
    throw error;
  }
}

verifyWaecBiology2011Update();