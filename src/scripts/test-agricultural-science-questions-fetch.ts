import 'dotenv/config';
import { examService } from '../lib/firestore-service';

async function testAgriculturalScienceQuestionsFetch() {
  try {
    console.log('🧪 Testing Agricultural Science questions fetch...');

    // Test fetching questions for Agricultural Science 2000
    console.log('\n1. Fetching Agricultural Science 2000 questions...');
    const questions = await examService.getQuestionsBySubject('waec', 'agricultural-science', 2000);
    
    console.log(`📊 Found ${questions.length} questions`);
    
    if (questions.length > 0) {
      console.log('\n📝 Sample questions:');
      questions.slice(0, 3).forEach((question, index) => {
        console.log(`${index + 1}. ID: ${question.id}`);
        console.log(`   Text: ${question.text?.substring(0, 80)}...`);
        console.log(`   Year: ${question.year}`);
        console.log(`   Options: ${question.options?.length || 0}`);
        console.log(`   Correct Answer: ${question.correctOptionId || 'null'}`);
        console.log('');
      });
      
      console.log('✅ Questions are being fetched successfully!');
    } else {
      console.log('❌ No questions found');
    }

    // Also test fetching exam and subject data
    console.log('\n2. Testing exam and subject data fetch...');
    const exam = await examService.getExamById('waec');
    const subject = await examService.getSubjectById('waec', 'agricultural-science');
    
    console.log('📚 Exam data:', exam ? { id: exam.id, name: exam.name } : 'Not found');
    console.log('📖 Subject data:', subject ? { 
      id: subject.id, 
      name: subject.name, 
      availableYears: subject.availableYears 
    } : 'Not found');

  } catch (error) {
    console.error('❌ Error testing questions fetch:', error);
    throw error;
  }
}

testAgriculturalScienceQuestionsFetch();