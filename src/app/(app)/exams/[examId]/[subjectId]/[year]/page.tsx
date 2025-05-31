
"use client"; 

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { Button } from "@/components/ui/button";
import { QuestionDisplay } from "@/components/questions/question-display";
import { AiAssistantButton } from "@/components/ai/ai-assistant-button";
import { AiAssistantChat } from "@/components/ai/ai-assistant-chat";
import { getQuestions, getSubjectById, getExamById } from '@/data/mock-data';
import type { Question } from "@/types";
import { ChevronLeft, AlertTriangle, Home, ListChecks } from 'lucide-react';
import Link from 'next/link';

export default function SubjectYearQuestionsPage() {
  const params = useParams();
  const router = useRouter();

  const examId = params.examId as string;
  const subjectId = params.subjectId as string;
  const year = parseInt(params.year as string);

  const [questions, setQuestions] = useState<Question[]>([]);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const exam = getExamById(examId);
  const subject = getSubjectById(examId, subjectId);

  useEffect(() => {
    if (examId && subjectId && year) {
      const fetchedQuestions = getQuestions(examId, subjectId, year);
      setQuestions(fetchedQuestions);
    }
    setIsLoading(false);
  }, [examId, subjectId, year]);


  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[calc(100vh-10rem)] text-center p-6">
        <ListChecks className="h-16 w-16 text-primary animate-pulse mb-6" />
        <h2 className="text-3xl font-semibold mb-3">Loading Questions...</h2>
        <p className="text-muted-foreground max-w-md">
          Please wait while we fetch the questions for {subject?.name || 'this subject'} ({year || 'selected year'}).
        </p>
      </div>
    );
  }
  
  useEffect(() => {
    if (!isLoading && (!exam || !subject)) {
      router.push('/404'); 
    }
  }, [isLoading, exam, subject, router]);

  if (!exam || !subject) {
     return (
      <div className="flex flex-col items-center justify-center min-h-[calc(100vh-10rem)] text-center p-6">
        <AlertTriangle className="h-16 w-16 text-destructive mb-6" />
        <h2 className="text-3xl font-semibold mb-3">Exam or Subject Not Found</h2>
        <p className="text-muted-foreground mb-6 max-w-md">
          The requested exam or subject could not be found. You are being redirected.
        </p>
      </div>
    );
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

  return (
    <div className="max-w-4xl mx-auto space-y-10 py-8">
      <div className="space-y-2">
        <Button variant="outline" asChild className="mb-4">
          <Link href={`/exams/${examId}/${subjectId}`}>
            <ChevronLeft className="mr-2 h-4 w-4" /> Back to Years ({subject.name})
          </Link>
        </Button>
        <h1 className="text-4xl font-bold tracking-tight text-foreground flex items-center">
          <ListChecks className="mr-3 h-10 w-10 text-primary" />
          {subject.name} - {exam.name} ({year})
        </h1>
        <p className="text-lg text-muted-foreground ml-12">
          Showing all {questions.length} questions for this selection. Answer them in any order.
        </p>
      </div>

      <div className="space-y-8">
        {questions.map((question, index) => (
          <QuestionDisplay
            key={question.id}
            question={question}
            subjectName={subject.name}
            // onNextQuestion and isLastQuestion are removed
          />
        ))}
      </div>

      <AiAssistantButton onClick={() => setIsChatOpen(true)} />
      <AiAssistantChat
        isOpen={isChatOpen}
        onOpenChange={setIsChatOpen}
        currentQuestionContext={null} // No single "current" question when all are displayed
        subjectName={subject.name}
      />
    </div>
  );
}
