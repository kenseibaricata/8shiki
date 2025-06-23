'use client';

import React, { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { ArrowLeft, Stethoscope, Key, Hash, Eye, EyeOff } from 'lucide-react';

export default function PatientLoginPage() {
  const [formData, setFormData] = useState({
    patientNumber: '',
    passcode: ''
  });
  const [showPasscode, setShowPasscode] = useState(false);
  const passcodeInputs = useRef<(HTMLInputElement | null)[]>([]);

  const handlePatientNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\D/g, '').slice(0, 5);
    setFormData({
      ...formData,
      patientNumber: value
    });
  };

  const handlePasscodeChange = (index: number, value: string) => {
    if (value.length > 1) return;
    
    const newPasscode = formData.passcode.split('');
    newPasscode[index] = value;
    
    setFormData({
      ...formData,
      passcode: newPasscode.join('')
    });

    // 自動フォーカス移動
    if (value && index < 5) {
      passcodeInputs.current[index + 1]?.focus();
    }
  };

  const handlePasscodeKeyDown = (index: number, e: React.KeyboardEvent) => {
    if (e.key === 'Backspace' && !formData.passcode[index] && index > 0) {
      passcodeInputs.current[index - 1]?.focus();
    }
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // デモ用 - 実際のログイン処理はここに実装
    window.location.href = '/patient-dashboard';
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-teal-100">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-green-100">
        <div className="max-w-6xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link href="/" className="flex items-center space-x-3 hover:opacity-80">
              <ArrowLeft className="h-5 w-5 text-gray-600" />
              <div className="flex items-center space-x-2">
                <span className="text-xl">🦷</span>
                                  <span className="text-lg font-semibold text-gray-800">歯知式</span>
              </div>
            </Link>
            <div className="text-sm text-gray-500">
              患者用ログイン
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex items-center justify-center px-4 py-12">
        <div className="w-full max-w-md">
          {/* Login Card */}
          <div className="bg-white rounded-lg shadow-xl border border-green-200 p-8">
            {/* Header */}
            <div className="text-center mb-8">
              <div className="p-4 bg-green-100 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                <Stethoscope className="h-8 w-8 text-green-600" />
              </div>
              <h1 className="text-2xl font-bold text-gray-800 mb-2">患者ログイン</h1>
              <p className="text-gray-600">診療計画の確認・相談システム</p>
            </div>

            {/* Login Form */}
            <form onSubmit={handleLogin} className="space-y-6">
              {/* Patient Number */}
              <div>
                <label htmlFor="patientNumber" className="block text-sm font-medium text-gray-700 mb-2">
                  患者番号（5桁）
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Hash className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    type="text"
                    id="patientNumber"
                    name="patientNumber"
                    value={formData.patientNumber}
                    onChange={handlePatientNumberChange}
                    className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:ring-green-500 focus:border-green-500 text-center text-lg font-mono tracking-wider"
                    placeholder="12345"
                    maxLength={5}
                    required
                  />
                </div>
                <p className="mt-1 text-xs text-gray-500">
                  スタッフから受け取った5桁の患者番号を入力してください
                </p>
              </div>

              {/* Passcode */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  パスコード（6桁）
                </label>
                <div className="flex justify-center space-x-2 mb-2">
                  {Array.from({ length: 6 }).map((_, index) => (
                    <input
                      key={index}
                      ref={(el) => { passcodeInputs.current[index] = el; }}
                      type={showPasscode ? 'text' : 'password'}
                      className="w-12 h-12 text-center border border-gray-300 rounded-lg focus:ring-green-500 focus:border-green-500 font-mono text-lg"
                      maxLength={1}
                      value={formData.passcode[index] || ''}
                      onChange={(e) => handlePasscodeChange(index, e.target.value)}
                      onKeyDown={(e) => handlePasscodeKeyDown(index, e)}
                      pattern="[0-9]"
                      inputMode="numeric"
                    />
                  ))}
                </div>
                <div className="flex items-center justify-center space-x-2">
                  <button
                    type="button"
                    onClick={() => setShowPasscode(!showPasscode)}
                    className="flex items-center text-sm text-gray-600 hover:text-gray-800"
                  >
                    {showPasscode ? (
                      <>
                        <EyeOff className="h-4 w-4 mr-1" />
                        パスコードを隠す
                      </>
                    ) : (
                      <>
                        <Eye className="h-4 w-4 mr-1" />
                        パスコードを表示
                      </>
                    )}
                  </button>
                </div>
                <p className="mt-2 text-xs text-gray-500 text-center">
                  現在有効なパスコードをスタッフに確認してください（60分ごと更新）
                </p>
              </div>

              <button
                type="submit"
                disabled={formData.patientNumber.length !== 5 || formData.passcode.length !== 6}
                className="w-full bg-green-600 hover:bg-green-700 disabled:bg-gray-300 disabled:cursor-not-allowed text-white font-semibold py-3 px-6 rounded-lg transition-colors focus:ring-4 focus:ring-green-300"
              >
                ログイン
              </button>
            </form>

            {/* Help Section */}
            <div className="mt-8 p-4 bg-green-50 rounded-lg">
              <h3 className="text-sm font-medium text-green-800 mb-2">💡 ログインでお困りの場合</h3>
              <ul className="text-xs text-green-700 space-y-1">
                <li>• 患者番号が分からない場合は受付にお尋ねください</li>
                <li>• パスコードは60分ごとに自動更新されます</li>
                <li>• 複数の端末から同時ログイン可能です</li>
              </ul>
            </div>

            {/* Contact */}
            <div className="mt-6 text-center">
              <p className="text-sm text-gray-600">
                サポートが必要ですか？
              </p>
              <p className="text-sm text-green-600 font-medium">
                📞 092-XXX-XXXX（はち歯科受付）
              </p>
            </div>
          </div>

          {/* Demo Info */}
          <div className="mt-6 p-4 bg-yellow-50 rounded-lg border border-yellow-200">
            <p className="text-sm text-yellow-800 text-center">
              <strong>🎨 デモ用:</strong> 患者番号5桁とパスコード6桁を入力すると患者画面に進みます
            </p>
          </div>
        </div>
      </main>
    </div>
  );
} 