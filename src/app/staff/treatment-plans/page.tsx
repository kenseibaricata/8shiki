'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import StaffHeader from '../../components/StaffHeader';
import { 
  Search, 
  Filter,
  Calendar,
  Plus,
  Eye,
  Edit3,
  CheckCircle,
  Clock,
  AlertCircle,
  User,
  FileText,
  ChevronDown,
  ArrowRight
} from 'lucide-react';

interface TreatmentPlan {
  id: string;
  patientId: string;
  patientName: string;
  title: string;
  description: string;
  status: 'planned' | 'in-progress' | 'completed' | 'cancelled';
  priority: 'low' | 'medium' | 'high' | 'urgent';
  createdDate: string;
  plannedDate: string;
  completedDate?: string;
  estimatedDuration: number;
  actualDuration?: number;
  assignedStaff: string;
  treatments: string[];
  notes: string;
  cost: {
    estimated: number;
    actual?: number;
    insurance: number;
    selfPay: number;
  };
}

export default function TreatmentPlansPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<'all' | 'planned' | 'in-progress' | 'completed' | 'cancelled'>('all');
  const [priorityFilter, setPriorityFilter] = useState<'all' | 'low' | 'medium' | 'high' | 'urgent'>('all');
  const [sortBy, setSortBy] = useState<'plannedDate' | 'createdDate' | 'priority' | 'patientName'>('plannedDate');

  // サンプル診療計画データ
  const treatmentPlans: TreatmentPlan[] = [
    {
      id: 'TP-001',
      patientId: 'P-001',
      patientName: '田中 花子',
      title: '虫歯治療・根管治療',
      description: '右上7番の深い虫歯に対する根管治療',
      status: 'in-progress',
      priority: 'high',
      createdDate: '2024-02-15',
      plannedDate: '2024-03-15',
      estimatedDuration: 120,
      actualDuration: 90,
      assignedStaff: '田中 智子 (歯科医師)',
      treatments: ['根管治療', 'インレー治療', '咬合調整'],
      notes: '患者は痛みを訴えており、早期治療が必要。麻酔の効果が良好。',
      cost: {
        estimated: 15000,
        actual: 12000,
        insurance: 9000,
        selfPay: 3000
      }
    },
    {
      id: 'TP-002',
      patientId: 'P-002',
      patientName: '佐藤 次郎',
      title: '歯周病治療',
      description: '中等度歯周炎の治療',
      status: 'planned',
      priority: 'medium',
      createdDate: '2024-03-08',
      plannedDate: '2024-03-22',
      estimatedDuration: 180,
      assignedStaff: '山田 健太 (歯科衛生士)',
      treatments: ['歯石除去', 'ルートプレーニング', 'ブラッシング指導'],
      notes: '糖尿病患者のため感染リスクに注意。定期的なフォローアップが必要。',
      cost: {
        estimated: 8000,
        insurance: 6000,
        selfPay: 2000
      }
    },
    {
      id: 'TP-003',
      patientId: 'P-003',
      patientName: '山田 美咲',
      title: '矯正治療・定期検診',
      description: '矯正治療後の定期的なメンテナンス',
      status: 'completed',
      priority: 'low',
      createdDate: '2024-02-28',
      plannedDate: '2024-03-05',
      completedDate: '2024-03-05',
      estimatedDuration: 45,
      actualDuration: 40,
      assignedStaff: '鈴木 恵美 (歯科医師)',
      treatments: ['歯面清掃', '咬合確認', 'リテーナー調整'],
      notes: '矯正治療の結果は良好。患者の満足度も高い。',
      cost: {
        estimated: 3000,
        actual: 3000,
        insurance: 0,
        selfPay: 3000
      }
    },
    {
      id: 'TP-004',
      patientId: 'P-004',
      patientName: '鈴木 一郎',
      title: '義歯製作・調整',
      description: '上顎部分義歯の製作と調整',
      status: 'in-progress',
      priority: 'medium',
      createdDate: '2024-02-20',
      plannedDate: '2024-03-20',
      estimatedDuration: 150,
      assignedStaff: '田中 智子 (歯科医師)',
      treatments: ['印象採得', '義歯製作', '装着・調整'],
      notes: '心疾患の既往歴があるため、治療時間の調整が必要。',
      cost: {
        estimated: 45000,
        insurance: 35000,
        selfPay: 10000
      }
    },
    {
      id: 'TP-005',
      patientId: 'P-005',
      patientName: '高橋 恵美',
      title: '妊娠期歯科治療',
      description: '妊娠中の歯科検診と予防処置',
      status: 'cancelled',
      priority: 'medium',
      createdDate: '2024-03-01',
      plannedDate: '2024-03-12',
      estimatedDuration: 60,
      assignedStaff: '山田 健太 (歯科衛生士)',
      treatments: ['歯科検診', '歯面清掃', 'ブラッシング指導'],
      notes: '患者の都合により治療を中断。出産後の再開を予定。',
      cost: {
        estimated: 5000,
        insurance: 4000,
        selfPay: 1000
      }
    }
  ];

  const getStatusBadge = (status: TreatmentPlan['status']) => {
    switch (status) {
      case 'planned':
        return <span className="inline-flex px-2 py-1 text-xs font-medium rounded-full bg-gray-100 text-gray-800">計画中</span>;
      case 'in-progress':
        return <span className="inline-flex px-2 py-1 text-xs font-medium rounded-full bg-blue-100 text-blue-800">治療中</span>;
      case 'completed':
        return <span className="inline-flex px-2 py-1 text-xs font-medium rounded-full bg-green-100 text-green-800">完了</span>;
      case 'cancelled':
        return <span className="inline-flex px-2 py-1 text-xs font-medium rounded-full bg-red-100 text-red-800">中止</span>;
    }
  };

  const getPriorityBadge = (priority: TreatmentPlan['priority']) => {
    switch (priority) {
      case 'low':
        return <span className="inline-flex px-2 py-1 text-xs font-medium rounded-full bg-green-100 text-green-700">低</span>;
      case 'medium':
        return <span className="inline-flex px-2 py-1 text-xs font-medium rounded-full bg-yellow-100 text-yellow-700">中</span>;
      case 'high':
        return <span className="inline-flex px-2 py-1 text-xs font-medium rounded-full bg-orange-100 text-orange-700">高</span>;
      case 'urgent':
        return <span className="inline-flex px-2 py-1 text-xs font-medium rounded-full bg-red-100 text-red-700">緊急</span>;
    }
  };

  const getStatusIcon = (status: TreatmentPlan['status']) => {
    switch (status) {
      case 'planned':
        return <Calendar className="h-4 w-4 text-gray-600" />;
      case 'in-progress':
        return <Clock className="h-4 w-4 text-blue-600" />;
      case 'completed':
        return <CheckCircle className="h-4 w-4 text-green-600" />;
      case 'cancelled':
        return <AlertCircle className="h-4 w-4 text-red-600" />;
    }
  };

  const filteredAndSortedPlans = treatmentPlans
    .filter(plan => {
      const matchesSearch = plan.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          plan.patientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          plan.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          plan.id.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesStatus = statusFilter === 'all' || plan.status === statusFilter;
      const matchesPriority = priorityFilter === 'all' || plan.priority === priorityFilter;
      return matchesSearch && matchesStatus && matchesPriority;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case 'plannedDate':
          return new Date(a.plannedDate).getTime() - new Date(b.plannedDate).getTime();
        case 'createdDate':
          return new Date(b.createdDate).getTime() - new Date(a.createdDate).getTime();
        case 'priority':
          const priorityOrder = { urgent: 4, high: 3, medium: 2, low: 1 };
          return priorityOrder[b.priority] - priorityOrder[a.priority];
        case 'patientName':
          return a.patientName.localeCompare(b.patientName, 'ja');
        default:
          return 0;
      }
    });

  return (
    <div className="min-h-screen bg-gray-50">
      <StaffHeader />

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 py-8">
        {/* Page Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-800 mb-2">診療計画管理</h1>
              <p className="text-gray-600">患者の診療計画を作成・管理し、治療の進捗を追跡できます</p>
            </div>
            <Link 
              href="/staff/treatment-plans/new"
              className="flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
            >
              <Plus className="h-4 w-4" />
              <span>新規計画作成</span>
            </Link>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow border p-6">
            <div className="flex items-center">
              <div className="p-2 bg-blue-100 rounded-lg">
                <FileText className="h-6 w-6 text-blue-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">総計画数</p>
                <p className="text-2xl font-bold text-gray-900">{treatmentPlans.length}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow border p-6">
            <div className="flex items-center">
              <div className="p-2 bg-yellow-100 rounded-lg">
                <Clock className="h-6 w-6 text-yellow-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">治療中</p>
                <p className="text-2xl font-bold text-gray-900">
                  {treatmentPlans.filter(p => p.status === 'in-progress').length}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow border p-6">
            <div className="flex items-center">
              <div className="p-2 bg-green-100 rounded-lg">
                <CheckCircle className="h-6 w-6 text-green-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">完了</p>
                <p className="text-2xl font-bold text-gray-900">
                  {treatmentPlans.filter(p => p.status === 'completed').length}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow border p-6">
            <div className="flex items-center">
              <div className="p-2 bg-red-100 rounded-lg">
                <AlertCircle className="h-6 w-6 text-red-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">緊急</p>
                <p className="text-2xl font-bold text-gray-900">
                  {treatmentPlans.filter(p => p.priority === 'urgent').length}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Search and Filter */}
        <div className="bg-white rounded-lg shadow border mb-6">
          <div className="p-4">
            <div className="flex flex-col lg:flex-row gap-4">
              {/* Search */}
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  <input
                    type="text"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                    placeholder="計画名、患者名、計画IDで検索..."
                  />
                </div>
              </div>

              {/* Status Filter */}
              <div className="lg:w-48">
                <div className="relative">
                  <Filter className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  <select
                    value={statusFilter}
                    onChange={(e) => setStatusFilter(e.target.value as any)}
                    className="block w-full pl-10 pr-8 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 appearance-none"
                  >
                    <option value="all">全てのステータス</option>
                    <option value="planned">計画中</option>
                    <option value="in-progress">治療中</option>
                    <option value="completed">完了</option>
                    <option value="cancelled">中止</option>
                  </select>
                  <ChevronDown className="absolute right-3 top-3 h-4 w-4 text-gray-400 pointer-events-none" />
                </div>
              </div>

              {/* Priority Filter */}
              <div className="lg:w-48">
                <div className="relative">
                  <select
                    value={priorityFilter}
                    onChange={(e) => setPriorityFilter(e.target.value as any)}
                    className="block w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 appearance-none"
                  >
                    <option value="all">全ての優先度</option>
                    <option value="urgent">緊急</option>
                    <option value="high">高</option>
                    <option value="medium">中</option>
                    <option value="low">低</option>
                  </select>
                  <ChevronDown className="absolute right-3 top-3 h-4 w-4 text-gray-400 pointer-events-none" />
                </div>
              </div>

              {/* Sort */}
              <div className="lg:w-48">
                <div className="relative">
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value as any)}
                    className="block w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 appearance-none"
                  >
                    <option value="plannedDate">予定日順</option>
                    <option value="createdDate">作成日順</option>
                    <option value="priority">優先度順</option>
                    <option value="patientName">患者名順</option>
                  </select>
                  <ChevronDown className="absolute right-3 top-3 h-4 w-4 text-gray-400 pointer-events-none" />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Treatment Plans List */}
        <div className="space-y-4">
          {filteredAndSortedPlans.map((plan) => (
            <div key={plan.id} className="bg-white rounded-lg shadow border hover:shadow-md transition-shadow">
              <div className="p-6">
                {/* Header */}
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-start space-x-4">
                    <div className="p-2 bg-blue-100 rounded-lg">
                      {getStatusIcon(plan.status)}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center space-x-3 mb-2">
                        <h3 className="text-lg font-semibold text-gray-800">{plan.title}</h3>
                        {getStatusBadge(plan.status)}
                        {getPriorityBadge(plan.priority)}
                      </div>
                      <div className="flex items-center space-x-4 text-sm text-gray-600 mb-2">
                        <span className="flex items-center">
                          <User className="h-4 w-4 mr-1" />
                          {plan.patientName}
                        </span>
                        <span>計画ID: {plan.id}</span>
                        <span>担当: {plan.assignedStaff}</span>
                      </div>
                      <p className="text-sm text-gray-600">{plan.description}</p>
                    </div>
                  </div>
                </div>

                {/* Treatment Details */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-4">
                  <div>
                    <p className="text-sm font-medium text-gray-700 mb-1">予定日</p>
                    <p className="text-sm text-gray-600">{new Date(plan.plannedDate).toLocaleDateString('ja-JP')}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-700 mb-1">予定時間</p>
                    <p className="text-sm text-gray-600">{plan.estimatedDuration}分</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-700 mb-1">費用見積</p>
                    <p className="text-sm text-gray-600">¥{plan.cost.estimated.toLocaleString()}</p>
                  </div>
                </div>

                {/* Treatment List */}
                <div className="mb-4">
                  <p className="text-sm font-medium text-gray-700 mb-2">治療内容</p>
                  <div className="flex flex-wrap gap-2">
                    {plan.treatments.map((treatment, index) => (
                      <span key={index} className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded">
                        {treatment}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Progress and Notes */}
                {plan.notes && (
                  <div className="bg-gray-50 rounded-lg p-3 mb-4">
                    <p className="text-sm font-medium text-gray-700 mb-1">備考</p>
                    <p className="text-sm text-gray-600">{plan.notes}</p>
                  </div>
                )}

                {/* Actions */}
                <div className="flex items-center justify-between">
                  <div className="text-xs text-gray-500">
                    作成日: {new Date(plan.createdDate).toLocaleDateString('ja-JP')}
                  </div>
                  <div className="flex space-x-2">
                    <Link
                      href={`/staff/patients/${plan.patientId}`}
                      className="flex items-center space-x-1 text-blue-600 text-sm font-medium hover:text-blue-700"
                    >
                      <User className="h-4 w-4" />
                      <span>患者詳細</span>
                    </Link>
                    <button className="flex items-center space-x-1 text-green-600 text-sm font-medium hover:text-green-700">
                      <Edit3 className="h-4 w-4" />
                      <span>編集</span>
                    </button>
                    <button className="flex items-center space-x-1 text-purple-600 text-sm font-medium hover:text-purple-700">
                      <Calendar className="h-4 w-4" />
                      <span>予約</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredAndSortedPlans.length === 0 && (
          <div className="text-center py-12">
            <FileText className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-600 mb-4">検索条件に一致する診療計画が見つかりませんでした</p>
            <button
              onClick={() => {
                setSearchTerm('');
                setStatusFilter('all');
                setPriorityFilter('all');
              }}
              className="text-blue-600 text-sm font-medium hover:text-blue-700"
            >
              フィルターをリセット
            </button>
          </div>
        )}
      </main>
    </div>
  );
} 