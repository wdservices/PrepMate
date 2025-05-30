
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
      size="lg" // size="lg" provides padding, but we control h/w directly for a circle
      className="fixed bottom-8 right-8 rounded-full shadow-2xl p-0 h-20 w-20 z-50 flex items-center justify-center" // Increased size, ensure flex centering
      aria-label="Open AI Assistant"
    >
      <BotMessageSquare className="h-10 w-10" /> {/* Increased icon size */}
    </Button>
  );
}

    
