import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import fitbitLogo from '../assets/Fitbit.png';
import BackButton from '../components/BackButton';
import BottomBar from '../components/BottomBar';
import axios from '../api/axios';

export default function FitbitLoginPage() {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');

  const handleLogin = async () => {
    if (username !== 'CLC3TK') {
      alert('올바른 아이디를 입력해주세요.');
      return;
    }

    const healthSummary = await axios.get(`/api/v1/users/${username}/health/summary/today`);
    const [dailyRes, lastRes, thisRes] = await Promise.all([
      axios.get(`/api/v1/users/${username}/health/all/last-2week`),
      axios.get(`/api/v1/users/${username}/health/summary/last-week`),
      axios.get(`/api/v1/users/${username}/health/summary/this-week`)
    ]);
    const fitbitRes = await axios.get(`/api/v1/users/${username}/fitbit`);

    localStorage.setItem('clientageId', username);
    localStorage.setItem('todaySummary', JSON.stringify(healthSummary.data));
      
    localStorage.setItem('healthData', JSON.stringify(dailyRes.data));
    localStorage.setItem('lastWeekSummary', JSON.stringify(lastRes.data));
    localStorage.setItem('thisWeekSummary', JSON.stringify(thisRes.data));
      
    localStorage.setItem('fitbitInfo', JSON.stringify(fitbitRes.data));
    navigate('/Fitbit'); // 홈(핏빗 대시보드) 페이지 이동
  };

  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-white">
      {/* 상단: 뒤로가기 */}
      <div className="absolute top-4 left-4">
        <BackButton to="/" />
      </div>

      {/* 로그인 입력 폼 */}
      <div className="flex flex-col items-center space-y-4 w-full px-8 mt-10 mb-20">
        <h1 className="flex items-center text-3xl font-semibold mb-4">
          <img
            src={fitbitLogo}
            alt="Fitbit Logo"
            className="w-6 h-6 mr-6"
          />
          Fitbit 로그인
        </h1>

        <input
          className="w-full h-12 px-4 rounded-xl bg-green-100 text-gray-800 placeholder-gray-500"
          type="text"
          name="username"
          placeholder="아이디"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />

        <button
          className={`w-full h-12 mt-4 rounded-2xl text-lg text-gray-800 ${
            username === 'CLC3TK' ? 'bg-green-200 font-semibold' : 'bg-gray-300 cursor-not-allowed text-white'
          }`}
          disabled={username !== 'CLC3TK'}
          onClick={handleLogin}
        >
          로그인
        </button>
      </div>

      <BottomBar />
    </div>
  );
}
