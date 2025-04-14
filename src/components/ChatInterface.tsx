
import React, { useState, useRef, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Send } from 'lucide-react';
import VoiceControl from './VoiceControl';

interface Message {
  id: string;
  content: string;
  sender: 'user' | 'ai';
  timestamp: Date;
}

interface ChatInterfaceProps {
  documentTitle?: string;
}

const ChatInterface: React.FC<ChatInterfaceProps> = ({ documentTitle = "Document" }) => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      content: `Hello! A sentence from the document is: "We are pleased to welcome you to the 6-month Internship Program at Brandzaha Creative Agency, commencing from Monday, Dec 2, 2024."`,
      sender: 'ai',
      timestamp: new Date()
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const messagesEndRef = useRef<null | HTMLDivElement>(null);

  const handleSendMessage = () => {
    if (inputValue.trim() === '') return;
    
    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      content: inputValue,
      sender: 'user',
      timestamp: new Date()
    };
    
    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsProcessing(true);
    
    // Simulate AI response after a delay
    setTimeout(() => {
      const responseMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: generateMockResponse(inputValue),
        sender: 'ai',
        timestamp: new Date()
      };
      
      setMessages(prev => [...prev, responseMessage]);
      setIsProcessing(false);
    }, 1500);
  };
  
  const handleVoiceInput = (text: string) => {
    setInputValue(text);
    // Auto-send after voice input
    setTimeout(() => {
      if (text.trim()) {
        const userMessage: Message = {
          id: Date.now().toString(),
          content: text,
          sender: 'user',
          timestamp: new Date()
        };
        
        setMessages(prev => [...prev, userMessage]);
        setInputValue('');
        setIsProcessing(true);
        
        // Simulate AI response
        setTimeout(() => {
          const responseMessage: Message = {
            id: (Date.now() + 1).toString(),
            content: generateMockResponse(text),
            sender: 'ai',
            timestamp: new Date()
          };
          
          setMessages(prev => [...prev, responseMessage]);
          setIsProcessing(false);
        }, 1500);
      }
    }, 500);
  };
  
  const generateMockResponse = (question: string): string => {
    if (question.toLowerCase().includes('work hours')) {
      return 'The work hours mentioned in the document are Monday to Friday, 11:00 AM to 6:00 PM.';
    } else if (question.toLowerCase().includes('activit')) {
      return 'According to the document, Saturdays are reserved for 2 hours of learning and activities.';
    } else if (question.toLowerCase().includes('director') || question.toLowerCase().includes('manag')) {
      return 'The document does not specifically mention who the Managing Director of Brandzaha Creative Agency is.';
    } else {
      return `Based on the internship offer letter, this is a 6-month internship program at Brandzaha Creative Agency. The probation period is from December 2, 2024, to January 1, 2025. No stipend is provided during the probation period.`;
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };
  
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  return (
    <div className="flex flex-col h-[500px] bg-white rounded-lg shadow-sm border">
      <div className="px-4 py-3 border-b">
        <h3 className="font-medium">Chat with {documentTitle}</h3>
        <p className="text-xs text-gray-500">Ask questions about the content of your document</p>
      </div>
      
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div
              className={`max-w-[80%] px-4 py-2 rounded-lg ${
                message.sender === 'user'
                  ? 'bg-primary text-white rounded-br-none'
                  : 'bg-gray-100 text-gray-800 rounded-bl-none'
              }`}
            >
              <div className="text-sm">{message.content}</div>
              <div className="text-xs mt-1 opacity-70">
                {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
              </div>
            </div>
          </div>
        ))}
        
        {isProcessing && (
          <div className="flex justify-start">
            <div className="bg-gray-100 text-gray-800 px-4 py-2 rounded-lg rounded-bl-none max-w-[80%]">
              <div className="flex space-x-2">
                <div className="w-2 h-2 rounded-full bg-gray-400 animate-pulse"></div>
                <div className="w-2 h-2 rounded-full bg-gray-400 animate-pulse" style={{ animationDelay: '0.2s' }}></div>
                <div className="w-2 h-2 rounded-full bg-gray-400 animate-pulse" style={{ animationDelay: '0.4s' }}></div>
              </div>
            </div>
          </div>
        )}
        
        <div ref={messagesEndRef} />
      </div>
      
      <div className="border-t p-3">
        <div className="flex items-center gap-2">
          <VoiceControl 
            onVoiceInput={handleVoiceInput}
            disabled={isProcessing}
          />
          
          <div className="flex-1 relative">
            <textarea
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Type your message..."
              className="w-full bg-gray-100 border-0 rounded-lg px-4 py-2 pr-10 resize-none h-[40px] focus:ring-1 focus:ring-primary focus:outline-none"
              style={{ lineHeight: '24px' }}
              disabled={isProcessing}
            />
          </div>
          
          <Button
            size="icon"
            onClick={handleSendMessage}
            disabled={inputValue.trim() === '' || isProcessing}
            className="rounded-full"
          >
            <Send className="h-4 w-4" />
          </Button>
        </div>
        
        <div className="mt-2 text-xs text-gray-400 text-center">
          Chat with your document using local embeddings
        </div>
      </div>
    </div>
  );
};

export default ChatInterface;
