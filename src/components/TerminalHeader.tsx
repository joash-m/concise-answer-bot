
import React from 'react';

const TerminalHeader: React.FC = () => {
  return (
    <div className="mb-6 space-y-2">
      <div className="flex items-center justify-center">
        <h1 className="text-3xl font-bold gradient-text">Concise Answer Bot</h1>
      </div>
      <p className="text-center text-muted-foreground">
        AI-powered search that provides concise, relevant answers to your questions
      </p>
      <div className="h-px bg-gradient-to-r from-transparent via-chatbot-purple to-transparent my-4" />
    </div>
  );
};

export default TerminalHeader;
