
"use client"; 

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { Button } from "@/components/ui/button";
import { QuestionDisplay } from "@/components/questions/question-display";
import { AiAssistantButton } from "@/components/ai/ai-assistant-button";
import { AiAssistantChat } from "@/components/ai/ai-assistant-chat";
import { getQuestionsForSubjectYearFromFirestore, getSubjectByIdFromFirestore, getExamByIdFromFirestore } from '@/lib/firebase-service';
import type { Question, FirestoreSubjectData, FirestoreExamData } from "@/types";
import { ChevronLeft, AlertTriangle, Home, ListChecks, Loader2 } from 'lucide-react';

export default function SubjectYearQuestionsPage() {
  const params = useParams();
  const router = useRouter();

  const examId = params.examId as string;
  const subjectId = params.subjectId as string;
  const yearString = params.year as string;
  
  const [questions, setQuestions] = useState<Question[]>([]);
  const [exam, setExam] = useState<FirestoreExamData | null>(null);
  const [subject, setSubject] = useState<FirestoreSubjectData | null>(null);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [isLoadingPage, setIsLoadingPage] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const year = parseInt(yearString);


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
        console.log(`[SubjectYearQuestionsPage] Fetching data for Exam: ${examId}, Subject: ${subjectId}, Year: ${year}`);
        const [examData, subjectData, questionsData] = await Promise.all([
          getExamByIdFromFirestore(examId),
          getSubjectByIdFromFirestore(examId, subjectId),
          getQuestionsForSubjectYearFromFirestore(examId, subjectId, year)
        ]);

        if (!examData) setError(prev => prev ? `${prev} Exam not found.` : "Exam not found.");
        if (!subjectData) setError(prev => prev ? `${prev} Subject not found.` : "Subject not found.");
        
        setExam(examData);
        setSubject(subjectData);
        setQuestions(questionsData);

        if (examData && subjectData) {
          document.title = `${subjectData.name} ${year} - ${examData.name} | PrepMate`;
        } else {
          document.title = `Questions | PrepMate`;
        }

      } catch (err: any) {
        console.error("[SubjectYearQuestionsPage] Error loading page data:", err);
        setError("Failed to load questions or page details. Please try again.");
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
    // This should be caught by the error state after loading, but as a fallback
    return (
     <div className="flex flex-col items-center justify-center min-h-[calc(100vh-10rem)] text-center p-6">
       <AlertTriangle className="h-16 w-16 text-destructive mb-6" />
       <h2 className="text-3xl font-semibold mb-3">Exam or Subject Details Missing</h2>
       <p className="text-muted-foreground mb-6 max-w-md">
         Could not load necessary exam or subject information.
       </p>
       <Button asChild>
           <Link href="/dashboard"> Return to Dashboard</Link>
       </Button>
     </div>
   );
 }


  if (questions.length === 0) { // Check after loading and no error
    return (
      <div className="flex flex-col items-center justify-center min-h-[calc(100vh-10rem)] text-center p-6">
        <AlertTriangle className="h-16 w-16 text-muted-foreground mb-6" />
        <h2 className="text-3xl font-semibold mb-3">No Questions Found</h2>
        <p className="text-muted-foreground mb-6 max-w-md">
          We couldn't find any questions for {subject.name} ({yearString}) for the {exam.name} exam in our database.
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
          {subject.name} - {exam.name} ({yearString})
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
            subjectName={subject!.name} // Subject is guaranteed to be non-null here
            questionNumber={index + 1} 
          />
        ))}
      </div>

      <AiAssistantButton onClick={() => setIsChatOpen(true)} />
      <AiAssistantChat
        isOpen={isChatOpen}
        onOpenChange={setIsChatOpen}
        currentQuestionContext={null} // Can be enhanced to pass current question
        subjectName={subject!.name} // Subject is guaranteed to be non-null here
      />
    </div>
  );
}
