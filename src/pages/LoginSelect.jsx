import { useNavigate } from 'react-router-dom';
import fitbitLogo from '../assets/Fitbit.png';
import BottomBar from '../components/BottomBar';

export default function LoginSelect() {
  const navigate = useNavigate();
  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-white relative">
      <div className="flex flex-col items-center space-y-6 mb-20">
        <h1 className="text-6xl font-bold mb-10">Family Link</h1>

        {/* Fitbit Login Button */}
        <button 
          className="flex items-center w-48 h-10 bg-green-200 rounded-full px-4"
          onClick={() => navigate('/fitbit-login')}
        >
          <img
            src={fitbitLogo}
            alt="Fitbit Logo"
            className="w-6 h-6 mr-6"
          />
          <span className="text-lg text-gray-800">Fitbit Login</span>
        </button>

        {/* 보호자 로그인 버튼 */}
        <button 
          className="w-48 h-10 bg-green-200 rounded-full text-sm text-gray-800 mt-4"
          onClick={() => navigate('/login')}
        >
          보호자 로그인
        </button>

        {/* 보호자 회원가입 버튼 */}
        <button 
          className="w-40 h-8 bg-green-200 rounded-full text-sm text-gray-800 mt-6"
          onClick={() => navigate('/Signup')}
        >
          보호자 회원가입
        </button>
      </div>

      <BottomBar />
    </div>
  );
}
