import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const MyPageTab = () => {
  const navigate = useNavigate();
  const [careReceiverId, setCareReceiverId] = useState('');
  const [careReceiverInfo, setCareReceiverInfo] = useState(null);
  const [careReceiverRegistered, setCareReceiverRegistered] = useState(false);

  const handleLogout = () => {
    alert('로그아웃되었습니다.');
    navigate('/');
  };

  const dummyData = {
    id: 'abcdefg',
    name: '홍길동',
    age: 70,
    gender: '남',
    deviceId: 'abcd',
  };

  const handleRegister = () => {
    if (careReceiverId.trim()) {
      setCareReceiverInfo(dummyData);
      setCareReceiverRegistered(true); // 등록 완료로 변경
    }
  };

  return (
    <div className="bg-gray-100 pb-20 min-h-screen">
      {/* 피보호자 정보 영역 */}
      <div className="bg-green-200 text-center py-2 font-semibold">피보호자 정보</div>
      <div className="p-3">
        {!careReceiverRegistered ? (
          // 등록 입력칸 + 버튼
          <div className="bg-white rounded-lg p-3 flex items-center justify-between">
            <span className="text-sm font-medium">피보호자 등록:</span>
            <div className="flex space-x-2">
              <input
                type="text"
                value={careReceiverId}
                onChange={(e) => setCareReceiverId(e.target.value)}
                placeholder="ID 입력"
                className="rounded-lg px-3 py-1 text-sm bg-yellow-200 placeholder-gray-600 focus:outline-none"
              />
              <button
                onClick={handleRegister}
                className="px-3 py-1 rounded-lg bg-green-300 text-sm font-semibold"
              >
                등록
              </button>
            </div>
          </div>
        ) : (
          // 등록 완료된 피보호자 정보
          <div className="space-y-2 text-sm">
            <div className="bg-white rounded-lg p-3">ID: {careReceiverInfo.id}</div>
            <div className="bg-white rounded-lg p-3">이름: {careReceiverInfo.name}</div>
            <div className="bg-white rounded-lg p-3">나이: {careReceiverInfo.age}</div>
            <div className="bg-white rounded-lg p-3">성별: {careReceiverInfo.gender}</div>
            <div className="bg-white rounded-lg p-3">기기 ID: {careReceiverInfo.deviceId}</div>
          </div>
        )}
      </div>

      {/* 보호자 정보 */}
      <div className="bg-green-200 text-center py-2 font-semibold mt-6">내 정보</div>
      <div className="p-3 space-y-2 text-sm">
        <div className="bg-white rounded-lg p-3">보호자 이름: 홍길동</div>
        <div className="bg-white rounded-lg p-3">관계: 아들</div>
        <div className="bg-white rounded-lg p-3">연락처: 010-0000-0000</div>
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
