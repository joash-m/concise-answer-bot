
import React from 'react';
import TerminalWindow from '@/components/TerminalWindow';
import TerminalHeader from '@/components/TerminalHeader';
import ChatContainer from '@/components/ChatContainer';

const Index = () => {
  return (
    <div className="min-h-screen bg-background py-8 px-4">
      <TerminalHeader />
      <TerminalWindow>
        <ChatContainer />
      </TerminalWindow>
      
      <footer className="mt-8 text-center text-xs text-muted-foreground">
        <p>Concise Answer Bot © {new Date().getFullYear()}</p>
        <p className="mt-1">Powered by OpenAI and SerpAPI</p>
      </footer>
    </div>
  );
};

export default Index;
