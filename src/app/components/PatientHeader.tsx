'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  Home, 
  Calendar, 
  MessageCircle, 
  History,
  Heart,
  Zap,
  User,
  LogOut
} from 'lucide-react';

export default function PatientHeader() {
  const pathname = usePathname();

  const navigationItems = [
    { href: '/patient-dashboard', label: 'ホーム', icon: Home },
    { href: '/patient/treatment-plan', label: '診療計画', icon: Calendar },
    { href: '/patient/chat', label: 'AI相談', icon: MessageCircle },
    { href: '/patient/chat-history', label: '相談履歴', icon: History },
    { href: '/club', label: '歯知クラブ', icon: Heart },
    { href: '/fastpass', label: 'ファストパス', icon: Zap },
    { href: '/patient/profile', label: 'プロフィール', icon: User }
  ];

  const isActive = (href: string) => {
    return pathname === href || (href !== '/patient-dashboard' && pathname?.startsWith(href));
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
            <span className="text-sm text-gray-500">患者専用画面</span>
          </div>
          
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <User className="h-5 w-5 text-gray-600" />
              <span className="text-sm font-medium text-gray-700">田中 花子さん</span>
            </div>
            <Link href="/patient-login" className="p-2 text-gray-600 hover:text-gray-800">
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