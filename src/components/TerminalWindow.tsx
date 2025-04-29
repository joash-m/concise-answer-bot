
import React from 'react';
import { Card, CardContent } from "@/components/ui/card";

interface TerminalWindowProps {
  children: React.ReactNode;
}

const TerminalWindow: React.FC<TerminalWindowProps> = ({ children }) => {
  return (
    <Card className="w-full max-w-4xl mx-auto bg-[#1E1E1E] border-[#333] shadow-xl">
      <div className="flex items-center p-2 bg-[#333] rounded-t-lg">
        <div className="flex space-x-2">
          <div className="w-3 h-3 rounded-full bg-red-500"></div>
          <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
          <div className="w-3 h-3 rounded-full bg-green-500"></div>
        </div>
        <div className="flex-1 text-center text-xs text-gray-400">Concise Answer Bot</div>
      </div>
      <CardContent className="p-4 font-mono text-sm overflow-y-auto max-h-[70vh]">
        {children}
      </CardContent>
    </Card>
  );
};

export default TerminalWindow;
