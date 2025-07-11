import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from '../api/axios';
import BackButton from '../components/BackButton';
import BottomBar from '../components/BottomBar';

export default function LoginPage() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ username: '', password: '' });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleLogin = async () => {
    if (!form.username || !form.password) {
      alert('이메일과 비밀번호를 모두 입력해주세요.');
      return;
    }

    try {
      const response = await axios.post('/api/v1/guardian/auth/login', {
        email: form.username,
        password: form.password,
      });

      const { id, clientageId } = response.data;

      const healthSummary = await axios.get(`/api/v1/users/${clientageId}/health/summary/today`);
      const [dailyRes, lastRes, thisRes] = await Promise.all([
        axios.get(`/api/v1/users/${clientageId}/health/all/last-2week`),
        axios.get(`/api/v1/users/${clientageId}/health/summary/last-week`),
        axios.get(`/api/v1/users/${clientageId}/health/summary/this-week`)
      ]);
      const guardianRes = await axios.get(`/api/v1/users/${id}/guardian`);
      const notificationsRes = await axios.get(`/api/v1/notifications/${clientageId}`);
      const missionTodayRes = await axios.get(`/api/v1/users/${clientageId}/mission/today`);

      localStorage.setItem('guardianId', id);
      localStorage.setItem('clientageId', clientageId);
      localStorage.setItem('todaySummary', JSON.stringify(healthSummary.data));
      
      localStorage.setItem('healthData', JSON.stringify(dailyRes.data));
      localStorage.setItem('lastWeekSummary', JSON.stringify(lastRes.data));
      localStorage.setItem('thisWeekSummary', JSON.stringify(thisRes.data));
      
      localStorage.setItem('guardianInfo', JSON.stringify(guardianRes.data));

      localStorage.setItem('notifications', JSON.stringify(notificationsRes.data));
      localStorage.setItem('todayMission', JSON.stringify(missionTodayRes.data));

      navigate('/home');
    } catch (error) {
      console.error('로그인 실패:', error);
      alert('로그인에 실패했습니다. 이메일 또는 비밀번호를 확인해주세요.');
    }
  };

  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-white">
      {/* 상단: 뒤로가기 */}
      <div className="absolute top-4 left-4">
        <BackButton to="/" />
      </div>

      {/* 로그인 입력 폼 */}
      <div className="flex flex-col items-center space-y-4 w-full px-8 mt-10 mb-20">
        <h1 className="text-3xl font-semibold mb-4">보호자 로그인</h1>

        <input
          className="w-full h-12 px-4 rounded-xl bg-green-100 text-gray-800 placeholder-gray-500"
          type="text"
          name="username"
          placeholder="이메일"
          value={form.username}
          onChange={handleChange}
        />
        <input
          className="w-full h-12 px-4 rounded-xl bg-green-100 text-gray-800 placeholder-gray-500"
          type="password"
          name="password"
          placeholder="비밀번호"
          value={form.password}
          onChange={handleChange}
        />

        <button
          className={`w-full h-12 mt-4 rounded-2xl text-lg text-gray-800 ${
            form.username && form.password ? 'bg-green-200 font-semibold' : 'bg-gray-300 cursor-not-allowed text-white'
          }`}
          disabled={!form.username || !form.password}
          onClick={handleLogin}
        >
          로그인
        </button>
      </div>

      <BottomBar />
    </div>
  );
}
