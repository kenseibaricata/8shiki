'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { 
  ArrowLeft, 
  Users, 
  Search,
  UserCheck,
  UserX,
  Edit3,
  Trash2,
  Mail,
  Shield,
  CheckCircle,
  AlertCircle,
  Clock,
  Plus,
  MoreVertical
} from 'lucide-react';
import StaffHeader from '../../components/StaffHeader';

interface StaffMember {
  id: string;
  name: string;
  email: string;
  role: string;
  status: 'pending' | 'approved' | 'suspended';
  joinDate: string;
  lastLogin: string;
  permissions: string[];
}

export default function StaffManagementPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState<'all' | 'pending' | 'approved' | 'suspended'>('all');
  const [selectedStaff, setSelectedStaff] = useState<StaffMember | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // サンプルスタッフデータ
  const [staffMembers, setStaffMembers] = useState<StaffMember[]>([
    {
      id: '1',
      name: '田中 智子',
      email: 'tanaka@hachi-dental.com',
      role: '歯科医師',
      status: 'approved',
      joinDate: '2024-01-15',
      lastLogin: '2024-03-10 14:30',
      permissions: ['患者管理', '診療計画', 'チャット管理']
    },
    {
      id: '2',
      name: '山田 健太',
      email: 'yamada@hachi-dental.com',
      role: '歯科衛生士',
      status: 'approved',
      joinDate: '2024-02-01',
      lastLogin: '2024-03-09 16:15',
      permissions: ['患者管理', 'チャット管理']
    },
    {
      id: '3',
      name: '佐藤 美咲',
      email: 'sato@hachi-dental.com',
      role: '受付事務',
      status: 'pending',
      joinDate: '2024-03-08',
      lastLogin: '-',
      permissions: []
    },
    {
      id: '4',
      name: '高橋 正男',
      email: 'takahashi@hachi-dental.com',
      role: '院長',
      status: 'approved',
      joinDate: '2024-01-01',
      lastLogin: '2024-03-10 09:00',
      permissions: ['患者管理', '診療計画', 'チャット管理', 'スタッフ管理', '院内設定']
    },
    {
      id: '5',
      name: '伊藤 花音',
      email: 'ito@hachi-dental.com',
      role: '歯科助手',
      status: 'suspended',
      joinDate: '2024-01-20',
      lastLogin: '2024-02-28 17:45',
      permissions: []
    }
  ]);

  const approveStaff = (staffId: string) => {
    setStaffMembers(prev => 
      prev.map(staff => 
        staff.id === staffId 
          ? { ...staff, status: 'approved' as const, permissions: getDefaultPermissions(staff.role) }
          : staff
      )
    );
  };

  const suspendStaff = (staffId: string) => {
    setStaffMembers(prev => 
      prev.map(staff => 
        staff.id === staffId 
          ? { ...staff, status: 'suspended' as const, permissions: [] }
          : staff
      )
    );
  };

  const deleteStaff = (staffId: string) => {
    if (window.confirm('このスタッフを削除してもよろしいですか？')) {
      setStaffMembers(prev => prev.filter(staff => staff.id !== staffId));
    }
  };

  const getDefaultPermissions = (role: string): string[] => {
    switch (role) {
      case '院長':
        return ['患者管理', '診療計画', 'チャット管理', 'スタッフ管理', '院内設定'];
      case '歯科医師':
        return ['患者管理', '診療計画', 'チャット管理'];
      case '歯科衛生士':
        return ['患者管理', 'チャット管理'];
      case '受付事務':
        return ['患者管理'];
      case '歯科助手':
        return ['患者管理'];
      default:
        return [];
    }
  };

  const getStatusBadge = (status: StaffMember['status']) => {
    switch (status) {
      case 'approved':
        return <span className="inline-flex px-2 py-1 text-xs font-medium rounded-full bg-green-100 text-green-800">承認済み</span>;
      case 'pending':
        return <span className="inline-flex px-2 py-1 text-xs font-medium rounded-full bg-yellow-100 text-yellow-800">承認待ち</span>;
      case 'suspended':
        return <span className="inline-flex px-2 py-1 text-xs font-medium rounded-full bg-red-100 text-red-800">停止中</span>;
    }
  };

  const getStatusIcon = (status: StaffMember['status']) => {
    switch (status) {
      case 'approved':
        return <CheckCircle className="h-4 w-4 text-green-600" />;
      case 'pending':
        return <Clock className="h-4 w-4 text-yellow-600" />;
      case 'suspended':
        return <AlertCircle className="h-4 w-4 text-red-600" />;
    }
  };

  const getRoleBadgeColor = (role: string) => {
    switch (role) {
      case '院長':
        return 'bg-purple-100 text-purple-800';
      case '歯科医師':
        return 'bg-blue-100 text-blue-800';
      case '歯科衛生士':
        return 'bg-green-100 text-green-800';
      case '受付事務':
        return 'bg-orange-100 text-orange-800';
      case '歯科助手':
        return 'bg-gray-100 text-gray-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const filteredStaff = staffMembers.filter(staff => {
    const matchesSearch = staff.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         staff.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         staff.role.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filterStatus === 'all' || staff.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  const pendingCount = staffMembers.filter(s => s.status === 'pending').length;
  const approvedCount = staffMembers.filter(s => s.status === 'approved').length;
  const suspendedCount = staffMembers.filter(s => s.status === 'suspended').length;

  return (
    <div className="min-h-screen bg-gray-50">
      <StaffHeader />

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 py-8">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-white rounded-lg p-4 shadow border">
            <div className="flex items-center">
              <div className="p-2 bg-indigo-100 rounded-lg">
                <Users className="h-5 w-5 text-indigo-600" />
              </div>
              <div className="ml-3">
                <p className="text-lg font-bold text-gray-800">{staffMembers.length}</p>
                <p className="text-xs text-gray-600">総スタッフ数</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg p-4 shadow border">
            <div className="flex items-center">
              <div className="p-2 bg-green-100 rounded-lg">
                <CheckCircle className="h-5 w-5 text-green-600" />
              </div>
              <div className="ml-3">
                <p className="text-lg font-bold text-gray-800">{approvedCount}</p>
                <p className="text-xs text-gray-600">承認済み</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg p-4 shadow border">
            <div className="flex items-center">
              <div className="p-2 bg-yellow-100 rounded-lg">
                <Clock className="h-5 w-5 text-yellow-600" />
              </div>
              <div className="ml-3">
                <p className="text-lg font-bold text-gray-800">{pendingCount}</p>
                <p className="text-xs text-gray-600">承認待ち</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg p-4 shadow border">
            <div className="flex items-center">
              <div className="p-2 bg-red-100 rounded-lg">
                <AlertCircle className="h-5 w-5 text-red-600" />
              </div>
              <div className="ml-3">
                <p className="text-lg font-bold text-gray-800">{suspendedCount}</p>
                <p className="text-xs text-gray-600">停止中</p>
              </div>
            </div>
          </div>
        </div>

        {/* Filter and Search */}
        <div className="bg-white rounded-lg shadow border mb-6">
          <div className="px-6 py-4 border-b border-gray-200">
            <div className="flex items-center justify-between">
              <h1 className="text-xl font-semibold text-gray-800">はち歯科医院 スタッフ管理</h1>
              <button
                onClick={() => alert('新規スタッフ招待機能（デモ）')}
                className="flex items-center space-x-2 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
              >
                <Plus className="h-4 w-4" />
                <span>スタッフを招待</span>
              </button>
            </div>
          </div>

          <div className="px-6 py-4 bg-gray-50">
            <div className="flex flex-col md:flex-row md:items-center space-y-4 md:space-y-0 md:space-x-4">
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  <input
                    type="text"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500"
                    placeholder="スタッフ名、メールアドレス、役職で検索..."
                  />
                </div>
              </div>
              
              <div className="flex space-x-2">
                <select
                  value={filterStatus}
                  onChange={(e) => setFilterStatus(e.target.value as any)}
                  className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500"
                >
                  <option value="all">すべてのステータス</option>
                  <option value="approved">承認済み</option>
                  <option value="pending">承認待ち</option>
                  <option value="suspended">停止中</option>
                </select>
              </div>
            </div>
          </div>
        </div>

        {/* Staff List */}
        <div className="bg-white rounded-lg shadow border">
          <div className="p-6">
            <div className="space-y-4">
              {filteredStaff.map((staff) => (
                <div key={staff.id} className="border border-gray-200 rounded-lg p-4 hover:bg-gray-50 transition-colors">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <div className="w-12 h-12 bg-indigo-100 rounded-full flex items-center justify-center">
                        <span className="text-lg font-semibold text-indigo-600">
                          {staff.name.charAt(0)}
                        </span>
                      </div>
                      
                      <div>
                        <div className="flex items-center space-x-3 mb-1">
                          <h3 className="font-medium text-gray-800">{staff.name}</h3>
                          <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${getRoleBadgeColor(staff.role)}`}>
                            {staff.role}
                          </span>
                          {getStatusBadge(staff.status)}
                        </div>
                        
                        <div className="flex items-center space-x-2 text-sm text-gray-600 mb-2">
                          <Mail className="h-3 w-3" />
                          <span>{staff.email}</span>
                        </div>
                        
                        <div className="flex items-center space-x-4 text-xs text-gray-500">
                          <span>入社: {staff.joinDate}</span>
                          <span>最終ログイン: {staff.lastLogin}</span>
                        </div>
                        
                        {staff.permissions.length > 0 && (
                          <div className="mt-2">
                            <div className="flex items-center space-x-1 text-xs">
                              <Shield className="h-3 w-3 text-gray-400" />
                              <span className="text-gray-500">権限: </span>
                              <div className="flex flex-wrap gap-1">
                                {staff.permissions.map((permission) => (
                                  <span
                                    key={permission}
                                    className="inline-flex px-1.5 py-0.5 bg-blue-100 text-blue-700 rounded text-xs"
                                  >
                                    {permission}
                                  </span>
                                ))}
                              </div>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>

                    <div className="flex items-center space-x-2">
                      {staff.status === 'pending' && (
                        <button
                          onClick={() => approveStaff(staff.id)}
                          className="p-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                          title="承認"
                        >
                          <UserCheck className="h-4 w-4" />
                        </button>
                      )}
                      
                      {staff.status === 'approved' && (
                        <button
                          onClick={() => suspendStaff(staff.id)}
                          className="p-2 bg-yellow-600 text-white rounded-lg hover:bg-yellow-700 transition-colors"
                          title="停止"
                        >
                          <UserX className="h-4 w-4" />
                        </button>
                      )}
                      
                      {staff.status === 'suspended' && (
                        <button
                          onClick={() => approveStaff(staff.id)}
                          className="p-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                          title="再開"
                        >
                          <UserCheck className="h-4 w-4" />
                        </button>
                      )}
                      
                      <button
                        onClick={() => {
                          setSelectedStaff(staff);
                          setIsModalOpen(true);
                        }}
                        className="p-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
                        title="編集"
                      >
                        <Edit3 className="h-4 w-4" />
                      </button>
                      
                      <button
                        onClick={() => deleteStaff(staff.id)}
                        className="p-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
                        title="削除"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {filteredStaff.length === 0 && (
              <div className="text-center py-8">
                <Users className="h-12 w-12 text-gray-300 mx-auto mb-4" />
                <p className="text-gray-500">該当するスタッフが見つかりません</p>
              </div>
            )}
          </div>
        </div>

        {/* 注意事項 */}
        <div className="mt-6 bg-blue-50 border border-blue-200 rounded-lg p-4">
          <div className="flex items-start space-x-3">
            <Shield className="h-5 w-5 text-blue-600 mt-0.5" />
            <div className="text-sm text-blue-800">
              <h3 className="font-medium mb-2">🏥 スタッフ管理について</h3>
              <ul className="space-y-1 text-xs">
                <li>• 新規スタッフは管理者による承認が必要です</li>
                <li>• 承認されたスタッフには歯知式へのアクセス権限が付与されます</li>
                <li>• 役職に応じて適切な権限を設定してください</li>
                <li>• 停止されたスタッフはシステムにアクセスできません</li>
                <li>• 削除されたスタッフは完全にシステムから除外されます</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Demo Info */}
        <div className="mt-6 p-4 bg-yellow-50 rounded-lg border border-yellow-200">
          <p className="text-sm text-yellow-800 text-center">
            <strong>🎨 デモ用:</strong> 承認待ちスタッフを承認、停止中スタッフを再開、編集・削除が可能です
          </p>
        </div>
      </main>

      {/* Edit Modal (simplified demo) */}
      {isModalOpen && selectedStaff && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">スタッフ編集</h3>
            <p className="text-sm text-gray-600 mb-4">
              {selectedStaff.name}の情報を編集
            </p>
            <div className="flex justify-end space-x-3">
              <button
                onClick={() => setIsModalOpen(false)}
                className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
              >
                キャンセル
              </button>
              <button
                onClick={() => {
                  alert('編集機能はデモ版では実装されていません');
                  setIsModalOpen(false);
                }}
                className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
              >
                保存
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
} 