'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { 
  ArrowLeft, 
  Key, 
  Search, 
  RefreshCw, 
  Copy,
  Clock,
  User,
  CheckCircle,
  AlertCircle,
  Eye,
  EyeOff
} from 'lucide-react';

interface PatientPasscode {
  patientId: string;
  patientName: string;
  currentPasscode: string;
  expiryTime: string;
  lastUpdated: string;
  status: 'active' | 'expiring' | 'expired';
}

export default function PasscodesPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [showPasscodes, setShowPasscodes] = useState(false);
  const [copiedPasscode, setCopiedPasscode] = useState('');

  // サンプルデータ
  const patientPasscodes: PatientPasscode[] = [
    {
      patientId: '12345',
      patientName: '田中 花子',
      currentPasscode: '123456',
      expiryTime: '14:30',
      lastUpdated: '13:30',
      status: 'active'
    },
    {
      patientId: '23456',
      patientName: '山田 太郎',
      currentPasscode: '234567',
      expiryTime: '15:15',
      lastUpdated: '14:15',
      status: 'active'
    },
    {
      patientId: '34567',
      patientName: '佐藤 美咲',
      currentPasscode: '345678',
      expiryTime: '13:45',
      lastUpdated: '12:45',
      status: 'expiring'
    },
    {
      patientId: '45678',
      patientName: '高橋 健一',
      currentPasscode: '456789',
      expiryTime: '13:00',
      lastUpdated: '12:00',
      status: 'expired'
    },
    {
      patientId: '56789',
      patientName: '伊藤 智子',
      currentPasscode: '567890',
      expiryTime: '16:00',
      lastUpdated: '15:00',
      status: 'active'
    }
  ];

  const generateNewPasscode = (patientId: string) => {
    // デモ用 - 新しいパスコードを生成
    const newPasscode = Math.floor(Math.random() * 1000000).toString().padStart(6, '0');
    alert(`${patientId}の新しいパスコード: ${newPasscode}`);
  };

  const copyPasscode = async (passcode: string) => {
    try {
      await navigator.clipboard.writeText(passcode);
      setCopiedPasscode(passcode);
      setTimeout(() => setCopiedPasscode(''), 2000);
    } catch (err) {
      console.error('コピーに失敗しました:', err);
    }
  };

  const getStatusBadge = (status: PatientPasscode['status']) => {
    switch (status) {
      case 'active':
        return <span className="inline-flex px-2 py-1 text-xs font-medium rounded-full bg-green-100 text-green-800">有効</span>;
      case 'expiring':
        return <span className="inline-flex px-2 py-1 text-xs font-medium rounded-full bg-yellow-100 text-yellow-800">期限間近</span>;
      case 'expired':
        return <span className="inline-flex px-2 py-1 text-xs font-medium rounded-full bg-red-100 text-red-800">期限切れ</span>;
    }
  };

  const getStatusIcon = (status: PatientPasscode['status']) => {
    switch (status) {
      case 'active':
        return <CheckCircle className="h-4 w-4 text-green-600" />;
      case 'expiring':
        return <Clock className="h-4 w-4 text-yellow-600" />;
      case 'expired':
        return <AlertCircle className="h-4 w-4 text-red-600" />;
    }
  };

  const filteredPasscodes = patientPasscodes.filter(patient =>
    patient.patientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    patient.patientId.includes(searchTerm)
  );

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
              <Key className="h-5 w-5 text-purple-600" />
              <span className="text-sm font-medium text-gray-700">パスコード確認</span>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-6xl mx-auto px-4 py-8">
        <div className="bg-white rounded-lg shadow border">
          <div className="px-6 py-4 border-b border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-xl font-semibold text-gray-800">患者パスコード管理</h1>
                <p className="text-sm text-gray-600 mt-1">各患者の現在有効なパスコードを確認・管理</p>
              </div>
              <button
                onClick={() => setShowPasscodes(!showPasscodes)}
                className="flex items-center space-x-2 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
              >
                {showPasscodes ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                <span>{showPasscodes ? 'パスコードを隠す' : 'パスコードを表示'}</span>
              </button>
            </div>
          </div>

          {/* Search and Filters */}
          <div className="px-6 py-4 border-b border-gray-200 bg-gray-50">
            <div className="flex items-center space-x-4">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-purple-500 focus:border-purple-500"
                  placeholder="患者名または患者IDで検索..."
                />
              </div>
              <div className="flex items-center space-x-2 text-sm text-gray-600">
                <span>自動更新: 60分間隔</span>
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
              </div>
            </div>
          </div>

          {/* Passcodes List */}
          <div className="p-6">
            <div className="space-y-4">
              {filteredPasscodes.map((patient) => (
                <div key={patient.patientId} className="border border-gray-200 rounded-lg p-4 hover:bg-gray-50 transition-colors">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center">
                        <User className="h-5 w-5 text-purple-600" />
                      </div>
                      <div>
                        <h3 className="font-medium text-gray-800">{patient.patientName}</h3>
                        <p className="text-sm text-gray-500">ID: {patient.patientId}</p>
                      </div>
                    </div>

                    <div className="flex items-center space-x-6">
                      {/* パスコード表示 */}
                      <div className="text-center">
                        <p className="text-xs text-gray-500 mb-1">現在のパスコード</p>
                        <div className="flex items-center space-x-2">
                          <span className={`font-mono text-lg font-bold ${
                            showPasscodes ? 'text-gray-800' : 'text-gray-300'
                          }`}>
                            {showPasscodes ? patient.currentPasscode : '••••••'}
                          </span>
                          {showPasscodes && (
                            <button
                              onClick={() => copyPasscode(patient.currentPasscode)}
                              className="p-1 text-gray-400 hover:text-gray-600 transition-colors"
                              title="コピー"
                            >
                              {copiedPasscode === patient.currentPasscode ? (
                                <CheckCircle className="h-4 w-4 text-green-600" />
                              ) : (
                                <Copy className="h-4 w-4" />
                              )}
                            </button>
                          )}
                        </div>
                      </div>

                      {/* 有効期限 */}
                      <div className="text-center">
                        <p className="text-xs text-gray-500 mb-1">有効期限</p>
                        <div className="flex items-center space-x-2">
                          {getStatusIcon(patient.status)}
                          <span className="text-sm font-medium">{patient.expiryTime}</span>
                        </div>
                      </div>

                      {/* ステータス */}
                      <div className="text-center">
                        <p className="text-xs text-gray-500 mb-1">ステータス</p>
                        {getStatusBadge(patient.status)}
                      </div>

                      {/* アクション */}
                      <div className="flex space-x-2">
                        <button
                          onClick={() => generateNewPasscode(patient.patientId)}
                          className="p-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                          title="新しいパスコードを生成"
                        >
                          <RefreshCw className="h-4 w-4" />
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* 詳細情報 */}
                  <div className="mt-3 pt-3 border-t border-gray-100">
                    <div className="flex items-center justify-between text-xs text-gray-500">
                      <span>最終更新: {patient.lastUpdated}</span>
                      <span>次回自動更新: {patient.expiryTime}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {filteredPasscodes.length === 0 && (
              <div className="text-center py-8">
                <User className="h-12 w-12 text-gray-300 mx-auto mb-4" />
                <p className="text-gray-500">該当する患者が見つかりません</p>
              </div>
            )}
          </div>
        </div>

        {/* 注意事項 */}
        <div className="mt-6 bg-yellow-50 border border-yellow-200 rounded-lg p-4">
          <div className="flex items-start space-x-3">
            <AlertCircle className="h-5 w-5 text-yellow-600 mt-0.5" />
            <div className="text-sm text-yellow-800">
              <h3 className="font-medium mb-2">🔒 セキュリティについて</h3>
              <ul className="space-y-1 text-xs">
                <li>• パスコードは60分ごとに自動で更新されます</li>
                <li>• 期限切れのパスコードでは患者はログインできません</li>
                <li>• パスコードは患者にのみ伝達し、第三者に漏洩しないよう注意してください</li>
                <li>• 新しいパスコードを生成した場合は、必ず患者に連絡してください</li>
              </ul>
            </div>
          </div>
        </div>

        {/* 統計情報 */}
        <div className="mt-6 grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="bg-white rounded-lg p-4 shadow border">
            <div className="flex items-center">
              <div className="p-2 bg-green-100 rounded-lg">
                <CheckCircle className="h-5 w-5 text-green-600" />
              </div>
              <div className="ml-3">
                <p className="text-lg font-bold text-gray-800">
                  {patientPasscodes.filter(p => p.status === 'active').length}
                </p>
                <p className="text-xs text-gray-600">有効</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg p-4 shadow border">
            <div className="flex items-center">
              <div className="p-2 bg-yellow-100 rounded-lg">
                <Clock className="h-5 w-5 text-yellow-600" />
              </div>
              <div className="ml-3">
                <p className="text-lg font-bold text-gray-800">
                  {patientPasscodes.filter(p => p.status === 'expiring').length}
                </p>
                <p className="text-xs text-gray-600">期限間近</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg p-4 shadow border">
            <div className="flex items-center">
              <div className="p-2 bg-red-100 rounded-lg">
                <AlertCircle className="h-5 w-5 text-red-600" />
              </div>
              <div className="ml-3">
                <p className="text-lg font-bold text-gray-800">
                  {patientPasscodes.filter(p => p.status === 'expired').length}
                </p>
                <p className="text-xs text-gray-600">期限切れ</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg p-4 shadow border">
            <div className="flex items-center">
              <div className="p-2 bg-purple-100 rounded-lg">
                <User className="h-5 w-5 text-purple-600" />
              </div>
              <div className="ml-3">
                <p className="text-lg font-bold text-gray-800">{patientPasscodes.length}</p>
                <p className="text-xs text-gray-600">総患者数</p>
              </div>
            </div>
          </div>
        </div>

        {/* Demo Info */}
        <div className="mt-6 p-4 bg-yellow-50 rounded-lg border border-yellow-200">
          <p className="text-sm text-yellow-800 text-center">
            <strong>🎨 デモ用:</strong> 「パスコードを表示」ボタンでパスコードを確認、🔄ボタンで新しいパスコードを生成できます
          </p>
        </div>
      </main>
    </div>
  );
} 