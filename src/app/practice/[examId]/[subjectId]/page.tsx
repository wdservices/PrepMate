import { notFound } from 'next/navigation';
import { QuestionCard } from '@/components/questions/QuestionCard';
import { examService, type Question as FirestoreQuestion } from '@/lib/firestore-service';
import { useState } from 'react';

import { QuestionOption } from '@/types';

interface Question {
  id: string;
  text: string;
  options: QuestionOption[];
  answer: string;
  explanation?: string;
}

export default async function PracticePage({
  params,
}: {
  params: { examId: string; subjectId: string };
}) {
  // Get exam and subject data
  const [exam, subject] = await Promise.all([
    examService.getExamById(params.examId),
    examService.getSubjectById(params.examId, params.subjectId),
  ]);

  if (!exam || !subject) {
    notFound();
  }

  // Get questions for this subject
  const firestoreQuestions = await examService.getQuestionsBySubject(
    params.examId,
    params.subjectId,
    // Default to the most recent year if available
    subject.availableYears?.[0]
  );

  // Transform questions to match the expected format
  const questions: Question[] = firestoreQuestions.map(q => {
    const correctOption = q.options.find(opt => opt.id === q.correctOptionId);
    return {
      id: q.id,
      text: q.text,
      options: q.options.map(opt => opt.text),
      answer: correctOption?.text || '',
      explanation: (q as any).explanation // Temporary type assertion
    };
  });

  if (questions.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] text-center p-4">
        <h1 className="text-2xl font-bold mb-4">No Questions Available</h1>
        <p className="text-muted-foreground">
          There are no questions available for {subject.name} at this time.
        </p>
      </div>
    );
  }

  return <QuestionViewer initialQuestions={questions} exam={exam} subject={subject} />;
}

// Client component to handle question state
function QuestionViewer({
  initialQuestions,
  exam,
  subject,
}: {
  initialQuestions: Question[];
  exam: { id: string; name: string };
  subject: { id: string; name: string };
}) {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [questions, setQuestions] = useState(initialQuestions);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const currentQuestion = questions[currentQuestionIndex];
  const progress = {
    current: currentQuestionIndex + 1,
    total: questions.length,
  };

  const handleAnswer = (isCorrect: boolean) => {
    if (isCorrect) {
      setScore((prev) => prev + 1);
    }
  };

  const handleNext = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex((prev) => prev + 1);
    } else {
      // Handle quiz completion
      console.log('Quiz completed!', { score, total: questions.length });
      // Optionally reset or show results
      setCurrentQuestionIndex(0);
      setScore(0);
    }
  };

  if (!currentQuestion) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] text-center p-4">
        <h1 className="text-2xl font-bold mb-4">No Questions Available</h1>
        <p className="text-muted-foreground">
          There was an error loading the questions.
        </p>
      </div>
    );
  }

  return (
    <div className="container py-8 px-4 md:px-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight">{exam.name}</h1>
        <h2 className="text-2xl font-semibold text-muted-foreground">
          {subject.name}
        </h2>
      </div>

      <QuestionCard
        question={currentQuestion}
        questionNumber={progress.current}
        totalQuestions={progress.total}
        onAnswer={handleAnswer}
        onNext={handleNext}
      />

      {error && (
        <div className="mt-4 p-4 bg-red-50 text-red-700 rounded-md">
          {error}
        </div>
      )}
    </div>
  );
}
