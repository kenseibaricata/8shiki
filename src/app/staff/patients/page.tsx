'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import StaffHeader from '../../components/StaffHeader';
import { 
  Search, 
  Filter,
  Users,
  Plus,
  Eye,
  Edit3,
  Calendar,
  Phone,
  Mail,
  MapPin,
  AlertTriangle,
  ChevronDown,
  ArrowRight,
  User
} from 'lucide-react';

interface Patient {
  id: string;
  name: string;
  age: number;
  gender: 'male' | 'female';
  phone: string;
  email: string;
  address: string;
  lastVisit: string;
  nextAppointment?: string;
  treatmentStatus: 'active' | 'completed' | 'cancelled';
  emergencyContact: string;
  medicalAlerts: string[];
  insuranceType: string;
}

export default function PatientsPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<'all' | 'active' | 'completed' | 'cancelled'>('all');
  const [sortBy, setSortBy] = useState<'name' | 'lastVisit' | 'nextAppointment'>('name');
  const [selectedPatient, setSelectedPatient] = useState<Patient | null>(null);

  // サンプル患者データ
  const patients: Patient[] = [
    {
      id: 'P-001',
      name: '田中 花子',
      age: 35,
      gender: 'female',
      phone: '090-1234-5678',
      email: 'tanaka@example.com',
      address: '福岡県大野城市中央1-2-3',
      lastVisit: '2024-03-10',
      nextAppointment: '2024-03-17',
      treatmentStatus: 'active',
      emergencyContact: '田中太郎 (夫) - 090-9876-5432',
      medicalAlerts: ['ペニシリンアレルギー', '高血圧'],
      insuranceType: '協会けんぽ'
    },
    {
      id: 'P-002',
      name: '佐藤 次郎',
      age: 42,
      gender: 'male',
      phone: '080-2345-6789',
      email: 'sato@example.com',
      address: '福岡県春日市白水1-4-5',
      lastVisit: '2024-03-08',
      nextAppointment: '2024-03-22',
      treatmentStatus: 'active',
      emergencyContact: '佐藤花子 (妻) - 080-1111-2222',
      medicalAlerts: ['糖尿病'],
      insuranceType: '国民健康保険'
    },
    {
      id: 'P-003',
      name: '山田 美咲',
      age: 28,
      gender: 'female',
      phone: '070-3456-7890',
      email: 'yamada@example.com',
      address: '福岡県大野城市南1-6-7',
      lastVisit: '2024-03-05',
      treatmentStatus: 'completed',
      emergencyContact: '山田健一 (父) - 070-3333-4444',
      medicalAlerts: [],
      insuranceType: '健康保険組合'
    },
    {
      id: 'P-004',
      name: '鈴木 一郎',
      age: 56,
      gender: 'male',
      phone: '090-4567-8901',
      email: 'suzuki@example.com',
      address: '福岡県筑紫野市二日市2-8-9',
      lastVisit: '2024-02-28',
      nextAppointment: '2024-03-20',
      treatmentStatus: 'active',
      emergencyContact: '鈴木恵子 (妻) - 090-5555-6666',
      medicalAlerts: ['甲殻類アレルギー', '心疾患'],
      insuranceType: '協会けんぽ'
    },
    {
      id: 'P-005',
      name: '高橋 恵美',
      age: 31,
      gender: 'female',
      phone: '080-5678-9012',
      email: 'takahashi@example.com',
      address: '福岡県太宰府市五条3-10-11',
      lastVisit: '2024-03-12',
      treatmentStatus: 'cancelled',
      emergencyContact: '高橋信也 (夫) - 080-7777-8888',
      medicalAlerts: ['妊娠中'],
      insuranceType: '国民健康保険'
    }
  ];

  const getStatusBadge = (status: Patient['treatmentStatus']) => {
    switch (status) {
      case 'active':
        return <span className="inline-flex px-2 py-1 text-xs font-medium rounded-full bg-green-100 text-green-800">治療中</span>;
      case 'completed':
        return <span className="inline-flex px-2 py-1 text-xs font-medium rounded-full bg-blue-100 text-blue-800">完了</span>;
      case 'cancelled':
        return <span className="inline-flex px-2 py-1 text-xs font-medium rounded-full bg-red-100 text-red-800">中断</span>;
    }
  };

  const filteredAndSortedPatients = patients
    .filter(patient => {
      const matchesSearch = patient.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          patient.phone.includes(searchTerm) ||
                          patient.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          patient.id.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesStatus = statusFilter === 'all' || patient.treatmentStatus === statusFilter;
      return matchesSearch && matchesStatus;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case 'name':
          return a.name.localeCompare(b.name, 'ja');
        case 'lastVisit':
          return new Date(b.lastVisit).getTime() - new Date(a.lastVisit).getTime();
        case 'nextAppointment':
          if (!a.nextAppointment && !b.nextAppointment) return 0;
          if (!a.nextAppointment) return 1;
          if (!b.nextAppointment) return -1;
          return new Date(a.nextAppointment).getTime() - new Date(b.nextAppointment).getTime();
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
              <h1 className="text-2xl font-bold text-gray-800 mb-2">患者管理</h1>
              <p className="text-gray-600">患者情報の管理と診療履歴を確認できます</p>
            </div>
            <Link 
              href="/staff/patients/new"
              className="flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
            >
              <Plus className="h-4 w-4" />
              <span>新規患者登録</span>
            </Link>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow border p-6">
            <div className="flex items-center">
              <div className="p-2 bg-blue-100 rounded-lg">
                <Users className="h-6 w-6 text-blue-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">総患者数</p>
                <p className="text-2xl font-bold text-gray-900">{patients.length}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow border p-6">
            <div className="flex items-center">
              <div className="p-2 bg-green-100 rounded-lg">
                <Calendar className="h-6 w-6 text-green-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">治療中</p>
                <p className="text-2xl font-bold text-gray-900">
                  {patients.filter(p => p.treatmentStatus === 'active').length}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow border p-6">
            <div className="flex items-center">
              <div className="p-2 bg-purple-100 rounded-lg">
                <Calendar className="h-6 w-6 text-purple-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">本日の予約</p>
                <p className="text-2xl font-bold text-gray-900">
                  {patients.filter(p => p.nextAppointment === new Date().toISOString().split('T')[0]).length}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow border p-6">
            <div className="flex items-center">
              <div className="p-2 bg-yellow-100 rounded-lg">
                <AlertTriangle className="h-6 w-6 text-yellow-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">医療アラート</p>
                <p className="text-2xl font-bold text-gray-900">
                  {patients.filter(p => p.medicalAlerts.length > 0).length}
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
                    placeholder="患者名、ID、電話番号、メールアドレスで検索..."
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
                    <option value="all">全ての患者</option>
                    <option value="active">治療中</option>
                    <option value="completed">治療完了</option>
                    <option value="cancelled">治療中断</option>
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
                    <option value="name">名前順</option>
                    <option value="lastVisit">最終来院日順</option>
                    <option value="nextAppointment">次回予約順</option>
                  </select>
                  <ChevronDown className="absolute right-3 top-3 h-4 w-4 text-gray-400 pointer-events-none" />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Patient List */}
        <div className="space-y-4">
          {filteredAndSortedPatients.map((patient) => (
            <div key={patient.id} className="bg-white rounded-lg shadow border hover:shadow-md transition-shadow">
              <div className="p-6">
                {/* Header */}
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                      <User className="h-6 w-6 text-blue-600" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-gray-800">{patient.name}</h3>
                      <div className="flex items-center space-x-4 text-sm text-gray-600">
                        <span>患者ID: {patient.id}</span>
                        <span>{patient.age}歳 ({patient.gender === 'male' ? '男性' : '女性'})</span>
                        <span>{patient.insuranceType}</span>
                      </div>
                      {patient.medicalAlerts.length > 0 && (
                        <div className="flex items-center space-x-2 mt-2">
                          <AlertTriangle className="h-4 w-4 text-yellow-600" />
                          <div className="flex flex-wrap gap-1">
                            {patient.medicalAlerts.map((alert, index) => (
                              <span key={index} className="text-xs bg-yellow-100 text-yellow-800 px-2 py-1 rounded">
                                {alert}
                              </span>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    {getStatusBadge(patient.treatmentStatus)}
                  </div>
                </div>

                {/* Contact Info */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-4">
                  <div className="flex items-center space-x-2 text-sm text-gray-600">
                    <Phone className="h-4 w-4" />
                    <span>{patient.phone}</span>
                  </div>
                  <div className="flex items-center space-x-2 text-sm text-gray-600">
                    <Mail className="h-4 w-4" />
                    <span>{patient.email}</span>
                  </div>
                  <div className="flex items-center space-x-2 text-sm text-gray-600">
                    <MapPin className="h-4 w-4" />
                    <span>{patient.address}</span>
                  </div>
                </div>

                {/* Treatment Info */}
                <div className="bg-gray-50 rounded-lg p-3 mb-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="font-medium text-gray-700">最終来院:</span>
                      <span className="ml-2 text-gray-600">{new Date(patient.lastVisit).toLocaleDateString('ja-JP')}</span>
                    </div>
                    {patient.nextAppointment && (
                      <div>
                        <span className="font-medium text-gray-700">次回予約:</span>
                        <span className="ml-2 text-gray-600">{new Date(patient.nextAppointment).toLocaleDateString('ja-JP')}</span>
                      </div>
                    )}
                  </div>
                  <div className="mt-2 text-sm">
                    <span className="font-medium text-gray-700">緊急連絡先:</span>
                    <span className="ml-2 text-gray-600">{patient.emergencyContact}</span>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex items-center justify-between">
                  <div className="text-xs text-gray-500">
                    患者ID: {patient.id}
                  </div>
                  <div className="flex space-x-2">
                    <Link
                      href={`/staff/patients/${patient.id}`}
                      className="flex items-center space-x-1 text-blue-600 text-sm font-medium hover:text-blue-700"
                    >
                      <Eye className="h-4 w-4" />
                      <span>詳細</span>
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

        {filteredAndSortedPatients.length === 0 && (
          <div className="text-center py-12">
            <Users className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-600 mb-4">検索条件に一致する患者が見つかりませんでした</p>
            <button
              onClick={() => {
                setSearchTerm('');
                setStatusFilter('all');
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