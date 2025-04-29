
import React, { useState } from 'react';
import TypingAnimation from './TypingAnimation';
import { cn } from '@/lib/utils';

interface MessageBubbleProps {
  message: {
    id: string;
    content: string;
    sender: 'user' | 'bot';
    type?: 'processing' | 'result' | 'error';
    animate?: boolean;
  };
}

const MessageBubble: React.FC<MessageBubbleProps> = ({ message }) => {
  const [isTypingComplete, setIsTypingComplete] = useState(!message.animate);
  
  const isUser = message.sender === 'user';
  
  return (
    <div className={cn(
      "mb-4 animate-fade-in",
      isUser ? "text-right" : "text-left"
    )}>
      <div className={cn(
        "inline-block max-w-[85%] rounded-lg px-4 py-2 text-sm",
        isUser ? "bg-chatbot-blue text-white rounded-br-none" : 
        message.type === 'error' ? "bg-red-500 text-white rounded-bl-none" :
        message.type === 'processing' ? "bg-chatbot-purple bg-opacity-70 text-white rounded-bl-none" :
        "bg-secondary text-foreground rounded-bl-none",
        !isUser && "border-l-4",
        !isUser && message.type === 'error' ? "border-red-700" :
        !isUser && message.type === 'processing' ? "border-chatbot-purple" :
        !isUser && "border-chatbot-blue"
      )}>
        <div className="text-left whitespace-pre-wrap">
          {message.animate ? (
            <TypingAnimation 
              text={message.content}
              delay={10}
              onComplete={() => setIsTypingComplete(true)}
            />
          ) : (
            message.content
          )}
        </div>
      </div>
      
      {!isUser && message.type === 'result' && isTypingComplete && (
        <div className="mt-1 text-xs text-gray-500">Sources processed and summarized</div>
      )}
    </div>
  );
};

export default MessageBubble;
