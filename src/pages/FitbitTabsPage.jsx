import React, { useState } from 'react';
import HomeTab from '../FitbitTabs/HomeTab';
import HealthTab from '../FitbitTabs/HealthTab';
import AlertTab from '../FitbitTabs/AlertTab';
import MyPageTab from '../FitbitTabs/MyPageTab';

const FitbitTabsPage = () => {
  const [selectedTab, setSelectedTab] = useState('home');

  const renderTab = () => {
    switch (selectedTab) {
      case 'home': return <HomeTab />;
      case 'health': return <HealthTab />;
      case 'alert': return <AlertTab />;
      case 'mypage': return <MyPageTab />;
      default: return <HomeTab />;
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-100">
      <div className="flex-1 overflow-auto">
        {renderTab()}
      </div>

      <div className="fixed bottom-0 w-full justify-around flex bg-white border-t py-2 text-sm">
        <button onClick={() => setSelectedTab('home')} className={`flex-1 ${selectedTab === 'home' ? 'text-green-600' : 'text-black'}`}>홈</button>
        <button onClick={() => setSelectedTab('health')} className={`flex-1 ${selectedTab === 'health' ? 'text-green-600' : 'text-black'}`}>건강정보</button>
        <button onClick={() => setSelectedTab('alert')} className={`flex-1 ${selectedTab === 'alert' ? 'text-green-600' : 'text-black'}`}>알림</button>
        <button onClick={() => setSelectedTab('mypage')} className={`flex-1 ${selectedTab === 'mypage' ? 'text-green-600' : 'text-black'}`}>내 정보</button>
      </div>
    </div>
  );
};

export default FitbitTabsPage;
