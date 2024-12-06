import React, { useRef, useEffect } from 'react';
import { Send } from 'lucide-react';
import { cn } from '../../utils/cn';

interface Message {
  id: string;
  content: string;
  sender: 'user' | 'assistant';
  timestamp: Date;
}

interface ChatDialogProps {
  isOpen: boolean;
  messages: Message[];
  onSend: (message: string) => void;
}

export function ChatDialog({ isOpen, messages, onSend }: ChatDialogProps) {
  const [input, setInput] = React.useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
      inputRef.current?.focus();
    }
  }, [isOpen, messages]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (input.trim()) {
      onSend(input.trim());
      setInput('');
    }
  };

  if (!isOpen) return null;

  return (
    <div className={cn(
      "fixed bottom-24 right-6 z-50 w-96 max-w-[calc(100vw-2rem)]",
      "bg-white rounded-lg shadow-2xl border border-caribbean-200",
      "flex flex-col transition-all duration-300",
      "animate-in slide-in-from-bottom-5"
    )}>
      {/* Header */}
      <div className="p-4 border-b border-caribbean-100 bg-caribbean-50 rounded-t-lg">
        <h3 className="text-lg font-display font-semibold text-caribbean-900">
          Chat with Marina
        </h3>
        <p className="text-sm text-caribbean-600">
          Your virtual concierge assistant
        </p>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4 max-h-[400px]">
        {messages.map((message) => (
          <div
            key={message.id}
            className={cn(
              "flex",
              message.sender === 'user' ? 'justify-end' : 'justify-start'
            )}
          >
            <div
              className={cn(
                "max-w-[80%] rounded-lg p-3",
                message.sender === 'user'
                  ? 'bg-caribbean-500 text-white rounded-br-none'
                  : 'bg-caribbean-50 text-caribbean-900 rounded-bl-none'
              )}
            >
              {message.content}
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <form onSubmit={handleSubmit} className="p-4 border-t border-caribbean-100">
        <div className="flex space-x-2">
          <input
            ref={inputRef}
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type your message..."
            className="flex-1 p-2 border border-caribbean-200 rounded-lg focus:ring-2 focus:ring-caribbean-400 focus:border-caribbean-400"
          />
          <button
            type="submit"
            className={cn(
              "p-2 rounded-lg",
              "bg-caribbean-500 text-white",
              "hover:bg-caribbean-600 transition-colors",
              "disabled:opacity-50 disabled:cursor-not-allowed"
            )}
            disabled={!input.trim()}
          >
            <Send className="w-5 h-5" />
          </button>
        </div>
      </form>
    </div>
  );
}