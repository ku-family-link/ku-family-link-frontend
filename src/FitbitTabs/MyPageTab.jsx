import React from 'react';
import { useNavigate } from 'react-router-dom';

const MyPageTab = () => {
  const navigate = useNavigate();
  
  const handleLogout = () => {
    // 실제 로그아웃 처리 (예: 토큰 삭제, 세션 초기화 등)는 나중에 추가
    // 지금은 페이지 이동만
    alert('로그아웃되었습니다.');
    navigate('/');
  };

  return (
    <div className="bg-gray-100 pb-20">
      <div className="bg-green-200 text-center py-2 font-semibold">내 정보</div>
      <div className="p-3 space-y-2 text-sm">
        <div className="bg-white rounded-lg p-3">ID: abcdefg</div>
        <div className="bg-white rounded-lg p-3">이름: 홍길동</div>
        <div className="bg-white rounded-lg p-3">나이: 70</div>
        <div className="bg-white rounded-lg p-3">성별: 남</div>
        <div className="bg-white rounded-lg p-3">기기 ID: abcd</div>
      </div>

      <div className="bg-green-200 text-center py-2 font-semibold mt-6">보호자 정보</div>
      <div className="p-3 space-y-2 text-sm">
        <div className="bg-white rounded-lg p-3">보호자 이름: 홍길동</div>
        <div className="bg-white rounded-lg p-3">관계: 아들</div>
        <div className="bg-white rounded-lg p-3">연락처: 010-0000-0000</div>
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
