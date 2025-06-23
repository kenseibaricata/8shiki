'use client';

import React, { useState } from 'react';
import PatientHeader from '../components/PatientHeader';
import { 
  Crown, 
  Star, 
  Check, 
  Zap, 
  Shield, 
  Sparkles
} from 'lucide-react';

interface ClubPlan {
  id: string;
  name: string;
  price: number;
  yearlyPrice: number;
  color: string;
  bgColor: string;
  borderColor: string;
  icon: React.ReactNode;
  features: string[];
  specialFeatures?: string[];
  popular?: boolean;
  premium?: boolean;
}

export default function ClubPage() {
  const [isYearly, setIsYearly] = useState(false);
  const [currentPlan] = useState<string>('basic');
  
  const plans: ClubPlan[] = [
    {
      id: 'basic',
      name: 'ベーシック',
      price: 2980,
      yearlyPrice: 29800,
      color: 'text-gray-700',
      bgColor: 'bg-white',
      borderColor: 'border-gray-200',
      icon: <Shield className="h-8 w-8 text-gray-600" />,
      features: [
        '月1回の定期検診',
        'AIチャット相談',
        '基本的な予防ケア',
        '治療計画の確認',
        'オンライン予約'
      ]
    },
    {
      id: 'silver',
      name: 'シルバー',
      price: 5980,
      yearlyPrice: 59800,
      color: 'text-blue-700',
      bgColor: 'bg-blue-50',
      borderColor: 'border-blue-200',
      icon: <Star className="h-8 w-8 text-blue-600" />,
      features: [
        'ベーシックプランの全機能',
        'ファストパス予約',
        '専門スタッフ指名（割引あり）',
        'プロフェッショナルクリーニング月1回',
        '歯科グッズ10%割引'
      ],
      popular: true
    },
    {
      id: 'gold',
      name: 'ゴールド',
      price: 9980,
      yearlyPrice: 99800,
      color: 'text-yellow-700',
      bgColor: 'bg-gradient-to-br from-yellow-50 to-orange-50',
      borderColor: 'border-yellow-300',
      icon: <Crown className="h-8 w-8 text-yellow-600" />,
      features: [
        'シルバープランの全機能',
        '専門スタッフ指名無料',
        'VIP優先予約',
        'ホワイトニング年2回',
        '歯科グッズ20%割引',
        '口腔ケア用品プレゼント'
      ],
      specialFeatures: [
        '24時間緊急対応',
        '専属歯科衛生士アサイン',
        '特別診療室利用可能'
      ],
      premium: true
    }
  ];

  const handleSubscribe = (planId: string) => {
    // Stripe決済またはモーダル表示の処理
    alert(`${planId}プランへの加入手続きを開始します`);
  };

  const handleManualSubscription = (planId: string) => {
    // 現地で現金決済する場合の手動フラグ設定
    alert(`${planId}プランに現地決済で加入します。スタッフが手動で設定いたします。`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-green-50">
      <PatientHeader />

      {/* Main Content */}
      <main className="max-w-6xl mx-auto px-4 py-8">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">
            歯知クラブ メンバーシップ
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto mb-8">
            あなたの口腔健康を長期的にサポートする、プレミアムな歯科ケアサービスです。
            月額制で安心の継続ケアを受けられます。
          </p>

          {/* Current Plan Status */}
          {currentPlan && (
            <div className="inline-flex items-center px-4 py-2 bg-green-100 text-green-800 rounded-full text-sm font-medium mb-6">
              <Check className="h-4 w-4 mr-2" />
              現在: {plans.find(p => p.id === currentPlan)?.name}プラン加入中
            </div>
          )}

          {/* Yearly Toggle */}
          <div className="flex items-center justify-center space-x-4 mb-8">
            <span className={`text-sm ${!isYearly ? 'font-semibold text-gray-800' : 'text-gray-600'}`}>
              月額払い
            </span>
            <button
              onClick={() => setIsYearly(!isYearly)}
              className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${
                isYearly ? 'bg-blue-600' : 'bg-gray-200'
              }`}
            >
              <span
                className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                  isYearly ? 'translate-x-6' : 'translate-x-1'
                }`}
              />
            </button>
            <span className={`text-sm ${isYearly ? 'font-semibold text-gray-800' : 'text-gray-600'}`}>
              年額払い
            </span>
            {isYearly && (
              <span className="text-sm bg-green-100 text-green-800 px-2 py-1 rounded">
                2ヶ月分お得！
              </span>
            )}
          </div>
        </div>

        {/* Plans Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          {plans.map((plan) => (
            <div
              key={plan.id}
              className={`relative rounded-2xl p-8 shadow-lg transition-all duration-200 hover:shadow-xl ${
                plan.bgColor
              } ${plan.borderColor} border-2 ${
                plan.popular ? 'ring-2 ring-blue-500 ring-offset-2' : ''
              } ${
                plan.premium ? 'ring-2 ring-yellow-500 ring-offset-2' : ''
              }`}
            >
              {/* Popular Badge */}
              {plan.popular && (
                <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                  <span className="bg-blue-600 text-white px-4 py-1 rounded-full text-xs font-semibold">
                    人気No.1
                  </span>
                </div>
              )}

              {/* Premium Badge */}
              {plan.premium && (
                <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                  <span className="bg-gradient-to-r from-yellow-500 to-orange-500 text-white px-4 py-1 rounded-full text-xs font-semibold flex items-center">
                    <Sparkles className="h-3 w-3 mr-1" />
                    プレミアム
                  </span>
                </div>
              )}

              <div className="text-center mb-6">
                <div className="flex justify-center mb-4">
                  {plan.icon}
                </div>
                <h3 className={`text-2xl font-bold ${plan.color} mb-2`}>
                  {plan.name}
                </h3>
                <div className="mb-4">
                  <span className={`text-4xl font-bold ${plan.color}`}>
                    ¥{isYearly ? plan.yearlyPrice.toLocaleString() : plan.price.toLocaleString()}
                  </span>
                  <span className="text-gray-600 ml-1">
                    /{isYearly ? '年' : '月'}
                  </span>
                </div>
                {isYearly && (
                  <p className="text-sm text-gray-600">
                    月額換算: ¥{Math.round(plan.yearlyPrice / 12).toLocaleString()}
                  </p>
                )}
              </div>

              {/* Features */}
              <div className="space-y-3 mb-8">
                {plan.features.map((feature, index) => (
                  <div key={index} className="flex items-center">
                    <Check className="h-4 w-4 text-green-600 mr-3 flex-shrink-0" />
                    <span className="text-sm text-gray-700">{feature}</span>
                  </div>
                ))}
                
                {plan.specialFeatures && (
                  <>
                    <div className="border-t border-gray-200 pt-3 mt-4">
                      <div className="flex items-center mb-2">
                        <Zap className="h-4 w-4 text-yellow-600 mr-2" />
                        <span className="text-sm font-semibold text-gray-800">特別特典</span>
                      </div>
                      {plan.specialFeatures.map((feature, index) => (
                        <div key={index} className="flex items-center ml-6 mb-1">
                          <Crown className="h-3 w-3 text-yellow-600 mr-2 flex-shrink-0" />
                          <span className="text-sm text-gray-700">{feature}</span>
                        </div>
                      ))}
                    </div>
                  </>
                )}
              </div>

              {/* Subscribe Button */}
              <div className="space-y-2">
                <button
                  onClick={() => handleSubscribe(plan.id)}
                  disabled={currentPlan === plan.id}
                  className={`w-full py-3 px-6 rounded-lg font-semibold transition-colors ${
                    currentPlan === plan.id
                      ? 'bg-gray-100 text-gray-500 cursor-not-allowed'
                      : plan.premium
                      ? 'bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600 text-white'
                      : plan.popular
                      ? 'bg-blue-600 hover:bg-blue-700 text-white'
                      : 'bg-gray-800 hover:bg-gray-900 text-white'
                  }`}
                >
                  {currentPlan === plan.id ? '加入中' : '今すぐ加入'}
                </button>
                
                <button
                  onClick={() => handleManualSubscription(plan.id)}
                  className="w-full py-2 px-4 border border-gray-300 rounded-lg text-sm text-gray-600 hover:bg-gray-50 transition-colors"
                >
                  現地決済で加入
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* FAQ Section */}
        <div className="bg-white rounded-lg shadow border p-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
            よくあるご質問
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="font-semibold text-gray-800 mb-2">いつでも解約できますか？</h3>
              <p className="text-sm text-gray-600">
                はい、1ヶ月前の事前通知で解約可能です。解約手数料はかかりません。
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-gray-800 mb-2">プラン変更は可能ですか？</h3>
              <p className="text-sm text-gray-600">
                はい、いつでもプラン変更可能です。差額の調整も対応いたします。
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-gray-800 mb-2">ファストパス予約とは？</h3>
              <p className="text-sm text-gray-600">
                通常予約より優先的に予約が取れる機能です。シルバー以上のプランで利用可能です。
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-gray-800 mb-2">支払い方法は？</h3>
              <p className="text-sm text-gray-600">
                クレジットカード決済、または院内での現金決済をお選びいただけます。
              </p>
            </div>
          </div>
        </div>

        {/* Contact Section */}
        <div className="mt-8 text-center">
          <p className="text-gray-600 mb-4">
            ご不明な点がございましたら、お気軽にお問い合わせください
          </p>
          <div className="flex items-center justify-center space-x-4">
            <span className="text-sm text-gray-700">📞 092-XXX-XXXX（受付時間：9:00-18:00）</span>
          </div>
        </div>
      </main>
    </div>
  );
} 