import React, { useEffect, useState } from 'react';
import styles from '@/styles/pages/MainPage.module.scss';
import { credit_icon, enter_icon } from '@/assets';
import { CreditModal } from '@/components/CreditModal';
import api from '@/apis/axiosInstance';

export const MainPage = () => {
  const [modalType, setModalType] = useState(null);
  const [inputUrl, setInputUrl] = useState('');
  const [dailyCredit, setDailyCredit] = useState(0);
  useEffect(() => {
    const getSubscribe = async () => {
      try {
        const res = await api.get('users/subscribe');
        if (res.data.isSuccess) setDailyCredit(res.data.result.dailyCredit);
      } catch (error) {
        console.error(error);
      }
    };
    getSubscribe();
  }, []);

  return (
    <div className={styles.container}>
      {(modalType === 'deduct' || modalType === 'complate') && (
        <CreditModal
          modalType={modalType}
          setModalType={setModalType}
          inputUrl={inputUrl}
        />
      )}
      <div className={styles.content}>
        <div className={styles.title}>
          신뢰도를 분석할 네이버 뉴스 링크를 입력해주세요.
        </div>
        <div className={styles.creditsWrapper}>
          <img src={credit_icon} alt="" />
          <div className={styles.credits}>{dailyCredit}</div>
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
            setInputUrl(e.target.value);
          }}
          value={inputUrl}
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
