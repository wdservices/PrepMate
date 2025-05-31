
"use client";

import type { Question } from "@/types";
import { useState, useEffect } from "react";
import Image from 'next/image';
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
  questionNumber?: number; // Added questionNumber prop
};

export function QuestionDisplay({ question, subjectName, questionNumber }: QuestionDisplayProps) {
  const [selectedOptionId, setSelectedOptionId] = useState<string | undefined>(undefined);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isCorrect, setIsCorrect] = useState<boolean | undefined>(undefined);
  const [aiExplanation, setAiExplanation] = useState<string | undefined>(undefined);
  const [isLoadingAi, setIsLoadingAi] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    // Reset state when the question ID changes
    setSelectedOptionId(undefined);
    setIsSubmitted(false);
    setIsCorrect(undefined);
    setAiExplanation(undefined);
    setIsLoadingAi(false);
  }, [question.id]);

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
    setAiExplanation(undefined); 

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
    <Card className="w-full shadow-xl rounded-xl overflow-hidden">
      <CardHeader className="bg-card border-b">
        <CardTitle className="text-xl font-semibold text-primary">
          {questionNumber ? `Question ${questionNumber} ` : 'Question '} 
          (Year {question.year})
        </CardTitle>
        <CardDescription className="text-md mt-2 text-foreground leading-relaxed whitespace-pre-line">{question.text}</CardDescription>
        {question.imageUrl && (
          <div className="mt-4 relative w-full max-w-md h-64 mx-auto border rounded-md overflow-hidden shadow-sm">
            <Image 
              src={question.imageUrl} 
              alt={`Question ${questionNumber || ''} image`} 
              layout="fill"
              objectFit="contain" 
              data-ai-hint="diagram chart" // Generic hint for question images
            />
          </div>
        )}
      </CardHeader>
      <CardContent className="pt-6 pb-4 space-y-4 bg-background/30">
        <RadioGroup
          value={selectedOptionId}
          onValueChange={setSelectedOptionId}
          disabled={isSubmitted}
          className="space-y-3"
        >
          {question.options.map((option) => {
            const isSelected = option.id === selectedOptionId;
            const isActualCorrect = option.id === question.correctOptionId;
            
            let optionStyle = "border-border hover:bg-muted/50 bg-card";
            let icon = null;

            if (isSubmitted) {
              if (isSelected) {
                if (isCorrect) {
                  optionStyle = "bg-green-100 border-green-500 text-green-800 font-medium";
                  icon = <CheckCircle className="h-5 w-5 text-green-600" />;
                } else {
                  optionStyle = "bg-red-100 border-red-500 text-red-800 font-medium";
                  icon = <XCircle className="h-5 w-5 text-red-600" />;
                }
              } else if (isActualCorrect) {
                // Style for the correct answer when an incorrect one was chosen by user
                optionStyle = "border-green-500 ring-1 ring-green-400 bg-green-50 text-green-700";
              }
            }

            return (
              <div 
                key={option.id} 
                className={cn(
                  "flex items-center space-x-3 rounded-lg border p-4 transition-all duration-150 ease-in-out",
                  // Apply active styling only if not submitted
                  !isSubmitted && "data-[state=checked]:bg-primary/10 data-[state=checked]:border-primary data-[state=checked]:text-primary-foreground",
                  optionStyle,
                  !isSubmitted && "cursor-pointer hover:shadow-md" 
                )}
                onClick={() => !isSubmitted && setSelectedOptionId(option.id)} // Allow clicking the whole div to select
              >
                <RadioGroupItem 
                  value={option.id} 
                  id={`${question.id}-${option.id}`}
                  checked={selectedOptionId === option.id} // Ensure item is checked based on state
                  className={cn(
                    "border-muted-foreground data-[state=checked]:border-primary data-[state=checked]:text-primary",
                    // Specific styling for submitted answers
                    isSubmitted && isSelected && isCorrect && "border-green-700 text-green-700",
                    isSubmitted && isSelected && !isCorrect && "border-red-700 text-red-700",
                  )}
                  aria-labelledby={`${question.id}-${option.id}-label`}
                />
                <Label htmlFor={`${question.id}-${option.id}`} id={`${question.id}-${option.id}-label`} className={cn("text-base flex-1", !isSubmitted && "cursor-pointer")}>
                  {option.text}
                </Label>
                {isSubmitted && isSelected && icon}
              </div>
            );
          })}
        </RadioGroup>

        {isSubmitted && !isLoadingAi && typeof isCorrect === 'boolean' && (
          <Alert variant={isCorrect ? "default" : "destructive"} className={cn("mt-4", isCorrect ? "bg-green-50 border-green-400 text-green-700" : "bg-red-50 border-red-400 text-red-700")}>
            {isCorrect ? <CheckCircle className="h-5 w-5" /> : <XCircle className="h-5 w-5" />}
            <AlertTitle className="font-semibold">
              {isCorrect ? "Your Answer: Correct!" : "Your Answer: Incorrect!"}
            </AlertTitle>
          </Alert>
        )}

        {isSubmitted && isLoadingAi && (
          <div className="mt-4 p-3 bg-muted/50 rounded-md border flex items-center justify-center space-x-2">
            <Loader2 className="h-5 w-5 animate-spin text-primary" />
            <span className="text-muted-foreground">Loading AI explanation...</span>
          </div>
        )}
        
        {isSubmitted && !isLoadingAi && aiExplanation && (
          <div className="mt-4 p-4 bg-card rounded-lg border border-border shadow-sm">
            <div className="flex items-center font-semibold text-primary mb-2 text-md">
              <Lightbulb className="h-5 w-5 mr-2 stroke-current"/> AI Explanation
            </div>
            <p className="text-sm text-foreground whitespace-pre-line leading-relaxed">{aiExplanation}</p>
          </div>
        )}

      </CardContent>
      <CardFooter className="flex justify-end gap-4 py-4 px-6 bg-card border-t">
        {!isSubmitted ? (
          <Button onClick={handleSubmit} disabled={!selectedOptionId || isLoadingAi} size="lg">
            {isLoadingAi ? <Loader2 className="mr-2 h-4 w-4 animate-spin"/> : null}
            Check Answer
          </Button>
        ) : (
           <Button size="lg" disabled className="opacity-70">
             {isCorrect ? <CheckCircle className="mr-2"/> : <XCircle className="mr-2"/>}
            Answer Submitted
          </Button>
        )}
      </CardFooter>
    </Card>
  );
}
