import React, { useState } from 'react';
import styles from '@/styles/pages/MainPage.module.scss';
import { credit_icon, enter_icon } from '@/assets';
import { CreditNoticetModal } from '@/components/CreditModal';
export const MainPage = () => {
  const [modalType, setModalType] = useState(null);

  return (
    <div className={styles.container}>
      {(modalType === 'deduct' || modalType === 'complate') && (
        <CreditNoticetModal modalType={modalType} setModalType={setModalType} />
      )}
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
        <div
          className={styles.inputButton}
          onClick={() => setModalType('deduct')}
        >
          <img src={enter_icon} alt="" />
        </div>
      </div>
    </div>
  );
};
