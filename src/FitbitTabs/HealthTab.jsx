import React, { useEffect, useState } from 'react';
import axios from '../api/axios'

const HealthTab = () => {
  const [healthData, setHealthData] = useState([]);
  const [lastWeekSummary, setLastWeekSummary] = useState(null);
  const [thisWeekSummary, setThisWeekSummary] = useState(null);

  useEffect(() => {
    const cachedHealth = localStorage.getItem('healthData');
    const cachedLast = localStorage.getItem('lastWeekSummary');
    const cachedThis = localStorage.getItem('thisWeekSummary');
  
    if (cachedHealth) setHealthData(JSON.parse(cachedHealth));
    if (cachedLast) setLastWeekSummary(JSON.parse(cachedLast));
    if (cachedThis) setThisWeekSummary(JSON.parse(cachedThis));
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
        console.log('TTS 요청 성공:', response.data.message);
        alert('음성 메시지가 전송되었습니다.');
      } else {
        console.error('TTS 요청 실패:', response.data.message);
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
  
  return (
    <div className="bg-gray-100 pb-20">
      {/* 일별 건강 데이터 */}
      <div className="bg-green-200 text-center py-2 font-semibold">일별 건강 데이터</div>
      <div className="p-3">
        <table className="w-full text-center bg-white rounded-lg">
          <thead className="bg-gray-200">
            <tr>
              <th className="py-1">날짜</th>
              <th>걸음 수</th>
              <th>수면 시간<br />(시간)</th>
              <th>심박수</th>
              <th>소모<br/>칼로리</th>
              <th>비활동 시간</th>
              <th>활동 시간</th>
              <th>수면 효율</th>
              <th>체중</th>
              <th>BMI</th>
              <th>물 섭취량</th>
              <th>체지방률</th>
            </tr>
          </thead>
          <tbody>
            {healthData.slice().reverse().map((item, index) => (
              <tr key={index} className="border-t">
                <td className="py-1">{item.date}</td>
                <td>{item.steps}</td>
                <td>{item.sleepHours}</td>
                <td>{item.heartRate}</td>
                <td>{item.caloriesOut.toLocaleString()} kcal</td>
                <td>{item.sendentaryMinutes}분</td>
                <td>{item.activeMinutes}분</td>
                <td>{item.sleepEfficiency != null ? item.sleepEfficiency.toFixed(0) + '%' : '-'}</td>
                <td>{item.weight.toFixed(1)} kg</td>
                <td>{item.bmi.toFixed(1)}</td>
                <td>{item.waterIntake.toFixed(1)}ml</td>
                <td>{item.bodyFat.toFixed(1)}%</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* 저번주 요약 */}
      <div className="bg-green-200 text-center py-2 font-semibold mt-4">저번주 요약</div>
      <div className="p-3">
        {lastWeekSummary && healthData.length > 0 ? (
          <div className="bg-white rounded-lg p-4 text-sm space-y-1">
            <div>평균 걸음 수: {lastWeekSummary.averageSteps.toLocaleString()}보</div>
            <div>평균 수면 시간: {Math.floor(lastWeekSummary.averageSleepHours)}시간{" "}{Math.round((lastWeekSummary.averageSleepHours % 1) * 60)}분</div>
            <div>평균 심박수: {lastWeekSummary.averageRestingHeartRate}bpm</div>
            <div>평균 소모 칼로리: {lastWeekSummary.averageCaloriesOut.toLocaleString()} kcal</div>
            <div>평균 비활동 시간: {lastWeekSummary.averageSendentaryMinutes.toFixed(1)}분</div>
            <div>평균 활동 시간: {lastWeekSummary.averageActiveMinutes.toFixed(1)}분</div>
            <div>평균 체중: {lastWeekSummary.averageWeight.toFixed(1)}kg</div>
            <div>평균 BMI: {lastWeekSummary.averageBmi.toFixed(1)}</div>
            <div>평균 물 섭취량: {lastWeekSummary.averageWaterIntake.toFixed(1)}ml</div>
            <div>평균 체지방률: {lastWeekSummary.averageBodyFat.toFixed(1)}%</div>
            <div>
              미션 성공률: {
                (() => {
                  const start = new Date(lastWeekSummary.period.startDate);
                  const end = new Date(lastWeekSummary.period.endDate);
                  const filtered = healthData.filter((d) => {
                    const dDate = new Date(d.date);
                    return dDate >= start && dDate <= end;
                  });
                  const successDays = filtered.filter((d) => d.steps >= 3000).length;
                  const totalDays = filtered.length;
                  return `${successDays}/${totalDays}일 (${Math.round((successDays / totalDays) * 100)}%)`;
                })()
              }
            </div>
          </div>
        ) : (
          <div className="text-sm text-gray-500">저번주 요약 정보를 불러오는 중입니다...</div>
        )}
      </div>

      {/* 이번주 요약 */}
      <div className="bg-green-200 text-center py-2 font-semibold mt-4">이번주 요약</div>
      <div className="p-3">
        {thisWeekSummary ? (
          <div className="bg-white rounded-lg p-4 text-sm space-y-1">
            <div>평균 걸음 수: {thisWeekSummary.averageSteps.toLocaleString()}보</div>
            <div>평균 수면 시간: {Math.floor(thisWeekSummary.averageSleepHours)}시간{" "}{Math.round((thisWeekSummary.averageSleepHours % 1) * 60)}분</div>
            <div>평균 심박수: {thisWeekSummary.averageRestingHeartRate}bpm</div>
            <div>평균 소모 칼로리: {thisWeekSummary.averageCaloriesOut.toLocaleString()} kcal</div>
            <div>평균 비활동 시간: {thisWeekSummary.averageSendentaryMinutes.toFixed(1)}분</div>
            <div>평균 활동 시간: {thisWeekSummary.averageActiveMinutes.toFixed(1)}분</div>
            <div>평균 체중: {thisWeekSummary.averageWeight.toFixed(1)}kg</div>
            <div>평균 BMI: {thisWeekSummary.averageBmi.toFixed(1)}</div>
            <div>평균 물 섭취량: {thisWeekSummary.averageWaterIntake.toFixed(1)}mL</div>
            <div>평균 체지방률: {thisWeekSummary.averageBodyFat.toFixed(1)}%</div>
            <div>
              미션 성공률: {
                (() => {
                  const start = new Date(thisWeekSummary.period.startDate);
                  const end = new Date(thisWeekSummary.period.endDate);
                  const filtered = healthData.filter((d) => {
                    const dDate = new Date(d.date);
                    return dDate >= start && dDate <= end;
                  });
                  const successDays = filtered.filter((d) => d.steps >= 3000).length;
                  const totalDays = filtered.length;
                  return `${successDays}/${totalDays}일 (${Math.round((successDays / totalDays) * 100)}%)`;
                })()
              }
            </div>
          </div>
        ) : (
          <div className="text-sm text-gray-500">이번주 요약 정보를 불러오는 중입니다...</div>
        )}
      </div>

      {/* 주간 건강 코멘트 */}
      <div className="bg-green-200 text-center py-2 font-semibold mt-4">주간 건강 코멘트</div>
      <div className="p-3">
        <div className="bg-white rounded-lg p-4 text-sm mb-10">
          {thisWeekSummary?.comment || '주간 코멘트를 불러오는 중입니다...'}
        </div>
        <div className="flex justify-center mt-4">
          <button 
            className="bg-green-400 px-20 py-1 rounded-full text-sm"
            onClick={() =>
              handleTTS(thisWeekSummary?.comment || '주간 코멘트를 불러오는 중입니다...')}
          >
            코멘트 음성 읽기</button>
        </div>
      </div>
    </div>
  );
};

export default HealthTab;
