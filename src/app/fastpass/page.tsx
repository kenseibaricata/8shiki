'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import PatientHeader from '../components/PatientHeader';
import { 
  Star,
  User,
  Crown,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';

interface TimeSlot {
  time: string;
  type: 'fastpass' | 'normal' | 'unavailable';
  price?: number;
  staffName?: string;
}

interface StaffMember {
  id: string;
  name: string;
  role: string;
  avatar: string;
  specialties: string[];
  basePrice: number;
  discountedPrice?: number;
  available: boolean;
  description: string;
}

export default function FastPassPage() {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedTime, setSelectedTime] = useState<string>('');
  const [selectedStaff, setSelectedStaff] = useState<string>('');
  const [showStaffModal, setShowStaffModal] = useState(false);
  const [currentMonth, setCurrentMonth] = useState(new Date());

  // ユーザープラン情報
  const userPlan: 'basic' | 'silver' | 'gold' = 'silver';

  // スタッフデータ
  const staffMembers: StaffMember[] = [
    {
      id: '1',
      name: '田中 智子',
      role: '歯科医師',
      avatar: '👩‍⚕️',
      specialties: ['虫歯治療', 'インプラント', '審美歯科'],
      basePrice: 3000,
      discountedPrice: userPlan === 'gold' ? 0 : userPlan === 'silver' ? 1500 : 3000,
      available: true,
      description: '経験豊富な歯科医師。患者様一人ひとりに合った治療計画をご提案いたします。'
    },
    {
      id: '2',
      name: '山田 健太',
      role: '歯科衛生士',
      avatar: '👨‍⚕️',
      specialties: ['クリーニング', '予防ケア', 'ブラッシング指導'],
      basePrice: 2000,
      discountedPrice: userPlan === 'gold' ? 0 : userPlan === 'silver' ? 1000 : 2000,
      available: true,
      description: '丁寧なクリーニングと予防ケアを得意としています。'
    },
    {
      id: '3',
      name: '佐藤 美咲',
      role: '歯科衛生士',
      avatar: '👩‍⚕️',
      specialties: ['歯周病ケア', 'ホワイトニング', 'メンテナンス'],
      basePrice: 2000,
      discountedPrice: userPlan === 'gold' ? 0 : userPlan === 'silver' ? 1000 : 2000,
      available: false,
      description: '歯周病予防とホワイトニングを専門としています。'
    }
  ];

  // タイムスロットデータ（選択された日付に基づいて生成）
  const generateTimeSlots = (): TimeSlot[] => {
    const slots: TimeSlot[] = [];
    
    // 9:00-18:00の30分刻み
    for (let hour = 9; hour < 18; hour++) {
      for (let minute = 0; minute < 60; minute += 30) {
        const time = `${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}`;
        
        // ランダムに空き状況を設定（デモ用）
        const random = Math.random();
        let type: TimeSlot['type'];
        let price: number | undefined;
        
        if (random < 0.3) {
          type = 'fastpass';
          price = userPlan === 'basic' ? 1000 : userPlan === 'silver' ? 500 : 0;
        } else if (random < 0.7) {
          type = 'normal';
        } else {
          type = 'unavailable';
        }
        
        slots.push({
          time,
          type,
          price,
          staffName: type === 'fastpass' ? '指名可能' : undefined
        });
      }
    }
    
    return slots;
  };

  const timeSlots = generateTimeSlots();

  // カレンダー用のヘルパー関数
  const getDaysInMonth = (date: Date) => {
    return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
  };

  const getFirstDayOfMonth = (date: Date) => {
    return new Date(date.getFullYear(), date.getMonth(), 1).getDay();
  };

  const isToday = (date: Date) => {
    const today = new Date();
    return date.toDateString() === today.toDateString();
  };

  const isSameDay = (date1: Date, date2: Date) => {
    return date1.toDateString() === date2.toDateString();
  };

  const handleDateSelect = (day: number) => {
    const newDate = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), day);
    setSelectedDate(newDate);
    setSelectedTime('');
    setSelectedStaff('');
  };

  const handleStaffSelect = (staffId: string) => {
    setSelectedStaff(staffId);
    setShowStaffModal(false);
  };

  const handleBooking = () => {
    if (!selectedTime) {
      alert('時間を選択してください');
      return;
    }

    const booking = {
      date: selectedDate.toLocaleDateString(),
      time: selectedTime,
      staff: selectedStaff ? staffMembers.find(s => s.id === selectedStaff)?.name : '指名なし',
      type: 'fastpass'
    };

    alert(`ファストパス予約を確定しました！\n日時: ${booking.date} ${booking.time}\nスタッフ: ${booking.staff}`);
  };

  const nextMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 1));
  };

  const prevMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1, 1));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-blue-50">
      <PatientHeader />

      {/* Plan Status */}
      <div className="bg-gradient-to-r from-purple-600 to-blue-600 text-white py-4">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Star className="h-6 w-6" />
              <div>
                <h2 className="font-semibold">
                  {userPlan === 'gold' ? 'ゴールド' : userPlan === 'silver' ? 'シルバー' : 'ベーシック'}プラン
                </h2>
                <p className="text-sm text-purple-100">
                  {userPlan === 'gold' 
                    ? 'スタッフ指名無料・VIP優先予約' 
                    : userPlan === 'silver' 
                    ? 'ファストパス利用可能・スタッフ指名割引' 
                    : 'ファストパス利用には追加料金がかかります'
                  }
                </p>
              </div>
            </div>
            {userPlan === 'basic' && (
              <Link 
                href="/club" 
                className="bg-white text-purple-600 px-4 py-2 rounded-lg text-sm font-semibold hover:bg-gray-100"
              >
                プラン変更
              </Link>
            )}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <main className="max-w-6xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Calendar */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow border">
              <div className="px-6 py-4 border-b border-gray-200">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-semibold text-gray-800">日付選択</h3>
                  <div className="flex items-center space-x-4">
                    <button onClick={prevMonth} className="p-1 hover:bg-gray-100 rounded">
                      <ChevronLeft className="h-5 w-5 text-gray-600" />
                    </button>
                    <span className="font-medium text-gray-800">
                      {currentMonth.getFullYear()}年{currentMonth.getMonth() + 1}月
                    </span>
                    <button onClick={nextMonth} className="p-1 hover:bg-gray-100 rounded">
                      <ChevronRight className="h-5 w-5 text-gray-600" />
                    </button>
                  </div>
                </div>
              </div>

              <div className="p-6">
                {/* Calendar Grid */}
                <div className="grid grid-cols-7 gap-1 mb-4">
                  {['日', '月', '火', '水', '木', '金', '土'].map((day) => (
                    <div key={day} className="text-center text-sm font-medium text-gray-500 p-2">
                      {day}
                    </div>
                  ))}
                  
                  {/* Empty cells for previous month */}
                  {Array.from({ length: getFirstDayOfMonth(currentMonth) }).map((_, index) => (
                    <div key={index} className="p-2"></div>
                  ))}
                  
                  {/* Days of current month */}
                  {Array.from({ length: getDaysInMonth(currentMonth) }).map((_, index) => {
                    const day = index + 1;
                    const dayDate = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), day);
                    const isPast = dayDate < new Date();
                    const isSelected = isSameDay(dayDate, selectedDate);
                    const todayClass = isToday(dayDate) ? 'ring-2 ring-blue-500' : '';
                    
                    return (
                      <button
                        key={day}
                        onClick={() => !isPast && handleDateSelect(day)}
                        disabled={isPast}
                        className={`p-2 text-center rounded-lg transition-colors ${
                          isPast 
                            ? 'text-gray-300 cursor-not-allowed' 
                            : isSelected
                            ? 'bg-purple-600 text-white'
                            : 'text-gray-700 hover:bg-purple-50'
                        } ${todayClass}`}
                      >
                        {day}
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Time Slots */}
            {selectedDate && (
              <div className="bg-white rounded-lg shadow border mt-6">
                <div className="px-6 py-4 border-b border-gray-200">
                  <h3 className="text-lg font-semibold text-gray-800">
                    時間選択 - {selectedDate.toLocaleDateString()}
                  </h3>
                  <div className="flex items-center space-x-4 mt-2 text-sm">
                    <div className="flex items-center space-x-2">
                      <div className="w-3 h-3 bg-purple-500 rounded"></div>
                      <span>ファストパス</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className="w-3 h-3 bg-gray-300 rounded"></div>
                      <span>通常予約</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className="w-3 h-3 bg-red-300 rounded"></div>
                      <span>予約済み</span>
                    </div>
                  </div>
                </div>

                <div className="p-6">
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                    {timeSlots.map((slot) => {
                      const isSelected = selectedTime === slot.time;
                      const isAvailable = slot.type !== 'unavailable';
                      
                      return (
                        <button
                          key={slot.time}
                          onClick={() => isAvailable && setSelectedTime(slot.time)}
                          disabled={!isAvailable}
                          className={`p-3 rounded-lg border transition-all ${
                            !isAvailable
                              ? 'bg-red-50 border-red-200 text-red-400 cursor-not-allowed'
                              : isSelected
                              ? 'bg-purple-600 border-purple-600 text-white'
                              : slot.type === 'fastpass'
                              ? 'bg-purple-50 border-purple-200 text-purple-700 hover:bg-purple-100'
                              : 'bg-gray-50 border-gray-200 text-gray-700 hover:bg-gray-100'
                          }`}
                        >
                          <div className="text-sm font-medium">{slot.time}</div>
                          {slot.type === 'fastpass' && (
                            <div className="text-xs mt-1">
                              {slot.price && slot.price > 0 ? `+¥${slot.price}` : '無料'}
                            </div>
                          )}
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Booking Summary */}
          <div className="space-y-6">
            {/* Staff Selection */}
            <div className="bg-white rounded-lg shadow border">
              <div className="px-6 py-4 border-b border-gray-200">
                <h3 className="text-lg font-semibold text-gray-800">スタッフ指名</h3>
                <p className="text-sm text-gray-600 mt-1">任意でスタッフを指名できます</p>
              </div>
              
              <div className="p-6">
                {selectedStaff ? (
                  <div className="border border-gray-200 rounded-lg p-4">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center space-x-3">
                        <span className="text-2xl">{staffMembers.find(s => s.id === selectedStaff)?.avatar}</span>
                        <div>
                          <p className="font-medium text-gray-800">
                            {staffMembers.find(s => s.id === selectedStaff)?.name}
                          </p>
                          <p className="text-sm text-gray-600">
                            {staffMembers.find(s => s.id === selectedStaff)?.role}
                          </p>
                        </div>
                      </div>
                      <button
                        onClick={() => setSelectedStaff('')}
                        className="text-sm text-red-600 hover:text-red-700"
                      >
                        取消
                      </button>
                    </div>
                    
                    <div className="text-sm">
                      {(() => {
                        const staff = staffMembers.find(s => s.id === selectedStaff);
                        const discountedPrice = staff?.discountedPrice || 0;
                        const basePrice = staff?.basePrice || 0;
                        
                        if (discountedPrice === 0) {
                          return <span className="text-green-600 font-medium">指名料無料</span>;
                        } else if (discountedPrice < basePrice) {
                          return (
                            <span>
                              指名料: <span className="line-through text-gray-400">¥{basePrice}</span>{' '}
                              <span className="text-blue-600 font-medium">¥{discountedPrice}</span>
                            </span>
                          );
                        } else {
                          return <span>指名料: ¥{basePrice}</span>;
                        }
                      })()}
                    </div>
                  </div>
                ) : (
                  <button
                    onClick={() => setShowStaffModal(true)}
                    className="w-full p-4 border-2 border-dashed border-gray-300 rounded-lg text-gray-600 hover:border-purple-300 hover:text-purple-600 transition-colors"
                  >
                    <User className="h-6 w-6 mx-auto mb-2" />
                    スタッフを指名する
                  </button>
                )}
              </div>
            </div>

            {/* Booking Summary */}
            <div className="bg-white rounded-lg shadow border">
              <div className="px-6 py-4 border-b border-gray-200">
                <h3 className="text-lg font-semibold text-gray-800">予約内容</h3>
              </div>
              
              <div className="p-6">
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-600">日付</span>
                    <span className="font-medium">
                      {selectedDate ? selectedDate.toLocaleDateString() : '未選択'}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">時間</span>
                    <span className="font-medium">{selectedTime || '未選択'}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">スタッフ</span>
                    <span className="font-medium">
                      {selectedStaff 
                        ? staffMembers.find(s => s.id === selectedStaff)?.name 
                        : '指名なし'
                      }
                    </span>
                  </div>
                  
                  {selectedTime && (
                    <div className="border-t border-gray-200 pt-3 mt-3">
                      <div className="flex justify-between items-center">
                        <span className="text-gray-600">ファストパス料金</span>
                        <span className="font-medium text-purple-600">
                          {(() => {
                            const slot = timeSlots.find(s => s.time === selectedTime);
                            return slot?.price && slot.price > 0 ? `¥${slot.price}` : '無料';
                          })()}
                        </span>
                      </div>
                      
                      {selectedStaff && (
                        <div className="flex justify-between items-center mt-2">
                          <span className="text-gray-600">指名料</span>
                          <span className="font-medium">
                            {(() => {
                              const staff = staffMembers.find(s => s.id === selectedStaff);
                              const discountedPrice = staff?.discountedPrice || 0;
                              return discountedPrice > 0 ? `¥${discountedPrice}` : '無料';
                            })()}
                          </span>
                        </div>
                      )}
                    </div>
                  )}
                </div>

                <button
                  onClick={handleBooking}
                  disabled={!selectedTime}
                  className="w-full mt-6 bg-purple-600 hover:bg-purple-700 disabled:bg-gray-300 disabled:cursor-not-allowed text-white font-semibold py-3 px-6 rounded-lg transition-colors"
                >
                  予約を確定する
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Staff Selection Modal */}
      {showStaffModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[80vh] overflow-y-auto">
            <div className="px-6 py-4 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold text-gray-800">スタッフを選択</h3>
                <button
                  onClick={() => setShowStaffModal(false)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  ✕
                </button>
              </div>
            </div>

            <div className="p-6">
              <div className="space-y-4">
                {staffMembers.map((staff) => (
                  <div
                    key={staff.id}
                    className={`border rounded-lg p-4 transition-all ${
                      staff.available 
                        ? 'border-gray-200 hover:border-purple-300 cursor-pointer' 
                        : 'border-gray-100 bg-gray-50'
                    }`}
                    onClick={() => staff.available && handleStaffSelect(staff.id)}
                  >
                    <div className="flex items-start space-x-4">
                      <span className="text-3xl">{staff.avatar}</span>
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-2">
                          <div>
                            <h4 className="font-medium text-gray-800">{staff.name}</h4>
                            <p className="text-sm text-gray-600">{staff.role}</p>
                          </div>
                          {!staff.available && (
                            <span className="text-xs bg-gray-200 text-gray-600 px-2 py-1 rounded">
                              本日不在
                            </span>
                          )}
                        </div>
                        
                        <p className="text-sm text-gray-700 mb-3">{staff.description}</p>
                        
                        <div className="flex flex-wrap gap-2 mb-3">
                          {staff.specialties.map((specialty, index) => (
                            <span
                              key={index}
                              className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded"
                            >
                              {specialty}
                            </span>
                          ))}
                        </div>
                        
                        <div className="flex items-center justify-between">
                          <div className="text-sm">
                            {staff.discountedPrice === 0 ? (
                              <span className="text-green-600 font-medium">指名料無料</span>
                            ) : staff.discountedPrice && staff.discountedPrice < staff.basePrice ? (
                              <span>
                                <span className="line-through text-gray-400">¥{staff.basePrice}</span>{' '}
                                <span className="text-blue-600 font-medium">¥{staff.discountedPrice}</span>
                              </span>
                            ) : (
                              <span>指名料: ¥{staff.basePrice}</span>
                            )}
                          </div>
                          
                          {userPlan === 'gold' && (
                            <div className="flex items-center text-yellow-600">
                              <Crown className="h-4 w-4 mr-1" />
                              <span className="text-xs font-medium">ゴールド特典</span>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-6 text-center">
                <button
                  onClick={() => setShowStaffModal(false)}
                  className="px-6 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
                >
                  指名せずに予約
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
} 