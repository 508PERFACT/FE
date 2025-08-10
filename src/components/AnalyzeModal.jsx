import React from 'react';
import { sheet, magnifier } from '@/assets';
import styles from '@/styles/components/AnalyzeModal.module.scss';

export const AnalyzeModal = () => {
  return (
    <div className={styles.modalWrapper}>
      <div className={styles.modalContent}>
        <style>{`
        @keyframes orbit-spin { from { transform: translate(-50%, -50%) rotate(0deg); } to { transform: translate(-50%, -50%) rotate(360deg); } }
        @keyframes orbit-counter { from { transform: rotate(0deg); } to { transform: rotate(-360deg); } }
        .orbit-sheet { position: absolute; left: 50%; top: 50%; width: 245px; height: 328px; transform: translate(-50%, -50%); }
        .orbit-wrapper { position: absolute; left: 50%; top: 50%; width: 240px; height: 300x; transform: translate(-50%, -50%); animation: orbit-spin 3s linear infinite; }
        .orbit-magnifier { position: absolute; right: 0; bottom: 0; width: 262px; height: 255px; animation: orbit-counter 3s linear infinite; transform-origin: center; }
      `}</style>

        {/* 가운데 고정된 시트 */}
        <img className="orbit-sheet" src={sheet} alt="sheet" />
        {/* 시계방향으로 도는 확대경 (우하단에서 시작) */}
        <div className="orbit-wrapper">
          <img className="orbit-magnifier" src={magnifier} alt="magnifier" />
        </div>
        <div className={styles.analyzeText}>분석중...</div>
      </div>
    </div>
  );
};
