'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { 
  ArrowLeft, 
  UserPlus, 
  User, 
  Calendar, 
  Phone, 
  Mail,
  Key,
  Save,
  RefreshCw,
  AlertCircle,
  CheckCircle,
  Hash
} from 'lucide-react';

export default function NewPatientPage() {
  const [formData, setFormData] = useState({
    patientNumber: '',
    name: '',
    kana: '',
    birthDate: '',
    gender: '',
    phone: '',
    email: '',
    address: '',
    emergencyContact: '',
    emergencyPhone: '',
    medicalHistory: '',
    allergies: '',
    medications: '',
    notes: ''
  });

  const [generatedPasscode, setGeneratedPasscode] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const generatePatientNumber = () => {
    // 00000-99999の範囲でランダムな患者番号を生成
    const number = Math.floor(Math.random() * 100000).toString().padStart(5, '0');
    setFormData(prev => ({ ...prev, patientNumber: number }));
  };

  const generatePasscode = () => {
    // 6桁のランダムパスコードを生成
    const passcode = Math.floor(Math.random() * 1000000).toString().padStart(6, '0');
    setGeneratedPasscode(passcode);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // デモ用の送信処理
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitStatus('success');
      setTimeout(() => setSubmitStatus('idle'), 3000);
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-4xl mx-auto px-4 py-4">
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
              <UserPlus className="h-5 w-5 text-blue-600" />
              <span className="text-sm font-medium text-gray-700">新規患者登録</span>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-4 py-8">
        <div className="bg-white rounded-lg shadow border">
          <div className="px-6 py-4 border-b border-gray-200">
            <h1 className="text-xl font-semibold text-gray-800">新規患者登録</h1>
            <p className="text-sm text-gray-600 mt-1">患者の基本情報を入力してください</p>
          </div>

          <form onSubmit={handleSubmit} className="p-6 space-y-6">
            {/* 患者番号とパスコード */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  患者番号（5桁） *
                </label>
                <div className="flex space-x-2">
                  <div className="relative flex-1">
                    <Hash className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                    <input
                      type="text"
                      name="patientNumber"
                      value={formData.patientNumber}
                      onChange={handleInputChange}
                      className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                      placeholder="12345"
                      maxLength={5}
                      required
                    />
                  </div>
                  <button
                    type="button"
                    onClick={generatePatientNumber}
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    <RefreshCw className="h-4 w-4" />
                  </button>
                </div>
                <p className="text-xs text-gray-500 mt-1">00000-99999の範囲で指定</p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  初期パスコード（6桁）
                </label>
                <div className="flex space-x-2">
                  <div className="relative flex-1">
                    <Key className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                    <input
                      type="text"
                      value={generatedPasscode}
                      readOnly
                      className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg bg-gray-50"
                      placeholder="123456"
                    />
                  </div>
                  <button
                    type="button"
                    onClick={generatePasscode}
                    className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                  >
                    <RefreshCw className="h-4 w-4" />
                  </button>
                </div>
                <p className="text-xs text-gray-500 mt-1">患者がログインで使用</p>
              </div>
            </div>

            {/* 基本情報 */}
            <div className="border-t border-gray-200 pt-6">
              <h3 className="text-lg font-medium text-gray-800 mb-4">基本情報</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    氏名 *
                  </label>
                  <div className="relative">
                    <User className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                      placeholder="田中 花子"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    氏名（カナ） *
                  </label>
                  <input
                    type="text"
                    name="kana"
                    value={formData.kana}
                    onChange={handleInputChange}
                    className="block w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                    placeholder="タナカ ハナコ"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    生年月日 *
                  </label>
                  <div className="relative">
                    <Calendar className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                    <input
                      type="date"
                      name="birthDate"
                      value={formData.birthDate}
                      onChange={handleInputChange}
                      className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    性別 *
                  </label>
                  <select
                    name="gender"
                    value={formData.gender}
                    onChange={handleInputChange}
                    className="block w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                    required
                  >
                    <option value="">選択してください</option>
                    <option value="male">男性</option>
                    <option value="female">女性</option>
                    <option value="other">その他</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    電話番号 *
                  </label>
                  <div className="relative">
                    <Phone className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                      placeholder="092-XXX-XXXX"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    メールアドレス
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                      placeholder="patient@example.com"
                    />
                  </div>
                </div>
              </div>

              <div className="mt-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  住所
                </label>
                <textarea
                  name="address"
                  value={formData.address}
                  onChange={handleInputChange}
                  rows={2}
                  className="block w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                  placeholder="福岡県大野城市..."
                />
              </div>
            </div>

            {/* 緊急連絡先 */}
            <div className="border-t border-gray-200 pt-6">
              <h3 className="text-lg font-medium text-gray-800 mb-4">緊急連絡先</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    緊急連絡先（氏名）
                  </label>
                  <input
                    type="text"
                    name="emergencyContact"
                    value={formData.emergencyContact}
                    onChange={handleInputChange}
                    className="block w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                    placeholder="田中 太郎"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    緊急連絡先（電話番号）
                  </label>
                  <input
                    type="tel"
                    name="emergencyPhone"
                    value={formData.emergencyPhone}
                    onChange={handleInputChange}
                    className="block w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                    placeholder="092-XXX-XXXX"
                  />
                </div>
              </div>
            </div>

            {/* 医療情報 */}
            <div className="border-t border-gray-200 pt-6">
              <h3 className="text-lg font-medium text-gray-800 mb-4">医療情報</h3>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    既往歴
                  </label>
                  <textarea
                    name="medicalHistory"
                    value={formData.medicalHistory}
                    onChange={handleInputChange}
                    rows={3}
                    className="block w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                    placeholder="過去の病気や手術歴など"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    アレルギー
                  </label>
                  <textarea
                    name="allergies"
                    value={formData.allergies}
                    onChange={handleInputChange}
                    rows={2}
                    className="block w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                    placeholder="薬物、食物、材料アレルギーなど"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    服用中の薬
                  </label>
                  <textarea
                    name="medications"
                    value={formData.medications}
                    onChange={handleInputChange}
                    rows={2}
                    className="block w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                    placeholder="現在服用中の薬があれば記入"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    備考
                  </label>
                  <textarea
                    name="notes"
                    value={formData.notes}
                    onChange={handleInputChange}
                    rows={3}
                    className="block w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                    placeholder="その他の特記事項"
                  />
                </div>
              </div>
            </div>

            {/* 送信ボタン */}
            <div className="border-t border-gray-200 pt-6 flex justify-end space-x-4">
              <Link href="/staff-dashboard" className="px-6 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors">
                キャンセル
              </Link>
              <button
                type="submit"
                disabled={isSubmitting || !formData.patientNumber || !generatedPasscode}
                className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors flex items-center space-x-2"
              >
                {isSubmitting ? (
                  <>
                    <RefreshCw className="h-4 w-4 animate-spin" />
                    <span>登録中...</span>
                  </>
                ) : (
                  <>
                    <Save className="h-4 w-4" />
                    <span>患者を登録</span>
                  </>
                )}
              </button>
            </div>

            {/* Status Messages */}
            {submitStatus === 'success' && (
              <div className="flex items-center p-4 bg-green-50 border border-green-200 rounded-lg">
                <CheckCircle className="h-5 w-5 text-green-600 mr-2" />
                <span className="text-sm text-green-800">患者が正常に登録されました</span>
              </div>
            )}

            {submitStatus === 'error' && (
              <div className="flex items-center p-4 bg-red-50 border border-red-200 rounded-lg">
                <AlertCircle className="h-5 w-5 text-red-600 mr-2" />
                <span className="text-sm text-red-800">登録中にエラーが発生しました</span>
              </div>
            )}
          </form>
        </div>

        {/* Demo Info */}
        <div className="mt-6 p-4 bg-yellow-50 rounded-lg border border-yellow-200">
          <p className="text-sm text-yellow-800 text-center">
            <strong>🎨 デモ用:</strong> 患者番号とパスコードの「生成」ボタンをクリックして情報を入力し、登録してください
          </p>
        </div>
      </main>
    </div>
  );
} 