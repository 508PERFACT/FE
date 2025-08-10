import React from 'react';
import styles from '@/styles/components/CreditModal.module.scss';
import { credit_deduct_icon } from '@/assets';

export const CreditModal = ({
  modalType,
  setModalType,
  onConfirm,
  errTitleRed,
  errTitle,
  errCaption,
}) => {
  const handleConfirm = () => {
    if (typeof onConfirm === 'function') {
      onConfirm();
    }
  };
  return (
    <div className={styles.modalWrapper}>
      <div className={styles.modalContent}>
        {modalType === 'deduct' ? (
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
              <div className={styles.confirmButton} onClick={handleConfirm}>
                확인
              </div>
            </div>
          </>
        ) : modalType === 'complate' ? (
          <>
            {' '}
            <div className={styles.modalDesc}>
              <span className={styles.modalTitle}>
                <span className={styles.modalTitleRed}>{errTitleRed}</span>
                {errTitle}
              </span>
              <div className={styles.modalCaption}>{errCaption}</div>
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
        ) : null}
      </div>
    </div>
  );
};
