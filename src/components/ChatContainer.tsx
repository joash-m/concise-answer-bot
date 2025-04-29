
import React, { useState, useRef, useEffect } from 'react';
import TerminalInput from './TerminalInput';
import MessageBubble from './MessageBubble';
import ResultCard from './ResultCard';
import { processQuery, summarizeResults } from '@/services/openaiService';
import { searchGoogle, SearchResult } from '@/services/serpApiService';
import { v4 as uuidv4 } from 'uuid';

interface Message {
  id: string;
  content: string;
  sender: 'user' | 'bot';
  type?: 'processing' | 'result' | 'error';
  animate?: boolean;
}

const ChatContainer: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: uuidv4(),
      content: "Hi! I'm Concise Answer Bot. Ask me anything, and I'll search for the most relevant information and provide you with a concise, informative answer.",
      sender: 'bot',
      animate: true
    }
  ]);
  const [isProcessing, setIsProcessing] = useState(false);
  const [searchResults, setSearchResults] = useState<SearchResult[]>([]);
  const [showResults, setShowResults] = useState(false);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleSubmit = async (query: string) => {
    // Add user message
    const userMessageId = uuidv4();
    setMessages(prev => [...prev, {
      id: userMessageId,
      content: query,
      sender: 'user'
    }]);

    setIsProcessing(true);
    setShowResults(false);
    
    try {
      // Step 1: Process query with OpenAI
      const processingMessageId = uuidv4();
      setMessages(prev => [...prev, {
        id: processingMessageId,
        content: "Processing your query...",
        sender: 'bot',
        type: 'processing'
      }]);
      
      const processedQuery = await processQuery(query);
      
      // Update processing message
      setMessages(prev => prev.map(msg => 
        msg.id === processingMessageId 
          ? { ...msg, content: processedQuery.content, animate: true }
          : msg
      ));

      // Step 2: Search Google via SerpAPI
      const searchMessageId = uuidv4();
      setMessages(prev => [...prev, {
        id: searchMessageId,
        content: "Searching for information...",
        sender: 'bot',
        type: 'processing'
      }]);

      const searchResponse = await searchGoogle(query);
      
      if (searchResponse.isError) {
        setMessages(prev => prev.map(msg => 
          msg.id === searchMessageId 
            ? { ...msg, content: "Sorry, there was an error searching for information.", type: 'error' }
            : msg
        ));
        return;
      }

      // Update search message and store results
      setMessages(prev => prev.map(msg => 
        msg.id === searchMessageId 
          ? { ...msg, content: "Found relevant information. Analyzing results..." }
          : msg
      ));
      
      setSearchResults(searchResponse.results);

      // Step 3: Summarize results with OpenAI
      const summaryResponse = await summarizeResults(query, searchResponse.results);
      
      // Remove processing message
      setMessages(prev => prev.filter(msg => msg.id !== searchMessageId));
      
      // Add result message
      setMessages(prev => [...prev, {
        id: uuidv4(),
        content: summaryResponse.isError 
          ? "Sorry, there was an error summarizing the search results."
          : summaryResponse.content,
        sender: 'bot',
        type: summaryResponse.isError ? 'error' : 'result',
        animate: true
      }]);
      
      // Show results after answer is generated
      setTimeout(() => {
        setShowResults(true);
      }, 500);
      
    } catch (error) {
      console.error("Error in chat workflow:", error);
      setMessages(prev => [...prev, {
        id: uuidv4(),
        content: "Sorry, something went wrong. Please try again.",
        sender: 'bot',
        type: 'error'
      }]);
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="space-y-4">
      <div className="space-y-4 mb-4">
        {messages.map((message) => (
          <MessageBubble key={message.id} message={message} />
        ))}
        <div ref={messagesEndRef} />
      </div>

      {showResults && searchResults.length > 0 && (
        <div className="mb-6 animate-fade-in">
          <h2 className="text-sm font-medium text-muted-foreground mb-2">Sources:</h2>
          <div>
            {searchResults.slice(0, 3).map((result, index) => (
              <ResultCard key={index} result={result} index={index} />
            ))}
          </div>
        </div>
      )}

      <TerminalInput onSubmit={handleSubmit} isProcessing={isProcessing} />
    </div>
  );
};

export default ChatContainer;
