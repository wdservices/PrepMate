
"use client";

import { Button } from "@/components/ui/button";
import { BotMessageSquare } from "lucide-react"; 

type AiAssistantButtonProps = {
  onClick: () => void;
};

export function AiAssistantButton({ onClick }: AiAssistantButtonProps) {
  return (
    <Button
      onClick={onClick}
      variant="default"
      // Button size h-16 w-16 (64px).
      // p-0 removes default button padding. flex items-center justify-center ensures icon is centered.
      className="fixed bottom-8 right-8 rounded-full shadow-2xl p-0 h-16 w-16 z-50 flex items-center justify-center"
      aria-label="Open AI Assistant"
    >
      {/* Icon size increased to h-10 w-10 (40px) within the h-16 w-16 button */}
      <BotMessageSquare className="h-10 w-10" /> 
    </Button>
  );
}
    
