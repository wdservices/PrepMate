"use client";

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ChevronLeft, Home, Loader2, Bot, X } from 'lucide-react';
import { examService } from '@/lib/firestore-service';
import { QuestionDisplayFixed as QuestionDisplay } from '@/components/questions/QuestionDisplayFixed';
import { AiAssistantButton } from '@/components/ai/ai-assistant-button';
import type { Question as FirestoreQuestion, Exam, Subject } from '@/lib/firestore-service';
import type { Question as UIQuestion } from '@/types';

// Unified question type that works with both Firestore and UI components
type UnifiedQuestion = {
  id: string;
  text: string;
  options: Array<{ id: string; text: string }>;
  correctOptionId: string;
  explanation?: string;
  imageUrl?: string;
  year?: number;
};

// Simple type guard
function isFirestoreQuestion(question: any): question is FirestoreQuestion {
  return question && 
         Array.isArray(question.options) && 
         question.options.every((opt: any) => typeof opt === 'object' && 'id' in opt && 'text' in opt);
}

export default function SubjectYearQuestionsPage() {
  const params = useParams();
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [exam, setExam] = useState<Exam | null>(null);
  const [subject, setSubject] = useState<Subject | null>(null);
  const [questions, setQuestions] = useState<UnifiedQuestion[]>([]);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState<UnifiedQuestion | null>(null);
  const [isLoadingAI, setIsLoadingAI] = useState(false);
  const [aiMessages, setAiMessages] = useState<Array<{role: 'user' | 'ai', content: string}>>([]);

  // Extract parameters from URL
  const examId = params?.examId ? (Array.isArray(params.examId) ? params.examId[0] : params.examId) : '';
  const subjectId = params?.subjectId ? (Array.isArray(params.subjectId) ? params.subjectId[0] : params.subjectId) : '';
  const year = params?.year ? (Array.isArray(params.year) ? params.year[0] : params.year) : '';
  const yearNumber = year ? parseInt(year, 10) : new Date().getFullYear();
  const yearString = yearNumber.toString();

  // Fetch exam and subject data
  useEffect(() => {
    if (!examId || !subjectId) return;

    const fetchData = async () => {
      try {
        setLoading(true);
        
        // Fetch exam
        const examData = await examService.getExamById(examId);
        if (!examData) {
          throw new Error('Exam not found');
        }
        setExam(examData);
        
        // Fetch subject
        const subjectData = await examService.getSubjectById(examId, subjectId);
        if (!subjectData) {
          throw new Error('Subject not found');
        }
        setSubject(subjectData);
        
        // Fetch questions for the selected year
        const questionsData = await examService.getQuestionsBySubject(
          examId,
          subjectId,
          yearNumber
        );
        
        // Process questions to ensure consistent format
        const processedQuestions = processQuestions(questionsData);
        console.log('Processed questions:', processedQuestions);
        setQuestions(processedQuestions);
        
      } catch (err) {
        console.error('Error fetching data:', err);
        setError(err instanceof Error ? err.message : 'An error occurred');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [examId, subjectId, yearNumber]);

  // Handle AI explanation request
  const handleRequestExplanation = (question: UnifiedQuestion) => {
    console.log('AI Explanation requested for question:', question.id);
    // Set the current question for the chat context
    setCurrentQuestion(question);
    
    // Add initial message to chat
    const initialMessage = {
      role: 'ai' as const,
      content: `I see you need help with this question: "${question.text}". I can help explain the concepts and guide you to the correct answer.`
    };
    setAiMessages([initialMessage]);
    
    // Open the chat if it's not already open
    if (!isChatOpen) {
      console.log('Opening chat...');
      setIsChatOpen(true);
    }
  };
  
  // Handle sending a message to the AI
  const handleSendMessage = async (message: string) => {
    if (!message.trim() || !currentQuestion) return;
    
    // Add user message
    const userMessage = { role: 'user' as const, content: message };
    setAiMessages(prev => [...prev, userMessage]);
    
    // Show loading state
    setIsLoadingAI(true);
    
    try {
      // In a real implementation, this would call your AI service
      // For now, we'll simulate a response
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Add AI response
      const aiResponse = {
        role: 'ai' as const,
        content: `I understand you're asking about the question. Here's a detailed explanation: ${currentQuestion.explanation || 'The correct answer is option ' + currentQuestion.correctOptionId + '.'}`
      };
      
      setAiMessages(prev => [...prev, aiResponse]);
    } catch (error) {
      console.error('Error getting AI response:', error);
      // Add error message
      const errorMessage = {
        role: 'ai' as const,
        content: 'Sorry, I encountered an error while processing your request. Please try again later.'
      };
      setAiMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoadingAI(false);
    }
  };
  
  // Process questions from Firestore to ensure consistent format
  const processQuestions = (questions: any[]): UnifiedQuestion[] => {
    return questions.map(q => {
      // Convert options to the expected format
      const options = Array.isArray(q.options) 
        ? q.options.map((opt: any, index: number) => ({
            id: `opt-${index + 1}`,
            text: typeof opt === 'string' ? opt : opt.text || `Option ${index + 1}`
          }))
        : [];
      
      // Ensure correctOptionId is set
      const correctOptionId = q.correctOptionId || q.answer || '';
      
      return {
        ...q,
        options,
        correctOptionId,
        // Ensure required fields have defaults
        id: q.id || `q-${Math.random().toString(36).substr(2, 9)}`,
        text: q.text || 'Question text not available'
      };
    });
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="flex flex-col items-center space-y-4">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
          <p>Loading questions...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto p-6">
        <div className="bg-red-50 border-l-4 border-red-500 p-4 mb-6">
          <div className="flex">
            <div className="flex-shrink-0">
              <svg className="h-5 w-5 text-red-500" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.28 7.22a.75.75 0 00-1.06 1.06L8.94 10l-1.72 1.72a.75.75 0 101.06 1.06L10 11.06l1.72 1.72a.75.75 0 101.06-1.06L11.06 10l1.72-1.72a.75.75 0 00-1.06-1.06L10 8.94 8.28 7.22z" clipRule="evenodd" />
              </svg>
            </div>
            <div className="ml-3">
              <p className="text-sm text-red-700">{error}</p>
            </div>
          </div>
        </div>
        <Button onClick={() => router.back()} variant="outline">
          <ChevronLeft className="h-4 w-4 mr-2" />
          Go Back
        </Button>
      </div>
    );
  }

  if (!exam || !subject) {
    return (
      <div className="container mx-auto p-6">
        <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4">
          <div className="flex">
            <div className="flex-shrink-0">
              <svg className="h-5 w-5 text-yellow-500" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M8.485 2.495c.673-1.167 2.357-1.167 3.03 0l6.28 10.875c.673 1.167-.17 2.625-1.516 2.625H3.72c-1.347 0-2.189-1.458-1.515-2.625L8.485 2.495zM10 5a.75.75 0 01.75.75v3.5a.75.75 0 01-1.5 0v-3.5A.75.75 0 0110 5zm0 9a1 1 0 100-2 1 1 0 000 2z" clipRule="evenodd" />
              </svg>
            </div>
            <div className="ml-3">
              <p className="text-sm text-yellow-700">Exam or subject data not found.</p>
            </div>
          </div>
        </div>
        <Button onClick={() => router.push('/exams')} variant="outline" className="mt-4">
          <Home className="h-4 w-4 mr-2" />
          Back to Exams
        </Button>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4 md:p-6 max-w-6xl">
      <div className="mb-8">
        <div className="flex items-center space-x-2 mb-2">
          <Button variant="ghost" size="icon" onClick={() => router.back()}>
            <ChevronLeft className="h-5 w-5" />
          </Button>
          <h1 className="text-2xl font-bold tracking-tight">
            {subject.name} - {exam.name} ({yearString})
          </h1>
        </div>
        <p className="text-muted-foreground ml-12">
          Practice {questions.length} questions for {subject.name} {exam.name} {yearString}.
          Answer them in any order.
        </p>
      </div>

      <div className="space-y-8">
        {questions.map((question, index) => (
          <QuestionDisplay
            key={question.id}
            question={question}
            subjectName={subject.name}
            questionNumber={index + 1}
            onRequestExplanation={handleRequestExplanation}
          />
        ))}
      </div>

      {/* AI Assistant Button - Fixed to bottom right */}
      <div className="fixed bottom-8 right-8 z-50">
        <button
          onClick={() => setIsChatOpen(true)}
          className="bg-blue-600 text-white p-3 rounded-full shadow-lg hover:bg-blue-700 transition-colors flex items-center justify-center"
          aria-label="AI Assistant"
        >
          <Bot className="h-6 w-6" />
        </button>
      </div>

      {/* AI Assistant Chat - Only render when open */}
      {isChatOpen && (
        <div className="fixed bottom-24 right-8 z-50 w-96 bg-white shadow-xl rounded-lg overflow-hidden border border-gray-200 flex flex-col" style={{ maxHeight: '70vh' }}>
          <div className="flex justify-between items-center bg-blue-600 text-white p-3">
            <div className="flex items-center">
              <Bot className="h-5 w-5 mr-2" />
              <h3 className="font-medium">AI Assistant - {subject?.name || 'Subject'}</h3>
            </div>
            <button 
              onClick={() => setIsChatOpen(false)}
              className="text-white hover:text-blue-200 p-1 rounded-full hover:bg-blue-700"
              aria-label="Close chat"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
          
          {/* Chat messages */}
          <div className="flex-1 p-4 overflow-y-auto bg-gray-50">
            {currentQuestion && (
              <div className="mb-4 p-3 bg-blue-50 rounded-lg border border-blue-100">
                <p className="text-xs font-medium text-blue-700 mb-1">Current Question:</p>
                <p className="text-sm text-blue-800">
                  {currentQuestion.text?.substring(0, 150)}
                  {currentQuestion.text && currentQuestion.text.length > 150 ? '...' : ''}
                </p>
              </div>
            )}
            
            {aiMessages.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-40 text-center text-gray-500">
                <Bot className="h-8 w-8 mb-2 text-gray-400" />
                <p className="text-sm">How can I help you with this question?</p>
                <p className="text-xs mt-1">Ask me anything about {subject?.name || 'this subject'}!</p>
              </div>
            ) : (
              <div className="space-y-4">
                {aiMessages.map((message, index) => (
                  <div 
                    key={index} 
                    className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div 
                      className={`max-w-[80%] p-3 rounded-lg ${
                        message.role === 'user' 
                          ? 'bg-blue-600 text-white' 
                          : 'bg-white border border-gray-200'
                      }`}
                    >
                      <p className="text-sm">{message.content}</p>
                    </div>
                  </div>
                ))}
                {isLoadingAI && (
                  <div className="flex justify-start">
                    <div className="bg-white border border-gray-200 p-3 rounded-lg">
                      <div className="flex space-x-2">
                        <div className="w-2 h-2 rounded-full bg-gray-400 animate-bounce" style={{ animationDelay: '0ms' }}></div>
                        <div className="w-2 h-2 rounded-full bg-gray-400 animate-bounce" style={{ animationDelay: '150ms' }}></div>
                        <div className="w-2 h-2 rounded-full bg-gray-400 animate-bounce" style={{ animationDelay: '300ms' }}></div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
          
          {/* Message input */}
          <div className="p-4 border-t bg-white">
            <form 
              onSubmit={(e) => {
                e.preventDefault();
                const input = e.currentTarget.elements.namedItem('message') as HTMLInputElement;
                if (input.value.trim()) {
                  handleSendMessage(input.value.trim());
                  input.value = '';
                }
              }}
              className="space-y-2"
            >
              <div className="flex items-center">
                <input
                  type="text"
                  name="message"
                  placeholder="Type your question..."
                  className="flex-1 border rounded-l-lg px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                  disabled={isLoadingAI || !currentQuestion}
                  aria-label="Type your message"
                />
                <button 
                  type="submit"
                  className="bg-blue-600 text-white px-4 py-2 rounded-r-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  disabled={isLoadingAI || !currentQuestion}
                >
                  {isLoadingAI ? 'Sending...' : 'Send'}
                </button>
              </div>
              {!currentQuestion && (
                <p className="text-xs text-gray-500 text-center">
                  Select a question first to ask about it
                </p>
              )}
            </form>
            <p className="mt-2 text-xs text-gray-500 text-center">
              AI assistant may provide inaccurate information. Always verify important details.
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
