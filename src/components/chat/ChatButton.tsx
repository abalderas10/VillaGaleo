import React from 'react';
import { MessageCircle, X } from 'lucide-react';
import { cn } from '../../utils/cn';

interface ChatButtonProps {
  isOpen: boolean;
  onClick: () => void;
}

export function ChatButton({ isOpen, onClick }: ChatButtonProps) {
  return (
    <button
      onClick={onClick}
      className={cn(
        "fixed bottom-6 right-6 z-50 p-4 rounded-full shadow-lg transition-all duration-300",
        "bg-caribbean-500 hover:bg-caribbean-600 text-white",
        "transform hover:-translate-y-1 hover:shadow-xl",
        isOpen && "rotate-90"
      )}
      aria-label={isOpen ? "Close chat" : "Open chat"}
    >
      {isOpen ? (
        <X className="w-6 h-6" />
      ) : (
        <MessageCircle className="w-6 h-6" />
      )}
    </button>
  );
}