
import { useState, useEffect, useRef } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { GraduationCap, Send, Loader2, User } from 'lucide-react';
import { cn } from '@/lib/utils';

interface ChatMessage {
  id: string;
  sender: 'user' | 'ai';
  text: string;
  timestamp: Date;
  sources?: Array<{uri: string, title: string}>;
}

interface AIAssistantChatProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  currentQuestionContext?: {
    id: string;
    text: string;
    options?: string[];
    correctAnswer?: string;
    explanation?: string;
    isCorrect?: boolean;
  };
  subjectName: string;
}

export function AIAssistantChat({
  isOpen,
  onOpenChange,
  currentQuestionContext,
  subjectName = 'General',
}: AIAssistantChatProps) {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [userInput, setUserInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesContainerRef = useRef<HTMLDivElement>(null);
  const lastMessageRef = useRef<HTMLDivElement>(null);
  const chatHistoryData = useRef<Array<{role: string, text: string}>>([]);

  // System instruction from the new script
  const systemInstruction = "You are the PrepMate AI Tutor. Your primary goal is to provide brief, straightforward, and direct academic answers. Do not use conversational fillers, jokes, personal opinions, or complex formatting. Get straight to the point in every response.";

  // Parse Markdown function from the new script
  const parseMarkdown = (markdownText: string): string => {
    let htmlText = markdownText || '';
    
    // Convert bold (**text** or __text__)
    htmlText = htmlText.replace(/\*\*([^\*]+)\*\*/g, '<strong>$1</strong>');
    htmlText = htmlText.replace(/__([^_]+)__/g, '<strong>$1</strong>');
    
    // Convert italics (*text* or _text_)
    htmlText = htmlText.replace(/\*([^\*]+)\*/g, '<em>$1</em>');
    htmlText = htmlText.replace(/_([^_]+)_/g, '<em>$1</em>');
    
    // Convert list items (simple - item)
    htmlText = htmlText.replace(/^\s*-\s+(.*)$/gm, '<li>$1</li>');
    htmlText = htmlText.replace(/<\/li>\n<li>/g, '</li><li>');
    
    // Wrap lists
    if (htmlText.includes('<li>')) {
      htmlText = '<ul>' + htmlText.replace(/<li>/g, '<li class="ml-4 list-disc">').replace(/<\/li>/g, '</li>') + '</ul>';
    }

    // Convert double newlines to paragraph breaks, single newlines to br
    htmlText = htmlText.replace(/\n\n/g, '</p><p>').replace(/\n/g, '<br>');

    // Ensure text is wrapped in <p> tags if it wasn't already
    if (!htmlText.startsWith('<p>') && !htmlText.startsWith('<ul>')) {
      htmlText = `<p>${htmlText}</p>`;
    }
    
    return htmlText;
  };

  useEffect(() => {
    if (isOpen) {
      const initialMessage: ChatMessage = {
        id: 'welcome',
        sender: 'ai',
        text: 'PrepMate AI Tutor is active. Provide your study question for a direct answer.',
        timestamp: new Date(),
      };

      setMessages([initialMessage]);
      chatHistoryData.current = [{
        role: 'model',
        text: 'PrepMate AI Tutor is active. Provide your study question for a direct answer.'
      }];
      
      setUserInput('');
    }
  }, [isOpen]);

  useEffect(() => {
    if (lastMessageRef.current) {
      lastMessageRef.current.scrollIntoView({ behavior: 'smooth', block: 'end' });
    }
  }, [messages]);

  const callGeminiAPI = async (userQuery: string, retryCount = 0): Promise<{text: string, sources: Array<{uri: string, title: string}>}> => {
    const apiKey = ""; // Replace with your API key if needed
    const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-preview-09-2025:generateContent?key=${apiKey}`;
    const maxRetries = 3;
    const delay = Math.pow(2, retryCount) * 1000; // Exponential backoff: 1s, 2s, 4s

    const conversationHistory = chatHistoryData.current.map(msg => ({
      role: msg.role === 'user' ? 'user' : 'model',
      parts: [{ text: msg.text }]
    }));
    
    conversationHistory.push({ role: 'user', parts: [{ text: userQuery }] });

    const payload = {
      contents: conversationHistory,
      // Enable Google Search grounding for up-to-date academic information
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
        if (retryCount < maxRetries) {
          await new Promise(resolve => setTimeout(resolve, delay));
          return callGeminiAPI(userQuery, retryCount + 1);
        }
        throw new Error(`API call failed with status: ${response.status}`);
      }

      const result = await response.json();
      const candidate = result.candidates?.[0];

      if (candidate && candidate.content?.parts?.[0]?.text) {
        const text = candidate.content.parts[0].text;
        
        let sources: Array<{uri: string, title: string}> = [];
        const groundingMetadata = candidate.groundingMetadata;
        if (groundingMetadata && groundingMetadata.groundingAttributions) {
          sources = groundingMetadata.groundingAttributions
            .map((attribution: any) => ({
              uri: attribution.web?.uri,
              title: attribution.web?.title,
            }))
            .filter((source: any) => source.uri && source.title);
        }

        return { text, sources };
      } else {
        return { 
          text: "Sorry, I ran into an issue getting a detailed response. Please try asking again!", 
          sources: [] 
        };
      }
    } catch (error) {
      console.error("API Error:", error);
      if (retryCount < maxRetries) {
        await new Promise(resolve => setTimeout(resolve, delay));
        return callGeminiAPI(userQuery, retryCount + 1);
      }
      return { 
        text: "Oops! I couldn't connect to the tutoring system. Please check your network or try again later.", 
        sources: [] 
      };
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const trimmedInput = userInput.trim();
    if (!trimmedInput) return;

    const userMessage: ChatMessage = {
      id: Date.now().toString() + '-user',
      sender: 'user',
      text: trimmedInput,
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    chatHistoryData.current.push({ role: 'user', text: trimmedInput });
    
    setUserInput('');
    setIsLoading(true);

    try {
      const { text, sources } = await callGeminiAPI(trimmedInput);
      
      const aiMessage: ChatMessage = {
        id: Date.now().toString() + '-ai',
        sender: 'ai',
        text: text,
        timestamp: new Date(),
        sources: sources
      };
      
      setMessages(prev => [...prev, aiMessage]);
      chatHistoryData.current.push({ role: 'model', text: text });
    } catch (error) {
      console.error('AI Error:', error);
      const errorMessage: ChatMessage = {
        id: Date.now().toString() + '-error',
        sender: 'ai',
        text: 'Sorry, I encountered an error. Please try again.',
        timestamp: new Date(),
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[525px] p-0 flex flex-col max-h-[80svh] sm:max-h-[80vh] rounded-lg shadow-xl">
        <DialogHeader className="p-4 pb-2 border-b bg-indigo-600 text-white rounded-t-xl">
          <DialogTitle className="text-xl flex items-center font-semibold">
            <GraduationCap className="h-5 w-5 mr-2 text-indigo-200" /> AI Tutor
          </DialogTitle>
          <DialogDescription className="text-xs text-indigo-200">
            PrepMate Exam Companion
          </DialogDescription>
        </DialogHeader>
        
        <div ref={messagesContainerRef} className="flex-1 min-h-0 overflow-y-auto bg-white" id="chat-history">
          <div className="p-4 space-y-4">
            {messages.map((msg, index) => (
              <div
                key={msg.id}
                ref={index === messages.length - 1 ? lastMessageRef : null}
                className={cn(
                  'flex',
                  msg.sender === 'user' ? 'justify-end' : 'justify-start'
                )}
              >
                <div
                  className={cn('max-w-[80%] rounded-xl p-3 shadow-sm', 
                    msg.sender === 'user'
                      ? 'bg-indigo-600 text-white rounded-br-none'
                      : 'bg-indigo-100 text-gray-800 rounded-tl-none'
                  )}
                >
                  {msg.sender === 'ai' && (
                    <p className="font-bold text-indigo-700 mb-1">AI Tutor</p>
                  )}
                  <div
                    dangerouslySetInnerHTML={{ 
                      __html: msg.sender === 'ai' ? parseMarkdown(msg.text) : msg.text 
                    }}
                  />
                  {msg.sources && msg.sources.length > 0 && (
                    <div className="mt-2 pt-2 border-t border-indigo-200 text-xs text-indigo-700 italic">
                      <strong>Grounded Sources:</strong> {
                        msg.sources.slice(0, 3).map((source, i) => (
                          <a 
                            key={i}
                            href={source.uri} 
                            target="_blank" 
                            rel="noopener noreferrer" 
                            className="hover:underline"
                          >
                            {source.title || 'Source'}
                            {i < Math.min(msg.sources!.length, 3) - 1 ? ', ' : ''}
                          </a>
                        ))
                      }
                    </div>
                  )}
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex justify-start">
                <div className="bg-indigo-100 p-3 rounded-xl rounded-tl-none max-w-[80%] shadow-sm text-gray-800">
                  <p className="font-bold text-indigo-700 mb-1">AI Tutor</p>
                  <span className="animate-pulse">AI Tutor is thinking...</span>
                </div>
              </div>
            )}
          </div>
        </div>

        <DialogFooter className="p-4 border-t border-gray-200 bg-gray-50 rounded-b-xl">
          <form onSubmit={handleSubmit} className="flex w-full items-center gap-2">
            <Input
              value={userInput}
              onChange={(e) => setUserInput(e.target.value)}
              placeholder="Ask a question, review a concept, or ask for a quiz..."
              className="flex-1 h-10 text-sm border border-gray-300 rounded-lg"
              disabled={isLoading}
              autoFocus
            />
            <Button 
              type="submit" 
              disabled={isLoading || !userInput.trim()} 
              className="bg-indigo-600 hover:bg-indigo-700 text-white h-10 w-10 rounded-lg"
            >
              {isLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" />}
              <span className="sr-only">Send</span>
            </Button>
          </form>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
    
