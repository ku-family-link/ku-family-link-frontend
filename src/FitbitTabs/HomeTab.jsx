import React, { useEffect, useState } from 'react';
import axios from '../api/axios';

const HomeTab = () => {
  const [todaySummary, setTodaySummary] = useState(null);
  const userId = localStorage.getItem('clientageId');

  useEffect(() => {
    const fetchTodaySummary = async () => {
      try {
        const res = await axios.get(`/api/v1/users/${userId}/health/summary/today`);
        setTodaySummary(res.data);
      } catch (error) {
        console.error('오늘 건강 데이터 불러오기 실패:', error);
      }
    };

    if (userId) fetchTodaySummary();
  }, [userId]);

  const missionSuccess = todaySummary?.totalSteps >= 3000;

  return (
    <div className="bg-gray-100 pb-20">
      {/* 오늘의 건강 브리핑 */}
      <div className="bg-green-200 text-center py-2 font-semibold">오늘의 건강 브리핑</div>
      <div className="p-3 space-y-3">
        <div className="bg-white rounded-lg p-4 text-center">걸음 수: {todaySummary ? todaySummary.totalSteps.toLocaleString() + '보' : '로딩 중...'}</div>
        <div className="bg-white rounded-lg p-4 text-center">평균 심박 수: {todaySummary ? todaySummary.heartRate + 'bpm' : '로딩 중...'}</div>
        <div className="bg-white rounded-lg p-4 text-left">{todaySummary?.analysis || '오늘의 건강 코멘트를 불러오는 중입니다...'}</div>
        <div className="flex justify-center">
          <button 
            className="bg-green-400 px-20 py-1 mt-4 rounded-full text-sm">코멘트 음성 읽기
          </button>
        </div>
      </div>

      {/* 오늘의 미션 */}
      <div className="bg-green-200 text-center py-2 font-semibold mt-3">오늘의 미션</div>
      <div className="p-3">
        <div className="bg-white rounded-lg p-4 flex justify-between items-center">
          <span>3,000보 걷기</span>
          <span className={`px-3 py-1 rounded-full text-white text-sm ${missionSuccess ? 'bg-green-300' : 'bg-red-300'}`}>
            {missionSuccess ? '성공' : '실패'}
          </span>
        </div>
      </div>

      {/* 가까운 병원 정보 */}
      <div className="bg-green-200 text-center py-2 font-semibold mt-3">가까운 병원/응급실 정보</div>
      <div className="p-3">
        <div className="bg-white rounded-lg p-4">건대병원 (2.3km)</div>
      </div>
    </div>
  );
};

export default HomeTab;
