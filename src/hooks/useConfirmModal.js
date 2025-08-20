import { useEffect, useState } from 'react';

export default function useConfirmModal() {
  const [isModal, setIsModal] = useState(false);
  const [modalType, setModalType] = useState('close');

  // 모달이 열릴 때 스크롤 제어
  useEffect(() => {
    if (modalType !== 'close' || isModal) {
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
  }, [modalType, isModal]);

  return { isModal, setIsModal, modalType, setModalType };
}
