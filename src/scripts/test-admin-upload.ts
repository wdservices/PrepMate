import 'dotenv/config';
import { questionService } from '../lib/firestore-service';

async function testAdminUpload() {
  try {
    console.log('🧪 Testing admin question upload functionality...');
    
    // Test question data similar to what the admin interface would create
    const testQuestion = {
      id: 'biology-2024-test-001',
      text: 'Which of the following is NOT a function of the cell membrane?',
      year: 2024,
      correctOptionId: 'opt3',
      options: [
        { id: 'opt1', text: 'Controlling the movement of substances in and out of the cell' },
        { id: 'opt2', text: 'Providing structural support to the cell' },
        { id: 'opt3', text: 'Synthesizing proteins for the cell' },
        { id: 'opt4', text: 'Maintaining the cell\'s internal environment' }
      ],
      imageUrl: null
    };

    console.log('📤 Uploading test question...');
    await questionService.addQuestion('waec', 'biology', testQuestion);
    
    console.log('✅ Test question uploaded successfully!');
    console.log('📋 Question details:');
    console.log(`   ID: ${testQuestion.id}`);
    console.log(`   Text: ${testQuestion.text}`);
    console.log(`   Year: ${testQuestion.year}`);
    console.log(`   Options: ${testQuestion.options.length}`);
    console.log(`   Correct: ${testQuestion.correctOptionId}`);
    
    console.log('\n🎉 Admin upload functionality is working correctly!');
    console.log('✅ The admin interface can successfully upload questions to Firestore');
    
  } catch (error) {
    console.error('❌ Test failed:', error);
    throw error;
  }
}

testAdminUpload();