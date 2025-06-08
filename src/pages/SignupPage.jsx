import axios from '../api/axios';
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
    clientageId: '',
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleRegister = async() => {
    if (!form.username || !form.password || !form.confirmPassword || !form.name || !form.relationship || !form.contact || !form.clientageId) {
      alert('모든 항목을 입력해주세요.');
      return;
    }
    if (form.password !== form.confirmPassword) {
      alert('비밀번호가 일치하지 않습니다.');
      return;
    }

    try {
      const response = await axios.post('/api/v1/guardian/auth/signup', {
        email: form.username,
        password: form.password,
        phone: form.contact,
        name: form.name,
        relationship: form.relationship,
        clientageId: form.clientageId,
      });
      const { id, clientageId } = response.data;
      console.log('회원가입 성공:', response.data);

      localStorage.setItem('guardianId', id);
      localStorage.setItem('clientageId', clientageId);

      alert('회원가입이 완료되었습니다!');
      navigate('/');
    } catch (error) {
      console.error(error);
      alert('회원가입 실패: 이미 존재하는 이메일이거나 서버 오류입니다.');
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
        <input
          className="w-full h-12 px-4 rounded-xl bg-green-100 text-gray-800 placeholder-gray-500"
          type="text"
          name="clientageId"
          placeholder="Fitbit 사용자 ID"
          value={form.clientageId}
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
