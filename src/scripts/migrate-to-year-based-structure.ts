import 'dotenv/config';
import { collection, getDocs, query, where, doc, setDoc, deleteDoc } from 'firebase/firestore';
import { getFirestoreDb } from '../lib/firebase';

interface Question {
  id: string;
  text: string;
  year: number;
  correctOptionId: string;
  options: Array<{
    id: string;
    text: string;
    isCorrect?: boolean;
  }>;
  imageUrl?: string;
  subjectId?: string;
  examId?: string;
}

async function migrateToYearBasedStructure() {
  const db = getFirestoreDb();
  if (!db) {
    console.error('❌ Firestore not initialized');
    return;
  }

  console.log('🚀 Starting migration to year-based structure...');

  try {
    // Get all exams
    const examsRef = collection(db, 'exams');
    const examsSnapshot = await getDocs(examsRef);
    
    console.log(`📋 Found ${examsSnapshot.size} exams to process`);

    for (const examDoc of examsSnapshot.docs) {
      const examId = examDoc.id;
      console.log(`\n🏫 Processing exam: ${examId}`);

      // Get all subjects for this exam
      const subjectsRef = collection(db, 'exams', examId, 'subjects');
      const subjectsSnapshot = await getDocs(subjectsRef);

      for (const subjectDoc of subjectsSnapshot.docs) {
        const subjectId = subjectDoc.id;
        const subjectData = subjectDoc.data();
        console.log(`📚 Processing subject: ${subjectData.name || subjectId}`);

        // Get all questions for this subject
        const questionsRef = collection(db, 'exams', examId, 'subjects', subjectId, 'questions');
        const questionsSnapshot = await getDocs(questionsRef);

        if (questionsSnapshot.empty) {
          console.log(`⚠️  No questions found for ${subjectId}`);
          continue;
        }

        console.log(`📊 Found ${questionsSnapshot.size} questions for ${subjectId}`);

        // Group questions by year
        const questionsByYear: { [year: number]: Question[] } = {};
        
        questionsSnapshot.forEach((questionDoc) => {
          const question = questionDoc.data() as Question;
          const year = question.year;
          
          if (!year) {
            console.warn(`⚠️  Question ${questionDoc.id} has no year field`);
            return;
          }

          if (!questionsByYear[year]) {
            questionsByYear[year] = [];
          }
          
          questionsByYear[year].push({
            ...question,
            id: questionDoc.id,
            subjectId: subjectId,
            examId: examId
          });
        });

        // Migrate questions to year-based structure
        for (const [year, questions] of Object.entries(questionsByYear)) {
          const yearInt = parseInt(year);
          console.log(`🔄 Migrating ${questions.length} questions for year ${yearInt}`);

          // Create year document if it doesn't exist
          const yearRef = doc(db, 'exams', examId, 'subjects', subjectId, 'years', year);
          await setDoc(yearRef, {
            year: yearInt,
            questionCount: questions.length,
            createdAt: new Date(),
            updatedAt: new Date()
          }, { merge: true });

          // Move questions to year-based collection
          const yearQuestionsRef = collection(db, 'exams', examId, 'subjects', subjectId, 'years', year, 'questions');
          
          for (const question of questions) {
            const newQuestionRef = doc(yearQuestionsRef, question.id);
            
            // Set the question in the new location
            await setDoc(newQuestionRef, {
              ...question,
              subjectId: subjectId,
              examId: examId,
              migratedAt: new Date()
            });

            // Delete the old question
            const oldQuestionRef = doc(db, 'exams', examId, 'subjects', subjectId, 'questions', question.id);
            await deleteDoc(oldQuestionRef);
          }

          console.log(`✅ Migrated ${questions.length} questions for year ${yearInt}`);
        }

        // Update subject document to reflect new structure
        const subjectUpdateRef = doc(db, 'exams', examId, 'subjects', subjectId);
        await setDoc(subjectUpdateRef, {
          hasYearBasedStructure: true,
          availableYears: Object.keys(questionsByYear).map(y => parseInt(y)).sort(),
          updatedAt: new Date()
        }, { merge: true });

        console.log(`✅ Updated subject ${subjectId} with year-based structure`);
      }
    }

    console.log('\n🎉 Migration completed successfully!');
    console.log('✅ All questions have been moved to year-based collections');
    console.log('📁 New structure: exams/{examId}/subjects/{subjectId}/years/{year}/questions/');

  } catch (error) {
    console.error('❌ Migration failed:', error);
    throw error;
  }
}

// Run the migration
migrateToYearBasedStructure().catch(console.error);