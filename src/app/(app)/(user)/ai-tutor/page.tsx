
"use client";

import { useState } from 'react';
import type { Metadata } from 'next';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { AIAssistantChat } from '@/components/ai/ai-assistant-chat';
import { BotMessageSquare, MessageSquare } from 'lucide-react';

// Client components cannot export metadata directly.
// export const metadata: Metadata = {
//   title: 'AI Tutor',
// };

export default function AiTutorPage() {
  const [isChatOpen, setIsChatOpen] = useState(false);

  return (
    <div className="space-y-8 max-w-3xl mx-auto">
      <div className="text-center">
        <BotMessageSquare className="mx-auto h-16 w-16 text-primary mb-4" />
        <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
          AI Academic Tutor
        </h1>
        <p className="mt-4 text-lg text-muted-foreground sm:text-xl">
          Have a question? Need a concept explained? Our AI Tutor is here to help you with your academic queries.
        </p>
      </div>

      <Card className="shadow-lg">
        <CardHeader>
          <CardTitle>Chat with AI Tutor</CardTitle>
          <CardDescription>
            Click the button below to start a conversation with the AI Tutor for general academic assistance.
          </CardDescription>
        </CardHeader>
        <CardContent className="flex justify-center">
          <Button size="lg" onClick={() => setIsChatOpen(true)}>
            <MessageSquare className="mr-2 h-5 w-5" />
            Open AI Tutor Chat
          </Button>
        </CardContent>
      </Card>

      <AIAssistantChat
        isOpen={isChatOpen}
        onOpenChange={setIsChatOpen}
        currentQuestionContext={undefined} // No specific question context for general tutor
        subjectName="General Academic Support" // Generic subject
      />
    </div>
  );
}
