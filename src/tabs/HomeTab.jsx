import React, { useEffect, useState } from 'react';

const HomeTab = () => {
  const [todaySummary, setTodaySummary] = useState(null);
  
  useEffect(() => {
    const cached = localStorage.getItem('todaySummary');
    if (cached) {
      setTodaySummary(JSON.parse(cached));
    }
  }, []);
  
  const missionSuccess = todaySummary?.totalSteps >= 3000;

  return (
    <div className="bg-gray-100 pb-20">
      {/* 오늘의 건강 브리핑 */}
      <div className="bg-green-200 text-center py-2 font-semibold">오늘의 건강 브리핑</div>
      <div className="p-3 space-y-3">
        <div className="bg-white rounded-lg p-4 text-center">걸음 수: {todaySummary ? todaySummary.totalSteps.toLocaleString() + '보' : '로딩 중...'}</div>
        <div className="bg-white rounded-lg p-4 text-center">평균 심박 수: {todaySummary ? todaySummary.heartRate + 'bpm' : '로딩 중...'}</div>
        <div className="bg-white rounded-lg p-4 text-left">{todaySummary?.analysis || '오늘의 건강 코멘트를 불러오는 중입니다...'}</div>
      </div>

      {/* 오늘의 미션 */}
      <div className="bg-green-200 text-center py-2 font-semibold mt-10">오늘의 미션</div>
      <div className="p-3">
        <div className="bg-white rounded-lg p-4 flex justify-between items-center">
          <span>3,000보 걷기</span>
          <span className={`px-3 py-1 rounded-full text-white text-sm ${missionSuccess ? 'bg-green-300' : 'bg-red-300'}`}>
            {missionSuccess ? '성공' : '실패'}
          </span>
        </div>
      </div>

      {/* 가까운 병원 정보 */}
      <div className="bg-green-200 text-center py-2 font-semibold mt-10">가까운 병원/응급실 정보</div>
      <div className="p-3">
        <div className="bg-white rounded-lg p-4">건대병원 (2.3km)</div>
      </div>
      <div className="flex justify-center mt-10">
        <button 
          className="bg-green-400 px-12 py-3 mt-4 rounded-2xl text-md">비상 알림 버튼
        </button>
      </div>
    </div>
  );
};

export default HomeTab;
