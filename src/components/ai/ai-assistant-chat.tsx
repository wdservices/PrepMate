
"use client";

import { useState, useRef, useEffect, type FormEvent } from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Loader2, Send, User, Sparkles } from "lucide-react";
import { aiQuestionAssistant } from "@/ai/flows/ai-question-assistant"; // Ensure path is correct
import type { Question } from "@/types";

type AiAssistantChatProps = {
  isOpen: boolean;
  onOpenChange: (isOpen: boolean) => void;
  currentQuestionContext: Question | null; // The question being viewed for context
  subjectName: string; // Subject name for initial greeting context, e.g. "Biology" or "General Academic Support"
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
  const scrollAreaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen) {
      let initialMessageText = "";
      if (currentQuestionContext) {
        initialMessageText = `Hi! I'm your AI Tutor. I can help with the current ${subjectName} question: "${currentQuestionContext.text.substring(0,70)}...", or you can ask me any other academic question.`;
      } else {
        initialMessageText = `Hi! I'm your AI Tutor for ${subjectName}. How can I help you with your academic questions today?`;
      }
      setMessages([
        { 
          id: "initial-ai-prompt", 
          sender: "ai", 
          text: initialMessageText,
          timestamp: new Date() 
        }
      ]);
    }
  }, [isOpen, currentQuestionContext, subjectName]);
  
  useEffect(() => {
    // Scroll to bottom when new messages are added
    if (scrollAreaRef.current) {
      const scrollViewport = scrollAreaRef.current.querySelector('div[data-radix-scroll-area-viewport]');
      if (scrollViewport) {
        scrollViewport.scrollTop = scrollViewport.scrollHeight;
      }
    }
  }, [messages]);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!userInput.trim()) return;

    const userMessage: ChatMessage = {
      id: Date.now().toString() + "-user",
      sender: "user",
      text: userInput,
      timestamp: new Date(),
    };
    setMessages((prev) => [...prev, userMessage]);
    setUserInput("");
    setIsLoading(true);

    try {
      // For the AI flow, if there's no specific question context, pass a generic one.
      // The subjectName prop is used for the initial greeting, but the AI flow might receive a more general subject.
      // AiTutorPage passes "General Academic Support" as subjectName.
      // SubjectYearQuestionsPage passes the specific subject.name.
      // The AI prompt is designed to handle both.
      const response = await aiQuestionAssistant({
        subject: subjectName, // This subject is context for the AI
        question: currentQuestionContext?.text || "No specific question being viewed.", // Context for the AI
        studentQuery: userMessage.text,
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
        text: "Sorry, I encountered an error. Please try again.",
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[525px] p-0 flex flex-col max-h-[80vh]">
        <DialogHeader className="p-6 pb-2 border-b">
          <DialogTitle className="text-2xl flex items-center">
             <Sparkles className="h-6 w-6 mr-2 text-primary" /> AI Tutor
          </DialogTitle>
          <DialogDescription>
            Ask about {currentQuestionContext ? `${subjectName} or the current question` : 'any academic topic'}.
          </DialogDescription>
        </DialogHeader>
        
        <ScrollArea className="flex-grow p-6" ref={scrollAreaRef}>
          <div className="space-y-4">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex items-end gap-2 ${
                  msg.sender === "user" ? "justify-end" : "justify-start"
                }`}
              >
                {msg.sender === "ai" && (
                  <Avatar className="h-8 w-8">
                    <AvatarFallback><Sparkles className="h-4 w-4 text-primary"/></AvatarFallback>
                  </Avatar>
                )}
                <div
                  className={`max-w-[75%] rounded-lg px-4 py-2 shadow ${
                    msg.sender === "user"
                      ? "bg-primary text-primary-foreground"
                      : "bg-muted text-muted-foreground"
                  }`}
                >
                  <p className="text-sm whitespace-pre-wrap">{msg.text}</p>
                   <p className={`text-xs mt-1 ${msg.sender === 'user' ? 'text-primary-foreground/70 text-right' : 'text-muted-foreground/70 text-left'}`}>
                    {msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </p>
                </div>
                 {msg.sender === "user" && (
                  <Avatar className="h-8 w-8">
                    <AvatarFallback><User className="h-4 w-4"/></AvatarFallback>
                  </Avatar>
                )}
              </div>
            ))}
            {isLoading && (
              <div className="flex items-end gap-2 justify-start">
                <Avatar className="h-8 w-8">
                   <AvatarFallback><Sparkles className="h-4 w-4 text-primary"/></AvatarFallback>
                </Avatar>
                <div className="max-w-[75%] rounded-lg px-4 py-3 shadow bg-muted">
                  <Loader2 className="h-5 w-5 animate-spin text-primary" />
                </div>
              </div>
            )}
          </div>
        </ScrollArea>

        <DialogFooter className="p-4 border-t bg-background">
          <form onSubmit={handleSubmit} className="flex w-full items-center gap-2">
            <Input
              value={userInput}
              onChange={(e) => setUserInput(e.target.value)}
              placeholder="Ask any academic question..."
              className="flex-1"
              disabled={isLoading}
              autoFocus
            />
            <Button type="submit" disabled={isLoading || !userInput.trim()} size="icon">
              {isLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" />}
              <span className="sr-only">Send</span>
            </Button>
          </form>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
