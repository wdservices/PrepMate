
"use client";

import { Button } from "@/components/ui/button";
import { BotMessageSquare } from "lucide-react"; // Changed icon

type AiAssistantButtonProps = {
  onClick: () => void;
};

export function AiAssistantButton({ onClick }: AiAssistantButtonProps) {
  return (
    <Button
      onClick={onClick}
      variant="default"
      size="lg"
      className="fixed bottom-8 right-8 rounded-full shadow-2xl p-4 h-16 w-16 z-50" // Ensure high z-index
      aria-label="Open AI Assistant"
    >
      <BotMessageSquare className="h-8 w-8" />
    </Button>
  );
}

    