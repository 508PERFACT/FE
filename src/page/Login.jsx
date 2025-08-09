import React from 'react';
import { logo_title } from '@/assets';
import styles from '@/styles/pages/Login.module.scss';
import { useAuthNaver } from '@/hooks/useAuthNaver';

export const Login = () => {
  const loginWithNaver = useAuthNaver();

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <div className={styles.logo}>
          <img src={logo_title} alt="logo" />
        </div>
        <div className={styles.titleContainer}>
          <div className={styles.title}>Hello. welcome.</div>
          <div className={styles.subTitle}>
            완벽하게 정제된 진실을 전하는 AI 정보 큐레이터 퍼팩트
          </div>
        </div>
        <div className={styles.button}>
          <button className={styles.serviceButton}>서비스 소개</button>
          <button className={styles.naverButton} onClick={loginWithNaver}>
            네이버 로그인
          </button>
        </div>
      </div>
    </div>
  );
};
