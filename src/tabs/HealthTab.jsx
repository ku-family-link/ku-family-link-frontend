import React from 'react';

const HealthTab = () => {
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
              <th>평균<br />심박수</th>
              <th>미션 수행<br />여부</th>
            </tr>
          </thead>
          <tbody>
            <tr className="border-t">
              <td className="py-1">2025-06-01</td>
              <td>3,200</td>
              <td>6.5</td>
              <td>72</td>
              <td>✓</td>
            </tr>
            <tr className="border-t">
              <td className="py-1">2025-06-02</td>
              <td>2,800</td>
              <td>6.0</td>
              <td>74</td>
              <td>✓</td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* 저번주 요약 */}
      <div className="bg-green-200 text-center py-2 font-semibold mt-4">저번주 요약</div>
      <div className="p-3">
        <div className="bg-white rounded-lg p-4 text-sm space-y-1">
          <div>평균 걸음 수: 2,950보</div>
          <div>평균 수면 시간: 5시간 50분</div>
          <div>평균 심박수: 76bpm</div>
          <div>미션 성공률: 4/7일 (57%)</div>
          <div>경고 알림: 3회</div>
        </div>
      </div>

      {/* 이번주 요약 */}
      <div className="bg-green-200 text-center py-2 font-semibold mt-4">이번주 요약</div>
      <div className="p-3">
        <div className="bg-white rounded-lg p-4 text-sm space-y-1">
          <div>평균 걸음 수: 2,950보</div>
          <div>평균 수면 시간: 5시간 50분</div>
          <div>평균 심박수: 76bpm</div>
          <div>미션 성공률: 4/7일 (57%)</div>
          <div>경고 알림: 3회</div>
        </div>
      </div>

      {/* 주간 건강 코멘트 */}
      <div className="bg-green-200 text-center py-2 font-semibold mt-4">주간 건강 코멘트</div>
      <div className="p-3">
        <div className="bg-white rounded-lg p-4 text-sm mb-10">
          최근 3일간 걸음 수가 약간 감소 추세입니다. 가능하다면 가벼운 산책을 권장드려요. 어제 수면 시간이 양호해요.
        </div>
        <div className="flex justify-center mt-4">
          <button className="bg-green-400 px-20 py-1 rounded-full text-sm">코멘트 음성 읽기</button>
        </div>
      </div>
    </div>
  );
};

export default HealthTab;
