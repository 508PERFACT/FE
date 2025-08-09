import React from 'react';
import styles from '@/styles/components/Header.module.scss';
import { logo_header, logo_title } from '@/assets';
import { Link, useLocation } from 'react-router-dom';

export const Header = () => {
  const location = useLocation();

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <div className={styles.blank}></div>
        <Link className={styles.logoTitle} to={'/'}>
          <img src={logo_title} alt="title" />
        </Link>
        <div className={styles.rightWrapper}>
          {location.pathname !== '/mypage' && (
            <>
              <Link className={styles.planButton} to={'/subscribe'}>
                <span>구독플랜</span>
              </Link>
              <Link className={styles.logoIcon} to={'/mypage'}>
                <img src={logo_header} alt="logo" />
              </Link>
            </>
          )}
        </div>
      </div>
    </div>
  );
};
