'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  Home, 
  Users, 
  Calendar, 
  MessageCircle, 
  Shield,
  BookOpen,
  Bell,
  LogOut,
  User
} from 'lucide-react';

export default function StaffHeader() {
  const pathname = usePathname();

  const navigationItems = [
    { href: '/staff-dashboard', label: 'ダッシュボード', icon: Home },
    { href: '/staff/patients', label: '患者管理', icon: Users },
    { href: '/staff/treatment-plans', label: '診療計画', icon: Calendar },
    { href: '/staff/chats', label: 'チャット履歴', icon: MessageCircle },
    { href: '/staff/management', label: 'スタッフ管理', icon: Shield },
    { href: '/staff/insurance-tips', label: '保険点数支援', icon: BookOpen }
  ];

  const isActive = (href: string) => {
    return pathname === href || (href !== '/staff-dashboard' && pathname?.startsWith(href));
  };

  return (
    <header className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4">
        {/* Top Row */}
        <div className="flex items-center justify-between py-4">
          <div className="flex items-center space-x-4">
            <Link href="/" className="flex items-center space-x-2">
              <Calendar className="h-6 w-6 text-blue-600" />
              <span className="text-lg font-semibold text-gray-800">歯知式</span>
            </Link>
            <span className="text-sm text-gray-500">歯科医院画面</span>
          </div>
          
          <div className="flex items-center space-x-4">
            <button className="p-2 text-gray-600 hover:text-gray-800 relative">
              <Bell className="h-5 w-5" />
              <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full"></span>
            </button>
            <div className="flex items-center space-x-2">
              <User className="h-5 w-5 text-gray-600" />
              <span className="text-sm font-medium text-gray-700">田中衛生士</span>
            </div>
            <Link href="/staff-login" className="p-2 text-gray-600 hover:text-gray-800">
              <LogOut className="h-5 w-5" />
            </Link>
          </div>
        </div>

        {/* Navigation Row */}
        <div className="border-t border-gray-100">
          <nav className="flex space-x-0 overflow-x-auto">
            {navigationItems.map((item) => {
              const Icon = item.icon;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`flex items-center space-x-2 px-4 py-3 text-sm font-medium whitespace-nowrap border-b-2 transition-colors ${
                    isActive(item.href)
                      ? 'border-blue-500 text-blue-600 bg-blue-50'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  <Icon className="h-4 w-4" />
                  <span>{item.label}</span>
                </Link>
              );
            })}
          </nav>
        </div>
      </div>
    </header>
  );
} 