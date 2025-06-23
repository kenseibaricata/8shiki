'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { 
  ArrowLeft, 
  Calendar, 
  Plus, 
  Save,
  Search,
  User,
  CheckCircle,
  AlertCircle,
  Clock,
  X,
  Edit3
} from 'lucide-react';

interface Patient {
  id: string;
  name: string;
  age: number;
  phone: string;
}

interface TreatmentItem {
  id: string;
  title: string;
  description: string;
  duration: number;
  category: string;
  checked: boolean;
  order: number;
}

export default function NewTreatmentPlanPage() {
  const [selectedPatient, setSelectedPatient] = useState<Patient | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [treatmentItems, setTreatmentItems] = useState<TreatmentItem[]>([
    {
      id: 'exam',
      title: '初診・検査',
      description: 'レントゲン撮影、口腔内検査、治療計画の説明',
      duration: 60,
      category: '検査',
      checked: false,
      order: 1
    },
    {
      id: 'cleaning',
      title: '歯石除去・クリーニング',
      description: '歯石除去、歯面清掃、ブラッシング指導',
      duration: 45,
      category: '予防',
      checked: false,
      order: 2
    },
    {
      id: 'filling1',
      title: '虫歯治療（小さい虫歯）',
      description: 'コンポジットレジン充填',
      duration: 30,
      category: '治療',
      checked: false,
      order: 3
    },
    {
      id: 'filling2',
      title: '虫歯治療（大きい虫歯）',
      description: 'インレー・アンレー治療',
      duration: 60,
      category: '治療',
      checked: false,
      order: 4
    },
    {
      id: 'crown',
      title: 'クラウン治療',
      description: '被せ物の作製・装着',
      duration: 90,
      category: '治療',
      checked: false,
      order: 5
    },
    {
      id: 'extraction',
      title: '抜歯',
      description: '親知らずや保存不可能歯の抜歯',
      duration: 30,
      category: '外科',
      checked: false,
      order: 6
    },
    {
      id: 'denture',
      title: '義歯作製',
      description: '部分義歯・総義歯の作製',
      duration: 120,
      category: '補綴',
      checked: false,
      order: 7
    },
    {
      id: 'maintenance',
      title: 'メンテナンス指導',
      description: 'ホームケア指導、定期検診の説明',
      duration: 30,
      category: '予防',
      checked: false,
      order: 8
    }
  ]);

  const [startDate, setStartDate] = useState('');
  const [notes, setNotes] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  // サンプル患者データ
  const patients: Patient[] = [
    { id: '12345', name: '田中 花子', age: 35, phone: '092-123-4567' },
    { id: '23456', name: '山田 太郎', age: 42, phone: '092-234-5678' },
    { id: '34567', name: '佐藤 美咲', age: 28, phone: '092-345-6789' },
    { id: '45678', name: '高橋 健一', age: 55, phone: '092-456-7890' },
    { id: '56789', name: '伊藤 智子', age: 31, phone: '092-567-8901' }
  ];

  const filteredPatients = patients.filter(patient =>
    patient.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    patient.id.includes(searchTerm)
  );

  const handleTreatmentItemToggle = (id: string) => {
    setTreatmentItems(prev => 
      prev.map(item => 
        item.id === id ? { ...item, checked: !item.checked } : item
      )
    );
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedPatient) return;

    setIsSubmitting(true);
    
    // デモ用の送信処理
    setTimeout(() => {
      setIsSubmitting(false);
      alert('診療計画が正常に作成されました');
    }, 2000);
  };

  const selectedTreatments = treatmentItems.filter(item => item.checked);
  const totalDuration = selectedTreatments.reduce((sum, item) => sum + item.duration, 0);
  const estimatedSessions = Math.ceil(totalDuration / 60); // 1セッション60分と仮定

  const getCategoryColor = (category: string) => {
    const colors: { [key: string]: string } = {
      '検査': 'bg-blue-100 text-blue-800',
      '予防': 'bg-green-100 text-green-800',
      '治療': 'bg-orange-100 text-orange-800',
      '外科': 'bg-red-100 text-red-800',
      '補綴': 'bg-purple-100 text-purple-800'
    };
    return colors[category] || 'bg-gray-100 text-gray-800';
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
              <Calendar className="h-5 w-5 text-green-600" />
              <span className="text-sm font-medium text-gray-700">診療計画作成</span>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-6xl mx-auto px-4 py-8">
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* 患者選択 */}
          <div className="bg-white rounded-lg shadow border">
            <div className="px-6 py-4 border-b border-gray-200">
              <h2 className="text-lg font-semibold text-gray-800">1. 患者選択</h2>
              <p className="text-sm text-gray-600 mt-1">診療計画を作成する患者を選択してください</p>
            </div>
            
            <div className="p-6">
              {!selectedPatient ? (
                <>
                  <div className="mb-4">
                    <div className="relative">
                      <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                      <input
                        type="text"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-green-500 focus:border-green-500"
                        placeholder="患者名または患者IDで検索..."
                      />
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {filteredPatients.map((patient) => (
                      <div
                        key={patient.id}
                        onClick={() => setSelectedPatient(patient)}
                        className="p-4 border border-gray-200 rounded-lg hover:border-green-500 hover:bg-green-50 cursor-pointer transition-colors"
                      >
                        <div className="flex items-center space-x-3">
                          <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                            <User className="h-5 w-5 text-green-600" />
                          </div>
                          <div>
                            <h3 className="font-medium text-gray-800">{patient.name}</h3>
                            <p className="text-sm text-gray-500">ID: {patient.id}</p>
                            <p className="text-sm text-gray-500">{patient.age}歳</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </>
              ) : (
                <div className="flex items-center justify-between p-4 bg-green-50 border border-green-200 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                      <User className="h-5 w-5 text-green-600" />
                    </div>
                    <div>
                      <h3 className="font-medium text-gray-800">{selectedPatient.name}</h3>
                      <p className="text-sm text-gray-600">ID: {selectedPatient.id} | {selectedPatient.age}歳</p>
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={() => setSelectedPatient(null)}
                    className="p-2 text-gray-400 hover:text-gray-600 transition-colors"
                  >
                    <X className="h-5 w-5" />
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* 治療項目選択 */}
          {selectedPatient && (
            <div className="bg-white rounded-lg shadow border">
              <div className="px-6 py-4 border-b border-gray-200">
                <h2 className="text-lg font-semibold text-gray-800">2. 治療項目選択</h2>
                <p className="text-sm text-gray-600 mt-1">必要な治療項目をチェックしてください</p>
              </div>
              
              <div className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {treatmentItems.map((item) => (
                    <div
                      key={item.id}
                      className={`p-4 border rounded-lg transition-colors ${
                        item.checked 
                          ? 'border-green-500 bg-green-50' 
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      <label className="flex items-start space-x-3 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={item.checked}
                          onChange={() => handleTreatmentItemToggle(item.id)}
                          className="mt-1 rounded border-gray-300 text-green-600 focus:ring-green-500"
                        />
                        <div className="flex-1">
                          <div className="flex items-center justify-between mb-2">
                            <h3 className="font-medium text-gray-800">{item.title}</h3>
                            <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${getCategoryColor(item.category)}`}>
                              {item.category}
                            </span>
                          </div>
                          <p className="text-sm text-gray-600 mb-2">{item.description}</p>
                          <div className="flex items-center space-x-2 text-xs text-gray-500">
                            <Clock className="h-3 w-3" />
                            <span>{item.duration}分</span>
                          </div>
                        </div>
                      </label>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* 治療計画詳細 */}
          {selectedPatient && selectedTreatments.length > 0 && (
            <div className="bg-white rounded-lg shadow border">
              <div className="px-6 py-4 border-b border-gray-200">
                <h2 className="text-lg font-semibold text-gray-800">3. 治療計画詳細</h2>
                <p className="text-sm text-gray-600 mt-1">開始日と備考を入力してください</p>
              </div>
              
              <div className="p-6 space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      治療開始予定日 *
                    </label>
                    <input
                      type="date"
                      value={startDate}
                      onChange={(e) => setStartDate(e.target.value)}
                      className="block w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-green-500 focus:border-green-500"
                      required
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      推定治療期間
                    </label>
                    <div className="flex items-center space-x-2 p-3 bg-gray-50 rounded-lg">
                      <Clock className="h-4 w-4 text-gray-500" />
                      <span className="text-sm text-gray-700">
                        約{estimatedSessions}回（{totalDuration}分）
                      </span>
                    </div>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    備考・特記事項
                  </label>
                  <textarea
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    rows={4}
                    className="block w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-green-500 focus:border-green-500"
                    placeholder="治療に関する注意事項や患者への伝達事項などを記入..."
                  />
                </div>

                {/* 選択された治療項目の確認 */}
                <div className="border-t border-gray-200 pt-6">
                  <h3 className="text-md font-medium text-gray-800 mb-4">選択された治療項目</h3>
                  <div className="space-y-3">
                    {selectedTreatments.map((item, index) => (
                      <div key={item.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                        <div className="flex items-center space-x-3">
                          <span className="flex items-center justify-center w-6 h-6 bg-green-600 text-white rounded-full text-xs font-medium">
                            {index + 1}
                          </span>
                          <div>
                            <h4 className="font-medium text-gray-800">{item.title}</h4>
                            <p className="text-sm text-gray-600">{item.description}</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${getCategoryColor(item.category)}`}>
                            {item.category}
                          </span>
                          <p className="text-xs text-gray-500 mt-1">{item.duration}分</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* 送信ボタン */}
          {selectedPatient && selectedTreatments.length > 0 && (
            <div className="flex justify-end space-x-4">
              <Link href="/staff-dashboard" className="px-6 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors">
                キャンセル
              </Link>
              <button
                type="submit"
                disabled={isSubmitting || !startDate}
                className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors flex items-center space-x-2"
              >
                {isSubmitting ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    <span>作成中...</span>
                  </>
                ) : (
                  <>
                    <Save className="h-4 w-4" />
                    <span>診療計画を作成</span>
                  </>
                )}
              </button>
            </div>
          )}
        </form>

        {/* Demo Info */}
        <div className="mt-6 p-4 bg-yellow-50 rounded-lg border border-yellow-200">
          <p className="text-sm text-yellow-800 text-center">
            <strong>🎨 デモ用:</strong> 患者を選択→治療項目をチェック→開始日を入力→診療計画を作成
          </p>
        </div>
      </main>
    </div>
  );
} 