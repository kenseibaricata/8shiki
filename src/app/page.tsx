'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Calendar, Users, MessageCircle, Stethoscope, Shield, UserCheck } from 'lucide-react';

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-green-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-blue-100">
        <div className="max-w-6xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-yellow-100 rounded-lg">
                <span className="text-2xl">🦷</span>
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-800">歯知式</h1>
                <p className="text-sm text-gray-600">歯科医院診療計画共有システム</p>
              </div>
            </div>
            <div className="text-sm text-gray-500">
              v1.0 - はち歯科（大野城店）
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-6xl mx-auto px-4 py-12">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-800 mb-4">
            診療計画を共有し、患者とのコミュニケーションを円滑に
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            歯知式は歯科医院向けの診療計画共有とコミュニケーション支援システムです。
            スタッフと患者の両方に最適化されたインターフェースを提供します。
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          <div className="bg-white rounded-lg p-6 shadow-md border border-blue-100">
            <div className="flex items-center mb-4">
              <Calendar className="h-8 w-8 text-blue-600 mr-3" />
              <h3 className="text-lg font-semibold">診療計画管理</h3>
            </div>
            <p className="text-gray-600">患者の診療計画を簡単に作成・共有できます</p>
          </div>
          
          <div className="bg-white rounded-lg p-6 shadow-md border border-green-100">
            <div className="flex items-center mb-4">
              <MessageCircle className="h-8 w-8 text-green-600 mr-3" />
              <h3 className="text-lg font-semibold">AIチャット相談</h3>
            </div>
            <p className="text-gray-600">24時間いつでも歯科に関する相談ができます</p>
          </div>
          
          <div className="bg-white rounded-lg p-6 shadow-md border border-purple-100">
            <div className="flex items-center mb-4">
              <Users className="h-8 w-8 text-purple-600 mr-3" />
              <h3 className="text-lg font-semibold">患者管理</h3>
            </div>
            <p className="text-gray-600">患者情報とコミュニケーション履歴を一元管理</p>
          </div>
        </div>

        {/* Login Options */}
        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {/* Staff Login Card */}
          <div className="bg-white rounded-lg p-8 shadow-lg border border-blue-200 hover:shadow-xl transition-shadow">
            <div className="text-center mb-6">
              <div className="p-4 bg-blue-100 rounded-full w-20 h-20 mx-auto mb-4 flex items-center justify-center">
                <Shield className="h-10 w-10 text-blue-600" />
              </div>
              <h3 className="text-2xl font-bold text-gray-800 mb-2">スタッフ用ログイン</h3>
              <p className="text-gray-600">歯科衛生士・管理者向けの管理画面</p>
            </div>
            
            <div className="space-y-4 mb-6">
              <div className="flex items-center text-sm text-gray-600">
                <UserCheck className="h-4 w-4 mr-2" />
                患者管理・診療計画作成
              </div>
              <div className="flex items-center text-sm text-gray-600">
                <MessageCircle className="h-4 w-4 mr-2" />
                チャット履歴確認・要約生成
              </div>
              <div className="flex items-center text-sm text-gray-600">
                <Calendar className="h-4 w-4 mr-2" />
                パスコード管理
              </div>
            </div>
            
            <Link 
              href="/staff-login" 
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors block text-center"
            >
              スタッフログイン
            </Link>
          </div>

          {/* Patient Login Card */}
          <div className="bg-white rounded-lg p-8 shadow-lg border border-green-200 hover:shadow-xl transition-shadow">
            <div className="text-center mb-6">
              <div className="p-4 bg-green-100 rounded-full w-20 h-20 mx-auto mb-4 flex items-center justify-center">
                <Stethoscope className="h-10 w-10 text-green-600" />
              </div>
              <h3 className="text-2xl font-bold text-gray-800 mb-2">患者用ログイン</h3>
              <p className="text-gray-600">患者様向けの診療計画確認・相談</p>
            </div>
            
            <div className="space-y-4 mb-6">
              <div className="flex items-center text-sm text-gray-600">
                <Calendar className="h-4 w-4 mr-2" />
                次回診療計画の確認
              </div>
              <div className="flex items-center text-sm text-gray-600">
                <MessageCircle className="h-4 w-4 mr-2" />
                AIによる歯科相談
              </div>
              <div className="flex items-center text-sm text-gray-600">
                <UserCheck className="h-4 w-4 mr-2" />
                プロフィール管理
              </div>
            </div>
            
            <Link 
              href="/patient-login" 
              className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors block text-center"
            >
              患者ログイン
            </Link>
          </div>
        </div>

        {/* Demo Navigation */}
        <div className="mt-16 p-6 bg-yellow-50 rounded-lg border border-yellow-200">
          <h3 className="text-lg font-semibold text-gray-800 mb-4 text-center">🎨 デザインプロトタイプ - 全画面確認</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-sm">
            <Link href="/staff-login" className="p-2 bg-white rounded border hover:bg-gray-50 text-center">スタッフログイン</Link>
            <Link href="/staff-dashboard" className="p-2 bg-white rounded border hover:bg-gray-50 text-center">スタッフ管理画面</Link>
            <Link href="/patient-login" className="p-2 bg-white rounded border hover:bg-gray-50 text-center">患者ログイン</Link>
            <Link href="/patient-dashboard" className="p-2 bg-white rounded border hover:bg-gray-50 text-center">患者画面</Link>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-200 mt-16">
        <div className="max-w-6xl mx-auto px-4 py-8">
          <div className="text-center text-gray-600">
            <p>&copy; 2024 歯知式 - はち歯科診療計画共有システム</p>
            <p className="text-sm mt-2">PWA対応 | セキュア認証 | 24時間サポート</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
