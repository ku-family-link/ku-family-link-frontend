import React, { useEffect, useState } from 'react';
import axios from '../api/axios';

const HomeTab = () => {
  const [todaySummary, setTodaySummary] = useState(null);

  useEffect(() => {
    const cached = localStorage.getItem('todaySummary');
    if (cached) {
      setTodaySummary(JSON.parse(cached));
    }
  }, []);

  const handleTTS = async (message) => {
    if (!message) {
      alert('읽을 메시지가 없습니다.');
      return;
    }

    // 1. MQTT로 음성 메시지 전송
    try {
      const response = await axios.post('/api/v1/mqtt/message', {
        topic: 'familylink/tts',
        message: message,
      });

      if (response.status === 200 && response.data.is_success) {
        alert('음성 메시지가 전송되었습니다.');
      } else {
        alert('음성 전송 실패: ' + response.data.message);
      }
    } catch (error) {
      console.error('TTS 요청 중 오류 발생:', error);
      alert('서버 오류로 음성 전송에 실패했습니다.');
    }
    
    // 2. 노트북에서 음성 출력
    const utterance = new SpeechSynthesisUtterance(message);
    speechSynthesis.speak(utterance);
  };

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
            className="bg-green-400 px-20 py-1 mt-4 rounded-full text-sm"
            onClick={() =>
              handleTTS(todaySummary?.analysis || '오늘의 건강 코멘트를 불러오는 중입니다...')}
          >
            코멘트 음성 읽기
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
