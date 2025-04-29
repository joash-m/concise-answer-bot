
import React, { useState, useRef, useEffect } from 'react';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Send } from "lucide-react";

interface TerminalInputProps {
  onSubmit: (query: string) => void;
  isProcessing: boolean;
}

const TerminalInput: React.FC<TerminalInputProps> = ({ onSubmit, isProcessing }) => {
  const [query, setQuery] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);
  
  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, [isProcessing]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim() && !isProcessing) {
      onSubmit(query.trim());
      setQuery('');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex space-x-2">
      <div className="flex-grow relative">
        <Input
          ref={inputRef}
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder={isProcessing ? "Processing..." : "Ask me anything..."}
          disabled={isProcessing}
          className="w-full pl-4 pr-10 py-2 bg-secondary border-none text-foreground placeholder:text-muted-foreground font-mono"
        />
      </div>
      <Button 
        type="submit" 
        disabled={isProcessing || !query.trim()} 
        className="bg-chatbot-gradient hover:opacity-90 transition-opacity"
      >
        <Send className="h-4 w-4" />
      </Button>
    </form>
  );
};

export default TerminalInput;
