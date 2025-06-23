'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { 
  ArrowLeft, 
  User, 
  Calendar, 
  MessageCircle,
  CheckCircle,
  Clock,
  Phone,
  Mail,
  MapPin,
  FileText,
  Edit3,
  Send
} from 'lucide-react';

interface Patient {
  id: string;
  name: string;
  age: number;
  phone: string;
  email: string;
  address: string;
  lastVisit: string;
}

interface TreatmentPlan {
  id: string;
  title: string;
  status: 'completed' | 'in-progress' | 'planned';
  date: string;
  description: string;
  duration: number;
  notes: string;
}

interface ChatMessage {
  id: string;
  type: 'patient' | 'ai' | 'staff';
  content: string;
  timestamp: string;
  sender?: string;
}

export default function PatientDetailPage() {
  const params = useParams();
  const id = params.id as string;
  
  const [activeTab, setActiveTab] = useState<'treatment' | 'chat'>('treatment');
  const [newMessage, setNewMessage] = useState('');

  // サンプル患者データ
  const patient: Patient = {
    id: id,
    name: '田中 花子',
    age: 35,
    phone: '092-123-4567',
    email: 'tanaka@example.com',
    address: '福岡県大野城市中央1-2-3',
    lastVisit: '2024-03-10'
  };

  // サンプル診療計画データ
  const treatmentPlans: TreatmentPlan[] = [
    {
      id: '1',
      title: '初診・検査',
      status: 'completed',
      date: '2024-02-15',
      description: 'レントゲン撮影、口腔内検査、治療計画の説明',
      duration: 60,
      notes: '全体的に歯石の付着あり。右上7番に深い虫歯を確認。'
    },
    {
      id: '2',
      title: '歯石除去・クリーニング',
      status: 'completed',
      date: '2024-02-22',
      description: '歯石除去、歯面清掃、ブラッシング指導',
      duration: 45,
      notes: 'ブラッシング方法を指導。フロスの使用を推奨。'
    },
    {
      id: '3',
      title: '虫歯治療（右上7番）',
      status: 'in-progress',
      date: '2024-03-01',
      description: 'インレー治療',
      duration: 60,
      notes: '型取りを実施。次回インレー装着予定。'
    },
    {
      id: '4',
      title: 'インレー装着',
      status: 'planned',
      date: '2024-03-15',
      description: 'インレーの装着と調整',
      duration: 30,
      notes: ''
    },
    {
      id: '5',
      title: 'メンテナンス・定期検診',
      status: 'planned',
      date: '2024-06-15',
      description: '3ヶ月後の定期検診',
      duration: 30,
      notes: ''
    }
  ];

  // サンプルチャットデータ
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([
    {
      id: '1',
      type: 'patient',
      content: 'こんにちは。治療後に少し痛みがあるのですが、大丈夫でしょうか？',
      timestamp: '2024-03-02 14:30'
    },
    {
      id: '2',
      type: 'ai',
      content: 'こんにちは。治療後の軽い痛みは正常な反応です。痛みが強い場合や3日以上続く場合は、すぐにご連絡ください。痛み止めを服用していただいても構いません。',
      timestamp: '2024-03-02 14:32'
    },
    {
      id: '3',
      type: 'patient',
      content: 'ありがとうございます。痛み止めを飲んだら楽になりました。',
      timestamp: '2024-03-02 16:15'
    },
    {
      id: '4',
      type: 'staff',
      content: '田中様、治療後の経過はいかがですか？次回のご来院時に詳しくお聞かせください。',
      timestamp: '2024-03-03 10:00',
      sender: '田中 智子 (歯科医師)'
    },
    {
      id: '5',
      type: 'patient',
      content: '痛みもなくなり、とても調子が良いです。次回もよろしくお願いします。',
      timestamp: '2024-03-03 18:45'
    }
  ]);

  const getStatusBadge = (status: TreatmentPlan['status']) => {
    switch (status) {
      case 'completed':
        return <span className="inline-flex px-2 py-1 text-xs font-medium rounded-full bg-green-100 text-green-800">完了</span>;
      case 'in-progress':
        return <span className="inline-flex px-2 py-1 text-xs font-medium rounded-full bg-blue-100 text-blue-800">進行中</span>;
      case 'planned':
        return <span className="inline-flex px-2 py-1 text-xs font-medium rounded-full bg-gray-100 text-gray-800">予定</span>;
    }
  };

  const getStatusIcon = (status: TreatmentPlan['status']) => {
    switch (status) {
      case 'completed':
        return <CheckCircle className="h-4 w-4 text-green-600" />;
      case 'in-progress':
        return <Clock className="h-4 w-4 text-blue-600" />;
      case 'planned':
        return <Calendar className="h-4 w-4 text-gray-600" />;
    }
  };

  const handleSendMessage = () => {
    if (!newMessage.trim()) return;

    const message: ChatMessage = {
      id: Date.now().toString(),
      type: 'staff',
      content: newMessage,
      timestamp: new Date().toLocaleString('ja-JP'),
      sender: '田中 智子 (歯科医師)'
    };

    setChatMessages(prev => [...prev, message]);
    setNewMessage('');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-6xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Link href="/staff-dashboard" className="flex items-center space-x-3 hover:opacity-80">
                <ArrowLeft className="h-5 w-5 text-gray-600" />
                <div className="flex items-center space-x-2">
                  <span className="text-xl">🦷</span>
                  <span className="text-lg font-semibold text-gray-800">歯知式</span>
                </div>
              </Link>
            </div>
            <div className="flex items-center space-x-2">
              <User className="h-5 w-5 text-blue-600" />
              <span className="text-sm font-medium text-gray-700">患者詳細</span>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-6xl mx-auto px-4 py-8">
        {/* Patient Info Card */}
        <div className="bg-white rounded-lg shadow border mb-6">
          <div className="px-6 py-4 border-b border-gray-200">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center">
                  <User className="h-8 w-8 text-blue-600" />
                </div>
                <div>
                  <h1 className="text-xl font-semibold text-gray-800">{patient.name}</h1>
                  <p className="text-sm text-gray-600">患者ID: {patient.id} | {patient.age}歳</p>
                  <p className="text-sm text-gray-500">最終来院: {patient.lastVisit}</p>
                </div>
              </div>
              <button className="p-2 text-gray-400 hover:text-gray-600 transition-colors">
                <Edit3 className="h-5 w-5" />
              </button>
            </div>
          </div>

          <div className="px-6 py-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="flex items-center space-x-2 text-sm text-gray-600">
                <Phone className="h-4 w-4" />
                <span>{patient.phone}</span>
              </div>
              <div className="flex items-center space-x-2 text-sm text-gray-600">
                <Mail className="h-4 w-4" />
                <span>{patient.email}</span>
              </div>
              <div className="flex items-center space-x-2 text-sm text-gray-600">
                <MapPin className="h-4 w-4" />
                <span>{patient.address}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="bg-white rounded-lg shadow border">
          <div className="border-b border-gray-200">
            <nav className="flex space-x-8 px-6">
              <button
                onClick={() => setActiveTab('treatment')}
                className={`py-4 px-1 border-b-2 font-medium text-sm ${
                  activeTab === 'treatment'
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                <div className="flex items-center space-x-2">
                  <Calendar className="h-4 w-4" />
                  <span>診療計画</span>
                </div>
              </button>
              <button
                onClick={() => setActiveTab('chat')}
                className={`py-4 px-1 border-b-2 font-medium text-sm ${
                  activeTab === 'chat'
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                <div className="flex items-center space-x-2">
                  <MessageCircle className="h-4 w-4" />
                  <span>チャット履歴</span>
                </div>
              </button>
            </nav>
          </div>

          {/* Treatment Plan Tab */}
          {activeTab === 'treatment' && (
            <div className="p-6">
              <div className="space-y-4">
                {treatmentPlans.map((plan, index) => (
                  <div key={plan.id} className="border border-gray-200 rounded-lg p-4">
                    <div className="flex items-start justify-between">
                      <div className="flex items-start space-x-4">
                        <div className="flex items-center justify-center w-8 h-8 bg-blue-100 rounded-full">
                          <span className="text-sm font-medium text-blue-600">{index + 1}</span>
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center space-x-3 mb-2">
                            <h3 className="font-medium text-gray-800">{plan.title}</h3>
                            {getStatusBadge(plan.status)}
                          </div>
                          <p className="text-sm text-gray-600 mb-2">{plan.description}</p>
                          <div className="flex items-center space-x-4 text-xs text-gray-500 mb-2">
                            <span>日時: {plan.date}</span>
                            <span>所要時間: {plan.duration}分</span>
                          </div>
                          {plan.notes && (
                            <div className="mt-2 p-2 bg-gray-50 rounded text-sm text-gray-700">
                              <div className="flex items-start space-x-2">
                                <FileText className="h-3 w-3 text-gray-400 mt-0.5" />
                                <span>{plan.notes}</span>
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        {getStatusIcon(plan.status)}
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Progress Summary */}
              <div className="mt-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
                <h3 className="font-medium text-blue-800 mb-2">治療進捗サマリー</h3>
                <div className="grid grid-cols-3 gap-4 text-sm">
                  <div className="text-center">
                    <p className="text-lg font-bold text-green-600">
                      {treatmentPlans.filter(p => p.status === 'completed').length}
                    </p>
                    <p className="text-blue-700">完了</p>
                  </div>
                  <div className="text-center">
                    <p className="text-lg font-bold text-blue-600">
                      {treatmentPlans.filter(p => p.status === 'in-progress').length}
                    </p>
                    <p className="text-blue-700">進行中</p>
                  </div>
                  <div className="text-center">
                    <p className="text-lg font-bold text-gray-600">
                      {treatmentPlans.filter(p => p.status === 'planned').length}
                    </p>
                    <p className="text-blue-700">予定</p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Chat History Tab */}
          {activeTab === 'chat' && (
            <div className="p-6">
              <div className="space-y-4 max-h-96 overflow-y-auto mb-4">
                {chatMessages.map((message) => (
                  <div
                    key={message.id}
                    className={`flex ${
                      message.type === 'patient' ? 'justify-end' : 'justify-start'
                    }`}
                  >
                    <div
                      className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
                        message.type === 'patient'
                          ? 'bg-blue-600 text-white'
                          : message.type === 'ai'
                          ? 'bg-green-100 text-green-800'
                          : 'bg-gray-100 text-gray-800'
                      }`}
                    >
                      <p className="text-sm">{message.content}</p>
                      <div className="flex items-center justify-between mt-1">
                        <p className={`text-xs ${
                          message.type === 'patient' ? 'text-blue-200' : 'text-gray-500'
                        }`}>
                          {message.timestamp}
                        </p>
                        {message.sender && (
                          <p className={`text-xs ${
                            message.type === 'patient' ? 'text-blue-200' : 'text-gray-500'
                          }`}>
                            {message.sender}
                          </p>
                        )}
                      </div>
                      {message.type === 'ai' && (
                        <div className="flex items-center mt-1">
                          <span className="text-xs text-green-600 bg-green-50 px-2 py-1 rounded">
                            🤖 AI歯科アシスタント
                          </span>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              {/* Message Input */}
              <div className="border-t border-gray-200 pt-4">
                <div className="flex space-x-2">
                  <input
                    type="text"
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                    className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                    placeholder="患者にメッセージを送信..."
                  />
                  <button
                    onClick={handleSendMessage}
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    <Send className="h-4 w-4" />
                  </button>
                </div>
                <p className="text-xs text-gray-500 mt-1">
                  スタッフとして患者にメッセージを送信できます
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Demo Info */}
        <div className="mt-6 p-4 bg-yellow-50 rounded-lg border border-yellow-200">
          <p className="text-sm text-yellow-800 text-center">
            <strong>🎨 デモ用:</strong> 診療計画の進捗とチャット履歴を確認できます。チャットタブでは新しいメッセージを送信可能です
          </p>
        </div>
      </main>
    </div>
  );
} 