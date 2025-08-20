import styles from '@/styles/components/ConfirmModal.module.scss';

export const ConfirmModal = ({ title, caption, setIsModal }) => {
  return (
    <div className={styles.modalWrapper}>
      <div className={styles.modalContent}>
        <div className={styles.modalDesc}>
          <span className={styles.modalTitle}>{title}</span>
          <div className={styles.modalCaption}>{caption}</div>
        </div>
        <div className={styles.modalButtonWrapper}>
          <div
            className={styles.confirmButton}
            onClick={() => setIsModal(false)}
          >
            확인
          </div>
        </div>
      </div>
    </div>
  );
};
