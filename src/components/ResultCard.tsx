
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ExternalLink } from "lucide-react";
import { SearchResult } from '@/services/serpApiService';

interface ResultCardProps {
  result: SearchResult;
  index: number;
}

const ResultCard: React.FC<ResultCardProps> = ({ result, index }) => {
  return (
    <Card className="mb-3 bg-secondary border-none hover:shadow-md transition-shadow">
      <CardHeader className="py-3 px-4">
        <CardTitle className="text-sm flex items-center justify-between">
          <span className="text-chatbot-blue">Source #{index + 1}</span>
          <a 
            href={result.link} 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-xs text-muted-foreground hover:text-chatbot-purple flex items-center gap-1"
          >
            <span>Visit</span>
            <ExternalLink size={12} />
          </a>
        </CardTitle>
      </CardHeader>
      <CardContent className="py-2 px-4">
        <h3 className="font-medium mb-1">{result.title}</h3>
        <p className="text-sm text-muted-foreground">{result.snippet}</p>
      </CardContent>
    </Card>
  );
};

export default ResultCard;
