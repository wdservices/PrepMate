"use client";

import { useState, useEffect } from "react";
import { useToast } from '@/hooks/use-toast';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Progress } from "@/components/ui/progress";
import { 
  CheckCircle2, 
  XCircle, 
  Loader2, 
  MessageCircleQuestion, 
  ArrowRight, 
  Bot 
} from "lucide-react";
import { cn } from "@/lib/utils";
import { ChatModal } from "./ChatModal";
import { aiService } from "@/lib/ai-service-client";

import { QuestionOption } from '@/types';

type Question = {
  id: string;
  text: string;
  options: QuestionOption[];
  answer: string;
  explanation?: string;
};

interface QuestionCardProps {
  question: Question;
  questionNumber: number;
  totalQuestions: number;
  subject: string;
  onNext: () => void;
  onAnswer: (isCorrect: boolean) => void;
}

export function QuestionCard({
  question,
  questionNumber,
  totalQuestions,
  subject,
  onNext,
  onAnswer,
}: QuestionCardProps) {
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  const [explanation, setExplanation] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [isRateLimited, setIsRateLimited] = useState(false);

  const isQuestionAnswered = selectedOption !== null;
  const isLastQuestion = questionNumber === totalQuestions;
  const progress = (questionNumber / totalQuestions) * 100;
  
  const { toast } = useToast();
  
  // Check for rate limit status on component mount
  useEffect(() => {
    const rateLimited = localStorage.getItem('aiRateLimited');
    if (rateLimited === 'true') {
      setIsRateLimited(true);
    }
  }, []);
  
  // Show fallback explanation without making API calls
  const showFallbackExplanation = (option: string, isAnswerCorrect: boolean) => {
    const defaultExplanation = 
      `The correct answer is: ${question.answer}. ` +
      (isAnswerCorrect 
        ? 'Your answer is correct! ' + (question.explanation || '') 
        : `You selected: ${option}. The correct answer is: ${question.answer}. ` + 
          (question.explanation || '')
      );
    
    setExplanation(defaultExplanation);
    setIsLoading(false);
  };

  // Helper function to normalize strings for comparison
  const normalizeString = (str: string) => {
    if (!str) return '';
    // Remove any leading letter/number and dot (e.g., 'A. ' or '1. ')
    const cleaned = str.replace(/^[a-zA-Z0-9]\.?\s*/, '').trim();
    return cleaned.toLowerCase().trim().replace(/[^a-z0-9]/g, '');
  };

  const handleOptionSelect = async (option: string) => {
    if (isQuestionAnswered) return;

    // Set the selected option
    setSelectedOption(option);
    
    // Check if the selected option is correct
    const isAnswerCorrect = option === question.answer || 
                          normalizeString(option) === normalizeString(question.answer) ||
                          question.options.some(opt => 
                            opt === question.answer && 
                            normalizeString(opt) === normalizeString(option)
                          );
    
    // Update the score immediately
    onAnswer(isAnswerCorrect);
    setIsCorrect(isAnswerCorrect);
    
    // Show the explanation
    showFallbackExplanation(option, isAnswerCorrect);
  };

  const handleNext = () => {
    setSelectedOption(null);
    setExplanation(null);
    setIsCorrect(null);
    onNext();
  };

  // Render the component
  return (
    <Card className="w-full max-w-3xl mx-auto">
      <CardHeader>
        <div className="flex justify-between items-start">
          <div>
            <CardTitle className="text-2xl">
              Question {questionNumber} of {totalQuestions}
            </CardTitle>
            <p className="text-sm text-muted-foreground mt-1">{subject}</p>
          </div>
          <div className="flex items-center space-x-2">
            <Progress value={progress} className="w-24 h-2" />
            <span className="text-sm text-muted-foreground">
              {Math.round(progress)}%
            </span>
          </div>
        </div>
      </CardHeader>
      
      <CardContent>
        <div className="space-y-6">
          <div className="prose dark:prose-invert max-w-none">
            <p className="text-lg">{question.text}</p>
          </div>
          
          <div className="space-y-3">
            {question.options.map((option, index) => {
              const isSelected = selectedOption === option;
              const isAnswer = option === question.answer;
              const showCorrect = isQuestionAnswered && isAnswer;
              const showIncorrect = isQuestionAnswered && isSelected && !isAnswer;
              
              return (
                <button
                  key={index}
                  onClick={() => handleOptionSelect(option)}
                  disabled={isQuestionAnswered}
                  className={cn(
                    "w-full text-left p-4 rounded-lg border transition-colors",
                    isSelected 
                      ? 'bg-primary/10 border-primary text-primary' 
                      : 'hover:bg-muted/50',
                    showCorrect && 'bg-green-50 border-green-500 text-green-700',
                    showIncorrect && 'bg-red-50 border-red-500 text-red-700',
                    isQuestionAnswered && 'opacity-100'
                  )}
                >
                  <div className="flex items-center">
                    <div className="flex-shrink-0 w-6 h-6 rounded-full border flex items-center justify-center mr-3">
                      {String.fromCharCode(65 + index)}
                    </div>
                    <span>{option}</span>
                    {showCorrect && (
                      <CheckCircle2 className="ml-auto h-5 w-5 text-green-500" />
                    )}
                    {showIncorrect && (
                      <XCircle className="ml-auto h-5 w-5 text-red-500" />
                    )}
                  </div>
                </button>
              );
            })}
          </div>
          
          {explanation && (
            <Alert className="mt-4">
              <MessageCircleQuestion className="h-4 w-4" />
              <AlertTitle>Explanation</AlertTitle>
              <AlertDescription className="mt-2">
                {explanation}
              </AlertDescription>
            </Alert>
          )}
        </div>
      </CardContent>
      
      <CardFooter className="flex justify-between">
        <Button
          variant="outline"
          onClick={() => setIsChatOpen(true)}
          disabled={isLoading || isRateLimited}
        >
          <Bot className="h-4 w-4 mr-2" />
          {isLoading ? 'Loading...' : 'Ask AI'}
        </Button>
        
        <Button 
          onClick={handleNext} 
          disabled={!isQuestionAnswered}
        >
          {isLastQuestion ? 'Finish' : 'Next'}
          <ArrowRight className="h-4 w-4 ml-2" />
        </Button>
      </CardFooter>
      
      <ChatModal 
        isOpen={isChatOpen} 
        onClose={() => setIsChatOpen(false)}
        question={question}
        selectedOption={selectedOption}
        isCorrect={isCorrect}
      />
    </Card>
  );
}
