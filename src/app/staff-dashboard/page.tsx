'use client';

import React from 'react';
import Link from 'next/link';
import { 
  Users, 
  Calendar, 
  MessageCircle, 
  Key,
  TrendingUp,
  UserPlus,
  BookOpen
} from 'lucide-react';
import StaffHeader from '../components/StaffHeader';

export default function StaffDashboardPage() {

  // サンプルデータ
  const recentPatients = [
    { id: '12345', name: '田中 花子', lastVisit: '2024-06-15', status: 'active', passcode: '123456' },
    { id: '23456', name: '山田 太郎', lastVisit: '2024-06-14', status: 'pending', passcode: '234567' },
    { id: '34567', name: '佐藤 美咲', lastVisit: '2024-06-13', status: 'completed', passcode: '345678' },
    { id: '45678', name: '高橋 健一', lastVisit: '2024-06-12', status: 'active', passcode: '456789' }
  ];

  const recentChats = [
    { patientId: '12345', patientName: '田中 花子', lastMessage: '奥歯の痛みについて相談', time: '10分前', unread: 2 },
    { patientId: '23456', patientName: '山田 太郎', lastMessage: '次回の治療について', time: '1時間前', unread: 0 },
    { patientId: '34567', patientName: '佐藤 美咲', lastMessage: 'ブラッシング方法の質問', time: '3時間前', unread: 1 }
  ];

  const renderOverview = () => (
    <div className="space-y-6">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white rounded-lg p-6 shadow border border-blue-100">
          <div className="flex items-center">
            <div className="p-2 bg-blue-100 rounded-lg">
              <Users className="h-6 w-6 text-blue-600" />
            </div>
            <div className="ml-4">
              <p className="text-2xl font-bold text-gray-800">127</p>
              <p className="text-sm text-gray-600">登録患者数</p>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-lg p-6 shadow border border-green-100">
          <div className="flex items-center">
            <div className="p-2 bg-green-100 rounded-lg">
              <Calendar className="h-6 w-6 text-green-600" />
            </div>
            <div className="ml-4">
              <p className="text-2xl font-bold text-gray-800">23</p>
              <p className="text-sm text-gray-600">今日の診療計画</p>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-lg p-6 shadow border border-orange-100">
          <div className="flex items-center">
            <div className="p-2 bg-orange-100 rounded-lg">
              <MessageCircle className="h-6 w-6 text-orange-600" />
            </div>
            <div className="ml-4">
              <p className="text-2xl font-bold text-gray-800">8</p>
              <p className="text-sm text-gray-600">未読チャット</p>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-lg p-6 shadow border border-purple-100">
          <div className="flex items-center">
            <div className="p-2 bg-purple-100 rounded-lg">
              <TrendingUp className="h-6 w-6 text-purple-600" />
            </div>
            <div className="ml-4">
              <p className="text-2xl font-bold text-gray-800">95%</p>
              <p className="text-sm text-gray-600">満足度</p>
            </div>
          </div>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Patients */}
        <div className="bg-white rounded-lg shadow border">
          <div className="px-6 py-4 border-b border-gray-200 flex justify-between items-center">
            <h3 className="text-lg font-semibold text-gray-800">最近の患者</h3>
            <Link href="/staff/patients" className="text-blue-600 hover:text-blue-700 text-sm font-medium">
              すべて見る
            </Link>
          </div>
          <div className="p-6">
            <div className="space-y-4">
              {recentPatients.map((patient) => (
                <div key={patient.id} className="flex items-center justify-between">
                  <Link href={`/staff/patients/${patient.id}`} className="flex items-center hover:bg-gray-50 p-2 rounded transition-colors flex-1">
                    <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center">
                      <span className="text-sm font-medium text-gray-600">
                        {patient.name.charAt(0)}
                      </span>
                    </div>
                    <div className="ml-3">
                      <p className="text-sm font-medium text-gray-800">{patient.name}</p>
                      <p className="text-xs text-gray-500">ID: {patient.id}</p>
                    </div>
                  </Link>
                  <div className="text-right">
                    <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${
                      patient.status === 'active' ? 'bg-green-100 text-green-800' :
                      patient.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                      'bg-gray-100 text-gray-800'
                    }`}>
                      {patient.status === 'active' ? '治療中' :
                       patient.status === 'pending' ? '待機中' : '完了'}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Recent Chats */}
        <div className="bg-white rounded-lg shadow border">
          <div className="px-6 py-4 border-b border-gray-200 flex justify-between items-center">
            <h3 className="text-lg font-semibold text-gray-800">最近のチャット</h3>
            <Link href="/staff/chats" className="text-blue-600 hover:text-blue-700 text-sm font-medium">
              すべて見る
            </Link>
          </div>
          <div className="p-6">
            <div className="space-y-4">
              {recentChats.map((chat) => (
                <div key={chat.patientId} className="flex items-center justify-between">
                  <div className="flex items-center flex-1">
                    <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center">
                      <MessageCircle className="h-5 w-5 text-gray-600" />
                    </div>
                    <div className="ml-3 flex-1">
                      <p className="text-sm font-medium text-gray-800">{chat.patientName}</p>
                      <p className="text-xs text-gray-500 truncate">{chat.lastMessage}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-xs text-gray-500">{chat.time}</p>
                    {chat.unread > 0 && (
                      <span className="inline-flex items-center justify-center w-5 h-5 text-xs font-medium text-white bg-red-500 rounded-full">
                        {chat.unread}
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      <StaffHeader />

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 py-8">
        {/* Quick Actions */}
        <div className="mb-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Link href="/staff/patients/new" className="bg-blue-600 hover:bg-blue-700 text-white rounded-lg p-4 flex items-center space-x-3 transition-colors">
              <UserPlus className="h-6 w-6" />
              <span className="font-medium">新規患者登録</span>
            </Link>
            <Link href="/staff/treatment-plans/new" className="bg-green-600 hover:bg-green-700 text-white rounded-lg p-4 flex items-center space-x-3 transition-colors">
              <Calendar className="h-6 w-6" />
              <span className="font-medium">診療計画作成</span>
            </Link>
            <Link href="/staff/passcodes" className="bg-purple-600 hover:bg-purple-700 text-white rounded-lg p-4 flex items-center space-x-3 transition-colors">
              <Key className="h-6 w-6" />
              <span className="font-medium">パスコード確認</span>
            </Link>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
            <Link href="/staff/insurance-tips" className="bg-yellow-600 hover:bg-yellow-700 text-white rounded-lg p-4 flex items-center space-x-3 transition-colors">
              <BookOpen className="h-6 w-6" />
              <span className="font-medium">保険点数支援</span>
            </Link>
          </div>
        </div>

        {/* Content Area */}
        {renderOverview()}

        {/* Demo Navigation */}
        <div className="mt-12 p-6 bg-yellow-50 rounded-lg border border-yellow-200">
          <h3 className="text-lg font-semibold text-gray-800 mb-4 text-center">🎨 デザインプロトタイプ - 全画面確認</h3>
          <div className="grid grid-cols-2 md:grid-cols-6 gap-3 text-sm">
            <Link href="/staff/patients" className="p-2 bg-white rounded border hover:bg-gray-50 text-center">患者管理</Link>
            <Link href="/staff/treatment-plans" className="p-2 bg-white rounded border hover:bg-gray-50 text-center">診療計画</Link>
            <Link href="/staff/chats" className="p-2 bg-white rounded border hover:bg-gray-50 text-center">チャット履歴</Link>
            <Link href="/staff/management" className="p-2 bg-white rounded border hover:bg-gray-50 text-center">スタッフ管理</Link>
            <Link href="/patient-dashboard" className="p-2 bg-white rounded border hover:bg-gray-50 text-center">患者画面</Link>
            <Link href="/" className="p-2 bg-white rounded border hover:bg-gray-50 text-center">ホーム</Link>
          </div>
        </div>
      </main>
    </div>
  );
} 