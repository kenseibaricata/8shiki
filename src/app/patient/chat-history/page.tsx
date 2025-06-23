'use client';

import React, { useState } from 'react';
import PatientHeader from '../../components/PatientHeader';
import { 
  Search, 
  Filter,
  MessageCircle,
  Bot,
  User,
  Calendar,
  Clock,
  ChevronDown,
  ArrowRight
} from 'lucide-react';

interface ChatHistory {
  id: string;
  title: string;
  type: 'ai' | 'staff';
  date: string;
  time: string;
  messageCount: number;
  lastMessage: string;
  status: 'resolved' | 'ongoing' | 'pending';
  staffName?: string;
}

export default function ChatHistoryPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState<'all' | 'ai' | 'staff'>('all');
  const [selectedChat, setSelectedChat] = useState<ChatHistory | null>(null);

  const chatHistories: ChatHistory[] = [
    {
      id: '1',
      title: '歯の痛みについて',
      type: 'ai',
      date: '2024-03-10',
      time: '14:30',
      messageCount: 8,
      lastMessage: '痛み止めを服用して様子を見てください。症状が続く場合はすぐにご連絡ください。',
      status: 'resolved'
    },
    {
      id: '2',
      title: 'ブラッシング方法の質問',
      type: 'staff',
      date: '2024-03-08',
      time: '16:45',
      messageCount: 12,
      lastMessage: '正しいブラッシング方法について詳しく説明させていただきました。',
      status: 'resolved',
      staffName: '田中 智子 (歯科医師)'
    },
    {
      id: '3',
      title: '次回治療の確認',
      type: 'ai',
      date: '2024-03-05',
      time: '10:15',
      messageCount: 5,
      lastMessage: '次回の治療内容について確認いたしました。',
      status: 'resolved'
    },
    {
      id: '4',
      title: '歯ぐきの出血について',
      type: 'staff',
      date: '2024-03-03',
      time: '11:20',
      messageCount: 15,
      lastMessage: '歯周病の可能性があります。次回来院時に詳しく検査しましょう。',
      status: 'ongoing',
      staffName: '山田 健太 (歯科衛生士)'
    },
    {
      id: '5',
      title: '口腔ケア用品について',
      type: 'ai',
      date: '2024-03-01',
      time: '19:30',
      messageCount: 6,
      lastMessage: 'おすすめの口腔ケア用品についてご紹介いたします。',
      status: 'resolved'
    },
    {
      id: '6',
      title: '食事制限について',
      type: 'staff',
      date: '2024-02-28',
      time: '13:45',
      messageCount: 9,
      lastMessage: '治療後の食事制限について詳しく説明いたします。',
      status: 'resolved',
      staffName: '田中 智子 (歯科医師)'
    }
  ];

  const getStatusBadge = (status: ChatHistory['status']) => {
    switch (status) {
      case 'resolved':
        return <span className="inline-flex px-2 py-1 text-xs font-medium rounded-full bg-green-100 text-green-800">解決済み</span>;
      case 'ongoing':
        return <span className="inline-flex px-2 py-1 text-xs font-medium rounded-full bg-blue-100 text-blue-800">進行中</span>;
      case 'pending':
        return <span className="inline-flex px-2 py-1 text-xs font-medium rounded-full bg-yellow-100 text-yellow-800">保留中</span>;
    }
  };

  const getTypeIcon = (type: ChatHistory['type']) => {
    return type === 'ai' ? (
      <Bot className="h-5 w-5 text-green-600" />
    ) : (
      <User className="h-5 w-5 text-blue-600" />
    );
  };

  const getTypeLabel = (type: ChatHistory['type']) => {
    return type === 'ai' ? 'AI相談' : 'スタッフ相談';
  };

  const filteredChats = chatHistories.filter(chat => {
    const matchesSearch = chat.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         chat.lastMessage.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         (chat.staffName && chat.staffName.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesType = filterType === 'all' || chat.type === filterType;
    return matchesSearch && matchesType;
  });

  const handleChatClick = (chat: ChatHistory) => {
    // 実際の実装では、詳細なチャット履歴を表示するモーダルまたはページに遷移
    setSelectedChat(chat);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <PatientHeader />

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-4 py-8">
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-gray-800 mb-2">相談履歴</h1>
          <p className="text-gray-600">これまでのAI相談とスタッフとのやり取りを確認できます</p>
        </div>

        {/* Search and Filter */}
        <div className="bg-white rounded-lg shadow border mb-6">
          <div className="p-4">
            <div className="flex flex-col sm:flex-row gap-4">
              {/* Search */}
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  <input
                    type="text"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                    placeholder="相談内容やスタッフ名で検索..."
                  />
                </div>
              </div>

              {/* Type Filter */}
              <div className="sm:w-48">
                <div className="relative">
                  <Filter className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  <select
                    value={filterType}
                    onChange={(e) => setFilterType(e.target.value as 'all' | 'ai' | 'staff')}
                    className="block w-full pl-10 pr-8 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 appearance-none"
                  >
                    <option value="all">全ての相談</option>
                    <option value="ai">AI相談のみ</option>
                    <option value="staff">スタッフ相談のみ</option>
                  </select>
                  <ChevronDown className="absolute right-3 top-3 h-4 w-4 text-gray-400 pointer-events-none" />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Chat History List */}
        <div className="space-y-4">
          {filteredChats.map((chat) => (
            <div
              key={chat.id}
              className="bg-white rounded-lg shadow border hover:shadow-md transition-shadow cursor-pointer"
              onClick={() => handleChatClick(chat)}
            >
              <div className="p-6">
                {/* Header */}
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-start space-x-3">
                    <div className="p-2 bg-gray-100 rounded-lg">
                      {getTypeIcon(chat.type)}
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-gray-800 mb-1">{chat.title}</h3>
                      <div className="flex items-center space-x-4 text-sm text-gray-600">
                        <span className="flex items-center">
                          <Calendar className="h-4 w-4 mr-1" />
                          {new Date(chat.date).toLocaleDateString('ja-JP')}
                        </span>
                        <span className="flex items-center">
                          <Clock className="h-4 w-4 mr-1" />
                          {chat.time}
                        </span>
                        <span className="flex items-center">
                          <MessageCircle className="h-4 w-4 mr-1" />
                          {chat.messageCount}件のメッセージ
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <span className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded">
                      {getTypeLabel(chat.type)}
                    </span>
                    {getStatusBadge(chat.status)}
                  </div>
                </div>

                {/* Staff Info */}
                {chat.staffName && (
                  <div className="mb-3">
                    <span className="text-sm text-gray-600">担当: {chat.staffName}</span>
                  </div>
                )}

                {/* Last Message */}
                <div className="bg-gray-50 rounded-lg p-3 mb-4">
                  <p className="text-sm text-gray-700 line-clamp-2">{chat.lastMessage}</p>
                </div>

                {/* Footer */}
                <div className="flex items-center justify-between">
                  <div className="text-xs text-gray-500">
                    最終更新: {new Date(chat.date).toLocaleDateString('ja-JP')} {chat.time}
                  </div>
                  <button className="flex items-center text-blue-600 text-sm font-medium hover:text-blue-700">
                    詳細を見る
                    <ArrowRight className="h-4 w-4 ml-1" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredChats.length === 0 && (
          <div className="text-center py-12">
            <MessageCircle className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-600 mb-4">検索条件に一致する相談履歴が見つかりませんでした</p>
            <button
              onClick={() => {
                setSearchTerm('');
                setFilterType('all');
              }}
              className="text-blue-600 text-sm font-medium hover:text-blue-700"
            >
              フィルターをリセット
            </button>
          </div>
        )}

        {/* Summary Stats */}
        <div className="mt-8 bg-white rounded-lg shadow border p-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">相談サマリー</h3>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-600">
                {chatHistories.length}
              </div>
              <div className="text-sm text-gray-600">総相談数</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600">
                {chatHistories.filter(c => c.type === 'ai').length}
              </div>
              <div className="text-sm text-gray-600">AI相談</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-purple-600">
                {chatHistories.filter(c => c.type === 'staff').length}
              </div>
              <div className="text-sm text-gray-600">スタッフ相談</div>
            </div>
          </div>
        </div>
      </main>

      {/* Chat Detail Modal */}
      {selectedChat && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[80vh] overflow-y-auto">
            <div className="px-6 py-4 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-semibold text-gray-800">{selectedChat.title}</h3>
                  <p className="text-sm text-gray-600">
                    {new Date(selectedChat.date).toLocaleDateString('ja-JP')} {selectedChat.time}
                  </p>
                </div>
                <button
                  onClick={() => setSelectedChat(null)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  ✕
                </button>
              </div>
            </div>

            <div className="p-6">
              <div className="mb-4">
                <div className="flex items-center space-x-2 mb-2">
                  {getTypeIcon(selectedChat.type)}
                  <span className="font-medium">{getTypeLabel(selectedChat.type)}</span>
                  {selectedChat.staffName && (
                    <span className="text-sm text-gray-600">- {selectedChat.staffName}</span>
                  )}
                </div>
                {getStatusBadge(selectedChat.status)}
              </div>

              <div className="bg-gray-50 rounded-lg p-4 mb-4">
                <p className="text-sm text-gray-700">{selectedChat.lastMessage}</p>
              </div>

              <div className="text-center">
                <p className="text-sm text-gray-600 mb-4">
                  詳細なチャット履歴を表示するには、以下のボタンをクリックしてください
                </p>
                <button
                  onClick={() => {
                    // 実際の実装では、詳細なチャット画面に遷移
                    setSelectedChat(null);
                  }}
                  className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                >
                  詳細なチャット履歴を見る
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
} 