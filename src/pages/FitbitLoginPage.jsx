import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import fitbitLogo from '../assets/Fitbit.png';
import BackButton from '../components/BackButton';
import BottomBar from '../components/BottomBar';

export default function FitbitLoginPage() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ username: '', password: '' });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleLogin = () => {
    if (!form.username || !form.password) {
      alert('아이디와 비밀번호를 모두 입력해주세요.');
      return;
    }

    // 로그인 성공 처리 (예: API 호출 후 성공 시)
    console.log('로그인 성공:', form);

    navigate('/Fibit'); // 홈 페이지로 이동
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
