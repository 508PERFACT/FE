import { logo_title, main_img } from '@/assets';
import styles from '@/styles/pages/Login.module.scss';
import { useAuthNaver } from '@/hooks/useAuthNaver';
import useAuthGuest from '@/hooks/useAuthGuest';
import { ConfirmModal } from '@/components/ConfirmModal';
import useConfirmModal from '@/hooks/useConfirmModal';

export const Login = () => {
  const { isModal, setIsModal } = useConfirmModal();
  const loginWithNaver = useAuthNaver();
  const { handleGuest } = useAuthGuest();

  return (
    <>
      {isModal && (
        <ConfirmModal
          setIsModal={setIsModal}
          title="서비스 준비중입니다..."
          caption="조금만 기다려주시면 멋진 기능으로 찾아올게요!"
        />
      )}
      <div className={styles.container}>
        <div className={styles.content}>
          <div className={styles.leftContent}>
            <div className={styles.logo}>
              <img src={logo_title} alt="logo" />
            </div>
            <div className={styles.titleContainer}>
              <div className={styles.title}>Hello. welcome.</div>
              <div className={styles.subTitle}>
                완벽하게 정제된 진실을 전하는 AI 정보 큐레이터 퍼팩트
              </div>
            </div>
            <div className={styles.button}>
              <button
                className={styles.serviceButton}
                onClick={() => setIsModal(true)}
              >
                서비스 소개
              </button>
              <button className={styles.naverButton} onClick={loginWithNaver}>
                네이버 로그인
              </button>
              <div className={styles.divider}>
                <span>또는</span>
              </div>
              <button className={styles.guestButton} onClick={handleGuest}>
                게스트 로그인
              </button>
            </div>
          </div>
          <div className={styles.mainImg}>
            <img src={main_img} alt="main" />
          </div>
        </div>
      </div>
    </>
  );
};
