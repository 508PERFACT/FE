import React, { useState } from 'react';
import styles from '@/styles/pages/Subscribe.module.scss';
import { star_sub_blue } from '@/assets';

export const Subscribe = () => {
  const [isSubscribe, setIsSubscribe] = useState(false);

  return (
    <div className={styles.container}>
      <div className={styles.title}>
        <img src={star_sub_blue} alt="" />
        <span>구독 상태 확인</span>
      </div>
      <div className={styles.content}>
        <table>
          <thead>
            <td>항목</td>
            <td>내용</td>
          </thead>
          <tr>
            <td>플랜 이름</td>
            <td>{`Free`}</td>
          </tr>
          <tr>
            <td>구독 상태</td>
            <td>{`무료 플랜 사용중`}</td>
          </tr>
          <tr>
            <td>다음 결제일</td>
            <td>{`무료 플랜 사용중`}</td>
          </tr>
          <tr>
            <td>일간 크레딧 제공량</td>
            <td>{`3`}건</td>
          </tr>
          <tr>
            <td>이번 달 사용량</td>
            <td>{`2`}건 사용됨</td>
          </tr>
        </table>
      </div>
      <div className={styles.buttonWrapper}>
        <button
          className={`${styles.button} ${!isSubscribe && styles.isSubscribe}`}
        >
          {isSubscribe ? '해지하기' : '유료플랜 구독하기'}
        </button>
        <div className={styles.caption}>
          {isSubscribe
            ? '해지하면 혜택을 더 이상 누릴 수 없어요.'
            : '더 많은 크레딧과 광고 없는 퍼펙트를 즐겨봐요!'}
        </div>
      </div>
    </div>
  );
};
