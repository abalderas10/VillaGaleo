import React, { createContext, useContext, useState, useCallback } from 'react';

interface Message {
  id: string;
  content: string;
  sender: 'user' | 'assistant';
  timestamp: Date;
}

interface ChatContextType {
  messages: Message[];
  isOpen: boolean;
  toggleChat: () => void;
  sendMessage: (content: string) => Promise<void>;
}

const ChatContext = createContext<ChatContextType | undefined>(undefined);

// Temporary responses until n8n webhook is configured
const FALLBACK_RESPONSES = [
  "¡Bienvenido a VillaGaleon! ¿En qué puedo ayudarte?",
  "Our luxury villa features private marina access and a yacht for unforgettable Caribbean adventures.",
  "Would you like to know more about our available dates or activities?",
  "I can help you plan your perfect stay at VillaGaleon.",
];

export function ChatProvider({ children }: { children: React.ReactNode }) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [responseIndex, setResponseIndex] = useState(0);

  const toggleChat = useCallback(() => {
    setIsOpen(prev => !prev);
    
    // Send welcome message when opening an empty chat
    if (messages.length === 0) {
      const welcomeMessage: Message = {
        id: Date.now().toString(),
        content: "¡Hola! I'm Marina, your virtual concierge. How can I assist you today?",
        sender: 'assistant',
        timestamp: new Date(),
      };
      setMessages([welcomeMessage]);
    }
  }, [messages.length]);

  const sendMessage = useCallback(async (content: string) => {
    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      content,
      sender: 'user',
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);

    try {
      // Since n8n webhook isn't configured, use fallback responses
      const fallbackResponse = FALLBACK_RESPONSES[responseIndex];
      setResponseIndex((prev) => (prev + 1) % FALLBACK_RESPONSES.length);

      // Simulate network delay
      await new Promise(resolve => setTimeout(resolve, 1000));

      // Add assistant response
      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: fallbackResponse,
        sender: 'assistant',
        timestamp: new Date(),
      };

      setMessages(prev => [...prev, assistantMessage]);

      /* Uncomment and update when n8n webhook is ready
      const response = await fetch('YOUR_N8N_WEBHOOK_URL', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message: content,
          timestamp: new Date().toISOString(),
        }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();

      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: data.response,
        sender: 'assistant',
        timestamp: new Date(),
      };

      setMessages(prev => [...prev, assistantMessage]);
      */
    } catch (error) {
      console.error('Chat error:', error);
      
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: "Lo siento, estoy teniendo problemas técnicos. Por favor, intenta de nuevo más tarde o contacta directamente con nosotros.",
        sender: 'assistant',
        timestamp: new Date(),
      };

      setMessages(prev => [...prev, errorMessage]);
    }
  }, [responseIndex]);

  return (
    <ChatContext.Provider value={{ messages, isOpen, toggleChat, sendMessage }}>
      {children}
    </ChatContext.Provider>
  );
}

export function useChat() {
  const context = useContext(ChatContext);
  if (context === undefined) {
    throw new Error('useChat must be used within a ChatProvider');
  }
  return context;
}