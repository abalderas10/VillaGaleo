import React from 'react';
import { ChatButton } from './ChatButton';
import { ChatDialog } from './ChatDialog';
import { useChat } from './ChatProvider';

export function Chat() {
  const { messages, isOpen, toggleChat, sendMessage } = useChat();

  return (
    <>
      <ChatButton isOpen={isOpen} onClick={toggleChat} />
      <ChatDialog
        isOpen={isOpen}
        messages={messages}
        onSend={sendMessage}
      />
    </>
  );
}