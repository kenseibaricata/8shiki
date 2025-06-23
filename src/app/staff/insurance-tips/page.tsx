'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { 
  ArrowLeft, 
  Search, 
  Filter,
  BookOpen,
  TrendingUp,
  Target,
  Award,
  Info,
  CheckCircle,
  Clock,
  Star
} from 'lucide-react';
import StaffHeader from '../../components/StaffHeader';

interface InsuranceTip {
  id: string;
  title: string;
  category: string;
  diagnosisCode: string;
  points: number;
  difficulty: 'easy' | 'medium' | 'hard';
  usageFrequency: number;
  achievementRate: number;
  description: string;
  requirements: string[];
  examples: string[];
  notes: string;
  relatedCodes?: string[];
}

export default function InsuranceTipsPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [sortBy, setSortBy] = useState<'points' | 'frequency' | 'achievement'>('points');
  const [selectedTip, setSelectedTip] = useState<InsuranceTip | null>(null);

  const categories = [
    { id: 'all', name: '全て' },
    { id: 'prevention', name: '予防' },
    { id: 'pediatric', name: '小児' },
    { id: 'periodontal', name: '歯周病' },
    { id: 'oral-function', name: '口腔機能' },
    { id: 'geriatric', name: '高齢者' },
    { id: 'guidance', name: '指導管理' }
  ];

  const insuranceTips: InsuranceTip[] = [
    {
      id: '1',
      title: '口腔機能発達不全症',
      category: 'oral-function',
      diagnosisCode: 'K13.7',
      points: 250,
      difficulty: 'medium',
      usageFrequency: 85,
      achievementRate: 92,
      description: '15歳未満の小児において、食べる機能、話す機能、その他の口腔機能が十分に発達していない、または正常に機能していない状態',
      requirements: [
        '15歳未満の患者',
        '口腔機能評価の実施',
        '機能訓練計画の作成',
        '保護者への指導'
      ],
      examples: [
        '舌小帯短縮症による構音障害',
        '咀嚼機能の未発達',
        '嚥下機能の問題'
      ],
      notes: '月1回まで算定可能。機能訓練を併用することで継続的な管理が可能。',
      relatedCodes: ['J055', 'J071']
    },
    {
      id: '2',
      title: '口腔機能低下症',
      category: 'geriatric',
      diagnosisCode: 'K13.6',
      points: 100,
      difficulty: 'easy',
      usageFrequency: 95,
      achievementRate: 88,
      description: '加齢などにより口腔機能が複合的に低下している状態',
      requirements: [
        '65歳以上の患者',
        '7項目のうち3項目以上該当',
        '口腔機能評価の実施',
        '機能向上計画の作成'
      ],
      examples: [
        '口腔乾燥',
        '口腔不潔',
        '咬合力低下',
        '舌圧低下'
      ],
      notes: '月1回算定可能。検査と管理を組み合わせることで収益向上。'
    },
    {
      id: '3',
      title: 'フッ化物洗口指導',
      category: 'prevention',
      diagnosisCode: 'J003',
      points: 30,
      difficulty: 'easy',
      usageFrequency: 70,
      achievementRate: 95,
      description: '小児および成人に対するフッ化物洗口の指導',
      requirements: [
        'う蝕リスクの高い患者',
        '適切な濃度のフッ化物洗口剤',
        '洗口方法の指導',
        '定期的なフォローアップ'
      ],
      examples: [
        '学童期の予防指導',
        '矯正治療中の患者',
        '唾液分泌低下患者'
      ],
      notes: '月1回算定可能。他の予防処置と組み合わせ効果的。'
    },
    {
      id: '4',
      title: '歯科疾患管理料',
      category: 'guidance',
      diagnosisCode: 'J095',
      points: 150,
      difficulty: 'medium',
      usageFrequency: 60,
      achievementRate: 85,
      description: '継続的な歯科治療が必要な患者に対する管理指導',
      requirements: [
        '歯周病またはう蝕の継続管理',
        '治療計画の作成・説明',
        '口腔衛生指導の実施',
        '定期的な評価・記録'
      ],
      examples: [
        '歯周病安定期治療',
        '根面う蝕の管理',
        '口腔乾燥症の管理'
      ],
      notes: '月1回算定可能。SPTとの使い分けに注意。'
    },
    {
      id: '5',
      title: '摂食機能療法',
      category: 'oral-function',
      diagnosisCode: 'H003',
      points: 185,
      difficulty: 'hard',
      usageFrequency: 40,
      achievementRate: 75,
      description: '摂食機能に障害のある患者に対する機能訓練',
      requirements: [
        '医師の指示または歯科医師の判断',
        '摂食機能評価の実施',
        '訓練計画の作成',
        '多職種連携'
      ],
      examples: [
        '脳血管疾患後の嚥下障害',
        '口腔癌術後の機能障害',
        '認知症による摂食機能低下'
      ],
      notes: '月8回まで算定可能。言語聴覚士との連携が重要。'
    },
    {
      id: '6',
      title: '歯周病安定期治療',
      category: 'periodontal',
      diagnosisCode: 'J204',
      points: 350,
      difficulty: 'medium',
      usageFrequency: 80,
      achievementRate: 90,
      description: '歯周基本治療終了後の安定期における継続的治療',
      requirements: [
        '歯周基本治療の完了',
        '歯周組織の安定',
        '患者の口腔衛生状態の改善',
        '定期的な評価・記録'
      ],
      examples: [
        '中等度歯周炎の維持期',
        '重度歯周炎の安定期',
        'インプラント周囲炎の予防'
      ],
      notes: '月1回算定可能。疾患管理料との使い分けが重要。'
    }
  ];

  const getDifficultyColor = (difficulty: InsuranceTip['difficulty']) => {
    switch (difficulty) {
      case 'easy': return 'text-green-600 bg-green-100';
      case 'medium': return 'text-yellow-600 bg-yellow-100';
      case 'hard': return 'text-red-600 bg-red-100';
    }
  };

  const getDifficultyText = (difficulty: InsuranceTip['difficulty']) => {
    switch (difficulty) {
      case 'easy': return '易';
      case 'medium': return '中';
      case 'hard': return '難';
    }
  };

  const filteredTips = insuranceTips
    .filter(tip => {
      const matchesSearch = tip.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           tip.diagnosisCode.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           tip.description.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = selectedCategory === 'all' || tip.category === selectedCategory;
      return matchesSearch && matchesCategory;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case 'points': return b.points - a.points;
        case 'frequency': return b.usageFrequency - a.usageFrequency;
        case 'achievement': return b.achievementRate - a.achievementRate;
        default: return 0;
      }
    });

  return (
    <div className="min-h-screen bg-gray-50">
      <StaffHeader />

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 py-8">
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-gray-800 mb-2">保険点数提案システム</h1>
          <p className="text-gray-600">診療内容に応じた保険点数の算定方法をご提案します</p>
        </div>

        {/* Filters and Search */}
        <div className="bg-white rounded-lg shadow border mb-6">
          <div className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              {/* Search */}
              <div className="md:col-span-2">
                <div className="relative">
                  <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  <input
                    type="text"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                    placeholder="診断名・コードで検索..."
                  />
                </div>
              </div>

              {/* Category Filter */}
              <div>
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="block w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                >
                  {categories.map((category) => (
                    <option key={category.id} value={category.id}>
                      {category.name}
                    </option>
                  ))}
                </select>
              </div>

              {/* Sort */}
              <div>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as 'points' | 'frequency' | 'achievement')}
                  className="block w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="points">点数順</option>
                  <option value="frequency">使用頻度順</option>
                  <option value="achievement">達成率順</option>
                </select>
              </div>
            </div>
          </div>
        </div>

        {/* Tips Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredTips.map((tip) => (
            <div
              key={tip.id}
              className="bg-white rounded-lg shadow border hover:shadow-md transition-shadow cursor-pointer"
              onClick={() => setSelectedTip(tip)}
            >
              <div className="p-6">
                {/* Header */}
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-800 mb-1">{tip.title}</h3>
                    <p className="text-sm text-gray-600">{tip.diagnosisCode}</p>
                  </div>
                  <div className={`px-2 py-1 rounded text-xs font-medium ${getDifficultyColor(tip.difficulty)}`}>
                    {getDifficultyText(tip.difficulty)}
                  </div>
                </div>

                {/* Points */}
                <div className="bg-blue-50 rounded-lg p-3 mb-4">
                  <div className="flex items-center justify-center">
                    <span className="text-2xl font-bold text-blue-600">{tip.points}</span>
                    <span className="text-sm text-blue-600 ml-1">点</span>
                  </div>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div className="text-center">
                    <div className="flex items-center justify-center mb-1">
                      <TrendingUp className="h-4 w-4 text-green-600 mr-1" />
                      <span className="text-sm text-gray-600">使用頻度</span>
                    </div>
                    <span className="font-semibold text-green-600">{tip.usageFrequency}%</span>
                  </div>
                  <div className="text-center">
                    <div className="flex items-center justify-center mb-1">
                      <Target className="h-4 w-4 text-purple-600 mr-1" />
                      <span className="text-sm text-gray-600">達成率</span>
                    </div>
                    <span className="font-semibold text-purple-600">{tip.achievementRate}%</span>
                  </div>
                </div>

                {/* Description */}
                <p className="text-sm text-gray-700 line-clamp-3">{tip.description}</p>

                {/* Footer */}
                <div className="mt-4 pt-4 border-t border-gray-100">
                  <button className="text-blue-600 text-sm font-medium hover:text-blue-700">
                    詳細を見る →
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredTips.length === 0 && (
          <div className="text-center py-12">
            <Info className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-600">検索条件に一致する項目が見つかりませんでした</p>
          </div>
        )}
      </main>

      {/* Detail Modal */}
      {selectedTip && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[80vh] overflow-y-auto">
            <div className="px-6 py-4 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-semibold text-gray-800">{selectedTip.title}</h3>
                  <p className="text-sm text-gray-600">{selectedTip.diagnosisCode}</p>
                </div>
                <button
                  onClick={() => setSelectedTip(null)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  ✕
                </button>
              </div>
            </div>

            <div className="p-6">
              {/* Points and Stats */}
              <div className="grid grid-cols-3 gap-4 mb-6">
                <div className="text-center bg-blue-50 rounded-lg p-3">
                  <div className="text-2xl font-bold text-blue-600">{selectedTip.points}</div>
                  <div className="text-sm text-blue-600">点数</div>
                </div>
                <div className="text-center bg-green-50 rounded-lg p-3">
                  <div className="text-2xl font-bold text-green-600">{selectedTip.usageFrequency}%</div>
                  <div className="text-sm text-green-600">使用頻度</div>
                </div>
                <div className="text-center bg-purple-50 rounded-lg p-3">
                  <div className="text-2xl font-bold text-purple-600">{selectedTip.achievementRate}%</div>
                  <div className="text-sm text-purple-600">達成率</div>
                </div>
              </div>

              {/* Description */}
              <div className="mb-6">
                <h4 className="font-semibold text-gray-800 mb-2">概要</h4>
                <p className="text-gray-700">{selectedTip.description}</p>
              </div>

              {/* Requirements */}
              <div className="mb-6">
                <h4 className="font-semibold text-gray-800 mb-2">算定要件</h4>
                <ul className="space-y-2">
                  {selectedTip.requirements.map((req, index) => (
                    <li key={index} className="flex items-start">
                      <CheckCircle className="h-4 w-4 text-green-600 mr-2 mt-0.5 flex-shrink-0" />
                      <span className="text-sm text-gray-700">{req}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Examples */}
              <div className="mb-6">
                <h4 className="font-semibold text-gray-800 mb-2">適用例</h4>
                <div className="space-y-2">
                  {selectedTip.examples.map((example, index) => (
                    <div key={index} className="bg-gray-50 rounded p-2">
                      <span className="text-sm text-gray-700">{example}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Notes */}
              <div className="mb-6">
                <h4 className="font-semibold text-gray-800 mb-2">注意事項</h4>
                <div className="bg-yellow-50 border border-yellow-200 rounded p-3">
                  <p className="text-sm text-yellow-800">{selectedTip.notes}</p>
                </div>
              </div>

              {/* Related Codes */}
              {selectedTip.relatedCodes && (
                <div className="mb-6">
                  <h4 className="font-semibold text-gray-800 mb-2">関連コード</h4>
                  <div className="flex flex-wrap gap-2">
                    {selectedTip.relatedCodes.map((code, index) => (
                      <span
                        key={index}
                        className="inline-flex px-2 py-1 bg-blue-100 text-blue-700 text-xs font-medium rounded"
                      >
                        {code}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Actions */}
              <div className="flex space-x-4">
                <button
                  onClick={() => setSelectedTip(null)}
                  className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors"
                >
                  理解しました
                </button>
                <button className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors">
                  ブックマーク
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
} 