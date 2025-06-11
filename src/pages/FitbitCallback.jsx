import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from '../api/axios';

export default function FitbitCallback() {
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        // 1. URL에서 code 가져오기
        const urlParams = new URLSearchParams(window.location.search);
        console.log('🔍 URLSearchParams:', urlParams.toString());
        const code = urlParams.get('code');
        console.log('🔍 Fitbit 인증 코드:', code);
        if (!code) throw new Error('코드 없음');

        // 2. 서버에 code 전송 → 액세스 토큰 + 사용자 식별자 받아오기
        //const tokenRes = await axios.post('/api/v1/oauth2/fitbit/callback', { params: code });
        const tokenRes = await axios.get('/api/v1/oauth2/fitbit/callback', { params: { code } });
        console.log('🔍 Fitbit 인증 응답:', tokenRes);
        console.log('🔍 Fitbit 인증 응답:', tokenRes.data);
        const userId = tokenRes.data.userId; // 예: CLC3TK
        console.log('✅ Fitbit userId:', userId);

        // 3. 사용자 데이터 요청
        const healthSummary = await axios.get(`/api/v1/users/${userId}/health/summary/today`);
  
        const [dailyRes, lastRes, thisRes] = await Promise.all([
          axios.get(`/api/v1/users/${userId}/health/all/last-2week`),
          axios.get(`/api/v1/users/${userId}/health/summary/last-week`),
          axios.get(`/api/v1/users/${userId}/health/summary/this-week`)
        ]);
        const fitbitRes = await axios.get(`/api/v1/users/${userId}/fitbit`);
        const notificationsRes = await axios.get(`/api/v1/notifications/${userId}`);
        const missionTodayRes = await axios.get(`/api/v1/users/${userId}/mission/today`);

        // 4. 로컬 스토리지 저장
        localStorage.setItem('clientageId', userId);
        localStorage.setItem('todaySummary', JSON.stringify(healthSummary.data));
        localStorage.setItem('healthData', JSON.stringify(dailyRes.data));
        localStorage.setItem('lastWeekSummary', JSON.stringify(lastRes.data));
        localStorage.setItem('thisWeekSummary', JSON.stringify(thisRes.data));
        localStorage.setItem('fitbitInfo', JSON.stringify(fitbitRes.data));
        localStorage.setItem('notifications', JSON.stringify(notificationsRes.data));
        localStorage.setItem('todayMission', JSON.stringify(missionTodayRes.data));

        navigate('/fitbit'); // Fitbit 대시보드 페이지로 이동
      } catch (error) {
        console.error('Fitbit 인증 실패:', error);
        if (error.response) {
          console.error("🔍 상태 코드:", error.response.status);
          console.error("🔍 응답 데이터:", error.response.data);
        }
        alert('인증 중 오류가 발생했습니다.');
        navigate('/');
      }
    };

    fetchData();
  }, [navigate]);

  return (
    <div className="min-h-screen flex justify-center items-center bg-gradient-to-br from-green-100 via-green-200 to-green-300 text-green-900 text-xl font-semibold">
      <div className="flex justify-center items-center h-screen text-lg">
        Fitbit 로그인 처리 중...
      </div>
    </div>
  );
}
