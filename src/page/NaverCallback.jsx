import React, { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { exchangeNaverCode } from '@/apis/auth';
import styles from '@/styles/pages/NaverCallback.module.scss';
export const NaverCallback = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    const code = searchParams.get('code');
    const state = searchParams.get('state');

    // 기본 검증
    if (!code || !state) {
      setErrorMessage('인증 코드가 올바르지 않습니다.');
      return;
    }

    // CSRF 방지: state 검증
    const storedState = sessionStorage.getItem('naver_oauth_state');
    if (!storedState || storedState !== state) {
      setErrorMessage('인증 요청이 유효하지 않습니다. 다시 시도해주세요.');
      return;
    }

    // 사용 완료 후 제거
    sessionStorage.removeItem('naver_oauth_state');

    // 백엔드로 코드/스테이트 전달
    (async () => {
      try {
        const response = await exchangeNaverCode({ code, state });
        const data = response?.data;
        console.log(data);

        // 토큰 저장
        if (data?.result?.accessToken) {
          localStorage.setItem('access_token', data.result.accessToken);
        } else if (data?.accessToken) {
          // 백엔드 응답 포맷이 다른 경우 대비
          localStorage.setItem('access_token', data.accessToken);
        }
        if (data?.result?.refreshToken) {
          localStorage.setItem('refresh_token', data.result.refreshToken);
        } else if (data?.refreshToken) {
          localStorage.setItem('refresh_token', data.refreshToken);
        }

        // 로그인 이전 목적지로 이동 (없으면 홈)
        const redirectPath =
          sessionStorage.getItem('post_login_redirect') || '/';
        sessionStorage.removeItem('post_login_redirect');
        navigate(redirectPath, { replace: true });
      } catch (err) {
        console.log(err);
        setErrorMessage(
          '로그인 처리 중 오류가 발생했습니다. 잠시 후 다시 시도해주세요.',
        );
        console.log(errorMessage);
      }
    })();
  }, [navigate, searchParams]);

  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        height: '60vh',
      }}
    >
      <div className={styles.spinnerWrapper}>
        <div className={styles.spinner}></div>
        <span>로그인 처리 중입니다...</span>
      </div>
    </div>
  );
};
