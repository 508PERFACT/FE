import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from '@/styles/pages/MainPage.module.scss';
import { credit_icon, enter_icon } from '@/assets';
import { CreditModal } from '@/components/CreditModal';
import { AnalyzeModal } from '@/components/AnalyzeModal';
import api from '@/apis/axiosInstance';

export const MainPage = () => {
  const navigate = useNavigate();
  const [modalType, setModalType] = useState(null);
  const [inputUrl, setInputUrl] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [dailyCredit, setDailyCredit] = useState(0);
  const [errTitleRed, setErrTitleRed] = useState('링크(URL) ');
  const [errTitle, setErrTitle] = useState('오류입니다.');
  const [errCaption, setErrCaption] = useState('올바른 링크를 입력해주세요.');
  useEffect(() => {
    const getSubscribe = async () => {
      try {
        const res = await api.get('users/subscribe');
        if (res.data.isSuccess)
          setDailyCredit(
            res.data.result.dailyCredit - res.data.result.todayUsage,
          );
      } catch (error) {
        console.error(error);
      }
    };
    getSubscribe();
  }, []);

  return (
    <div className={styles.container}>
      {isAnalyzing ? (
        <AnalyzeModal />
      ) : modalType === 'deduct' || modalType === 'complate' ? (
        <CreditModal
          errTitleRed={errTitleRed}
          errTitle={errTitle}
          errCaption={errCaption}
          modalType={modalType}
          setModalType={setModalType}
          onConfirm={async () => {
            const url = inputUrl.trim();
            if (!url) {
              setModalType('complate');
              return;
            }
            try {
              setIsAnalyzing(true);
              const res = await api.post('/report', { url });
              console.log(res);

              // reportId 추출하여 페이지 이동
              if (res.data && res.data.result && res.data.result.reportId) {
                navigate(`/report/${res.data.result.reportId}`);
              } else {
                setModalType('close');
              }
            } catch (error) {
              console.error(error?.response?.data || error);
              if (error?.response?.data.message === '크레딧이 부족합니다.') {
                setErrTitleRed('크레딧 ');
                setErrTitle('부족');
                setErrCaption('크레딧이 부족합니다.');
              }
              setModalType('complate');
            } finally {
              setIsAnalyzing(false);
            }
          }}
        />
      ) : null}
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
