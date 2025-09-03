"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CheckCircle2, XCircle, Bot, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";

type QuestionOption = {
  id: string;
  text: string;
};

type Question = {
  id: string;
  text: string;
  options: QuestionOption[] | string[];
  correctOptionId?: string;
  answer?: string | number;  // Alternative field for correct answer
  correctAnswer?: string | number;  // Another alternative field
  explanation?: string;
  imageUrl?: string;
};

interface QuestionDisplayProps {
  question: Question;
  subjectName: string;
  questionNumber?: number;
  onRequestExplanation?: (question: Question) => void;
}

export function QuestionDisplayFixed({ 
  question, 
  subjectName, 
  questionNumber, 
  onRequestExplanation 
}: QuestionDisplayProps) {
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  const [showFeedback, setShowFeedback] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // Reset state when question changes
  useEffect(() => {
    setSelectedOption(null);
    setIsCorrect(null);
    setShowFeedback(false);
  }, [question.id]);

  // Normalize options to ensure they're in the correct format
  const normalizedOptions = question.options.map((opt, index) => {
    if (typeof opt === 'string') {
      return { id: `opt-${index}`, text: opt };
    }
    return opt;
  });

  // Handle option selection
  const handleOptionSelect = (optionId: string) => {
    if (showFeedback) return;
    setSelectedOption(optionId);
  };

  // Debug logging for question data
  useEffect(() => {
    console.log('Question data:', {
      questionId: question.id,
      correctOptionId: question.correctOptionId,
      options: normalizedOptions,
      selectedOption
    });
  }, [question, normalizedOptions, selectedOption]);

  // Get the correct option ID
  const getCorrectOptionId = () => {
    if (question.correctOptionId) return question.correctOptionId;
    if (question.answer) return `opt-${question.answer}`;
    if (question.correctAnswer) return `opt-${question.correctAnswer}`;
    return '';
  };

  // Check the selected answer
  const checkAnswer = () => {
    if (selectedOption === null) return;
    
    // Debug log the full question data
    console.log('Full question data:', JSON.parse(JSON.stringify(question)));
    
    // Check if the selected answer is correct
    const isAnswerCorrect = isOptionCorrect(selectedOption);
    console.log('Answer check result:', { selectedOption, isAnswerCorrect });
    
    setIsCorrect(isAnswerCorrect);
    setShowFeedback(true);
  };
  
  // Handle AI explanation request
  const handleRequestExplanation = async () => {
    if (!onRequestExplanation) {
      console.warn('No explanation handler provided');
      return;
    }
    
    try {
      setIsLoading(true);
      
      // Get the selected and correct answers
      const correctOptionId = getCorrectOptionId();
      const selectedAnswer = selectedOption ? getOptionText(selectedOption) : '';
      const correctAnswer = getOptionText(correctOptionId);
      
      // Format the question for the AI with the selected and correct answers
      const questionForAI = {
        ...question,
        selectedAnswer,
        correctAnswer,
        options: normalizedOptions.map((opt, idx) => ({
          ...opt,
          letter: getOptionLetter(idx),
          isCorrect: isOptionCorrect(opt.id)
        }))
      };
      
      onRequestExplanation(questionForAI);
      // Include whether the user's answer was correct in the question object
      const questionWithAnswerStatus = {
        ...question,
        userAnswer: selectedOption,
        isCorrect: selectedOption ? isOptionCorrect(selectedOption) : false,
        correctAnswer: getCorrectAnswerKey()
      };
      await onRequestExplanation(questionWithAnswerStatus);
    } catch (error) {
      console.error('Error requesting explanation:', error);
      alert('Failed to get AI explanation. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };
  
  // Get the correct answer key from the question
  const getCorrectAnswerKey = () => {
    return question.correctOptionId || question.answer || question.correctAnswer;
  };

  // Get the option letter (A, B, C, D, etc.)
  const getOptionLetter = (index: number) => {
    return String.fromCharCode(65 + index);
  };
  
  // Get the option text by ID
  const getOptionText = (optionId: string) => {
    const option = normalizedOptions.find(opt => opt.id === optionId);
    return option ? option.text : '';
  };

  // Get the correct answer letter (A, B, C, D)
  const getCorrectAnswerLetter = () => {
    const key = getCorrectAnswerKey();
    if (!key) return '';
    
    // If it's already a letter, return it uppercase
    if (typeof key === 'string' && /^[a-dA-D]$/.test(key)) {
      return key.toUpperCase();
    }
    
    // If it's a number, convert to letter (1 -> A, 2 -> B, etc.)
    const num = typeof key === 'number' ? key : parseInt(key);
    if (!isNaN(num) && num >= 1 && num <= 4) {
      return String.fromCharCode(64 + num); // 65 is 'A' in ASCII
    }
    
    // If we can't determine, return empty string
    return '';
  };

  // Check if an option is the correct one
  const isOptionCorrect = (optionId: string): boolean => {
    const correctAnswerKey = getCorrectAnswerKey();
    if (!correctAnswerKey) {
      console.warn('No correct answer key found for question');
      return false;
    }
    
    // Normalize the option ID and correct answer key for comparison
    const normalizedOptionId = optionId.toLowerCase().replace('opt-', '');
    const normalizedCorrectKey = correctAnswerKey.toString().toLowerCase();
    
    // Check for direct match
    if (normalizedOptionId === normalizedCorrectKey) {
      return true;
    }
    
    // Check for letter to index match (a=0, b=1, etc.)
    if (/^[a-d]$/.test(normalizedOptionId) && /^[a-d]$/.test(normalizedCorrectKey)) {
      return normalizedOptionId === normalizedCorrectKey;
    }
    
    // Check for numeric index match (0-based or 1-based)
    if (/^\d+$/.test(normalizedOptionId) && /^\d+$/.test(normalizedCorrectKey)) {
      return normalizedOptionId === normalizedCorrectKey || 
             (parseInt(normalizedOptionId) + 1).toString() === normalizedCorrectKey ||
             (parseInt(normalizedOptionId) - 1).toString() === normalizedCorrectKey;
    }
    
    // Handle case where optionId is a letter and correctKey is a number (1-based index)
    if (/^[a-d]$/.test(normalizedOptionId) && /^[1-4]$/.test(normalizedCorrectKey)) {
      const letterIndex = normalizedOptionId.charCodeAt(0) - 96; // a=1, b=2, etc.
      return letterIndex.toString() === normalizedCorrectKey;
    }
    
    // Handle case where optionId is a number and correctKey is a letter (a=1, b=2, etc.)
    if (/^[1-4]$/.test(normalizedOptionId) && /^[a-d]$/.test(normalizedCorrectKey)) {
      const letterIndex = normalizedCorrectKey.charCodeAt(0) - 96; // a=1, b=2, etc.
      return normalizedOptionId === letterIndex.toString();
    }
    
    return false;
  };
  
  // Check if an option is selected and incorrect
  const isOptionIncorrect = (optionId: string) => {
    return showFeedback && selectedOption === optionId && !isCorrect;
  };

  return (
    <Card className="w-full max-w-3xl mx-auto">
      <CardHeader>
        <CardTitle className="text-xl font-semibold">
          Question {questionNumber}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="prose dark:prose-invert max-w-none">
          <p className="text-lg">{question.text}</p>
          
          {/* Image display */}
          {question.imageUrl && (
            <div className="mt-4">
              <img
                src={question.imageUrl}
                alt="Question diagram"
                className="max-w-full h-auto rounded-lg border border-gray-200 dark:border-gray-700"
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.style.display = 'none';
                }}
              />
            </div>
          )}
        </div>

        {/* Options */}
        <div className="space-y-3">
          {normalizedOptions.map((option, index) => {
            const optionId = typeof option === 'string' ? `opt-${index + 1}` : option.id;
            const optionText = typeof option === 'string' ? option : option.text;
            const isSelected = selectedOption === optionId;
            const isCorrectAnswer = isOptionCorrect(optionId);
            const isIncorrect = showFeedback && isSelected && !isCorrectAnswer;
            const showAsCorrect = showFeedback && isCorrectAnswer;
            
            return (
              <div 
                key={optionId}
                className={cn(
                  'p-3 rounded-lg border cursor-pointer transition-colors',
                  isSelected && !showFeedback && 'bg-blue-50 border-blue-500',
                  isIncorrect && showFeedback && 'bg-red-50 border-red-500',
                  showAsCorrect && showFeedback && 'bg-green-50 border-green-500',
                  !isSelected && !showFeedback && 'hover:bg-gray-50'
                )}
                onClick={() => handleOptionSelect(optionId)}
              >
                <div className="flex items-center">
                  <div className={cn(
                    'flex-shrink-0 w-6 h-6 rounded-full border flex items-center justify-center mr-3',
                    isIncorrect && showFeedback && 'bg-red-100 border-red-500 text-red-700',
                    showAsCorrect && showFeedback && 'bg-green-100 border-green-500 text-green-700',
                    isSelected && !showFeedback && 'border-blue-500 text-blue-700'
                  )}>
                    {getOptionLetter(index)}
                  </div>
                  <div>{optionText}</div>
                  {showFeedback && showAsCorrect && (
                    <CheckCircle2 className="ml-auto text-green-500" size={20} />
                  )}
                  {showFeedback && isIncorrect && (
                    <XCircle className="ml-auto text-red-500" size={20} />
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* Action Buttons */}
        <div className="flex justify-between items-center mt-6">
          {!showFeedback ? (
            <Button
              onClick={checkAnswer}
              disabled={!selectedOption}
              className="bg-blue-600 hover:bg-blue-700 text-white"
            >
              Check Answer
            </Button>
          ) : (
            <div />
          )}
          
          {showFeedback && onRequestExplanation && (
            <Button
              variant="outline"
              onClick={handleRequestExplanation}
              disabled={isLoading}
              className="flex items-center gap-2"
            >
              {isLoading ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  Loading...
                </>
              ) : (
                <>
                  <Bot className="h-4 w-4" />
                  {isCorrect ? 'View Explanation' : 'Explain with AI'}
                </>
              )}
            </Button>
          )}
        </div>

        {/* Feedback */}
        {showFeedback && (
          <div className="mt-4 p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
            <div className="flex items-start">
              <div className="flex-shrink-0 pt-0.5">
                {isCorrect ? (
                  <CheckCircle2 className="h-5 w-5 text-green-500" />
                ) : (
                  <XCircle className="h-5 w-5 text-red-500" />
                )}
              </div>
              <div className="ml-3">
                <p className="font-medium">
                  {isCorrect
                    ? 'Correct!'
                    : `Incorrect. The correct answer is ${getCorrectAnswerLetter()}.`
                  }
                </p>
                {question.explanation && (
                  <p className="mt-2 text-sm text-gray-600 dark:text-gray-300">
                    {question.explanation}
                  </p>
                )}
              </div>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
