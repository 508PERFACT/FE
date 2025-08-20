import React, { useEffect, useState } from 'react';
import styles from '@/styles/pages/Subscribe.module.scss';
import { logo_modal, star_sub_blue } from '@/assets';
import api from '@/apis/axiosInstance';
import { ConfirmModal } from '@/components/ConfirmModal';
import useConfirmModal from '@/hooks/useConfirmModal';

export const Subscribe = () => {
  const [isSubscribe, setIsSubscribe] = useState(false);

  const [subscribeData, setSubscribeData] = useState({});
  const { isModal, setIsModal, modalType, setModalType } = useConfirmModal();

  useEffect(() => {
    const getSubscribe = async () => {
      try {
        const res = await api.get('users/subscribe');
        if (res.data.isSuccess) setSubscribeData(res.data.result);
        // setSubscribeData(mockSubscription.result);
        if (res.data.result.planName == 'GUEST') setIsModal(true);
      } catch (error) {
        console.error(error);
      }
    };
    getSubscribe();
  }, []);

  return (
    <div className={styles.container}>
      {(modalType === 'unSubscribe' || modalType === 'complate') && (
        <SubscribeModal
          modalType={modalType}
          setModalType={setModalType}
          setIsSubscribe={setIsSubscribe}
        />
      )}
      {isModal && (
        <ConfirmModal
          setIsModal={setIsModal}
          title="게스트는 구독을 이용할 수 없어요!"
          caption="게스트 이용자는 유료 구독 플랜을 이용할 수 없습니다. 로그인 후
            이용해주세요!"
        />
      )}

      <div className={styles.title}>
        <img src={star_sub_blue} alt="" />
        <span>구독 상태 확인</span>
      </div>
      <div className={styles.content}>
        <table>
          <thead>
            <tr>
              <th>항목</th>
              <th>내용</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>플랜 이름</td>
              <td>{subscribeData.planName}</td>
            </tr>
            <tr>
              <td>구독 상태</td>
              <td>{subscribeData.subscribeStatus}</td>
            </tr>
            <tr>
              <td>다음 결제일</td>
              <td>{subscribeData.nextBillingDate}</td>
            </tr>
            <tr>
              <td>일간 크레딧 제공량</td>
              <td>{subscribeData.dailyCredit}건</td>
            </tr>
            <tr>
              <td>이번 달 사용량</td>
              <td>{subscribeData.thisMonthUsage}건 사용됨</td>
            </tr>
          </tbody>
        </table>
      </div>
      <div className={styles.buttonWrapper}>
        <button
          className={`${styles.button} ${
            !isSubscribe &&
            subscribeData.planName !== 'GUEST' &&
            styles.isSubscribe
          }`}
          disabled={subscribeData.planName === 'GUEST'}
          onClick={
            isSubscribe
              ? () => setModalType('unSubscribe')
              : () => setIsSubscribe(true)
          }
        >
          {isSubscribe ? '해지하기' : '유료플랜 구독하기'}
        </button>
        <div className={styles.caption}>
          {subscribeData.planName === 'GUEST'
            ? '게스트는 구독 혜택을 이용할 수 없어요.'
            : isSubscribe
            ? '해지하면 혜택을 더 이상 누릴 수 없어요.'
            : '더 많은 크레딧과 광고 없는 퍼펙트를 즐겨봐요!'}
        </div>
      </div>
    </div>
  );
};

const SubscribeModal = ({ modalType, setModalType, setIsSubscribe }) => {
  return (
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
              <div
                className={styles.cancelButton}
                onClick={() => setModalType('close')}
              >
                취소
              </div>
              <div
                className={styles.confirmButton}
                onClick={() => {
                  setModalType('complate');
                  setIsSubscribe(false);
                }}
              >
                확인
              </div>
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
              <div
                className={styles.confirmButton}
                onClick={() => setModalType('close')}
              >
                확인
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};
