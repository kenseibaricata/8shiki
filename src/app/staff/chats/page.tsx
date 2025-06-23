'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import StaffHeader from '../../components/StaffHeader';
import { 
  Search, 
  Filter,
  MessageCircle,
  Bot,
  User,
  Calendar,
  Clock,
  Eye,
  Reply,
  AlertTriangle,
  CheckCircle,
  ChevronDown,
  Send
} from 'lucide-react';

interface ChatSession {
  id: string;
  patientId: string;
  patientName: string;
  type: 'ai' | 'staff';
  title: string;
  lastMessage: string;
  messageCount: number;
  status: 'active' | 'resolved' | 'pending' | 'escalated';
  priority: 'low' | 'medium' | 'high' | 'urgent';
  createdDate: string;
  lastActivity: string;
  assignedStaff?: string;
  category: 'general' | 'pain' | 'appointment' | 'treatment' | 'billing' | 'emergency';
  isUnread: boolean;
}

interface ChatMessage {
  id: string;
  type: 'patient' | 'ai' | 'staff';
  content: string;
  timestamp: string;
  sender?: string;
}

export default function ChatsPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [typeFilter, setTypeFilter] = useState<'all' | 'ai' | 'staff'>('all');
  const [statusFilter, setStatusFilter] = useState<'all' | 'active' | 'resolved' | 'pending' | 'escalated'>('all');
  const [categoryFilter, setCategoryFilter] = useState<'all' | 'general' | 'pain' | 'appointment' | 'treatment' | 'billing' | 'emergency'>('all');
  const [sortBy, setSortBy] = useState<'lastActivity' | 'createdDate' | 'priority' | 'patientName'>('lastActivity');
  const [selectedChat, setSelectedChat] = useState<ChatSession | null>(null);
  const [replyMessage, setReplyMessage] = useState('');

  // サンプルチャットデータ
  const chatSessions: ChatSession[] = [
    {
      id: 'CS-001',
      patientId: 'P-001',
      patientName: '田中 花子',
      type: 'ai',
      title: '治療後の痛みについて',
      lastMessage: '痛み止めを服用しましたが、まだ少し痛みます。',
      messageCount: 8,
      status: 'pending',
      priority: 'high',
      createdDate: '2024-03-10',
      lastActivity: '2024-03-10 16:30',
      category: 'pain',
      isUnread: true
    },
    {
      id: 'CS-002',
      patientId: 'P-002',
      patientName: '佐藤 次郎',
      type: 'staff',
      title: 'ブラッシング方法の相談',
      lastMessage: 'ありがとうございました。教えていただいた方法で続けてみます。',
      messageCount: 12,
      status: 'resolved',
      priority: 'medium',
      createdDate: '2024-03-08',
      lastActivity: '2024-03-09 10:15',
      assignedStaff: '山田 健太 (歯科衛生士)',
      category: 'treatment',
      isUnread: false
    },
    {
      id: 'CS-003',
      patientId: 'P-003',
      patientName: '山田 美咲',
      type: 'ai',
      title: '次回予約の確認',
      lastMessage: '来週火曜日の予約を変更したいのですが。',
      messageCount: 5,
      status: 'active',
      priority: 'low',
      createdDate: '2024-03-07',
      lastActivity: '2024-03-09 14:20',
      category: 'appointment',
      isUnread: true
    },
    {
      id: 'CS-004',
      patientId: 'P-004',
      patientName: '鈴木 一郎',
      type: 'staff',
      title: '義歯の調整について',
      lastMessage: '義歯が合わないので調整をお願いします。',
      messageCount: 15,
      status: 'escalated',
      priority: 'urgent',
      createdDate: '2024-03-05',
      lastActivity: '2024-03-09 09:45',
      assignedStaff: '田中 智子 (歯科医師)',
      category: 'treatment',
      isUnread: true
    },
    {
      id: 'CS-005',
      patientId: 'P-005',
      patientName: '高橋 恵美',
      type: 'ai',
      title: '治療費について',
      lastMessage: '保険適用の範囲について教えてください。',
      messageCount: 6,
      status: 'resolved',
      priority: 'medium',
      createdDate: '2024-03-04',
      lastActivity: '2024-03-08 11:30',
      category: 'billing',
      isUnread: false
    },
    {
      id: 'CS-006',
      patientId: 'P-001',
      patientName: '田中 花子',
      type: 'staff',
      title: '急な歯の痛み',
      lastMessage: '夜中に急に歯が痛くなりました。',
      messageCount: 3,
      status: 'escalated',
      priority: 'urgent',
      createdDate: '2024-03-09',
      lastActivity: '2024-03-09 23:45',
      assignedStaff: '田中 智子 (歯科医師)',
      category: 'emergency',
      isUnread: true
    }
  ];

  const getStatusBadge = (status: ChatSession['status']) => {
    switch (status) {
      case 'active':
        return <span className="inline-flex px-2 py-1 text-xs font-medium rounded-full bg-blue-100 text-blue-800">対応中</span>;
      case 'resolved':
        return <span className="inline-flex px-2 py-1 text-xs font-medium rounded-full bg-green-100 text-green-800">解決済み</span>;
      case 'pending':
        return <span className="inline-flex px-2 py-1 text-xs font-medium rounded-full bg-yellow-100 text-yellow-800">保留中</span>;
      case 'escalated':
        return <span className="inline-flex px-2 py-1 text-xs font-medium rounded-full bg-red-100 text-red-800">エスカレート</span>;
    }
  };

  const getPriorityBadge = (priority: ChatSession['priority']) => {
    switch (priority) {
      case 'low':
        return <span className="inline-flex px-2 py-1 text-xs font-medium rounded-full bg-gray-100 text-gray-700">低</span>;
      case 'medium':
        return <span className="inline-flex px-2 py-1 text-xs font-medium rounded-full bg-yellow-100 text-yellow-700">中</span>;
      case 'high':
        return <span className="inline-flex px-2 py-1 text-xs font-medium rounded-full bg-orange-100 text-orange-700">高</span>;
      case 'urgent':
        return <span className="inline-flex px-2 py-1 text-xs font-medium rounded-full bg-red-100 text-red-700">緊急</span>;
    }
  };

  const getCategoryLabel = (category: ChatSession['category']) => {
    const labels = {
      general: '一般',
      pain: '痛み',
      appointment: '予約',
      treatment: '治療',
      billing: '料金',
      emergency: '緊急'
    };
    return labels[category];
  };

  const getTypeIcon = (type: ChatSession['type']) => {
    return type === 'ai' ? (
      <Bot className="h-5 w-5 text-green-600" />
    ) : (
      <User className="h-5 w-5 text-blue-600" />
    );
  };

  const filteredAndSortedChats = chatSessions
    .filter(chat => {
      const matchesSearch = chat.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          chat.patientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          chat.lastMessage.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          chat.id.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesType = typeFilter === 'all' || chat.type === typeFilter;
      const matchesStatus = statusFilter === 'all' || chat.status === statusFilter;
      const matchesCategory = categoryFilter === 'all' || chat.category === categoryFilter;
      return matchesSearch && matchesType && matchesStatus && matchesCategory;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case 'lastActivity':
          return new Date(b.lastActivity).getTime() - new Date(a.lastActivity).getTime();
        case 'createdDate':
          return new Date(b.createdDate).getTime() - new Date(a.createdDate).getTime();
        case 'priority':
          const priorityOrder = { urgent: 4, high: 3, medium: 2, low: 1 };
          return priorityOrder[b.priority] - priorityOrder[a.priority];
        case 'patientName':
          return a.patientName.localeCompare(b.patientName, 'ja');
        default:
          return 0;
      }
    });

  const handleSendReply = () => {
    if (!replyMessage.trim() || !selectedChat) return;
    
    // 実際の実装では、ここでメッセージを送信
    console.log('Sending reply:', replyMessage);
    setReplyMessage('');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <StaffHeader />

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 py-8">
        {/* Page Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-800 mb-2">チャット履歴</h1>
              <p className="text-gray-600">患者からの相談とAIの対応履歴を管理できます</p>
            </div>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow border p-6">
            <div className="flex items-center">
              <div className="p-2 bg-blue-100 rounded-lg">
                <MessageCircle className="h-6 w-6 text-blue-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">総チャット数</p>
                <p className="text-2xl font-bold text-gray-900">{chatSessions.length}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow border p-6">
            <div className="flex items-center">
              <div className="p-2 bg-yellow-100 rounded-lg">
                <Clock className="h-6 w-6 text-yellow-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">対応待ち</p>
                <p className="text-2xl font-bold text-gray-900">
                  {chatSessions.filter(c => c.status === 'pending' || c.status === 'active').length}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow border p-6">
            <div className="flex items-center">
              <div className="p-2 bg-red-100 rounded-lg">
                <AlertTriangle className="h-6 w-6 text-red-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">緊急</p>
                <p className="text-2xl font-bold text-gray-900">
                  {chatSessions.filter(c => c.priority === 'urgent').length}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow border p-6">
            <div className="flex items-center">
              <div className="p-2 bg-green-100 rounded-lg">
                <Bot className="h-6 w-6 text-green-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">AI対応</p>
                <p className="text-2xl font-bold text-gray-900">
                  {chatSessions.filter(c => c.type === 'ai').length}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow border p-6">
            <div className="flex items-center">
              <div className="p-2 bg-purple-100 rounded-lg">
                <User className="h-6 w-6 text-purple-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">スタッフ対応</p>
                <p className="text-2xl font-bold text-gray-900">
                  {chatSessions.filter(c => c.type === 'staff').length}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Search and Filter */}
        <div className="bg-white rounded-lg shadow border mb-6">
          <div className="p-4">
            <div className="flex flex-col lg:flex-row gap-4">
              {/* Search */}
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  <input
                    type="text"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                    placeholder="チャット内容、患者名、チャットIDで検索..."
                  />
                </div>
              </div>

              {/* Type Filter */}
              <div className="lg:w-40">
                <div className="relative">
                  <select
                    value={typeFilter}
                    onChange={(e) => setTypeFilter(e.target.value as any)}
                    className="block w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 appearance-none"
                  >
                    <option value="all">全ての種類</option>
                    <option value="ai">AI対応</option>
                    <option value="staff">スタッフ対応</option>
                  </select>
                  <ChevronDown className="absolute right-3 top-3 h-4 w-4 text-gray-400 pointer-events-none" />
                </div>
              </div>

              {/* Status Filter */}
              <div className="lg:w-40">
                <div className="relative">
                  <select
                    value={statusFilter}
                    onChange={(e) => setStatusFilter(e.target.value as any)}
                    className="block w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 appearance-none"
                  >
                    <option value="all">全てのステータス</option>
                    <option value="active">対応中</option>
                    <option value="pending">保留中</option>
                    <option value="escalated">エスカレート</option>
                    <option value="resolved">解決済み</option>
                  </select>
                  <ChevronDown className="absolute right-3 top-3 h-4 w-4 text-gray-400 pointer-events-none" />
                </div>
              </div>

              {/* Category Filter */}
              <div className="lg:w-40">
                <div className="relative">
                  <select
                    value={categoryFilter}
                    onChange={(e) => setCategoryFilter(e.target.value as any)}
                    className="block w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 appearance-none"
                  >
                    <option value="all">全ての分類</option>
                    <option value="emergency">緊急</option>
                    <option value="pain">痛み</option>
                    <option value="treatment">治療</option>
                    <option value="appointment">予約</option>
                    <option value="billing">料金</option>
                    <option value="general">一般</option>
                  </select>
                  <ChevronDown className="absolute right-3 top-3 h-4 w-4 text-gray-400 pointer-events-none" />
                </div>
              </div>

              {/* Sort */}
              <div className="lg:w-40">
                <div className="relative">
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value as any)}
                    className="block w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 appearance-none"
                  >
                    <option value="lastActivity">最新活動順</option>
                    <option value="createdDate">作成日順</option>
                    <option value="priority">優先度順</option>
                    <option value="patientName">患者名順</option>
                  </select>
                  <ChevronDown className="absolute right-3 top-3 h-4 w-4 text-gray-400 pointer-events-none" />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Chat Sessions List */}
        <div className="space-y-4">
          {filteredAndSortedChats.map((chat) => (
            <div
              key={chat.id}
              className={`bg-white rounded-lg shadow border hover:shadow-md transition-shadow cursor-pointer ${
                chat.isUnread ? 'ring-2 ring-blue-200' : ''
              }`}
              onClick={() => setSelectedChat(chat)}
            >
              <div className="p-6">
                {/* Header */}
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-start space-x-4">
                    <div className="p-2 bg-gray-100 rounded-lg">
                      {getTypeIcon(chat.type)}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center space-x-3 mb-2">
                        <h3 className={`font-semibold ${chat.isUnread ? 'text-blue-800' : 'text-gray-800'}`}>
                          {chat.title}
                        </h3>
                        {getStatusBadge(chat.status)}
                        {getPriorityBadge(chat.priority)}
                        <span className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded">
                          {getCategoryLabel(chat.category)}
                        </span>
                      </div>
                      <div className="flex items-center space-x-4 text-sm text-gray-600 mb-2">
                        <span className="flex items-center">
                          <User className="h-4 w-4 mr-1" />
                          {chat.patientName}
                        </span>
                        <span>チャットID: {chat.id}</span>
                        <span>{chat.messageCount}件のメッセージ</span>
                        {chat.assignedStaff && (
                          <span>担当: {chat.assignedStaff}</span>
                        )}
                      </div>
                    </div>
                  </div>
                  {chat.isUnread && (
                    <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                  )}
                </div>

                {/* Last Message */}
                <div className="bg-gray-50 rounded-lg p-3 mb-4">
                  <p className="text-sm text-gray-700 line-clamp-2">{chat.lastMessage}</p>
                </div>

                {/* Footer */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4 text-xs text-gray-500">
                    <span className="flex items-center">
                      <Calendar className="h-3 w-3 mr-1" />
                      作成: {new Date(chat.createdDate).toLocaleDateString('ja-JP')}
                    </span>
                    <span className="flex items-center">
                      <Clock className="h-3 w-3 mr-1" />
                      最終: {new Date(chat.lastActivity).toLocaleString('ja-JP')}
                    </span>
                  </div>
                  <div className="flex space-x-2">
                    <Link
                      href={`/staff/patients/${chat.patientId}`}
                      className="flex items-center space-x-1 text-blue-600 text-sm font-medium hover:text-blue-700"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <User className="h-4 w-4" />
                      <span>患者詳細</span>
                    </Link>
                    <button className="flex items-center space-x-1 text-green-600 text-sm font-medium hover:text-green-700">
                      <Reply className="h-4 w-4" />
                      <span>返信</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredAndSortedChats.length === 0 && (
          <div className="text-center py-12">
            <MessageCircle className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-600 mb-4">検索条件に一致するチャットが見つかりませんでした</p>
            <button
              onClick={() => {
                setSearchTerm('');
                setTypeFilter('all');
                setStatusFilter('all');
                setCategoryFilter('all');
              }}
              className="text-blue-600 text-sm font-medium hover:text-blue-700"
            >
              フィルターをリセット
            </button>
          </div>
        )}
      </main>

      {/* Chat Detail Modal */}
      {selectedChat && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg shadow-xl max-w-4xl w-full max-h-[80vh] overflow-y-auto">
            <div className="px-6 py-4 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-semibold text-gray-800">{selectedChat.title}</h3>
                  <div className="flex items-center space-x-3 mt-1">
                    <span className="text-sm text-gray-600">{selectedChat.patientName}</span>
                    {getStatusBadge(selectedChat.status)}
                    {getPriorityBadge(selectedChat.priority)}
                    <span className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded">
                      {getCategoryLabel(selectedChat.category)}
                    </span>
                  </div>
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
              <div className="bg-gray-50 rounded-lg p-4 mb-4">
                <p className="text-sm text-gray-700">{selectedChat.lastMessage}</p>
                <p className="text-xs text-gray-500 mt-2">
                  最終活動: {new Date(selectedChat.lastActivity).toLocaleString('ja-JP')}
                </p>
              </div>

              {selectedChat.type === 'staff' && (
                <div className="border-t border-gray-200 pt-4">
                  <h4 className="font-medium text-gray-800 mb-3">返信を送信</h4>
                  <div className="flex space-x-2">
                    <input
                      type="text"
                      value={replyMessage}
                      onChange={(e) => setReplyMessage(e.target.value)}
                      onKeyPress={(e) => e.key === 'Enter' && handleSendReply()}
                      className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                      placeholder="患者に返信メッセージを入力..."
                    />
                    <button
                      onClick={handleSendReply}
                      className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                    >
                      <Send className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              )}

              <div className="text-center mt-6">
                <p className="text-sm text-gray-600 mb-4">
                  詳細なチャット履歴を表示するには、以下のボタンをクリックしてください
                </p>
                <button
                  onClick={() => setSelectedChat(null)}
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