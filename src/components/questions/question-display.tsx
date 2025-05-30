
"use client";

import type { Question, QuestionOption } from "@/types";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { CheckCircle, XCircle, Loader2, Lightbulb } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { aiAutoEvaluate } from "@/ai/flows/ai-auto-evaluation"; // Ensure this path is correct

type QuestionDisplayProps = {
  question: Question;
  subjectName: string;
  onNextQuestion?: () => void;
  isLastQuestion?: boolean;
};

export function QuestionDisplay({ question, subjectName, onNextQuestion, isLastQuestion }: QuestionDisplayProps) {
  const [selectedOptionId, setSelectedOptionId] = useState<string | undefined>(undefined);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isCorrect, setIsCorrect] = useState<boolean | undefined>(undefined);
  const [aiExplanation, setAiExplanation] = useState<string | undefined>(undefined);
  const [isLoadingAi, setIsLoadingAi] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    // Reset state when question changes
    setSelectedOptionId(undefined);
    setIsSubmitted(false);
    setIsCorrect(undefined);
    setAiExplanation(undefined);
    setIsLoadingAi(false);
  }, [question]);

  const handleSubmit = async () => {
    if (!selectedOptionId) {
      toast({
        title: "No Answer Selected",
        description: "Please select an option before submitting.",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitted(true);
    const correct = selectedOptionId === question.correctOptionId;
    setIsCorrect(correct);

    if (correct) {
      toast({
        title: "Correct!",
        description: "Great job! Moving to the next question.",
        variant: "default", // Explicitly set default variant
        className: "bg-green-500 border-green-600 text-white", // Success toast
      });
      // Auto-move to next question or show button
      if (onNextQuestion && !isLastQuestion) {
        setTimeout(() => onNextQuestion(), 1500); 
      }

    } else {
      setIsLoadingAi(true);
      try {
        const studentAnswerText = question.options.find(opt => opt.id === selectedOptionId)?.text || "Not found";
        const correctAnswerText = question.options.find(opt => opt.id === question.correctOptionId)?.text || "Not found";
        
        const evaluation = await aiAutoEvaluate({
          question: question.text,
          studentAnswer: studentAnswerText,
          correctAnswer: correctAnswerText,
          subject: subjectName,
        });
        setAiExplanation(evaluation.explanation);
      } catch (error) {
        console.error("Error fetching AI explanation:", error);
        setAiExplanation("Could not load explanation at this time.");
        toast({
          title: "Error",
          description: "Failed to get AI explanation.",
          variant: "destructive",
        });
      } finally {
        setIsLoadingAi(false);
      }
    }
  };

  const getOptionTextById = (optionId: string) => {
    return question.options.find(opt => opt.id === optionId)?.text;
  };

  return (
    <Card className="w-full shadow-xl rounded-lg">
      <CardHeader>
        <CardTitle className="text-2xl font-semibold text-primary">{`Question (Year ${question.year})`}</CardTitle>
        <CardDescription className="text-lg mt-2 text-foreground">{question.text}</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <RadioGroup
          value={selectedOptionId}
          onValueChange={setSelectedOptionId}
          disabled={isSubmitted}
        >
          {question.options.map((option) => (
            <div key={option.id} className="flex items-center space-x-3 rounded-md border p-4 transition-colors data-[state=checked]:bg-accent data-[state=checked]:text-accent-foreground hover:bg-muted/50">
              <RadioGroupItem value={option.id} id={option.id} />
              <Label htmlFor={option.id} className="text-base flex-1 cursor-pointer">
                {option.text}
              </Label>
            </div>
          ))}
        </RadioGroup>

        {isSubmitted && (
          <Alert variant={isCorrect ? "default" : "destructive"} className={isCorrect ? "bg-green-50 border-green-400" : "bg-red-50 border-red-400"}>
            {isCorrect ? <CheckCircle className="h-5 w-5 text-green-600" /> : <XCircle className="h-5 w-5 text-red-600" />}
            <AlertTitle className={isCorrect ? "text-green-700" : "text-red-700"}>
              {isCorrect ? "Correct!" : "Incorrect"}
            </AlertTitle>
            <AlertDescription className={isCorrect ? "text-green-600" : "text-red-600"}>
              {isCorrect
                ? "Well done!"
                : `The correct answer is: ${getOptionTextById(question.correctOptionId)}`}
            </AlertDescription>
            {!isCorrect && isLoadingAi && (
              <div className="mt-2 flex items-center text-muted-foreground">
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                <span>Loading AI explanation...</span>
              </div>
            )}
            {!isCorrect && !isLoadingAi && aiExplanation && (
              <div className="mt-4 p-3 bg-background/50 rounded-md border border-dashed">
                <div className="flex items-center font-semibold text-primary mb-2">
                  <Lightbulb className="h-5 w-5 mr-2"/> Explanation:
                </div>
                <p className="text-sm text-foreground">{aiExplanation}</p>
              </div>
            )}
          </Alert>
        )}
      </CardContent>
      <CardFooter className="flex justify-end gap-4">
        {!isSubmitted ? (
          <Button onClick={handleSubmit} disabled={!selectedOptionId || isLoadingAi} size="lg">
            Check Answer
          </Button>
        ) : (
          onNextQuestion && (
             <Button onClick={onNextQuestion} size="lg" variant="default">
              {isLastQuestion ? "Finish Quiz" : "Next Question"}
            </Button>
          )
        )}
      </CardFooter>
    </Card>
  );
}
