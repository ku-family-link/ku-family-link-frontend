import React from 'react';
import { Home, HeartPulse, Map, Bell, User } from 'lucide-react';

const FitbitTabBar = ({ activeTab, setActiveTab }) => {
  const tabClass = (tab) =>
    `flex flex-col items-center justify-center flex-1 py-2 ${
      activeTab === tab ? 'text-green-600 font-bold' : 'text-gray-700'
    }`;

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t flex text-xs">
      <button className={tabClass('home')} onClick={() => setActiveTab('home')}>
        <Home size={20} />
        홈
      </button>
      <button className={tabClass('health')} onClick={() => setActiveTab('health')}>
        <HeartPulse size={20} />
        건강정보
      </button>
      <button className={tabClass('location')} onClick={() => setActiveTab('location')}>
        <Map size={20} />
        위치
      </button>
      <button className={tabClass('alert')} onClick={() => setActiveTab('alert')}>
        <Bell size={20} />
        알림
      </button>
      <button className={tabClass('mypage')} onClick={() => setActiveTab('mypage')}>
        <User size={20} />
        내 정보
      </button>
    </div>
  );
};

export default FitbitTabBar;
