import React from 'react';

const HomeTab = () => {
  return (
    <div className="bg-gray-100 pb-20">
      {/* 오늘의 건강 브리핑 */}
      <div className="bg-green-200 text-center py-2 font-semibold">오늘의 건강 브리핑</div>
      <div className="p-3 space-y-3">
        <div className="bg-white rounded-lg p-4 text-center">걸음 수: 3,200보</div>
        <div className="bg-white rounded-lg p-4 text-center">평균 심박 수: 72bpm</div>
        <div className="bg-white rounded-lg p-4 text-left">좋은 하루의 시작입니다.</div>
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
          <span className="bg-green-300 px-3 py-1 rounded-full text-white text-sm">성공</span>
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
