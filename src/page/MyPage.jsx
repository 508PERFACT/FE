import React, { useState, useEffect } from 'react';
import styles from '@/styles/pages/MyPage.module.scss';
import { logo_header, report_white, star_sub_white } from '@/assets';
import { Link, useNavigate } from 'react-router-dom';
import api from '@/apis/axiosInstance';

export const MyPage = () => {
  const navigate = useNavigate();
  const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);
  const [nickname, setNickname] = useState('');
  const handleLogout = async () => {
    const refreshToken = localStorage.getItem('refresh_token');
    try {
      const res = await api.post('auth/logout', {
        refreshToken: refreshToken,
      });
      if (res.data.isSuccess == false) throw new Error(res.data.message);

      localStorage.removeItem('access_token');
      localStorage.removeItem('refresh_token');
      navigate('/login');
    } catch (error) {
      console.error(error);
      alert(error.message || '로그아웃에 실패했습니다.');
    } finally {
      setIsLogoutModalOpen(false);
    }
  };
  // 모달이 열릴 때 스크롤 제어
  useEffect(() => {
    if (isLogoutModalOpen) {
      // 스크롤을 맨 위로 이동
      window.scrollTo(0, 0);
      // 스크롤 비활성화
      document.body.style.overflow = 'hidden';
    } else {
      // 스크롤 활성화
      document.body.style.overflow = 'auto';
    }

    // 컴포넌트 언마운트 시 스크롤 복원
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [isLogoutModalOpen]);
  useEffect(() => {
    const fetchNickname = async () => {
      const res = await api.get('users/nickname');
      if (res.data.isSuccess) setNickname(res.data.result.nickname);
    };
    fetchNickname();
  }, []);

  return (
    <div className={styles.container}>
      <div className={styles.profileContent}>
        <Link className={styles.homeLink} to={'/'}>
          &larr; 홈페이지
        </Link>
        <div className={styles.profileLogo}>
          <img src={logo_header} alt="" style={{ width: '80px' }} />
        </div>
        <div className={styles.textWrapper}>
          <div className={styles.title}>
            안녕하세요 <span>{nickname}</span>님
          </div>
          <div className={styles.subTitle}>
            {nickname}님을 위해 열심히 문서들의 팩트를 체크하고 있어요!
          </div>
        </div>
      </div>
      <div className={styles.divider}></div>
      <div className={styles.buttonContent}>
        <div
          className={styles.buttonWrapper}
          onClick={() => navigate(`/myreports/1`)}
        >
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
        <div
          className={styles.buttonWrapper}
          onClick={() => navigate(`/subscribe`)}
        >
          <div className={styles.buttonTextWrapper}>
            <div className={styles.buttonTitle}>구독 상태 확인</div>
          </div>
          <div className={styles.buttonImg}>
            <img src={star_sub_white} alt="" />
          </div>
        </div>
      </div>
      <span
        className={styles.logout}
        onClick={() => setIsLogoutModalOpen(true)}
      >
        로그아웃
      </span>
      {isLogoutModalOpen && (
        <div className={styles.modalWrapper}>
          <div className={styles.modalContent}>
            <div className={styles.modalDesc}>
              <span className={styles.modalTitle}>로그아웃 하시겠습니까?</span>
            </div>
            <div className={styles.modalButtonWrapper}>
              <div className={styles.cancelButton} onClick={handleLogout}>
                로그아웃
              </div>
              <div
                className={styles.confirmButton}
                onClick={() => setIsLogoutModalOpen(false)}
              >
                뒤로가기
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
