import React from 'react';
import { logo_title } from '@/assets';
import styles from '@/styles/pages/Login.module.scss';

export const Login = () => {
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
          <button className={styles.naverButton}>네이버 로그인</button>
        </div>
      </div>
    </div>
  );
};
