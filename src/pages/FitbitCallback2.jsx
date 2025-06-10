import React, { useEffect, useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import axios from '../api/axios';

const FitbitCallback = () => {
  const [searchParams] = useSearchParams();
  const [status, setStatus] = useState<'loading' | 'success' | 'error'>('loading');
  const navigate = useNavigate();

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const code = searchParams.get('code');
    console.log('🔍 Fitbit 인증 코드:', code);
    console.log('🔍 URLSearchParams:', params.toString());
    console.log('searchParams:', searchParams);

    if (!code) {
      setStatus('error');
      console.error('❌ code가 없습니다.');
      return;
    }

    const fetchUserId = async () => {
      try {
        const response = await axios.post('https://familylink.click/api/v1/oauth2/fitbit/login', {
          code,
        });

        const userId = response.data.userId;
        console.log('✅ Fitbit userId:', userId);

        setStatus('success');
        // TODO: userId 저장 (localStorage, context, redux 등)
        localStorage.setItem('userId', userId);

        // 인증 후 이동할 경로
        navigate('/fitbit');
      } catch (err) {
        console.error('❌ userId 받아오기 실패:', err);
        setStatus('error');
      }
    };

    fetchUserId();
  }, [searchParams, navigate]);

  return (
    <div>
      {status === 'loading' && <p>🔄 Fitbit 인증 처리 중...</p>}
      {status === 'success' && <p>✅ 인증 성공! 이동 중...</p>}
      {status === 'error' && <p>❌ 인증 실패. 다시 시도해주세요.</p>}
    </div>
  );
};

export default FitbitCallback;
