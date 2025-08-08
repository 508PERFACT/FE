import { useEffect, useState } from 'react';

// useHover 훅을 사용하여 마우스 hover 상태를 관리하는 커스텀 훅
// useRef를 사용하여 DOM 노드를 참조하고, useEffect를 사용하여 이벤트 리스너를 등록 및 해제
// useState를 사용하여 hover 상태를 관리
export const useHover = () => {
  const [isHovering, setIsHovering] = useState(false);
  const [node, setNode] = useState(null);

  useEffect(() => {
    if (!node) return;

    const handleMouseEnter = () => setIsHovering(true);
    const handleMouseLeave = () => setIsHovering(false);

    node.addEventListener('mouseenter', handleMouseEnter);
    node.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      node.removeEventListener('mouseenter', handleMouseEnter);
      node.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [node]);

  return { nodeRef: setNode, isHovering };
};
