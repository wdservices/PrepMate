
"use client";

import { useState, useRef, useEffect, type FormEvent } from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Loader2, Send, User, Sparkles } from "lucide-react";
import { aiQuestionAssistant } from "@/ai/flows/ai-question-assistant";
import type { Question } from "@/types";
import { cn } from "@/lib/utils";

type ExtendedQuestion = Question & {
  userAnswer?: string | null;
  isCorrect?: boolean;
  correctAnswer?: string | number | null;
};

type AiAssistantChatProps = {
  isOpen: boolean;
  onOpenChange: (isOpen: boolean) => void;
  currentQuestionContext: ExtendedQuestion | null;
  subjectName: string;
};

interface ChatMessage {
  id: string;
  sender: "user" | "ai";
  text: string;
  timestamp: Date;
}

export function AiAssistantChat({ isOpen, onOpenChange, currentQuestionContext, subjectName }: AiAssistantChatProps) {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [userInput, setUserInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesContainerRef = useRef<HTMLDivElement>(null);
  const lastMessageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen) {
      let initialMessageText = "";
      let initialMessages: ChatMessage[] = [];
      
      // Add welcome message
      initialMessages.push({
        id: "initial-ai-prompt",
        sender: "ai",
        text: `Hi! I'm your AI Tutor. I'm here to help you with your ${subjectName} questions.`,
        timestamp: new Date()
      });
      
      // Add context about the current question if available
      if (currentQuestionContext) {
        const questionText = currentQuestionContext.text.substring(0, 200) + 
                           (currentQuestionContext.text.length > 200 ? '...' : '');
        
        // Add the question as context
        initialMessages.push({
          id: `question-${currentQuestionContext.id}`,
          sender: "ai",
          text: `I see you're working on this question:
          
"${questionText}"
          
I can help explain concepts related to this question. What would you like to know?`,
          timestamp: new Date()
        });
        
        // If we have user's answer status, provide feedback
        if (currentQuestionContext.isCorrect !== undefined) {
          const isCorrect = currentQuestionContext.isCorrect;
          const correctAnswer = currentQuestionContext.correctAnswer || 'the correct option';
          const feedback = isCorrect 
            ? "Great job! You got it right! 🎉"
            : `The correct answer is ${correctAnswer}. Would you like me to explain why?`;
            
          initialMessages.push({
            id: `feedback-${currentQuestionContext.id}`,
            sender: "ai",
            text: feedback,
            timestamp: new Date()
          });
        }
      }
      
      setMessages(initialMessages);
      setUserInput("");
    }
  }, [isOpen, currentQuestionContext, subjectName]);
  
  useEffect(() => {
    if (lastMessageRef.current) {
      lastMessageRef.current.scrollIntoView({ behavior: "smooth", block: "end" });
    }
  }, [messages]);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const trimmedInput = userInput.trim();
    if (!trimmedInput) return;

    const userMessage: ChatMessage = {
      id: Date.now().toString() + "-user",
      sender: "user",
      text: trimmedInput,
      timestamp: new Date(),
    };
    
    // Add user message to chat
    setMessages((prev) => [...prev, userMessage]);
    setUserInput("");
    setIsLoading(true);

    try {
      // Format options for better AI understanding
      const formatOptions = (opts: any) => {
        if (!opts) return '';
        if (Array.isArray(opts)) {
          return opts.map((opt, i) => 
            `${String.fromCharCode(65 + i)}. ${typeof opt === 'string' ? opt : opt.text}`
          ).join('\n');
        }
        return '';
      };

      // Prepare the question context
      const questionContext = currentQuestionContext ? {
        subject: subjectName,
        question: currentQuestionContext.text,
        options: formatOptions(currentQuestionContext.options),
        correctAnswer: currentQuestionContext.correctAnswer || 
                      (currentQuestionContext as any).correctOptionId || 
                      'Not specified',
        userAnswer: (currentQuestionContext as any).userAnswer || 'Not answered',
        isCorrect: (currentQuestionContext as any).isCorrect || false,
        explanation: currentQuestionContext.explanation || 'No explanation available'
      } : null;

      // Call the AI with the full context
      const response = await aiQuestionAssistant({
        subject: subjectName,
        question: questionContext ? JSON.stringify(questionContext, null, 2) : "No question context",
        studentQuery: trimmedInput,
      });

      const aiMessage: ChatMessage = {
        id: Date.now().toString() + "-ai",
        sender: "ai",
        text: response.answer,
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, aiMessage]);
    } catch (error) {
      console.error("AI Assistant Error:", error);
      const errorMessage: ChatMessage = {
        id: Date.now().toString() + "-error",
        sender: "ai",
        text: "Sorry, I encountered an error processing your request. Please try again or check my configuration.",
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[525px] p-0 flex flex-col max-h-[80svh] sm:max-h-[80vh] rounded-lg shadow-xl">
        <DialogHeader className="p-4 pb-2 border-b bg-card">
          <DialogTitle className="text-xl flex items-center font-semibold text-foreground">
             <Sparkles className="h-5 w-5 mr-2 text-primary" /> AI Tutor
          </DialogTitle>
          <DialogDescription className="text-xs text-muted-foreground">
            Ask about {currentQuestionContext ? `${subjectName} or the current question` : 'any academic topic'}.
          </DialogDescription>
        </DialogHeader>
        
        <div 
          ref={messagesContainerRef} 
          className="flex-1 min-h-0 overflow-y-auto bg-background/70"
        >
           <div className="p-4 space-y-4">
            {messages.map((msg, index) => (
              <div
                key={msg.id}
                ref={index === messages.length - 1 ? lastMessageRef : null}
                className={cn(
                  "flex items-end gap-2 animate-in fade-in-50 slide-in-from-bottom-2",
                  msg.sender === "user" ? "justify-end" : "justify-start"
                )}
              >
                {msg.sender === "ai" && (
                  <Avatar className="h-8 w-8 border-2 border-primary/50 bg-primary/10">
                    <AvatarFallback className="bg-transparent"><Sparkles className="h-4 w-4 text-primary"/></AvatarFallback>
                  </Avatar>
                )}
                <div
                  className={cn("max-w-[75%] rounded-lg px-3 py-2 shadow-sm text-sm break-words", 
                    msg.sender === "user"
                      ? "bg-primary text-primary-foreground rounded-br-none"
                      : "bg-card text-card-foreground border border-border rounded-bl-none"
                  )}
                >
                  <p className="whitespace-pre-wrap">{msg.text}</p>
                   <p className={cn("text-xs mt-1.5",
                      msg.sender === 'user' ? 'text-primary-foreground/70 text-right' : 'text-muted-foreground text-left'
                    )}>
                    {msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </p>
                </div>
                 {msg.sender === "user" && (
                  <Avatar className="h-8 w-8 border-2 border-muted bg-muted/30">
                    <AvatarFallback className="bg-transparent"><User className="h-4 w-4 text-muted-foreground"/></AvatarFallback>
                  </Avatar>
                )}
              </div>
            ))}
            {isLoading && (
              <div className="flex items-end gap-2 justify-start animate-pulse">
                <Avatar className="h-8 w-8 border-2 border-primary/50 bg-primary/10">
                   <AvatarFallback className="bg-transparent"><Sparkles className="h-4 w-4 text-primary"/></AvatarFallback>
                </Avatar>
                <div className="max-w-[75%] rounded-lg px-4 py-3 shadow-sm bg-card border border-border">
                  <Loader2 className="h-5 w-5 animate-spin text-primary" />
                </div>
              </div>
            )}
          </div>
        </div>

        <DialogFooter className="p-3 border-t bg-card">
          <form onSubmit={handleSubmit} className="flex w-full items-center gap-2">
            <Input
              value={userInput}
              onChange={(e) => setUserInput(e.target.value)}
              placeholder="Ask any academic question..."
              className="flex-1 h-10 text-sm"
              disabled={isLoading}
              autoFocus
            />
            <Button type="submit" disabled={isLoading || !userInput.trim()} size="icon" className="h-10 w-10">
              {isLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" />}
              <span className="sr-only">Send</span>
            </Button>
          </form>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
    
