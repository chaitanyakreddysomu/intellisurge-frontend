import React, { useState, useRef, useEffect } from 'react';
import { MessageCircle, SendHorizontal, X, MinusSquare } from 'lucide-react';
import { Button } from './ui/button';
import { Textarea } from './ui/textarea';

type Message = {
  content: string;
  isBot: boolean;
  timestamp: Date;
};

const botResponses = {
  greeting: "Hello! I'm IntellSurge Assistant. How can I help you today?",
  services: "IntellSurge Technologies offers AI solutions, custom software, data analytics, cloud migration, and digital transformation consulting. How can we assist?",
  pricing: "Our pricing varies based on project scope. We offer fixed price, time & materials, and retainer models. Want a personalized quote?",
  contact: "Reach us at contact@intellsurge.com or schedule a call via our website. Need assistance with anything else?",
  default: "Thank you for reaching out! Our team will review your inquiry. Is there anything else I can help with?"
};

const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState<Message[]>([]);
  const [isTyping, setIsTyping] = useState(false);
  const endOfMessagesRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen && messages.length === 0) {
      setMessages([
        { content: botResponses.greeting, isBot: true, timestamp: new Date() }
      ]);
    }
  }, [isOpen, messages.length]);

  useEffect(() => {
    endOfMessagesRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const toggleChat = () => {
    if (!isOpen) {
      setIsOpen(true);
      setIsMinimized(false);
    } else {
      setIsMinimized(!isMinimized);
    }
  };

  const closeChat = () => {
    setIsOpen(false);
    setIsMinimized(false);
  };

  const handleSendMessage = () => {
    if (!message.trim()) return;

    const userMessage: Message = {
      content: message,
      isBot: false,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setMessage('');
    setIsTyping(true);

    setTimeout(() => {
      const botReply = getBotResponse(message);
      setMessages(prev => [...prev, { content: botReply, isBot: true, timestamp: new Date() }]);
      setIsTyping(false);
    }, 1000);
  };

  const getBotResponse = (userMessage: string): string => {
    const lowercaseMessage = userMessage.toLowerCase();

    if (lowercaseMessage.includes('hello') || lowercaseMessage.includes('hi') || lowercaseMessage.includes('hey')) {
      return botResponses.greeting;
    } else if (lowercaseMessage.includes('service') || lowercaseMessage.includes('offer')) {
      return botResponses.services;
    } else if (lowercaseMessage.includes('price') || lowercaseMessage.includes('cost')) {
      return botResponses.pricing;
    } else if (lowercaseMessage.includes('contact') || lowercaseMessage.includes('email')) {
      return botResponses.contact;
    } else {
      return botResponses.default;
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <>
      {/* Chat Toggle Button */}
      <div className="fixed bottom-6 right-6 z-50">
        <button 
          onClick={toggleChat}
          className="bg-[#002645] hover:bg-[#002645]/90 text-white rounded-full p-4 shadow-lg transition-all flex items-center justify-center"
          aria-label="Open chat"
        >
          <MessageCircle size={24} className="text-white" />
        </button>
      </div>

      {/* Chat Window */}
      {isOpen && (
        <div 
          className={`fixed z-50 bottom-20 right-6 bg-white shadow-xl rounded-lg overflow-hidden flex flex-col transition-all duration-300 w-80 sm:w-96 ${
            isMinimized ? 'h-14' : 'h-96'
          }`}
        >
          {/* Chat Header */}
          <div className="bg-[#002645] p-3 text-white flex justify-between items-center">
            <div className="flex items-center space-x-2">
              <MessageCircle size={18} className="text-white" />
              <h3 className="font-medium">IntellSurge Assistant</h3>
            </div>
            <div className="flex space-x-1">
              <button onClick={toggleChat} className="hover:bg-white/10 rounded p-1 transition" aria-label="Minimize chat">
                <MinusSquare size={16} className="text-white" />
              </button>
              <button onClick={closeChat} className="hover:bg-white/10 rounded p-1 transition" aria-label="Close chat">
                <X size={16} className="text-white" />
              </button>
            </div>
          </div>

          {!isMinimized && (
            <>
              {/* Messages Area */}
              <div className="flex-1 overflow-y-auto p-3 space-y-3 bg-white">
                {messages.map((msg, index) => (
                  <div key={index} className={`flex ${msg.isBot ? 'justify-start' : 'justify-end'}`}>
                    <div 
                      className={`max-w-[80%] p-3 rounded-lg ${
                        msg.isBot 
                          ? 'bg-[#002645] text-white'  // Bot messages (Dark Blue)
                          : 'bg-[#dc3545] text-white'  // User messages (Red)
                      }`}
                    >
                      <p className="text-sm">{msg.content}</p>
                      <p className="text-xs opacity-70 mt-1">
                        {msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </p>
                    </div>
                  </div>
                ))}
                {isTyping && (
                  <div className="flex justify-start">
                    <div className="bg-[#002645] rounded-lg p-3 max-w-[80%] text-white">
                      <div className="flex space-x-1">
                        <div className="w-2 h-2 rounded-full bg-white animate-bounce"></div>
                        <div className="w-2 h-2 rounded-full bg-white animate-bounce"></div>
                        <div className="w-2 h-2 rounded-full bg-white animate-bounce"></div>
                      </div>
                    </div>
                  </div>
                )}
                <div ref={endOfMessagesRef} />
              </div>
              
              {/* Input Area */}
              <div className="border-t border-gray-300 p-3 flex space-x-2">
                <Textarea
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder="Type your message..."
                  className="resize-none min-h-10 max-h-24 bg-[#002645]/50 text-white placeholder-white"
                  rows={1}
                />
                <Button onClick={handleSendMessage} size="icon" disabled={!message.trim()} className="bg-[#dc3545] hover:bg-[#dc3545]/90">
                  <SendHorizontal size={18} className="text-white" />
                </Button>
              </div>
            </>
          )}
        </div>
      )}
    </>
  );
};

export default Chatbot;
