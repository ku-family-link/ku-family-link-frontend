import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const MyPageTab = () => {
  const navigate = useNavigate();
  const [inputFitbitId, setInputFitbitId] = useState('');

  const [guardianData, setGuardianData] = useState(() => {
    const cachedGuardian = localStorage.getItem('guardianInfo');
    return cachedGuardian ? JSON.parse(cachedGuardian) : null;
  });
  const [careReceiverFound, setCareReceiverFound] = useState(() => {
    return localStorage.getItem('careReceiverFound') === 'true';
  });

  useEffect(() => {
    // 보호자 관련 기본 데이터 불러오기 (필요하면)
    const cachedGuardian = localStorage.getItem('guardianInfo');
    if (cachedGuardian) {
      setGuardianData(JSON.parse(cachedGuardian));
    }
  }, []);

  const handleSearch = () => {
    if (!inputFitbitId.trim()) {
      alert('Fitbit ID를 입력해주세요.');
      setCareReceiverFound(false);
      return;
    }

    // guardianData에 있는 피보호자 Fitbit ID와 입력값 비교
    if (guardianData && guardianData.fitbitUserId === inputFitbitId.trim()) {
      setCareReceiverFound(true);
      localStorage.setItem('guardianInfo', JSON.stringify(guardianData));
      localStorage.setItem('careReceiverFound', 'true');
    } else {
      alert('입력한 Fitbit ID와 일치하는 피보호자를 찾을 수 없습니다.');
      setCareReceiverFound(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('guardianId');
    localStorage.removeItem('clientageId');
    localStorage.removeItem('todaySummary');
    localStorage.removeItem('healthData');
    localStorage.removeItem('lastWeekSummary');
    localStorage.removeItem('thisWeekSummary');
    localStorage.removeItem('guardianInfo');
    localStorage.removeItem('careReceiverFound');

    alert('로그아웃되었습니다.');
    navigate('/');
  };

  return (
    <div className="bg-gray-100 pb-20 min-h-screen">
      {/* 피보호자 정보 영역 */}
      <div className="bg-green-200 text-center py-2 font-semibold">피보호자 정보</div>
      <div className="p-3">
        {!careReceiverFound ? (
          <div className="bg-white rounded-lg p-3 flex items-center justify-between">
            <span className="text-sm font-medium">피보호자 등록:</span>
            <div className="flex space-x-2">
              <input
                type="text"
                value={inputFitbitId}
                onChange={(e) => setInputFitbitId(e.target.value)}
                placeholder="Fitbit 사용자 ID"
                className="rounded-lg px-3 py-1 text-sm bg-yellow-200 placeholder-gray-600 focus:outline-none"
              />
              <button
                onClick={handleSearch}
                className="px-3 py-1 rounded-lg bg-green-300 text-sm font-semibold"
              >
                등록
              </button>
            </div>
          </div>
        ) :(
          <div className="space-y-2 text-sm">
            <div className="bg-white rounded-lg p-3">ID: {guardianData.fitbitUserId}</div>
            <div className="bg-white rounded-lg p-3">이름: {guardianData.fitbitUserName}</div>
            <div className="bg-white rounded-lg p-3">나이: {guardianData.fitbitUserAge}세</div>
            <div className="bg-white rounded-lg p-3">성별: {guardianData.fitbitUserGender === 'MALE' ? '남' : '여'}</div>
            {/*<div className="bg-white rounded-lg p-3">기기 ID: {guardianData.deviceId}</div>*/}
          </div>
        )}
      </div>

      {/* 보호자 정보 */}
      <div className="bg-green-200 text-center py-2 font-semibold mt-6">내 정보</div>
      <div className="p-3 space-y-2 text-sm">
        <div className="bg-white rounded-lg p-3">이름: {guardianData?.name || '---'}</div>
        <div className="bg-white rounded-lg p-3">관계: {guardianData?.relationship || '---'}</div>
        <div className="bg-white rounded-lg p-3">연락처: {guardianData?.phone || '---'}</div>
      </div>

      {/* 로그아웃 버튼 */}
      <button
        className="w-full h-12 mt-4 rounded-2xl text-lg text-gray-800 bg-green-200 font-semibold"
        onClick={handleLogout}
      >
        로그아웃
      </button>
    </div>
  );
};

export default MyPageTab;
