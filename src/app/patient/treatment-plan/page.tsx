'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import PatientHeader from '../../components/PatientHeader';
import { 
  ArrowLeft, 
  Calendar, 
  CheckCircle, 
  Clock, 
  AlertCircle,
  User,
  FileText,
  Stethoscope,
  MapPin,
  Phone
} from 'lucide-react';

interface TreatmentItem {
  id: number;
  title: string;
  description: string;
  status: 'completed' | 'current' | 'pending';
  date: string;
  duration: string;
  notes?: string;
}

export default function TreatmentPlanPage() {
  const [activeTab, setActiveTab] = useState('timeline');

  const patientInfo = {
    name: '田中 花子',
    patientId: '12345',
    startDate: '2024-06-01',
    expectedCompletion: '2024-07-15'
  };

  const treatmentPlan: TreatmentItem[] = [
    {
      id: 1,
      title: '初診・検査',
      description: 'レントゲン撮影、口腔内検査、治療計画の説明',
      status: 'completed',
      date: '2024-06-01',
      duration: '60分',
      notes: '虫歯3本、歯石除去が必要と診断'
    },
    {
      id: 2,
      title: '歯石除去・クリーニング',
      description: '歯石除去、歯面清掃、ブラッシング指導',
      status: 'completed',
      date: '2024-06-08',
      duration: '45分',
      notes: '歯ぐきの炎症も改善傾向'
    },
    {
      id: 3,
      title: '虫歯治療（左下奥歯）',
      description: '左下6番の虫歯除去と充填処置',
      status: 'completed',
      date: '2024-06-15',
      duration: '30分',
      notes: 'コンポジットレジン充填完了'
    },
    {
      id: 4,
      title: '虫歯治療（右上奥歯）',
      description: '右上7番の虫歯除去と充填処置',
      status: 'current',
      date: '2024-06-20',
      duration: '30分',
      notes: '次回のご予約です'
    },
    {
      id: 5,
      title: '最終検査・調整',
      description: '治療部位の確認、咬み合わせの調整',
      status: 'pending',
      date: '2024-06-27',
      duration: '30分'
    },
    {
      id: 6,
      title: 'メンテナンス指導',
      description: 'ホームケア指導、定期検診の説明',
      status: 'pending',
      date: '2024-07-05',
      duration: '30分'
    }
  ];

  const getStatusIcon = (status: TreatmentItem['status']) => {
    switch (status) {
      case 'completed':
        return <CheckCircle className="h-5 w-5 text-green-600" />;
      case 'current':
        return <Clock className="h-5 w-5 text-blue-600" />;
      case 'pending':
        return <AlertCircle className="h-5 w-5 text-gray-400" />;
    }
  };

  const getStatusText = (status: TreatmentItem['status']) => {
    switch (status) {
      case 'completed':
        return '完了';
      case 'current':
        return '次回予定';
      case 'pending':
        return '予定';
    }
  };

  const getStatusBadgeClass = (status: TreatmentItem['status']) => {
    switch (status) {
      case 'completed':
        return 'bg-green-100 text-green-800';
      case 'current':
        return 'bg-blue-100 text-blue-800';
      case 'pending':
        return 'bg-gray-100 text-gray-600';
    }
  };

  const completedItems = treatmentPlan.filter(item => item.status === 'completed').length;
  const totalItems = treatmentPlan.length;
  const progressPercentage = Math.round((completedItems / totalItems) * 100);

  const nextAppointment = treatmentPlan.find(item => item.status === 'current');

  const renderTimeline = () => (
    <div className="space-y-6">
      {/* Progress Overview */}
      <div className="bg-gradient-to-r from-blue-500 to-teal-600 rounded-lg p-6 text-white">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="text-xl font-bold">治療進捗</h3>
            <p className="text-blue-100">全{totalItems}回の治療のうち{completedItems}回完了</p>
          </div>
          <div className="text-right">
            <div className="text-3xl font-bold">{progressPercentage}%</div>
            <div className="text-blue-100">完了</div>
          </div>
        </div>
        <div className="w-full bg-blue-300 rounded-full h-2">
          <div 
            className="bg-white h-2 rounded-full transition-all duration-300"
            style={{ width: `${progressPercentage}%` }}
          ></div>
        </div>
      </div>

      {/* Next Appointment */}
      {nextAppointment && (
        <div className="bg-white rounded-lg shadow border border-blue-200 p-6">
          <div className="flex items-center mb-4">
            <div className="p-2 bg-blue-100 rounded-lg mr-3">
              <Calendar className="h-6 w-6 text-blue-600" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-800">次回のご予約</h3>
              <p className="text-sm text-gray-600">お忘れのないようお気をつけください</p>
            </div>
          </div>
          
          <div className="bg-blue-50 rounded-lg p-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <div className="flex items-center mb-2">
                  <Calendar className="h-4 w-4 text-blue-600 mr-2" />
                  <span className="text-sm font-medium text-gray-700">日時</span>
                </div>
                <p className="text-gray-800 font-semibold">
                  {new Date(nextAppointment.date).toLocaleDateString('ja-JP', { 
                    year: 'numeric', 
                    month: 'long', 
                    day: 'numeric',
                    weekday: 'short'
                  })} 14:00〜
                </p>
              </div>
              <div>
                <div className="flex items-center mb-2">
                  <Clock className="h-4 w-4 text-blue-600 mr-2" />
                  <span className="text-sm font-medium text-gray-700">所要時間</span>
                </div>
                <p className="text-gray-800">{nextAppointment.duration}</p>
              </div>
            </div>
            <div className="mt-4">
                             <div className="flex items-center mb-2">
                 <Stethoscope className="h-4 w-4 text-blue-600 mr-2" />
                 <span className="text-sm font-medium text-gray-700">治療内容</span>
               </div>
              <p className="text-gray-800">{nextAppointment.title}</p>
              <p className="text-sm text-gray-600 mt-1">{nextAppointment.description}</p>
            </div>
          </div>
        </div>
      )}

      {/* Treatment Timeline */}
      <div className="bg-white rounded-lg shadow border">
        <div className="px-6 py-4 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-800">治療スケジュール</h3>
        </div>
        <div className="p-6">
          <div className="space-y-6">
            {treatmentPlan.map((item, index) => (
              <div key={item.id} className="flex items-start space-x-4">
                <div className="flex flex-col items-center">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                    item.status === 'completed' ? 'bg-green-100' :
                    item.status === 'current' ? 'bg-blue-100' : 'bg-gray-100'
                  }`}>
                    {getStatusIcon(item.status)}
                  </div>
                  {index < treatmentPlan.length - 1 && (
                    <div className={`w-0.5 h-12 mt-2 ${
                      index < completedItems ? 'bg-green-300' : 'bg-gray-200'
                    }`}></div>
                  )}
                </div>
                
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="text-base font-medium text-gray-800">{item.title}</h4>
                    <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${getStatusBadgeClass(item.status)}`}>
                      {getStatusText(item.status)}
                    </span>
                  </div>
                  <p className="text-sm text-gray-600 mb-2">{item.description}</p>
                  <div className="flex items-center space-x-4 text-xs text-gray-500">
                    <span>📅 {new Date(item.date).toLocaleDateString()}</span>
                    <span>⏱️ {item.duration}</span>
                  </div>
                  {item.notes && (
                    <div className="mt-2 p-2 bg-gray-50 rounded text-xs text-gray-600">
                      📝 {item.notes}
                    </div>
                  )}
                </div>
              </div>
            ))}
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
        {renderTimeline()}

        {/* Contact Information */}
        <div className="mt-8 bg-green-50 rounded-lg p-6 border border-green-200">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">ご予約・お問い合わせ</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex items-center space-x-3">
              <Phone className="h-5 w-5 text-green-600" />
              <div>
                <p className="font-medium text-gray-800">電話でのご予約</p>
                <p className="text-sm text-gray-600">092-XXX-XXXX（受付時間：9:00-18:00）</p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <MapPin className="h-5 w-5 text-green-600" />
              <div>
                <p className="font-medium text-gray-800">はち歯科（大野城店）</p>
                <p className="text-sm text-gray-600">福岡県大野城市○○○○</p>
              </div>
            </div>
          </div>
        </div>

        {/* Demo Navigation */}
        <div className="mt-8 p-6 bg-yellow-50 rounded-lg border border-yellow-200">
          <h3 className="text-lg font-semibold text-gray-800 mb-4 text-center">🎨 デザインプロトタイプ - 全画面確認</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-sm">
            <Link href="/patient/chat" className="p-2 bg-white rounded border hover:bg-gray-50 text-center">AI相談</Link>
            <Link href="/patient/chat-history" className="p-2 bg-white rounded border hover:bg-gray-50 text-center">相談履歴</Link>
            <Link href="/patient/profile" className="p-2 bg-white rounded border hover:bg-gray-50 text-center">プロフィール</Link>
            <Link href="/patient-dashboard" className="p-2 bg-white rounded border hover:bg-gray-50 text-center">ダッシュボード</Link>
          </div>
        </div>
      </main>
    </div>
  );
} 