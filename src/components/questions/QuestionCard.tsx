"use client";

import { useState, useMemo, useEffect } from "react";
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

type Question = {
  id: string;
  text: string;
  options: string[];
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
  
  // Check for rate limit status on component mount
  useEffect(() => {
    const rateLimited = localStorage.getItem('aiRateLimited');
    if (rateLimited === 'true') {
      setIsRateLimited(true);
    }
  }, []);
  
  // Show fallback explanation without making API calls
  const showFallbackExplanation = (option: string, isCorrectAnswer: boolean) => {
    const defaultExplanation = 
      `The correct answer is: ${question.answer}. ` +
      (isCorrectAnswer 
        ? 'Your answer is correct! ' + (question.explanation || '') 
        : `You selected: ${option}. The correct answer is: ${question.answer}. ` + 
          (question.explanation || '')
      );
    
    setExplanation(defaultExplanation);
    setIsLoading(false);
  };



  const { toast } = useToast();
  
  // Helper function to normalize strings for comparison
  const normalizeString = (str: string) => {
    if (!str) return '';
    // Remove any leading letter/number and dot (e.g., 'A. ' or '1. ')
    const cleaned = str.replace(/^[a-zA-Z0-9]\.?\s*/, '').trim();
    return cleaned.toLowerCase().trim().replace(/[^a-z0-9]/g, '');
  };

  const handleOptionSelect = async (option: string) => {
    if (isQuestionAnswered) return;

    // Normalize both the selected option and the correct answer for comparison
    const normalizedOption = normalizeString(option);
    const normalizedAnswer = normalizeString(question.answer);
    
    // Check if the answer is a direct match to any option
    const isDirectMatch = question.options.some(opt => 
      normalizeString(opt) === normalizedAnswer || 
      opt === question.answer
    );

    // Check if the selected option is correct
    let isAnswerCorrect = false;
    if (!isDirectMatch) {
      // Try to find the answer in the options (case-insensitive)
      const answerInOptions = question.options.find(opt => 
        normalizeString(opt) === normalizedAnswer || 
        normalizeString(opt) === normalizeString(question.answer)
      );
      
      if (answerInOptions) {
        isAnswerCorrect = normalizeString(option) === normalizeString(answerInOptions);
      } else {
        // Fallback to direct comparison
        isAnswerCorrect = normalizedOption === normalizedAnswer;
      }
    } else {
      // Direct comparison when answer matches an option
      isAnswerCorrect = normalizedOption === normalizedAnswer || 
                       normalizeString(option) === normalizeString(question.answer);
    }
    
    console.log('Answer check:', {
      selected: option,
      selectedNormalized: normalizedOption,
      correctAnswer: question.answer,
      correctNormalized: normalizedAnswer,
      isAnswerCorrect,
      isDirectMatch
    });
    
    // Set the selected option and immediate feedback
    setSelectedOption(option);
    setIsCorrect(isAnswerCorrect);
    onAnswer(isAnswerCorrect);
    
    // Don't try to call the API if we're rate limited
    if (isRateLimited) {
      showFallbackExplanation(option, isAnswerCorrect);
      return;
    }
    
    // Start loading AI explanation
    setIsLoading(true);
    
    try {
      // Generate AI explanation
      const aiExplanation = await aiService.generateExplanation({
        question: question.text,
        selectedAnswer: option,
        isCorrect: isAnswerCorrect,
        correctAnswer: question.answer,
        subject: 'this subject'
      });
      setExplanation(aiExplanation);
    } catch (aiError: any) {
      console.error('AI Explanation Error:', aiError);
      
      // Handle rate limiting
      if (aiError?.status === 429) {
        setIsRateLimited(true);
        localStorage.setItem('aiRateLimited', 'true');
        // Set a timeout to reset the rate limit flag after 1 hour
        setTimeout(() => {
          setIsRateLimited(false);
          localStorage.removeItem('aiRateLimited');
        }, 60 * 60 * 1000); // 1 hour
      }
      
      showFallbackExplanation(option, isAnswerCorrect);
    } finally {
      setIsLoading(false);
    }
  };

  const handleNext = () => {
    setSelectedOption(null);
    setIsCorrect(null);
    setExplanation(null);
    onNext();
  };

  // Debug logging
  console.log('Rendering QuestionCard with:', {
    question: question.text,
    selectedOption,
    isQuestionAnswered,
    correctAnswer: question.answer
  });

  return (
    <Card className="w-full max-w-3xl mx-auto" key={`question-${question.id}`}>
      <CardHeader>
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm font-medium text-muted-foreground">
            Question {questionNumber} of {totalQuestions}
          </span>
          <Progress value={(questionNumber / totalQuestions) * 100} className="w-24 h-2" />
        </div>
        <CardTitle className="text-xl">{question.text}</CardTitle>
      </CardHeader>
      
      <CardContent className="space-y-4">
        <div className="space-y-2">
          {question.options.map((option, index) => {
            const isSelected = selectedOption === option;
            const isCorrectOption = option === question.answer;
            const isWrong = isSelected && !isCorrectOption;
            const isRight = isSelected && isCorrectOption;
            
            return (
              <Button
                key={`${question.id}-${index}`}
                variant="outline"
                className={cn(
                  "w-full justify-start text-left p-4 mb-2 transition-colors",
                  // Show red only for selected wrong answer
                  isSelected && isWrong && "border-red-500 bg-red-50",
                  // Show green for correct answer when selected
                  isSelected && isRight && "border-green-500 bg-green-50",
                  // Show green for correct answer when another option is selected
                  isQuestionAnswered && isCorrectOption && "border-green-500 bg-green-50"
                )}
                onClick={() => handleOptionSelect(option)}
                disabled={isQuestionAnswered}
              >
                <div className="flex items-center w-full">
                  <div className={cn(
                    "flex items-center justify-center w-6 h-6 rounded-full mr-3 shrink-0",
                    // Show green for correct answer (either selected or revealed)
                    isQuestionAnswered && 
                    (normalizeString(option) === normalizeString(question.answer) || 
                     (isSelected && isCorrect))
                      ? "bg-green-100 text-green-700 border border-green-300"
                      // Show red for selected wrong answer
                      : isSelected && !isCorrect
                      ? "bg-red-100 text-red-700 border border-red-300"
                      // Default state
                      : "bg-gray-100 border border-gray-200"
                  )}>
                    {String.fromCharCode(65 + index)}
                  </div>
                  <span className={cn(
                    // Show green text for correct answer (either selected or revealed)
                    isQuestionAnswered && 
                    (normalizeString(option) === normalizeString(question.answer) || 
                     (isSelected && isCorrect))
                      ? "text-green-700 font-medium"
                      // Show red text for selected wrong answer
                      : isSelected && !isCorrect
                      ? "text-red-700"
                      // Default text color
                      : "text-foreground"
                  )}>
                    {option}
                  </span>
                  
                  {isQuestionAnswered && (
                    <div className="ml-auto">
                      {isCorrectOption && <CheckCircle2 className="h-5 w-5 text-green-500" />}
                      {isWrong && <XCircle className="h-5 w-5 text-destructive" />}
                    </div>
                  )}
                </div>
              </Button>
            );
          })}
        </div>

        {isQuestionAnswered && (
          <div className="mt-6">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center">
                {isCorrect ? (
                  <div className="flex items-center text-green-600">
                    <CheckCircle2 className="h-5 w-5 mr-2" />
                    <span className="font-medium">Correct!</span>
                  </div>
                ) : (
                  <div className="flex items-center text-destructive">
                    <XCircle className="h-5 w-5 mr-2" />
                    <span className="font-medium">Incorrect</span>
                  </div>
                )}
              </div>
              
              <Button 
                variant="ghost" 
                size="sm" 
                className="text-primary"
                onClick={() => setIsChatOpen(true)}
              >
                <MessageCircleQuestion className="h-4 w-4 mr-2" />
                Ask AI to explain
              </Button>
            </div>

            <div className="bg-muted/50 p-4 rounded-lg">
              {isLoading ? (
                <div className="flex items-center justify-center py-4">
                  <Loader2 className="h-5 w-5 animate-spin mr-2" />
                  <span>Generating explanation...</span>
                </div>
              ) : explanation ? (
                <div>
                  <div className="font-medium mb-2">Explanation:</div>
                  <p>{explanation}</p>
                </div>
              ) : (
                <div className="text-muted-foreground">
                  No explanation available.
                </div>
              )}
            </div>
          </div>
        )}
      </CardContent>
      
      <CardFooter className="flex justify-between pt-6">
        <div>
          {isQuestionAnswered && !isCorrect && (
            <div className="text-sm text-destructive mb-2">
              The correct answer is: <span className="font-medium">{question.answer}</span>
            </div>
          )}
        </div>
        
        <Button 
          onClick={onNext} 
          disabled={!isQuestionAnswered}
          className="min-w-[100px]"
        >
          {isLastQuestion ? 'Finish' : 'Next'}
          <ArrowRight className="ml-2 h-4 w-4" />
        </Button>
      </CardFooter>
      
      <ChatModal
        isOpen={isChatOpen}
        onClose={() => setIsChatOpen(false)}
        subject={subject}
        currentQuestion={question.text}
      />
    </Card>
  );
}
