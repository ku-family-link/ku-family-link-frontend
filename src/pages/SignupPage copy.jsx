import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import BackButton from '../components/BackButton';
import BottomBar from '../components/BottomBar';

export default function SignupPage() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    username: '',
    password: '',
    confirmPassword: '',
    name: '',
    relationship: '',
    contact: '',
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleRegister = async () => {
    if (!form.username || !form.password || !form.confirmPassword || !form.name || !form.relationship || !form.contact) {
      alert('모든 항목을 입력해주세요.');
      return;
    }
    if (form.password !== form.confirmPassword) {
      alert('비밀번호가 일치하지 않습니다.');
      return;
    }

    if (form.password.length < 6) {
      alert('비밀번호는 최소 6자 이상이어야 합니다.');
      return;
    }

    const phoneRegex = /^[0-9]{10,11}$/;
    if (!phoneRegex.test(form.contact)) {
      alert('올바른 연락처 형식을 입력해주세요.');
      return;
    }

    try {
      const response = await fetch('/api/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username: form.username,
          password: form.password,
          name: form.name,
          relationship: form.relationship,
          contact: form.contact,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        alert('회원가입 실패: ' + (errorData.message || '서버 오류'));
        return;
      }

      alert('회원가입이 성공적으로 완료되었습니다!');
      navigate('/');
    } catch (error) {
      alert('네트워크 오류가 발생했습니다. 다시 시도해주세요.');
      console.error('회원가입 에러:', error);
    }
  };

  const isFormValid = Object.values(form).every((field) => field.trim() !== '') && form.password === form.confirmPassword;

  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-white">
      <div className="absolute top-4 left-4">
        <BackButton to="/" />
      </div>
      
      <div className="flex flex-col items-center mt-15 space-y-4 w-full px-8 mt-10 mb-20">
        <h1 className="text-3xl font-semibold mb-4">보호자 회원가입</h1>

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
        <input
          className="w-full h-12 px-4 rounded-xl bg-green-100 text-gray-800 placeholder-gray-500"
          type="password"
          name="confirmPassword"
          placeholder="비밀번호 확인"
          value={form.confirmPassword}
          onChange={handleChange}
        />
        <input
          className="w-full h-12 px-4 rounded-xl bg-green-100 text-gray-800 placeholder-gray-500"
          type="text"
          name="name"
          placeholder="보호자 이름"
          value={form.name}
          onChange={handleChange}
        />
        <input
          className="w-full h-12 px-4 rounded-xl bg-green-100 text-gray-800 placeholder-gray-500"
          type="text"
          name="relationship"
          placeholder="사용자와의 관계"
          value={form.relationship}
          onChange={handleChange}
        />
        <input
          className="w-full h-12 px-4 rounded-xl bg-green-100 text-gray-800 placeholder-gray-500"
          type="text"
          name="contact"
          placeholder="연락처"
          value={form.contact}
          onChange={handleChange}
        />

        <button
          className={`w-full h-12 mt-4 rounded-2xl text-lg ${
            isFormValid
              ? 'bg-green-200 text-gray-800 font-semibold'
              : 'bg-gray-300 text-white cursor-not-allowed'
          }`}
          disabled={!isFormValid}
          onClick={handleRegister}
        >
          회원가입
        </button>
      </div>

      <BottomBar />
    </div>
  );
}
