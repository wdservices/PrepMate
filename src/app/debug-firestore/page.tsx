"use client";

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { examService } from '@/lib/firestore-service';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export default function DebugFirestore() {
  const [results, setResults] = useState<any>({});
  const [loading, setLoading] = useState(false);

  const runTests = async () => {
    setLoading(true);
    const testResults: any = {};

    try {
      // Test 1: Get all exams
      console.log('🧪 Testing: Get all exams');
      const exams = await examService.getAllExams();
      testResults.exams = exams;
      console.log('📊 Exams found:', exams);

      // Test 2: Get specific exam
      console.log('🧪 Testing: Get jamb exam');
      const exam = await examService.getExamById('jamb');
      testResults.exam = exam;
      console.log('📊 JAMB exam:', exam);

      // Test 3: Get subjects for jamb
      console.log('🧪 Testing: Get subjects for jamb');
      const subjects = await examService.getSubjectsByExam('jamb');
      testResults.subjects = subjects;
      console.log('📊 Subjects found:', subjects);

      // Test 4: Get specific subject
      console.log('🧪 Testing: Get chemistry subject');
      const subject = await examService.getSubjectById('jamb', 'chemistry');
      setResults(prev => ({ ...prev, subject }));
      console.log('📊 Chemistry subject:', subject);

      // Test 5: Get questions for chemistry
      console.log('🧪 Testing: Get questions for chemistry');
      const questions = await examService.getQuestionsBySubject('jamb', 'chemistry');
      setResults(prev => ({ ...prev, questions }));
      console.log('📊 Questions:', questions);

      // Test 6: Get a specific question
      console.log('🧪 Testing: Get specific question');
      const question = await examService.getQuestionById('jamb', 'chemistry', 'q1');
      setResults(prev => ({ ...prev, question }));
      console.log('📊 Specific question:', question);

    } catch (error) {
      console.error('❌ Test failed:', error);
      setResults(prev => ({ ...prev, error }));
    }

    setLoading(false);
  };

  return (
    <div className="container mx-auto p-6 space-y-6">
      <div className="text-center">
        <h1 className="text-3xl font-bold mb-4">🔍 Firestore Debug Page</h1>
        <p className="text-muted-foreground mb-6">
          This page tests all Firestore queries to identify issues
        </p>
        <Button onClick={runTests} disabled={loading}>
          {loading ? 'Running Tests...' : 'Run Firestore Tests'}
        </Button>
      </div>

      {Object.keys(results).length > 0 && (
        <div className="grid gap-4">
          <Card>
            <CardHeader>
              <CardTitle>📊 Test Results</CardTitle>
            </CardHeader>
            <CardContent>
              <pre className="bg-muted p-4 rounded-lg overflow-auto text-sm">
                {JSON.stringify(results, null, 2)}
              </pre>
            </CardContent>
          </Card>

          {results.error && (
            <Card className="border-red-500">
              <CardHeader>
                <CardTitle className="text-red-600">❌ Error Details</CardTitle>
              </CardHeader>
              <CardContent>
                <pre className="bg-red-50 p-4 rounded-lg overflow-auto text-sm text-red-800">
                  {JSON.stringify(results.error, null, 2)}
                </pre>
              </CardContent>
            </Card>
          )}

          {results.questions && (
            <Card className="border-green-500">
              <CardHeader>
                <CardTitle className="text-green-600">✅ Questions Found</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-green-800">
                  Found {results.questions.length} question(s) in chemistry subject
                </p>
                {results.questions.map((q: any, index: number) => (
                  <div key={index} className="mt-2 p-2 bg-green-50 rounded">
                    <p><strong>ID:</strong> {q.id}</p>
                    <p><strong>Question:</strong> {q.question}</p>
                    <p><strong>Answer:</strong> {q.answer}</p>
                  </div>
                ))}
              </CardContent>
            </Card>
          )}
        </div>
      )}
    </div>
  );
}
