"use client";

import { useState, useEffect } from "react";
import { QuestionCard } from "@/components/questions/QuestionCard-fixed";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

interface QuestionViewerProps {
  questions: Array<{
    id: string;
    text: string;
    options: string[];
    answer: string;
    explanation?: string;
  }>;
  exam: { id: string; name: string };
  subject: { id: string; name: string };
  onScoreChange?: (score: number) => void;
}

export function QuestionViewer({ questions, exam, subject, onScoreChange }: QuestionViewerProps) {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [answeredQuestions, setAnsweredQuestions] = useState<Record<number, boolean>>({});
  const router = useRouter();

  const currentQuestion = questions[currentQuestionIndex];
  const isLastQuestion = currentQuestionIndex === questions.length - 1;

  // Notify parent when score changes
  useEffect(() => {
    if (onScoreChange) {
      onScoreChange(score);
    }
  }, [score, onScoreChange]);

  const handleAnswer = (isCorrect: boolean) => {
    // Only update score if this question hasn't been answered yet
    if (!answeredQuestions[currentQuestionIndex]) {
      const newScore = isCorrect ? score + 1 : score;
      setScore(newScore);
      setAnsweredQuestions(prev => ({ ...prev, [currentQuestionIndex]: true }));
    }
  };

  const handleNext = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
    } else {
      // Handle quiz completion
      console.log('Quiz completed!', { score, total: questions.length });
      // Optionally reset or show results
      const newScore = 0;
      setScore(newScore);
      setAnsweredQuestions({});
      setCurrentQuestionIndex(0);
      if (onScoreChange) onScoreChange(newScore);
    }
  };

  if (!currentQuestion) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] text-center p-4">
        <h1 className="text-2xl font-bold mb-4">No Questions Available</h1>
        <p className="text-muted-foreground">
          There was an error loading the questions.
        </p>
        <Button 
          className="mt-4" 
          onClick={() => router.push(`/exams/${exam.id}`)}
        >
          Back to {exam.name}
        </Button>
      </div>
    );
  }

  return (
    <div className="container py-8 px-4 md:px-6">
      <div className="mb-6">
        <div className="flex justify-between items-start">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold tracking-tight">{exam.name}</h1>
            <h2 className="text-xl md:text-2xl font-semibold text-muted-foreground">
              {subject.name}
            </h2>
          </div>
          <div className="text-sm text-muted-foreground bg-muted/50 px-3 py-1.5 rounded-full">
            Question {currentQuestionIndex + 1} of {questions.length}
          </div>
        </div>
      </div>

      <QuestionCard
        key={currentQuestion.id || currentQuestionIndex} // Force re-render when question changes
        question={currentQuestion}
        questionNumber={currentQuestionIndex + 1}
        totalQuestions={questions.length}
        subject={subject.name}
        onAnswer={handleAnswer}
        onNext={handleNext}
      />
    </div>
  );
}
