'use client';

import React, { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import PatientHeader from '../../components/PatientHeader';
import { 
  ArrowLeft, 
  Send, 
  MessageCircle, 
  Bot, 
  User,
  Clock,
  AlertCircle,
  Heart,
  Lightbulb
} from 'lucide-react';

interface Message {
  id: number;
  type: 'user' | 'bot';
  content: string;
  timestamp: Date;
}

export default function PatientChatPage() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      type: 'bot',
      content: 'こんにちは！歯科専門のAIアシスタントです🦷 歯に関するご質問やお悩みがございましたら、お気軽にお聞かせください。',
      timestamp: new Date()
    }
  ]);
  const [newMessage, setNewMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const predefinedQuestions = [
    '歯が痛い時の対処法を教えて',
    '正しい歯磨きの方法を知りたい',
    '虫歯予防の方法について',
    '歯ぐきから血が出る原因は？',
    '親知らずの抜歯について',
    '歯の着色汚れの対策方法'
  ];

  const handleSendMessage = async () => {
    if (!newMessage.trim()) return;

    const userMessage: Message = {
      id: Date.now(),
      type: 'user',
      content: newMessage,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setNewMessage('');
    setIsTyping(true);

    // シミュレートされたAI回答（実際にはAPIを呼び出す）
    setTimeout(() => {
      const botResponse = generateBotResponse(userMessage.content);
      const botMessage: Message = {
        id: Date.now() + 1,
        type: 'bot',
        content: botResponse,
        timestamp: new Date()
      };
      setMessages(prev => [...prev, botMessage]);
      setIsTyping(false);
    }, 1500);
  };

  const generateBotResponse = (userInput: string): string => {
    const input = userInput.toLowerCase();
    
    if (input.includes('痛い') || input.includes('痛み')) {
      return '歯の痛みでお困りですね。痛みの程度や場所にもよりますが、以下の対処法をお試しください：\n\n1. 冷たい水でうがいをする\n2. 鎮痛剤を服用する（用法・用量を守って）\n3. 患部を冷やす\n\n強い痛みが続く場合は、なるべく早くご来院ください。緊急の場合は092-XXX-XXXXまでお電話ください。';
    }
    
    if (input.includes('歯磨き') || input.includes('ブラッシング')) {
      return '正しい歯磨きの方法をご説明しますね🪥\n\n【基本的な手順】\n1. 歯ブラシを45度の角度で歯茎に当てる\n2. 小刻みに優しく動かす（強く擦らない）\n3. 1本1本丁寧に磨く\n4. 最低2分間は続ける\n5. 歯間ブラシやフロスで仕上げ\n\n【ポイント】\n• 力を入れすぎない\n• 歯ブラシは月に1回交換\n• 食後30分以内の歯磨きは避ける';
    }
    
    if (input.includes('虫歯') || input.includes('予防')) {
      return '虫歯予防のコツをお教えします✨\n\n【日常ケア】\n• 正しい歯磨きを1日2-3回\n• フッ素入り歯磨き粉の使用\n• 歯間清掃（フロス・歯間ブラシ）\n• 規則正しい食生活\n\n【避けるべきこと】\n• 糖分の多い食べ物・飲み物の摂り過ぎ\n• だらだら食べ\n• 歯ぎしり・食いしばり\n\n定期検診（3-6ヶ月に1回）も大切です！';
    }
    
    return 'ご質問ありがとうございます。より詳しいご相談については、次回の診療時に直接お聞かせください。また、緊急の場合は092-XXX-XXXXまでお電話いただければと思います。\n\n他にご質問がございましたら、お気軽にお聞かせください🦷';
  };

  const handleQuestionClick = (question: string) => {
    setNewMessage(question);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <PatientHeader />

      {/* Chat Header */}
      <div className="bg-green-50 border-b border-green-200 py-4">
        <div className="max-w-4xl mx-auto px-4">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
              <Bot className="h-6 w-6 text-green-600" />
            </div>
            <div>
              <h2 className="font-semibold text-gray-800">歯科AI相談チャット</h2>
              <p className="text-sm text-gray-600">24時間いつでも歯科に関する相談ができます</p>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Questions */}
      <div className="bg-white border-b border-gray-200 py-4">
        <div className="max-w-4xl mx-auto px-4">
          <div className="flex items-center mb-3">
            <Lightbulb className="h-4 w-4 text-yellow-500 mr-2" />
            <span className="text-sm font-medium text-gray-700">よくある質問</span>
          </div>
          <div className="flex flex-wrap gap-2">
            {predefinedQuestions.map((question, index) => (
              <button
                key={index}
                onClick={() => handleQuestionClick(question)}
                className="inline-flex items-center px-3 py-1 rounded-full text-xs bg-blue-50 text-blue-700 hover:bg-blue-100 transition-colors"
              >
                {question}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Chat Messages */}
      <div className="flex-1 overflow-y-auto">
        <div className="max-w-4xl mx-auto px-4 py-6">
          <div className="space-y-4">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div className={`flex max-w-xs md:max-w-md ${message.type === 'user' ? 'flex-row-reverse' : 'flex-row'} items-start space-x-3`}>
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                    message.type === 'user' ? 'bg-blue-100' : 'bg-green-100'
                  }`}>
                    {message.type === 'user' ? (
                      <User className="h-4 w-4 text-blue-600" />
                    ) : (
                      <Bot className="h-4 w-4 text-green-600" />
                    )}
                  </div>
                  <div className={`px-4 py-3 rounded-lg ${
                    message.type === 'user' 
                      ? 'bg-blue-600 text-white' 
                      : 'bg-white border border-gray-200 text-gray-800'
                  }`}>
                    <p className="text-sm whitespace-pre-line">{message.content}</p>
                    <p className={`text-xs mt-1 ${
                      message.type === 'user' ? 'text-blue-100' : 'text-gray-500'
                    }`}>
                      {message.timestamp.toLocaleTimeString()}
                    </p>
                  </div>
                </div>
              </div>
            ))}
            
            {isTyping && (
              <div className="flex justify-start">
                <div className="flex items-start space-x-3">
                  <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                    <Bot className="h-4 w-4 text-green-600" />
                  </div>
                  <div className="bg-white border border-gray-200 rounded-lg px-4 py-3">
                    <div className="flex space-x-1">
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                    </div>
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>
        </div>
      </div>

      {/* Message Input */}
      <div className="bg-white border-t border-gray-200 p-4">
        <div className="max-w-4xl mx-auto">
          <div className="flex space-x-4">
            <div className="flex-1 relative">
              <textarea
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                placeholder="歯科に関するご質問をお聞かせください..."
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-green-500 focus:border-green-500 resize-none"
                rows={3}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && !e.shiftKey) {
                    e.preventDefault();
                    handleSendMessage();
                  }
                }}
              />
            </div>
            <button
              onClick={handleSendMessage}
              disabled={!newMessage.trim() || isTyping}
              className="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
            >
              <Send className="h-5 w-5" />
            </button>
          </div>
          
          {/* Disclaimer */}
          <div className="mt-4 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
            <div className="flex items-start space-x-2">
              <AlertCircle className="h-4 w-4 text-yellow-600 mt-0.5" />
              <div className="text-xs text-yellow-800">
                <p><strong>ご注意:</strong> このAI相談は一般的な情報提供のみを目的としており、医学的診断や治療の代替にはなりません。</p>
                <p className="mt-1">緊急の場合や深刻な症状がある場合は、必ず医師にご相談ください。</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Demo Navigation */}
      <div className="bg-yellow-50 border-t border-yellow-200 p-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center text-sm text-yellow-800">
            <strong>🎨 デモ用:</strong> 上記の「よくある質問」をクリックするか、自由に質問を入力してください
          </div>
        </div>
      </div>
    </div>
  );
} 