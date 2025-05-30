
"use client";

import { Button } from "@/components/ui/button";
import { MessageSquare } from "lucide-react";
import type { Dispatch, SetStateAction } from "react";

type AiAssistantButtonProps = {
  onClick: () => void;
};

export function AiAssistantButton({ onClick }: AiAssistantButtonProps) {
  return (
    <Button
      onClick={onClick}
      variant="default"
      size="lg"
      className="fixed bottom-8 right-8 rounded-full shadow-2xl p-4 h-16 w-16"
      aria-label="Open AI Assistant"
    >
      <MessageSquare className="h-8 w-8" />
    </Button>
  );
}
