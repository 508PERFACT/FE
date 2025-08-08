import styles from '@/styles/components/CreditModal.module.scss';
import { credit_deduct_icon } from '@/assets';

export const CreditNoticetModal = ({
  modalType,
  setModalType,
  setIsSubscribe,
}) => {
  return (
    <div className={styles.modalWrapper}>
      <div className={styles.modalContent}>
        {modalType === 'deduct' && (
          <>
            <div className={styles.modalDesc}>
              <span className={styles.modalTitle}>
                <span>크레딧</span> 하나가 차감됩니다.
              </span>
              <img src={credit_deduct_icon} alt="logo" />
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
            {' '}
            <div className={styles.modalDesc}>
              <span className={styles.modalTitle}>
                <span className={styles.modalTitleRed}>링크(URL) </span>
                오류입니다.
              </span>
              <div className={styles.modalCaption}>
                올바른 링크를 입력해주세요.
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
