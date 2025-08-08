import React from 'react';
import styles from '@/styles/pages/MainPage.module.scss';
import { credit_icon, enter_icon } from '@/assets';

export const MainPage = () => {
  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <div className={styles.title}>
          신뢰도를 분석할 네이버 뉴스 링크를 입력해주세요.
        </div>
        <div className={styles.creditsWrapper}>
          <img src={credit_icon} alt="" />
          <div className={styles.credits}>3</div>
        </div>
      </div>
      <div className={styles.inputWrapper}>
        <textarea
          className={styles.inputContent}
          placeholder="링크(URL)를 입력하세요."
          rows={1}
          onChange={(e) => {
            e.target.style.height = 'auto';
            e.target.style.height = e.target.scrollHeight + 'px';
          }}
        />
        <div className={styles.inputButton}>
          <img src={enter_icon} alt="" />
        </div>
      </div>
    </div>
  );
};
