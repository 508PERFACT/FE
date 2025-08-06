import React, { useState } from 'react';
import styles from '@/styles/pages/Subscribe.module.scss';
import { logo_modal, star_sub_blue } from '@/assets';

export const Subscribe = () => {
  const [isSubscribe, setIsSubscribe] = useState(false);
  const [modalType, setModalType] = useState('complate');

  return (
    <div className={styles.container}>
      {(modalType === 'unSubscribe' || modalType === 'complate') && (
        <div className={styles.modalWrapper}>
          <div className={styles.modalContent}>
            {modalType === 'unSubscribe' && (
              <>
                <div className={styles.modalDesc}>
                  <span className={styles.modalTitle}>
                    <span>구독</span>을 정말로 해지하시나요?
                  </span>
                  <img src={logo_modal} alt="logo" />
                  <div className={styles.modalCaption}>
                    구독을 해지하면 더 이상 혜택을 누릴 수 없어요ㅠㅠ
                  </div>
                </div>
                <div className={styles.modalButtonWrapper}>
                  <div className={styles.cancelButton}>취소</div>
                  <div className={styles.confirmButton}>확인</div>
                </div>
              </>
            )}
            {modalType === 'complate' && (
              <>
                <div className={styles.modalDesc}>
                  <span className={styles.modalTitle}>해지완료</span>
                  <div className={styles.modalCaption}>
                    유료 구독 플랜이 해지되었습니다.
                  </div>
                </div>
                <div className={styles.modalButtonWrapper}>
                  <div className={styles.confirmButton}>확인</div>
                </div>
              </>
            )}
          </div>
        </div>
      )}

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
