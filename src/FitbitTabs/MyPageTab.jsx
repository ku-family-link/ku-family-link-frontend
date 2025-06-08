import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const MyPageTab = () => {
  const navigate = useNavigate();
  const [fitbitData, setFitbitData] = useState(null);
  
  useEffect(() => {
    // 보호자 관련 기본 데이터 불러오기 (필요하면)
    const cachedFitbit = localStorage.getItem('fitbitInfo');
    if (cachedFitbit) {
      setFitbitData(JSON.parse(cachedFitbit));
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('clientageId');
    localStorage.removeItem('todaySummary');
    localStorage.removeItem('healthData');
    localStorage.removeItem('lastWeekSummary');
    localStorage.removeItem('thisWeekSummary');
    localStorage.removeItem('fitbitInfo');

    alert('로그아웃되었습니다.');
    navigate('/');
  };

  return (
    <div className="bg-gray-100 pb-20">
      <div className="bg-green-200 text-center py-2 font-semibold">내 정보</div>
      <div className="p-3 space-y-2 text-sm">
        <div className="bg-white rounded-lg p-3">ID: {fitbitData?.fitbitUserId || '---'}</div>
        <div className="bg-white rounded-lg p-3">이름: {fitbitData?.name || '---'}</div>
        <div className="bg-white rounded-lg p-3">나이: {fitbitData?.age ? `${fitbitData.age}세` : '---'}</div>
        <div className="bg-white rounded-lg p-3">성별: {fitbitData?.gender === 'MALE' ? '남' : fitbitData?.gender === 'FEMALE' ? '여' : '---'}</div>
        {/*<div className="bg-white rounded-lg p-3">기기 ID: {fitbitData.fitbitUserId}</div>*/}
      </div>

      <div className="bg-green-200 text-center py-2 font-semibold mt-6">보호자 정보</div>
      <div className="p-3 space-y-2 text-sm">
        <div className="bg-white rounded-lg p-3">보호자 이름: {fitbitData?.guardianName || '---'}</div>
        <div className="bg-white rounded-lg p-3">관계: {fitbitData?.guardianRelationship || '---'}</div>
        <div className="bg-white rounded-lg p-3">연락처: {fitbitData?.guardianPhone || '---'}</div>
      </div>
      <button
        className={`w-full h-12 mt-4 rounded-2xl text-lg text-gray-800 bg-green-200 font-semibold` }
        onClick={handleLogout}
      >
        로그아웃
      </button>
    </div>
  );
};

export default MyPageTab;
