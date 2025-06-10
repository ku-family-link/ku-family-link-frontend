import React from 'react';

const AlertTab = () => {
  // localStorage에서 알림 리스트 가져오기
  const storedAlerts = JSON.parse(localStorage.getItem("notifications") || "[]");

  // 알림 유형에 따라 상태와 색상 반환
  const getAlertStatus = (type) => {
    switch (type) {
      case "INACTIVITY_EMERGENCY":
        return { status: "위험", color: "bg-red-400" };
      case "HEALTH_ANOMALY":
        return { status: "경고", color: "bg-yellow-300" };
      default:
        return { status: "알 수 없음", color: "bg-gray-300" };
    }
  };

  // 최신순으로 정렬
  const sortedAlerts = storedAlerts.slice().sort(
    (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
  );

  return (
    <div className="bg-gray-100 pb-20 min-h-screen">
      <div className="bg-green-200 text-center py-2 font-semibold">알림 내역</div>
      <div className="p-3 space-y-3">
        {sortedAlerts.map((alert) => {
          const { status, color } = getAlertStatus(alert.type);
          return (
            <div key={alert.id} className="flex flex-col bg-white rounded-lg px-4 py-3 shadow-sm">
              <div className="flex justify-between items-center">
                <span className="font-semibold">{alert.title}</span>
                <span className={`text-sm text-white px-2 py-0.5 rounded-full ${color}`}>
                  {status}
                </span>
              </div>
              <p className="text-sm text-gray-700 whitespace-pre-line mt-1">{alert.content}</p>
              <p className="text-xs text-gray-400 text-right mt-1">
                {new Date(alert.createdAt).toLocaleString("ko-KR", {
                  year: "numeric",
                  month: "2-digit",
                  day: "2-digit",
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </p>
            </div>
          );
        })}
        {sortedAlerts.length === 0 && (
          <p className="text-center text-gray-500 text-sm mt-10">알림이 없습니다.</p>
        )}
      </div>
    </div>
  );
};

export default AlertTab;
