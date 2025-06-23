'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import PatientHeader from '../components/PatientHeader';
import { 
  Calendar, 
  MessageCircle, 
  User, 
  Clock, 
  ArrowRight,
  LogOut,
  Bell,
  Heart,
  Smartphone,
  MapPin
} from 'lucide-react';

export default function PatientDashboardPage() {
  const [activeTab, setActiveTab] = useState('overview');

  // サンプル患者データ
  const patientInfo = {
    name: '田中 花子',
    patientId: '12345',
    birthDate: '1985-04-15',
    nextAppointment: '2024-06-20 14:00',
    currentPasscode: '123456',
    passcodeExpiry: '14:30'
  };

  const treatmentPlan = {
    currentPhase: '虫歯治療',
    progress: 60,
    nextTreatment: '右上奥歯の充填'
  };

  const recentChats = [
    { id: 1, message: '奥歯の痛みについて', response: 'お痛みの具合はいかがですか？', time: '10分前' },
    { id: 2, message: 'ブラッシング方法について', response: '正しいブラッシング方法をご説明します...', time: '1時間前' },
    { id: 3, message: '次回の治療内容', response: '次回は右上の奥歯の治療を行います...', time: '昨日' }
  ];

  const renderOverview = () => (
    <div className="space-y-6">
      {/* Welcome Card */}
      <div className="bg-gradient-to-r from-green-500 to-teal-600 rounded-lg p-6 text-white">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold mb-2">こんにちは、{patientInfo.name}さん</h2>
            <p className="text-green-100">患者ID: {patientInfo.patientId}</p>
          </div>
                      <div className="text-6xl opacity-20">
              <Calendar className="h-16 w-16 text-green-200" />
            </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Link href="/patient/treatment-plan" className="bg-white rounded-lg p-6 shadow border hover:shadow-md transition-shadow">
          <div className="flex items-center">
            <div className="p-3 bg-blue-100 rounded-lg">
              <Calendar className="h-6 w-6 text-blue-600" />
            </div>
            <div className="ml-4">
              <h3 className="font-semibold text-gray-800">診療計画</h3>
              <p className="text-sm text-gray-600">次回: {new Date(patientInfo.nextAppointment).toLocaleDateString()}</p>
            </div>
          </div>
        </Link>

        <Link href="/patient/chat" className="bg-white rounded-lg p-6 shadow border hover:shadow-md transition-shadow">
          <div className="flex items-center">
            <div className="p-3 bg-green-100 rounded-lg">
              <MessageCircle className="h-6 w-6 text-green-600" />
            </div>
            <div className="ml-4">
              <h3 className="font-semibold text-gray-800">AI相談</h3>
              <p className="text-sm text-gray-600">24時間いつでも相談</p>
            </div>
          </div>
        </Link>

        <Link href="/club" className="bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg p-6 shadow border hover:shadow-md transition-shadow text-white">
          <div className="flex items-center">
            <div className="p-3 bg-white bg-opacity-20 rounded-lg">
              <Heart className="h-6 w-6 text-white" />
            </div>
            <div className="ml-4">
              <h3 className="font-semibold text-white">歯知クラブ</h3>
              <p className="text-sm text-purple-100">メンバーシップ特典</p>
            </div>
          </div>
        </Link>
      </div>

      {/* Treatment Progress */}
      <div className="bg-white rounded-lg shadow border">
        <div className="px-6 py-4 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold text-gray-800">治療の進捗</h3>
            <Link href="/patient/treatment-plan" className="text-blue-600 hover:text-blue-700 text-sm font-medium flex items-center">
              詳細を見る
              <ArrowRight className="h-4 w-4 ml-1" />
            </Link>
          </div>
        </div>
        <div className="p-6">
          <div className="mb-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-gray-700">{treatmentPlan.currentPhase}</span>
              <span className="text-sm text-gray-500">{treatmentPlan.progress}%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div 
                className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                style={{ width: `${treatmentPlan.progress}%` }}
              ></div>
            </div>
          </div>
          
          <div className="bg-blue-50 rounded-lg p-4">
            <div className="flex items-center">
              <Clock className="h-5 w-5 text-blue-600 mr-2" />
              <div>
                <p className="text-sm font-medium text-gray-800">次回の治療</p>
                <p className="text-sm text-gray-600">{treatmentPlan.nextTreatment}</p>
                <p className="text-xs text-gray-500 mt-1">
                  予定日: {new Date(patientInfo.nextAppointment).toLocaleDateString()} {new Date(patientInfo.nextAppointment).toLocaleTimeString()}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Recent Chats */}
      <div className="bg-white rounded-lg shadow border">
        <div className="px-6 py-4 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold text-gray-800">最近の相談</h3>
            <Link href="/patient/chat-history" className="text-blue-600 hover:text-blue-700 text-sm font-medium flex items-center">
              すべて見る
              <ArrowRight className="h-4 w-4 ml-1" />
            </Link>
          </div>
        </div>
        <div className="p-6">
          <div className="space-y-4">
            {recentChats.slice(0, 3).map((chat) => (
              <div key={chat.id} className="border border-gray-100 rounded-lg p-4">
                <div className="flex items-start space-x-3">
                  <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                    <MessageCircle className="h-4 w-4 text-green-600" />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium text-gray-800">{chat.message}</p>
                    <p className="text-sm text-gray-600 mt-1">{chat.response.substring(0, 50)}...</p>
                    <p className="text-xs text-gray-500 mt-2">{chat.time}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-4 text-center">
            <Link href="/patient/chat" className="inline-flex items-center px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors">
              <MessageCircle className="h-4 w-4 mr-2" />
              新しい相談をする
            </Link>
          </div>
        </div>
      </div>

      {/* Health Tips */}
      <div className="bg-white rounded-lg shadow border">
        <div className="px-6 py-4 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-800">今日の歯科ケアのヒント</h3>
        </div>
        <div className="p-6">
          <div className="flex items-start space-x-3">
            <div className="p-2 bg-yellow-100 rounded-lg">
              <Heart className="h-5 w-5 text-yellow-600" />
            </div>
            <div>
              <h4 className="font-medium text-gray-800">正しいブラッシング方法</h4>
              <p className="text-sm text-gray-600 mt-1">
                歯ブラシは45度の角度で歯茎に当て、小刻みに動かしましょう。
                1本1本丁寧に、最低2分間のブラッシングを心がけてください。
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      <PatientHeader />

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-4 py-8">
        {renderOverview()}

        {/* Demo Navigation */}
        <div className="mt-12 p-6 bg-yellow-50 rounded-lg border border-yellow-200">
          <h3 className="text-lg font-semibold text-gray-800 mb-4 text-center">🎨 デザインプロトタイプ - 全画面確認</h3>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-3 text-sm">
            <Link href="/patient/treatment-plan" className="p-2 bg-white rounded border hover:bg-gray-50 text-center">診療計画</Link>
            <Link href="/patient/chat" className="p-2 bg-white rounded border hover:bg-gray-50 text-center">AI相談</Link>
            <Link href="/patient/chat-history" className="p-2 bg-white rounded border hover:bg-gray-50 text-center">相談履歴</Link>
            <Link href="/patient/profile" className="p-2 bg-white rounded border hover:bg-gray-50 text-center">プロフィール</Link>
            <Link href="/" className="p-2 bg-white rounded border hover:bg-gray-50 text-center">ホーム</Link>
          </div>
        </div>
      </main>

      {/* Contact Info */}
      <div className="bg-green-600 text-white py-4">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <p className="text-sm">
            <MapPin className="inline h-4 w-4 mr-1" />
            はち歯科（大野城店） | 
            <Smartphone className="inline h-4 w-4 ml-2 mr-1" />
            092-XXX-XXXX | 
            緊急時は24時間対応
          </p>
        </div>
      </div>
    </div>
  );
} 