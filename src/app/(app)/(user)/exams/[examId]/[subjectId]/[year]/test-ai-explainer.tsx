"use client";

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { QuestionDisplayFixed } from '@/components/questions/QuestionDisplayFixed';

// Test component to verify AI explainer functionality
export default function AIExplainerTest() {
  const [showChat, setShowChat] = useState(false);
  
  // Debug: Log environment variable
  useEffect(() => {
    console.log('Environment Variables:', {
      GOOGLE_API_KEY: process.env.NEXT_PUBLIC_GOOGLE_API_KEY ? '✅ Set' : '❌ Missing',
      NODE_ENV: process.env.NODE_ENV
    });
  }, []);
  
  // Test question data
  const testQuestion = {
    id: 'test-q1',
    text: 'What is the chemical symbol for water?',
    options: [
      { id: 'opt-1', text: 'H2O' },
      { id: 'opt-2', text: 'CO2' },
      { id: 'opt-3', text: 'NaCl' },
      { id: 'opt-4', text: 'O2' },
    ],
    correctOptionId: 'opt-1',
    explanation: 'Water is composed of two hydrogen atoms and one oxygen atom, hence the chemical formula H₂O.'
  };

  const handleRequestExplanation = async (question: any) => {
    console.log('Requesting explanation for question:', question.id);
    setShowChat(true);
    
    // In a real implementation, this would call the AI service
    // For testing, we'll just log to console
    console.log('AI Explanation would be fetched here');
  };

  return (
    <div className="container mx-auto p-8 max-w-4xl">
      <h1 className="text-2xl font-bold mb-6">AI Explainer Test</h1>
      
      <div className="mb-8 p-6 border rounded-lg bg-gray-50">
        <h2 className="text-xl font-semibold mb-4">Test Question</h2>
        <QuestionDisplayFixed 
          question={testQuestion}
          subjectName="Chemistry"
          questionNumber={1}
          onRequestExplanation={handleRequestExplanation}
        />
      </div>
      
      <div className="p-6 border rounded-lg bg-blue-50">
        <h2 className="text-xl font-semibold mb-4">Test Instructions</h2>
        <ol className="list-decimal pl-5 space-y-2">
          <li>Select an incorrect answer to see the "Explain with AI" button</li>
          <li>Click the "Explain with AI" button</li>
          <li>Verify that the chat interface appears</li>
          <li>Check the browser console for the test log message</li>
        </ol>
        
        <div className="mt-6 p-4 bg-white rounded border">
          <h3 className="font-medium mb-2">Debug Info:</h3>
          <pre className="text-sm bg-gray-100 p-2 rounded overflow-auto">
            {JSON.stringify({
              showChat,
              lastAction: showChat ? 'Chat opened' : 'Chat closed'
            }, null, 2)}
          </pre>
        </div>
      </div>
      
      {/* Simple chat UI for testing */}
      {showChat && (
        <div className="fixed bottom-8 right-8 w-96 bg-white shadow-xl rounded-lg border border-gray-200 z-50">
          <div className="bg-blue-600 text-white p-3 rounded-t-lg flex justify-between items-center">
            <h3 className="font-medium">AI Assistant - Chemistry</h3>
            <button 
              onClick={() => setShowChat(false)}
              className="text-white hover:text-blue-200"
            >
              ✕
            </button>
          </div>
          <div className="p-4 h-64 overflow-y-auto">
            <div className="mb-4 p-3 bg-blue-50 rounded border border-blue-100">
              <p className="text-sm font-medium text-blue-800 mb-1">Question Context:</p>
              <p className="text-sm text-blue-700">{testQuestion.text}</p>
            </div>
            <div className="p-3 bg-gray-100 rounded">
              <p className="text-sm font-medium text-gray-800 mb-2">AI EXPLANATION:</p>
              <p className="text-sm text-gray-700">
                You selected: <span className="font-medium">{testQuestion.options.find(opt => opt.id === 'opt-2')?.text}</span> (B)
              </p>
              <p className="text-sm text-gray-700 mt-1">
                The correct answer is: <span className="font-medium">A. {testQuestion.options.find(opt => opt.id === 'opt-1')?.text}</span>
              </p>
              <p className="mt-2 text-sm text-gray-600">
                Water is composed of two hydrogen atoms and one oxygen atom, which is why the correct answer is <strong>A. H₂O</strong>. 
                The other options represent different molecules: B is carbon dioxide, C is sodium chloride (table salt), and D is oxygen gas.
              </p>
            </div>
          </div>
          <div className="p-3 border-t">
            <div className="flex">
              <input
                type="text"
                placeholder="Type your question..."
                className="flex-1 border rounded-l px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
                disabled
              />
              <button 
                className="bg-blue-600 text-white px-4 rounded-r hover:bg-blue-700"
                disabled
              >
                Send
              </button>
            </div>
            <p className="mt-2 text-xs text-gray-500 text-center">
              AI explanations are powered by advanced AI technology
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
