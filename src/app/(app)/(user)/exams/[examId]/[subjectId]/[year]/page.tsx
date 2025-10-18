"use client"; 

"use client";

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { AlertTriangle, ChevronLeft, Home, Loader2, CheckCircle2, RotateCw, BookOpen } from 'lucide-react';
import { examService } from '@/lib/firestore-service';
import { QuestionViewer } from '@/components/shared/QuestionViewer';
import { Exam, Subject } from '@/types';
import type { UnifiedQuestion as Question } from '@/types/question';

export default function SubjectYearQuestionsPage() {
  const params = useParams() as { examId: string; subjectId: string; year: string } | null;
  const router = useRouter();

  if (!params?.examId || !params?.subjectId || !params?.year) {
    throw new Error('Missing required URL parameters');
  }

  const { examId, subjectId, year: yearString } = params;
  
  const [questions, setQuestions] = useState<Question[]>([]);
  const [exam, setExam] = useState<Exam | null>(null); 
  const [subject, setSubject] = useState<Subject | null>(null); 

  const [isLoadingPage, setIsLoadingPage] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [showScore, setShowScore] = useState(false);
  const [answeredQuestions, setAnsweredQuestions] = useState<Record<number, boolean>>({});
  
  // Transform questions to match the expected format for QuestionViewer
  const transformedQuestions = questions.map((q: any) => {
    // First, extract all options as strings
    const options = Array.isArray(q.options) 
      ? q.options.map((opt: any, index: number) => {
          if (typeof opt === 'string') return opt.trim();
          if (typeof opt === 'object') return (opt.text || opt.option || '').trim();
          return String(opt).trim();
        }).filter((opt: string) => opt) // Remove any empty options
      : [];

    // Helper function to normalize strings for comparison
    const normalizeString = (str: string) => 
      str.toLowerCase().trim().replace(/[^a-z0-9]/g, '');

    // Format the correct answer - ensure it matches one of the options exactly
    const correctAnswer = (() => {
      // If answer is a letter (a, b, c, d), get the corresponding option
      if (typeof q.answer === 'string' && /^[a-d]$/i.test(q.answer.trim())) {
        const optionIndex = q.answer.trim().toLowerCase().charCodeAt(0) - 'a'.charCodeAt(0);
        if (options[optionIndex]) {
          return options[optionIndex];
        }
      }
      
      // If answer is a number (1, 2, 3, 4), get the corresponding option (0-based index)
      if (typeof q.answer === 'number' || /^\d+$/.test(q.answer)) {
        const optionIndex = parseInt(q.answer, 10) - 1;
        if (options[optionIndex]) {
          return options[optionIndex];
        }
      }
      
      // If answer is already a string, try to match it with options
      if (typeof q.answer === 'string' && q.answer.trim()) {
        const normalizedAnswer = normalizeString(q.answer);
        
        // Try exact match first
        const exactMatch = options.find((opt: string) => opt === q.answer.trim());
        if (exactMatch) return exactMatch;
        
        // Try case-insensitive match
        const caseInsensitiveMatch = options.find((opt: string) => 
          normalizeString(opt) === normalizedAnswer
        );
        if (caseInsensitiveMatch) return caseInsensitiveMatch;
        
        // Try matching with option text after the letter (e.g., "A. Option text")
        const optionTextMatch = options.find((opt: string) => {
          const optionText = opt.replace(/^[A-Da-d]\.?\s*/, '').trim();
          return normalizeString(optionText) === normalizedAnswer;
        });
        if (optionTextMatch) return optionTextMatch;
      }
      
      // If we have a correctOptionId, find the corresponding option
      if (q.correctOptionId) {
        const correctOption = q.options?.find((opt: any, index: number) => {
          if (typeof opt === 'object') {
            return opt.id === q.correctOptionId || opt.optionId === q.correctOptionId;
          }
          return index === q.correctOptionId || String(opt) === String(q.correctOptionId);
        });
        
        if (correctOption) {
          const answerText = typeof correctOption === 'object' 
            ? correctOption.text || correctOption.option 
            : correctOption;
          
          if (answerText) {
            // Try to match the answer text with options
            const normalizedAnswer = normalizeString(answerText);
            const match = options.find((opt: string) => 
              normalizeString(opt) === normalizedAnswer ||
              normalizeString(opt.replace(/^[A-Da-d]\.?\s*/, '')) === normalizedAnswer
            );
            if (match) return match;
          }
        }
      }
      
      // Last resort: If we have an answer field but couldn't match it, include it in the debug info
      if (q.answer) {
        console.warn('Could not match answer to options:', {
          questionId: q.id,
          providedAnswer: q.answer,
          options,
          correctOptionId: q.correctOptionId
        });
      }
      
      // If we couldn't determine the answer, return empty string (will be handled by QuestionCard)
      return '';
    })();

    // Debug log for each question
    console.log('Processed question:', {
      id: q.id,
      text: q.text || q.question,
      options,
      answer: correctAnswer,
      answerInOptions: options.includes(correctAnswer),
      originalData: {
        answer: q.answer,
        correctOptionId: q.correctOptionId,
        options: q.options
      }
    });

    return {
      id: q.id || `q-${Math.random().toString(36).substr(2, 9)}`,
      text: q.text || q.question || 'No question text',
      options: options,
      answer: correctAnswer,
      explanation: q.explanation || q.explanationFromAI || ''
    };
  });
  
  const year = parseInt(yearString);
  
  // Handle option selection
  const handleOptionSelect = (option: string) => {
    // Only process if this question hasn't been answered yet
    if (!answeredQuestions[currentQuestionIndex]) {
      const isCorrect = transformedQuestions[currentQuestionIndex]?.answer === option;
      if (isCorrect) {
        const newScore = score + 1;
        setScore(newScore);
      }
      
      // Mark this question as answered
      setAnsweredQuestions(prev => ({ ...prev, [currentQuestionIndex]: true }));
      
      // Move to next question or show score
      if (currentQuestionIndex < transformedQuestions.length - 1) {
        setCurrentQuestionIndex(prev => prev + 1);
      } else {
        setShowScore(true);
      }
    }
  };

  // Handle quiz restart
  const handleRestart = () => {
    setCurrentQuestionIndex(0);
    setScore(0);
    setShowScore(false);
    setAnsweredQuestions({});
  };

  useEffect(() => {
    async function loadData() {
      if (!examId || !subjectId || !yearString || isNaN(year)) {
        setError("Invalid exam, subject, or year parameters.");
        setIsLoadingPage(false);
        return;
      }
      setIsLoadingPage(true);
      setError(null);
      try {
        console.log(`[SubjectYearQuestionsPage] Fetching data for Exam: ${examId}, Subject: ${subjectId}, Year: ${year} from Firestore`);
        const examData = await examService.getExamById(examId);
        const subjectData = examData ? await examService.getSubjectById(examId, subjectId) : null;
const questionsData = await examService.getQuestionsBySubject(examId, subjectId, year);

        if (!examData) setError(prev => prev ? `${prev} Exam not found.` : "Exam not found.");
        if (!subjectData) setError(prev => prev ? `${prev} Subject not found.` : "Subject not found.");
        
        setExam(examData as any);
        setSubject(subjectData as any);
        setQuestions(questionsData as any);

        if (examData && subjectData) {
          document.title = `${subjectData.name} ${year} - ${examData.name} | PrepMate`;
        } else {
          document.title = `Questions | PrepMate`;
        }

      } catch (err: any) {
        console.error("[SubjectYearQuestionsPage] Error loading page data from mock data:", err);
        setError("Failed to load questions or page details from mock data. Please try again.");
      } finally {
        setIsLoadingPage(false);
      }
    }
    loadData();
  }, [examId, subjectId, yearString, year]);


  if (isLoadingPage) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[calc(100vh-10rem)] text-center p-6">
        <Loader2 className="h-16 w-16 text-primary animate-spin mb-6" />
        <h2 className="text-3xl font-semibold mb-3">Loading Questions...</h2>
        <p className="text-muted-foreground max-w-md">
          Please wait while we fetch the questions for {subject?.name || 'this subject'} ({yearString || 'selected year'}).
        </p>
      </div>
    );
  }
  
  if (error) {
     return (
      <div className="flex flex-col items-center justify-center min-h-[calc(100vh-10rem)] text-center p-6">
        <AlertTriangle className="h-16 w-16 text-destructive mb-6" />
        <h2 className="text-3xl font-semibold mb-3 text-destructive">Error Loading Data</h2>
        <p className="text-muted-foreground mb-6 max-w-md">{error}</p>
         <div className="flex gap-4 mt-6">
          <Button variant="outline" onClick={() => router.back()}>
            <ChevronLeft className="mr-2 h-4 w-4" /> Go Back
          </Button>
          <Button asChild>
            <Link href="/dashboard">
              <Home className="mr-2 h-4 w-4" /> Go to Dashboard
            </Link>
          </Button>
        </div>
      </div>
    );
  }

  if (!exam || !subject) {
    return (
     <div className="flex flex-col items-center justify-center min-h-[calc(100vh-10rem)] text-center p-6">
       <AlertTriangle className="h-16 w-16 text-destructive mb-6" />
       <h2 className="text-3xl font-semibold mb-3">Exam or Subject Details Missing</h2>
       <p className="text-muted-foreground mb-6 max-w-md">
         Could not load necessary exam or subject information from mock data.
       </p>
       <Button asChild>
           <Link href="/dashboard"> Return to Dashboard</Link>
       </Button>
     </div>
   );
 }


  if (transformedQuestions.length === 0) { 
    return (
      <div className="container py-8">
        <div className="bg-muted/50 border rounded-lg p-8 text-center">
          <BookOpen className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
          <h2 className="text-2xl font-bold mb-2">No Questions Available</h2>
          <p className="text-muted-foreground mb-6">
            There are no questions available for {subject?.name || 'this subject'} ({yearString || 'selected year'}).
          </p>
          <Button asChild>
            <Link href={`/exams/${examId}`}>
              <ChevronLeft className="mr-2 h-4 w-4" /> Back to Subjects
            </Link>
          </Button>
        </div>
      </div>
    );
  }

  if (showScore) {
    return (
      <div className="container py-12">
        <div className="max-w-2xl mx-auto bg-card rounded-lg border p-8 text-center">
          <CheckCircle2 className="h-16 w-16 text-green-500 mx-auto mb-6" />
          <h2 className="text-3xl font-bold mb-4">Quiz Completed!</h2>
          <p className="text-xl mb-6">
            You scored {score} out of {transformedQuestions.length} questions correctly.
          </p>
          <div className="flex justify-center gap-4">
            <Button onClick={handleRestart} size="lg">
              <RotateCw className="mr-2 h-4 w-4" /> Restart Quiz
            </Button>
            <Button asChild variant="outline" size="lg">
              <Link href={`/exams/${examId}/${subjectId}`}>
                <ChevronLeft className="mr-2 h-4 w-4" /> Back to Subject
              </Link>
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container py-8">
      <div className="mb-6">
        <Button variant="ghost" asChild className="mb-4">
          <Link href={`/exams/${examId}/${subjectId}`}>
            <ChevronLeft className="mr-2 h-4 w-4" />
            Back to {subject?.name || 'Subject'}
          </Link>
        </Button>
        
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">
              {subject?.name} ({yearString})
            </h1>
            <p className="text-muted-foreground">
              {exam?.name} • Question {currentQuestionIndex + 1} of {transformedQuestions.length}
            </p>
          </div>
          <div className="bg-muted px-3 py-1 rounded-full text-sm font-medium">
            Score: {score} / {transformedQuestions.length}
          </div>
        </div>
      </div>

      <div className="w-full max-w-4xl mx-auto">
        
        <QuestionViewer
          questions={transformedQuestions}
          exam={exam || { id: examId, name: 'Exam' }}
          subject={subject || { id: subjectId, name: 'Subject' }}
          onScoreChange={setScore}
        />
      </div>
    </div>
  );
}
