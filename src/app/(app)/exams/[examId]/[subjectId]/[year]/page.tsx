
"use client"; // This page involves significant client-side interaction

import { useState, useEffect } from 'react';
import { useParams, useRouter, notFound } from 'next/navigation';
import { Button } from "@/components/ui/button";
import { QuestionDisplay } from "@/components/questions/question-display";
import { AiAssistantButton } from "@/components/ai/ai-assistant-button";
import { AiAssistantChat } from "@/components/ai/ai-assistant-chat";
import { getQuestions, getSubjectById, getExamById } from '@/data/mock-data';
import type { Question } from "@/types";
import { ChevronLeft, AlertTriangle, Home } from 'lucide-react';
import Link from 'next/link';
import { Progress } from "@/components/ui/progress";

export default function SubjectYearQuestionsPage() {
  const params = useParams();
  const router = useRouter();

  const examId = params.examId as string;
  const subjectId = params.subjectId as string;
  const year = parseInt(params.year as string);

  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const exam = getExamById(examId);
  const subject = getSubjectById(examId, subjectId);

  useEffect(() => {
    if (examId && subjectId && year) {
      const fetchedQuestions = getQuestions(examId, subjectId, year);
      setQuestions(fetchedQuestions);
      setCurrentQuestionIndex(0); // Reset index when questions are fetched/changed
    }
    setIsLoading(false);
  }, [examId, subjectId, year]);


  if (isLoading) {
    // This loader is minimal as the main one is in FirebaseProvider or ProtectedRoute
    return <div className="text-center p-10">Loading questions...</div>;
  }
  
  if (!exam || !subject) {
    // This should ideally be caught by a proper notFound() in server component if data fetching was server-side
    // For client-side, this is a fallback.
    // Redirect or show a clear "not found" message if `notFound()` from `next/navigation` cannot be used directly in client component.
    // Since this is client component, we can redirect or render a message.
    useEffect(() => {
      if (!isLoading && (!exam || !subject)) {
        router.push('/404'); // Or a more specific error page
      }
    }, [isLoading, exam, subject, router]);
    return <div className="text-center p-10">Exam or Subject not found. Redirecting...</div>;
  }

  if (questions.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[calc(100vh-10rem)] text-center p-6">
        <AlertTriangle className="h-16 w-16 text-destructive mb-6" />
        <h2 className="text-3xl font-semibold mb-3">No Questions Found</h2>
        <p className="text-muted-foreground mb-6 max-w-md">
          We couldn't find any questions for {subject.name} ({year}) for the {exam.name} exam.
          This might be an issue with our data or this year might not be available yet.
        </p>
        <div className="flex gap-4">
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

  const currentQuestion = questions[currentQuestionIndex];

  const handleNextQuestion = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      // Quiz finished - redirect to a summary page or dashboard
      router.push(`/exams/${examId}/${subjectId}`); // Back to years list for now
    }
  };

  const progressPercentage = ((currentQuestionIndex + 1) / questions.length) * 100;

  return (
    <div className="max-w-3xl mx-auto space-y-8 py-8">
      <div className="flex items-center justify-between">
        <div>
          <Button variant="outline" asChild className="mb-4">
            <Link href={`/exams/${examId}/${subjectId}`}>
              <ChevronLeft className="mr-2 h-4 w-4" /> Back to Years ({subject.name})
            </Link>
          </Button>
          <h1 className="text-3xl font-bold tracking-tight text-foreground">
            {subject.name} - {exam.name} ({year})
          </h1>
        </div>
      </div>

      <div className="space-y-2">
        <div className="flex justify-between text-sm text-muted-foreground">
          <span>Question {currentQuestionIndex + 1} of {questions.length}</span>
          <span>{Math.round(progressPercentage)}%</span>
        </div>
        <Progress value={progressPercentage} className="w-full h-3" />
      </div>

      {currentQuestion && (
        <QuestionDisplay
          question={currentQuestion}
          subjectName={subject.name}
          onNextQuestion={handleNextQuestion}
          isLastQuestion={currentQuestionIndex === questions.length - 1}
        />
      )}

      <AiAssistantButton onClick={() => setIsChatOpen(true)} />
      <AiAssistantChat
        isOpen={isChatOpen}
        onOpenChange={setIsChatOpen}
        currentQuestionContext={currentQuestion}
        subjectName={subject.name}
      />
    </div>
  );
}

