"use client";

import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { X, Send, Bot, User } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Loader2 } from "lucide-react";

interface Message {
  role: "user" | "assistant";
  content: string;
}

interface ChatModalProps {
  isOpen: boolean;
  onClose: () => void;
  subject: string;
  currentQuestion?: string;
}

// Direct Gemini API call function (same as working chatbot)
async function callGeminiAPI(userQuery: string, subject: string): Promise<string> {
  const apiKey = process.env.NEXT_PUBLIC_GOOGLE_API_KEY || "AIzaSyBYWniCnOrEFfaks74_fuHd5kKp42xtv4Q";
  const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`;
  
  const systemInstruction = `You are the PrepMate AI Tutor for ${subject}. Your primary goal is to provide clear, educational, and helpful responses to student questions. Be encouraging and patient while providing accurate information.`;

  const payload = {
    contents: [
      {
        role: 'user',
        parts: [{ text: userQuery }]
      }
    ],
    tools: [{ "google_search": {} }], 
    systemInstruction: {
      parts: [{ text: systemInstruction }]
    },
  };

  try {
    const response = await fetch(apiUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });

    if (!response.ok) {
      throw new Error(`API call failed with status: ${response.status}`);
    }

    const result = await response.json();
    const candidate = result.candidates?.[0];

    if (candidate && candidate.content?.parts?.[0]?.text) {
      return candidate.content.parts[0].text;
    } else {
      return "Sorry, I couldn't generate a response. Please try asking your question again.";
    }
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "I'm having trouble connecting to the AI service. Please try again in a moment.";
  }
}

export function ChatModal({ isOpen, onClose, subject, currentQuestion }: ChatModalProps) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Initialize with a welcome message
  useEffect(() => {
    if (isOpen && messages.length === 0) {
      setMessages([
        {
          role: "assistant",
          content: `Hello! I'm your ${subject} study assistant. How can I help you with this question?`,
        },
      ]);
    }
  }, [isOpen, subject, messages.length]);

  // Auto-scroll to bottom of messages
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSendMessage = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage: Message = { role: "user", content: input };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);

    try {
      // Add context about the current question if available
      const context = currentQuestion 
        ? `Current question: ${currentQuestion}\n\n${input}`
        : input;

      const response = await callGeminiAPI(context, subject);

      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: response },
      ]);
    } catch (error) {
      console.error("Error in chat:", error);
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: "I'm sorry, I encountered an error. Please try again.",
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <Card className="w-full max-w-2xl h-[80vh] flex flex-col">
        <CardHeader className="border-b p-4">
          <div className="flex justify-between items-center">
            <CardTitle className="text-lg">Study Assistant</CardTitle>
            <Button
              variant="ghost"
              size="icon"
              onClick={onClose}
              className="h-8 w-8"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        </CardHeader>
        <CardContent className="flex-1 p-0 overflow-hidden">
          <ScrollArea className="h-full p-4">
            <div className="space-y-4">
              {messages.map((message, index) => (
                <div
                  key={index}
                  className={`flex ${
                    message.role === "assistant" ? "justify-start" : "justify-end"
                  }`}
                >
                  <div
                    className={`max-w-[80%] rounded-lg px-4 py-2 ${
                      message.role === "assistant"
                        ? "bg-muted"
                        : "bg-primary text-primary-foreground"
                    }`}
                  >
                    <div className="flex items-start gap-2">
                      {message.role === "assistant" ? (
                        <Bot className="h-5 w-5 mt-0.5 flex-shrink-0" />
                      ) : (
                        <User className="h-5 w-5 mt-0.5 flex-shrink-0" />
                      )}
                      <div className="prose prose-sm dark:prose-invert">
                        {message.content.split("\n").map((paragraph, i) => (
                          <p key={i} className="mb-2 last:mb-0">
                            {paragraph}
                          </p>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
              {isLoading && (
                <div className="flex justify-start">
                  <div className="bg-muted rounded-lg px-4 py-2">
                    <div className="flex items-center gap-2">
                      <Loader2 className="h-4 w-4 animate-spin" />
                      <span>Thinking...</span>
                    </div>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>
          </ScrollArea>
        </CardContent>
        <CardFooter className="border-t p-4">
          <div className="flex w-full items-center gap-2">
            <Input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask a question about this problem..."
              className="flex-1"
              onKeyDown={(e) => {
                if (e.key === "Enter" && !e.shiftKey) {
                  e.preventDefault();
                  handleSendMessage();
                }
              }}
              disabled={isLoading}
            />
            <Button
              onClick={handleSendMessage}
              disabled={!input.trim() || isLoading}
              size="icon"
            >
              <Send className="h-4 w-4" />
            </Button>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
}
