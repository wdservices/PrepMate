
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

  const handleOptionSelect = (optionId: string) => {
    setSelectedOptionId(optionId);
    const correct = optionId === question.answer;  // Changed from question.correctOptionId to question.answer
    setIsCorrect(correct);
    setIsSubmitted(true);
    
    // Show feedback immediately
    toast({
      title: correct ? "Correct! 🎉" : "Incorrect",
      description: correct 
        ? "Great job! Your answer is correct." 
        : `The correct answer is: ${question.options.find(opt => opt.id === question.answer)?.text}`,
      variant: correct ? "default" : "destructive",
    });

    // Load AI explanation
    setIsLoadingAi(true);
    setAiExplanation(undefined);

    const studentAnswerText = question.options.find(opt => opt.id === optionId)?.text || "Not found";
    const correctAnswerText = question.options.find(opt => opt.id === question.answer)?.text || "Not found";
    
    aiExplainAnswer({
      question: question.text,
      correctAnswerText: correctAnswerText,
      isCorrect: correct,
      studentAnswerTextIfIncorrect: correct ? undefined : studentAnswerText,
      subject: subjectName,
    })
    .then(evaluation => {
      setAiExplanation(evaluation.explanation);
    })
    .catch(error => {
      console.error("Error fetching AI explanation:", error);
      setAiExplanation("Could not load explanation at this time. Please try asking the AI Tutor for help.");
    })
    .finally(() => {
      setIsLoadingAi(false);
    });
  };

  // Keep handleSubmit for backward compatibility
  const handleSubmit = () => {
    if (!selectedOptionId) {
      toast({
        title: "No Answer Selected",
        description: "Please select an option before submitting.",
        variant: "destructive",
      });
      return;
    }
    // Just trigger the selection logic if not already submitted
    if (!isSubmitted) {
      handleOptionSelect(selectedOptionId);
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
          onValueChange={(value) => !isSubmitted && handleOptionSelect(value)}
          disabled={isSubmitted}
          className="space-y-3"
        >
          {question.options.map((option) => {
            const isSelected = option.id === selectedOptionId;
            const isActualCorrect = option.id === question.answer;
            
            let optionStyle = "border-border hover:bg-muted/50 bg-card";
            let icon = null;

            if (isSelected) {
              if (isActualCorrect) {
                // Always highlight the correct answer in green
                icon = <CheckCircle className="h-5 w-5 text-green-600" />;
              } else {
                // Show X for wrong selected answer
                icon = <XCircle className="h-5 w-5 text-red-500" />;
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
                  !isSubmitted && "cursor-pointer hover:shadow-md",
                  // Show green for correct answer when any option is selected
                  isSubmitted && option.id === question.answer && "bg-green-50 border-green-500 text-green-800 font-medium",
                  // Show red for wrong selected answer
                  isSubmitted && selectedOptionId === option.id && option.id !== question.answer && "bg-red-50 border-red-300 text-red-800"
                )}
                onClick={() => !isSubmitted && handleOptionSelect(option.id)}
              >
                <RadioGroupItem 
                  value={option.id} 
                  id={`${question.id}-${option.id}`}
                  checked={selectedOptionId === option.id}
                  className={cn(
                    "border-muted-foreground data-[state=checked]:border-primary data-[state=checked]:text-primary",
                    // Styling for correct/incorrect answers when submitted
                    isSubmitted && isActualCorrect && "border-green-700 text-green-700",
                    isSubmitted && isSelected && !isActualCorrect && "border-red-700 text-red-700",
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
          <div className="space-y-4 mt-4">
            <Alert variant={isCorrect ? "default" : "destructive"} className={cn("border-l-4", isCorrect ? "border-green-500 bg-green-50 text-green-800" : "border-red-500 bg-red-50 text-red-800")}>
              <div className="flex items-center">
                {isCorrect ? (
                  <CheckCircle className="h-5 w-5 mr-2 text-green-600" />
                ) : (
                  <XCircle className="h-5 w-5 mr-2 text-red-600" />
                )}
                <div>
                  <AlertTitle className="font-semibold">
                    {isCorrect ? "Correct! 🎉" : "Incorrect"}
                  </AlertTitle>
                  <AlertDescription className="mt-1">
                    {isCorrect 
                      ? "Great job! Your answer is correct."
                      : `The correct answer is: ${question.options.find(opt => opt.id === question.answer)?.text}`}
                  </AlertDescription>
                </div>
              </div>
            </Alert>

            {aiExplanation && (
              <div className="mt-4 p-4 bg-blue-50 border border-blue-200 rounded-lg">
                <div className="flex items-center font-semibold text-blue-700 mb-2 text-md">
                  <Lightbulb className="h-5 w-5 mr-2 text-blue-600"/> 
                  <span>AI Explanation</span>
                </div>
                <p className="text-sm text-blue-800 whitespace-pre-line leading-relaxed">
                  {aiExplanation}
                </p>
              </div>
            )}
          </div>
        )}

        {isSubmitted && isLoadingAi && (
          <div className="mt-4 p-4 bg-blue-50 border border-blue-200 rounded-lg">
            <div className="flex items-center justify-center space-x-2 text-blue-700">
              <Loader2 className="h-5 w-5 animate-spin" />
              <span className="font-medium">Generating AI explanation...</span>
            </div>
            <p className="mt-2 text-sm text-blue-600 text-center">This may take a few moments</p>
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
