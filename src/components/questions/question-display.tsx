
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
import { aiExplainAnswer } from "@/ai/flows/ai-answer-explanation"; 
import { cn } from "@/lib/utils";

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
    setIsLoadingAi(true);
    setAiExplanation(undefined); // Clear previous explanation

    try {
      const studentAnswerText = question.options.find(opt => opt.id === selectedOptionId)?.text || "Not found";
      const correctAnswerText = question.options.find(opt => opt.id === question.correctOptionId)?.text || "Not found";
      
      const evaluation = await aiExplainAnswer({
        question: question.text,
        correctAnswerText: correctAnswerText,
        isCorrect: correct,
        studentAnswerTextIfIncorrect: correct ? undefined : studentAnswerText,
        subject: subjectName,
      });
      setAiExplanation(evaluation.explanation);
    } catch (error) {
      console.error("Error fetching AI explanation:", error);
      setAiExplanation("Could not load explanation at this time. Please try asking the AI Tutor for help.");
      toast({
        title: "Explanation Error",
        description: "Failed to get AI explanation.",
        variant: "destructive",
      });
    } finally {
      setIsLoadingAi(false);
    }
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
          {question.options.map((option) => {
            const isSelected = option.id === selectedOptionId;
            const isActualCorrect = option.id === question.correctOptionId;
            
            let optionStyle = "border-border hover:bg-muted/50";
            let icon = null;

            if (isSubmitted) {
              if (isSelected) {
                if (isCorrect) {
                  optionStyle = "bg-green-100 border-green-500 text-green-700";
                  icon = <CheckCircle className="h-5 w-5 text-green-600" />;
                } else {
                  optionStyle = "bg-red-100 border-red-500 text-red-700";
                  icon = <XCircle className="h-5 w-5 text-red-600" />;
                }
              } else if (isActualCorrect) {
                optionStyle = "border-green-500 ring-2 ring-green-300 bg-green-50";
                // Optionally add icon for non-selected correct answer
                // icon = <CheckCircle className="h-5 w-5 text-green-600" />;
              }
            }

            return (
              <div 
                key={option.id} 
                className={cn(
                  "flex items-center space-x-3 rounded-md border p-4 transition-colors",
                  isSubmitted ? "" : "data-[state=checked]:bg-accent data-[state=checked]:text-accent-foreground",
                  optionStyle,
                  !isSubmitted && "cursor-pointer" 
                )}
                onClick={() => !isSubmitted && setSelectedOptionId(option.id)}
              >
                <RadioGroupItem 
                  value={option.id} 
                  id={option.id} 
                  checked={selectedOptionId === option.id}
                  className={cn(
                    isSubmitted && isSelected && isCorrect && "border-green-700 text-green-700",
                    isSubmitted && isSelected && !isCorrect && "border-red-700 text-red-700",
                  )}
                />
                <Label htmlFor={option.id} className={cn("text-base flex-1", !isSubmitted && "cursor-pointer")}>
                  {option.text}
                </Label>
                {isSubmitted && isSelected && icon}
              </div>
            );
          })}
        </RadioGroup>

        {isSubmitted && !isLoadingAi && typeof isCorrect === 'boolean' && (
          <Alert variant={isCorrect ? "default" : "destructive"} className={isCorrect ? "bg-green-50 border-green-400" : "bg-red-50 border-red-400"}>
            {isCorrect ? <CheckCircle className="h-5 w-5 text-green-600" /> : <XCircle className="h-5 w-5 text-red-600" />}
            <AlertTitle className={isCorrect ? "text-green-700" : "text-red-700"}>
              {isCorrect ? "Your Answer: Correct!" : "Your Answer: Incorrect!"}
            </AlertTitle>
          </Alert>
        )}

        {isSubmitted && isLoadingAi && (
          <div className="mt-4 p-3 bg-muted/50 rounded-md border flex items-center justify-center">
            <Loader2 className="mr-2 h-5 w-5 animate-spin text-primary" />
            <span className="text-muted-foreground">Loading AI explanation...</span>
          </div>
        )}
        
        {isSubmitted && !isLoadingAi && aiExplanation && (
          <div className="mt-4 p-4 bg-card rounded-md border border-border shadow">
            <div className="flex items-center font-semibold text-primary mb-2">
              <Lightbulb className="h-5 w-5 mr-2"/> AI Explanation:
            </div>
            <p className="text-sm text-foreground whitespace-pre-line">{aiExplanation}</p>
          </div>
        )}

      </CardContent>
      <CardFooter className="flex justify-end gap-4">
        {!isSubmitted ? (
          <Button onClick={handleSubmit} disabled={!selectedOptionId} size="lg">
            Check Answer
          </Button>
        ) : (
          onNextQuestion && (
             <Button onClick={onNextQuestion} size="lg" variant="default" disabled={isLoadingAi}>
              {isLastQuestion ? "Finish Quiz" : "Next Question"}
            </Button>
          )
        )}
      </CardFooter>
    </Card>
  );
}
