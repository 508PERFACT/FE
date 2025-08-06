import React from 'react';
import styles from '@/styles/components/Header.module.scss';
import { logo_header, logo_title } from '@/assets';
import { useLocation } from 'react-router-dom';

export const Header = () => {
  const location = useLocation();

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <div className={styles.blank}></div>
        <div className={styles.logoTitle}>
          <img src={logo_title} alt="title" />
        </div>
        <div className={styles.rightWrapper}>
          {location.pathname !== '/mypage' && (
            <>
              <div className={styles.planButton}>
                <span>구독플랜</span>
              </div>
              <div className={styles.logoIcon}>
                <img src={logo_header} alt="logo" />
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};
