import React from 'react';

const AlertTab = () => {
  const alerts = [
    { message: '심박수 이상 감지', status: '경고', color: 'bg-yellow-300' },
    { message: '미션 완료 확인', status: '완료', color: 'bg-green-300' },
    { message: '이상 징후 없음', status: '정상', color: 'bg-emerald-300' },
    { message: '심박수 이상 감지', status: '경고', color: 'bg-yellow-300' },
    { message: '미션 완료 확인', status: '완료', color: 'bg-green-300' },
    { message: '이상 징후 없음', status: '정상', color: 'bg-emerald-300' },
  ];

  return (
    <div className="bg-gray-100 pb-20">
      <div className="bg-green-200 text-center py-2 font-semibold">알림 내역</div>
      <div className="p-3 space-y-3">
        {alerts.map((alert, index) => (
          <div key={index} className="flex justify-between items-center bg-white rounded-lg px-4 py-3">
            <span>{alert.message}</span>
            <span className={`text-sm text-white px-2 py-0.5 rounded-full ${alert.color}`}>{alert.status}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AlertTab;
