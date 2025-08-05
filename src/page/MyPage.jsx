import React from 'react';
import styles from '@/styles/pages/MyPage.module.scss';
import { logo_header, report_white, star_sub_white } from '@/assets';

export const MyPage = () => {
  return (
    <div className={styles.container}>
      <div className={styles.profileContent}>
        <span className={styles.homeLink}>&larr; 홈페이지</span>
        <div className={styles.profileLogo}>
          <img src={logo_header} alt="" style={{ width: '80px' }} />
        </div>
        <div className={styles.textWrapper}>
          <div className={styles.title}>
            안녕하세요 <span>화이팅</span>님
          </div>
          <div className={styles.subTitle}>
            {'화이팅'}님을 위해 열심히 문서들의 팩트를 체크하고 있어요!
          </div>
        </div>
      </div>
      <div className={styles.divider}></div>
      <div className={styles.buttonContent}>
        <div className={styles.buttonWrapper}>
          <div className={styles.buttonTextWrapper}>
            <div className={styles.buttonTitle}>레포트 저장함</div>
            <div className={styles.buttonDesc}>
              저장한 레포트들을
              <br />
              정리해드릴게요!
            </div>
          </div>
          <div className={styles.buttonImg}>
            <img src={report_white} alt="" />
          </div>
        </div>
        <div className={styles.buttonWrapper}>
          <div className={styles.buttonTextWrapper}>
            <div className={styles.buttonTitle}>구독 상태 확인</div>
          </div>
          <div className={styles.buttonImg}>
            <img src={star_sub_white} alt="" />
          </div>
        </div>
      </div>
      <span className={styles.logout}>로그아웃</span>
    </div>
  );
};
