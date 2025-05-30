
"use client";

import { useState, useRef, useEffect, type FormEvent } from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Loader2, Send, User, Sparkles } from "lucide-react";
import { aiQuestionAssistant } from "@/ai/flows/ai-question-assistant";
import type { Question } from "@/types";
import { cn } from "@/lib/utils";

type AiAssistantChatProps = {
  isOpen: boolean;
  onOpenChange: (isOpen: boolean) => void;
  currentQuestionContext: Question | null;
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
  const scrollViewportRef = useRef<HTMLDivElement>(null); 

  useEffect(() => {
    if (isOpen) {
      let initialMessageText = "";
      if (currentQuestionContext) {
        initialMessageText = `Hi! I'm your AI Tutor. I can help with the current ${subjectName} question: "${currentQuestionContext.text.substring(0,70)}...", or you can ask me any other academic question.`;
      } else {
        initialMessageText = `Hi! I'm your AI Tutor. How can I help you with your academic questions today?`;
      }
      setMessages([
        { 
          id: "initial-ai-prompt", 
          sender: "ai", 
          text: initialMessageText,
          timestamp: new Date() 
        }
      ]);
      setUserInput(""); 
    }
  }, [isOpen, currentQuestionContext, subjectName]);
  
  useEffect(() => {
    const viewport = scrollViewportRef.current;
    if (viewport) {
      // Scroll to the bottom after messages update
      // This relies on the DOM being updated before this effect runs.
      viewport.scrollTop = viewport.scrollHeight;
    }
  }, [messages]); // Dependency on messages ensures this runs when messages change

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
    setMessages((prev) => [...prev, userMessage]);
    setUserInput("");
    setIsLoading(true);

    try {
      const response = await aiQuestionAssistant({
        subject: subjectName,
        question: currentQuestionContext?.text || "No specific question being viewed.",
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
      <DialogContent className="sm:max-w-[525px] p-0 flex flex-col max-h-[calc(100vh-4rem)] sm:max-h-[80vh] rounded-lg shadow-xl">
        <DialogHeader className="p-4 pb-2 border-b">
          <DialogTitle className="text-xl flex items-center font-semibold">
             <Sparkles className="h-5 w-5 mr-2 text-primary" /> AI Tutor
          </DialogTitle>
          <DialogDescription className="text-xs">
            Ask about {currentQuestionContext ? `${subjectName} or the current question` : 'any academic topic'}.
          </DialogDescription>
        </DialogHeader>
        
        <ScrollArea className="flex-grow" viewportRef={scrollViewportRef}>
           <div className="p-4 space-y-4">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={cn(
                  "flex items-end gap-2 animate-in fade-in-50 slide-in-from-bottom-2",
                  msg.sender === "user" ? "justify-end" : "justify-start"
                )}
              >
                {msg.sender === "ai" && (
                  <Avatar className="h-8 w-8 border-2 border-primary/50">
                    <AvatarFallback className="bg-primary/10"><Sparkles className="h-4 w-4 text-primary"/></AvatarFallback>
                  </Avatar>
                )}
                <div
                  className={cn("max-w-[75%] rounded-lg px-3 py-2 shadow-sm text-sm",
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
                  <Avatar className="h-8 w-8 border-2 border-muted">
                    <AvatarFallback className="bg-muted/50"><User className="h-4 w-4 text-muted-foreground"/></AvatarFallback>
                  </Avatar>
                )}
              </div>
            ))}
            {isLoading && (
              <div className="flex items-end gap-2 justify-start animate-pulse">
                <Avatar className="h-8 w-8 border-2 border-primary/50">
                   <AvatarFallback className="bg-primary/10"><Sparkles className="h-4 w-4 text-primary"/></AvatarFallback>
                </Avatar>
                <div className="max-w-[75%] rounded-lg px-4 py-3 shadow-sm bg-card border border-border">
                  <Loader2 className="h-5 w-5 animate-spin text-primary" />
                </div>
              </div>
            )}
          </div>
        </ScrollArea>

        <DialogFooter className="p-3 border-t bg-background/95">
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
    

    