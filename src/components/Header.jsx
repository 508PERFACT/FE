import React from 'react';
import styles from '@/styles/components/Header.module.scss';
import { logo_header, logo_title } from '@/assets';

export const Header = () => {
  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <div className={styles.blank}></div>
        <div className={styles.logoTitle}>
          <img src={logo_title} alt="title" />
        </div>
        <div className={styles.rightWrapper}>
          <div className={styles.planButton}>
            <span>구독 플랜</span>
          </div>
          <div className={styles.logoIcon}>
            <img src={logo_header} alt="logo" />
          </div>
        </div>
      </div>
    </div>
  );
};
