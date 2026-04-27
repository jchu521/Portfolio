import { useState, useEffect, useCallback, useRef } from 'react';

function scrollToTarget(id, offset = 52) {
  requestAnimationFrame(() => {
    requestAnimationFrame(() => {
      const el = document.getElementById(id);
      if (!el) return;
      const y = el.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top: y, behavior: 'smooth' });
    });
  });
}

/**
 * Manages the hero → content reveal transition.
 * Returns { revealed, heroRef, revealAndScroll }.
 *
 * Listens for wheel / touch gestures on the hero element
 * and reveals + scrolls to the target section.
 */
export default function useHeroReveal(targetId = 'journey') {
  const isMobile = typeof window !== 'undefined' && window.innerWidth <= 768;
  const [revealed, setRevealed] = useState(isMobile);
  const revealedRef = useRef(isMobile);
  const heroRef = useRef(null);

  const revealAndScroll = useCallback(() => {
    if (revealedRef.current) return;
    revealedRef.current = true;
    setRevealed(true);
    scrollToTarget(targetId);
  }, [targetId]);

  useEffect(() => {
    const hero = heroRef.current;
    if (!hero || revealedRef.current) return;

    const onWheel = (e) => {
      if (e.deltaY > 0) revealAndScroll();
    };

    let touchStartY = 0;
    const onTouchStart = (e) => {
      touchStartY = e.touches[0].clientY;
    };
    const onTouchMove = (e) => {
      if (touchStartY - e.touches[0].clientY > 30) revealAndScroll();
    };

    hero.addEventListener('wheel', onWheel, { passive: true });
    hero.addEventListener('touchstart', onTouchStart, { passive: true });
    hero.addEventListener('touchmove', onTouchMove, { passive: true });
    return () => {
      hero.removeEventListener('wheel', onWheel);
      hero.removeEventListener('touchstart', onTouchStart);
      hero.removeEventListener('touchmove', onTouchMove);
    };
  }, [revealAndScroll]);

  return { revealed, heroRef, revealAndScroll };
}
