'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { examService } from '@/lib/firestore-service';

export default function FirestoreTest() {
  const [isConnected, setIsConnected] = useState(false);
  const [exams, setExams] = useState([]([]));
  const [subjects, setSubjects] = useState([]([]));
  const [questions, setQuestions] = useState([]([]));
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [selectedExam, setSelectedExam] = useState<string>('');
  const [selectedSubject, setSelectedSubject] = useState<string>('');

  useEffect(() => {
    // Check Firestore connection
    setIsConnected(examService.isConnected());
    
    // Load exams on component mount
    loadExams();
  }, []);

  const loadExams = async () => {
    try {
      setLoading(true);
      setError(null);
      const examsList = await examService.getAllExams();
      setExams(examsList);
    } catch (err) {
      setError(`Failed to load exams: ${err instanceof Error ? err.message : 'Unknown error'}`);
    } finally {
      setLoading(false);
    }
  };

  const loadSubjects = async (examId: string) => {
    try {
      setLoading(true);
      setError(null);
      const subjectsList = await examService.getSubjectsByExam(examId);
      setSubjects(subjectsList);
      setSelectedExam(examId);
      setQuestions([]); // Clear questions when changing exam
      setSelectedSubject('');
    } catch (err) {
      setError(`Failed to load subjects: ${err instanceof Error ? err.message : 'Unknown error'}`);
    } finally {
      setLoading(false);
    }
  };

  const loadQuestions = async (examId: string, subjectId: string) => {
    try {
      setLoading(true);
      setError(null);
      const questionsList = await examService.getQuestionsBySubject(examId, subjectId);
      setQuestions(questionsList);
      setSelectedSubject(subjectId);
    } catch (err) {
      setError(`Failed to load questions: ${err instanceof Error ? err.message : 'Unknown error'}`);
    } finally {
      setLoading(false);
    }
  };

  const createTestData = async () => {
    try {
      setLoading(true);
      setError(null);

      // Create a test exam
      const examId = await examService.createExam({
        name: 'WAEC 2023',
        year: 2023,
        type: 'WAEC'
      });

      // Create a test subject
      const subjectId = await examService.createSubject(examId, {
        name: 'Chemistry',
        code: 'CHEM101'
      });

      // Create test questions
      const testQuestions = [
        {
          question: 'What is the atomic number of Hydrogen?',
          options: ['1', '2', '3', '4'],
          answer: '1',
          explanation: 'Hydrogen has an atomic number of 1'
        },
        {
          question: 'What is the chemical symbol for Gold?',
          options: ['Ag', 'Au', 'Hg', 'Pb'],
          answer: 'Au',
          explanation: 'The chemical symbol for Gold is Au'
        }
      ];

      await examService.createMultipleQuestions(examId, subjectId, testQuestions);

      // Reload data
      await loadExams();
      
      setError(null);
      alert('Test data created successfully!');
    } catch (err) {
      setError(`Failed to create test data: ${err instanceof Error ? err.message : 'Unknown error'}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">Firestore Connection Test</h1>
      
      {/* Connection Status */}
      <div className="mb-6 p-4 rounded-lg border">
        <h2 className="text-lg font-semibold mb-2">Connection Status</h2>
        <div className={`inline-flex items-center px-3 py-1 rounded-full text-sm ${
          isConnected 
            ? 'bg-green-100 text-green-800' 
            : 'bg-red-100 text-red-800'
        }`}>
          <div className={`w-2 h-2 rounded-full mr-2 ${
            isConnected ? 'bg-green-500' : 'bg-red-500'
          }`}></div>
          {isConnected ? 'Connected' : 'Disconnected'}
        </div>
      </div>

      {/* Error Display */}
      {error && (
        <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
          <h3 className="text-red-800 font-semibold">Error:</h3>
          <p className="text-red-700">{error}</p>
        </div>
      )}

      {/* Loading Indicator */}
      {loading && (
        <div className="mb-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
          <p className="text-blue-700">Loading...</p>
        </div>
      )}

      {/* Test Data Creation */}
      <div className="mb-6 p-4 border rounded-lg">
        <h2 className="text-lg font-semibold mb-2">Create Test Data</h2>
        <p className="text-gray-600 mb-4">
          Create sample exam, subject, and questions to test the Firestore connection.
        </p>
        <Button
          onClick={createTestData}
          disabled={loading || !isConnected}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:bg-gray-300"
        >
          Create Test Data
        </Button>
      </div>

      {/* Exams List */}
      <div className="mb-6 p-4 border rounded-lg">
        <h2 className="text-lg font-semibold mb-2">Exams ({exams.length})</h2>
        {exams.length === 0 ? (
          <p className="text-gray-500">No exams found. Create test data to get started.</p>
        ) : (
          <div className="space-y-2">
            {exams.map((exam) => (
              <div
                key={exam.id}
                className={`p-3 border rounded cursor-pointer hover:bg-gray-50 ${
                  selectedExam === exam.id ? 'bg-blue-50 border-blue-300' : ''
                }`}
                onClick={() => exam.id && loadSubjects(exam.id)}
              >
                <h3 className="font-medium">{exam.name}</h3>
                <p className="text-sm text-gray-600">Year: {exam.year} | Type: {exam.type}</p>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Subjects List */}
      {selectedExam && (
        <div className="mb-6 p-4 border rounded-lg">
          <h2 className="text-lg font-semibold mb-2">Subjects ({subjects.length})</h2>
          {subjects.length === 0 ? (
            <p className="text-gray-500">No subjects found for this exam.</p>
          ) : (
            <div className="space-y-2">
              {subjects.map((subject) => (
                <div
                  key={subject.id}
                  className={`p-3 border rounded cursor-pointer hover:bg-gray-50 ${
                    selectedSubject === subject.id ? 'bg-green-50 border-green-300' : ''
                  }`}
                  onClick={() => subject.id && loadQuestions(selectedExam, subject.id)}
                >
                  <h3 className="font-medium">{subject.name}</h3>
                  <p className="text-sm text-gray-600">Code: {subject.code}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Questions List */}
      {selectedSubject && (
        <div className="mb-6 p-4 border rounded-lg">
          <h2 className="text-lg font-semibold mb-2">Questions ({questions.length})</h2>
          {questions.length === 0 ? (
            <p className="text-gray-500">No questions found for this subject.</p>
          ) : (
            <div className="space-y-4">
              {questions.map((question, index) => (
                <div key={question.id} className="p-4 border rounded bg-gray-50">
                  <h3 className="font-medium mb-2">Q{index + 1}: {question.question}</h3>
                  <div className="mb-2">
                    <p className="text-sm font-medium text-gray-700">Options:</p>
                    <ul className="list-disc list-inside text-sm text-gray-600">
                      {question.options.map((option, optIndex) => (
                        <li key={optIndex} className={option === question.answer ? 'text-green-600 font-medium' : ''}>
                          {option} {option === question.answer && '(Correct)'}
                        </li>
                      ))}
                    </ul>
                  </div>
                  {question.explanation && (
                    <p className="text-sm text-gray-600">
                      <span className="font-medium">Explanation:</span> {question.explanation}
                    </p>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
