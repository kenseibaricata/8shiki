'use client';

import React, { useState } from 'react';
import PatientHeader from '../../components/PatientHeader';
import { 
  User,
  Edit3,
  Save,
  X,
  Phone,
  Mail,
  MapPin,
  Calendar,
  Shield,
  Bell,
  Heart,
  AlertTriangle
} from 'lucide-react';

interface PatientProfile {
  id: string;
  name: string;
  email: string;
  phone: string;
  address: string;
  birthDate: string;
  emergencyContact: {
    name: string;
    relationship: string;
    phone: string;
  };
  medicalHistory: string[];
  allergies: string[];
  medications: string[];
  insuranceInfo: {
    provider: string;
    policyNumber: string;
    expiryDate: string;
  };
  preferences: {
    notifications: {
      email: boolean;
      sms: boolean;
      appointment: boolean;
      reminder: boolean;
    };
    language: string;
    preferredContactTime: string;
  };
}

export default function PatientProfilePage() {
  const [isEditing, setIsEditing] = useState(false);
  const [profile, setProfile] = useState<PatientProfile>({
    id: 'P-001',
    name: '田中 花子',
    email: 'tanaka.hanako@example.com',
    phone: '090-1234-5678',
    address: '福岡県大野城市中央1-2-3 マンション101',
    birthDate: '1989-05-15',
    emergencyContact: {
      name: '田中 太郎',
      relationship: '夫',
      phone: '090-9876-5432'
    },
    medicalHistory: [
      '高血圧 (2020年～)',
      '花粉症',
      '軽度の糖尿病 (2022年～)'
    ],
    allergies: [
      'ペニシリン',
      '甲殻類'
    ],
    medications: [
      'ロサルタン 50mg (降圧薬)',
      'メトホルミン 500mg (糖尿病薬)'
    ],
    insuranceInfo: {
      provider: '協会けんぽ',
      policyNumber: '12345678-90',
      expiryDate: '2025-03-31'
    },
    preferences: {
      notifications: {
        email: true,
        sms: true,
        appointment: true,
        reminder: true
      },
      language: 'ja',
      preferredContactTime: '平日 9:00-17:00'
    }
  });

  const [editedProfile, setEditedProfile] = useState<PatientProfile>(profile);

  const handleSave = () => {
    setProfile(editedProfile);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditedProfile(profile);
    setIsEditing(false);
  };

  const updateProfile = (field: string, value: string) => {
    setEditedProfile(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const updateNestedProfile = (section: string, field: string, value: string) => {
    setEditedProfile(prev => ({
      ...prev,
      [section]: {
        ...(prev[section as keyof PatientProfile] as object),
        [field]: value
      }
    }));
  };

  const updateNotificationSettings = (setting: string, value: boolean) => {
    setEditedProfile(prev => ({
      ...prev,
      preferences: {
        ...prev.preferences,
        notifications: {
          ...prev.preferences.notifications,
          [setting]: value
        }
      }
    }));
  };

  const currentProfile = isEditing ? editedProfile : profile;

  return (
    <div className="min-h-screen bg-gray-50">
      <PatientHeader />

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-4 py-8">
        {/* Page Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-800 mb-2">プロフィール</h1>
              <p className="text-gray-600">個人情報と設定を管理できます</p>
            </div>
            <div>
              {!isEditing ? (
                <button
                  onClick={() => setIsEditing(true)}
                  className="flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                >
                  <Edit3 className="h-4 w-4" />
                  <span>編集</span>
                </button>
              ) : (
                <div className="flex space-x-2">
                  <button
                    onClick={handleSave}
                    className="flex items-center space-x-2 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors"
                  >
                    <Save className="h-4 w-4" />
                    <span>保存</span>
                  </button>
                  <button
                    onClick={handleCancel}
                    className="flex items-center space-x-2 bg-gray-600 text-white px-4 py-2 rounded-lg hover:bg-gray-700 transition-colors"
                  >
                    <X className="h-4 w-4" />
                    <span>キャンセル</span>
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="space-y-6">
          {/* Basic Information */}
          <div className="bg-white rounded-lg shadow border">
            <div className="px-6 py-4 border-b border-gray-200">
              <div className="flex items-center space-x-2">
                <User className="h-5 w-5 text-blue-600" />
                <h3 className="text-lg font-semibold text-gray-800">基本情報</h3>
              </div>
            </div>
            <div className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">氏名</label>
                  {isEditing ? (
                    <input
                      type="text"
                      value={currentProfile.name}
                      onChange={(e) => updateProfile('name', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                    />
                  ) : (
                    <p className="text-gray-800">{currentProfile.name}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">生年月日</label>
                  {isEditing ? (
                    <input
                      type="date"
                      value={currentProfile.birthDate}
                      onChange={(e) => updateProfile('birthDate', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                    />
                  ) : (
                    <p className="text-gray-800">{new Date(currentProfile.birthDate).toLocaleDateString('ja-JP')}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">メールアドレス</label>
                  {isEditing ? (
                    <input
                      type="email"
                      value={currentProfile.email}
                      onChange={(e) => updateProfile('email', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                    />
                  ) : (
                    <div className="flex items-center space-x-2">
                      <Mail className="h-4 w-4 text-gray-400" />
                      <p className="text-gray-800">{currentProfile.email}</p>
                    </div>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">電話番号</label>
                  {isEditing ? (
                    <input
                      type="tel"
                      value={currentProfile.phone}
                      onChange={(e) => updateProfile('phone', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                    />
                  ) : (
                    <div className="flex items-center space-x-2">
                      <Phone className="h-4 w-4 text-gray-400" />
                      <p className="text-gray-800">{currentProfile.phone}</p>
                    </div>
                  )}
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-2">住所</label>
                  {isEditing ? (
                    <input
                      type="text"
                      value={currentProfile.address}
                      onChange={(e) => updateProfile('address', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                    />
                  ) : (
                    <div className="flex items-center space-x-2">
                      <MapPin className="h-4 w-4 text-gray-400" />
                      <p className="text-gray-800">{currentProfile.address}</p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Emergency Contact */}
          <div className="bg-white rounded-lg shadow border">
            <div className="px-6 py-4 border-b border-gray-200">
              <div className="flex items-center space-x-2">
                <AlertTriangle className="h-5 w-5 text-red-600" />
                <h3 className="text-lg font-semibold text-gray-800">緊急連絡先</h3>
              </div>
            </div>
            <div className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">氏名</label>
                  {isEditing ? (
                    <input
                      type="text"
                      value={currentProfile.emergencyContact.name}
                      onChange={(e) => updateNestedProfile('emergencyContact', 'name', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                    />
                  ) : (
                    <p className="text-gray-800">{currentProfile.emergencyContact.name}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">続柄</label>
                  {isEditing ? (
                    <input
                      type="text"
                      value={currentProfile.emergencyContact.relationship}
                      onChange={(e) => updateNestedProfile('emergencyContact', 'relationship', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                    />
                  ) : (
                    <p className="text-gray-800">{currentProfile.emergencyContact.relationship}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">電話番号</label>
                  {isEditing ? (
                    <input
                      type="tel"
                      value={currentProfile.emergencyContact.phone}
                      onChange={(e) => updateNestedProfile('emergencyContact', 'phone', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                    />
                  ) : (
                    <div className="flex items-center space-x-2">
                      <Phone className="h-4 w-4 text-gray-400" />
                      <p className="text-gray-800">{currentProfile.emergencyContact.phone}</p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Medical Information */}
          <div className="bg-white rounded-lg shadow border">
            <div className="px-6 py-4 border-b border-gray-200">
              <div className="flex items-center space-x-2">
                <Heart className="h-5 w-5 text-red-600" />
                <h3 className="text-lg font-semibold text-gray-800">医療情報</h3>
              </div>
            </div>
            <div className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">既往歴</label>
                  <div className="space-y-1">
                    {currentProfile.medicalHistory.map((item, index) => (
                      <span key={index} className="inline-block bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded mr-1 mb-1">
                        {item}
                      </span>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">アレルギー</label>
                  <div className="space-y-1">
                    {currentProfile.allergies.map((item, index) => (
                      <span key={index} className="inline-block bg-red-100 text-red-800 text-xs px-2 py-1 rounded mr-1 mb-1">
                        {item}
                      </span>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">服用薬</label>
                  <div className="space-y-1">
                    {currentProfile.medications.map((item, index) => (
                      <span key={index} className="inline-block bg-green-100 text-green-800 text-xs px-2 py-1 rounded mr-1 mb-1">
                        {item}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Insurance Information */}
          <div className="bg-white rounded-lg shadow border">
            <div className="px-6 py-4 border-b border-gray-200">
              <div className="flex items-center space-x-2">
                <Shield className="h-5 w-5 text-green-600" />
                <h3 className="text-lg font-semibold text-gray-800">保険情報</h3>
              </div>
            </div>
            <div className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">保険者</label>
                  <p className="text-gray-800">{currentProfile.insuranceInfo.provider}</p>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">保険証番号</label>
                  <p className="text-gray-800">{currentProfile.insuranceInfo.policyNumber}</p>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">有効期限</label>
                  <div className="flex items-center space-x-2">
                    <Calendar className="h-4 w-4 text-gray-400" />
                    <p className="text-gray-800">{new Date(currentProfile.insuranceInfo.expiryDate).toLocaleDateString('ja-JP')}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Notification Settings */}
          <div className="bg-white rounded-lg shadow border">
            <div className="px-6 py-4 border-b border-gray-200">
              <div className="flex items-center space-x-2">
                <Bell className="h-5 w-5 text-blue-600" />
                <h3 className="text-lg font-semibold text-gray-800">通知設定</h3>
              </div>
            </div>
            <div className="p-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium text-gray-800">メール通知</p>
                    <p className="text-sm text-gray-600">重要なお知らせをメールで受け取る</p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={currentProfile.preferences.notifications.email}
                      onChange={(e) => updateNotificationSettings('email', e.target.checked)}
                      className="sr-only peer"
                      disabled={!isEditing}
                    />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                  </label>
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium text-gray-800">SMS通知</p>
                    <p className="text-sm text-gray-600">予約確認やリマインダーをSMSで受け取る</p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={currentProfile.preferences.notifications.sms}
                      onChange={(e) => updateNotificationSettings('sms', e.target.checked)}
                      className="sr-only peer"
                      disabled={!isEditing}
                    />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                  </label>
                </div>

                <div className="pt-4 border-t border-gray-200">
                  <label className="block text-sm font-medium text-gray-700 mb-2">希望連絡時間</label>
                  {isEditing ? (
                    <input
                      type="text"
                      value={currentProfile.preferences.preferredContactTime}
                      onChange={(e) => updateNestedProfile('preferences', 'preferredContactTime', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                      placeholder="例: 平日 9:00-17:00"
                    />
                  ) : (
                    <p className="text-gray-800">{currentProfile.preferences.preferredContactTime}</p>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
} 