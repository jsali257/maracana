import React, { useEffect, useRef } from 'react';

interface ParallaxCornersProps {
  /** Image for the top-left corner (omit to skip that corner) */
  topLeftSrc?: string;
  /** Image for the bottom-right corner (omit to skip that corner) */
  bottomRightSrc?: string;
  /** How far each corner drifts as the section scrolls, in pixels. Higher = more motion. */
  travel?: number;
}

/**
 * Decorative corner graphics that drift slightly as the page scrolls, giving the
 * section a subtle sense of depth. Purely visual: aria-hidden, ignores clicks,
 * and holds still for anyone who has motion reduced in their OS settings.
 */
export const ParallaxCorners: React.FC<ParallaxCornersProps> = ({
  topLeftSrc,
  bottomRightSrc,
  travel = 36,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const topLeftRef = useRef<HTMLImageElement>(null);
  const bottomRightRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduceMotion) return;

    let ticking = false;

    const update = () => {
      ticking = false;
      const container = containerRef.current;
      if (!container) return;

      const rect = container.getBoundingClientRect();
      const viewportH = window.innerHeight || document.documentElement.clientHeight;
      // -1 when the section's center is at the bottom of the screen, +1 at the top
      const progress = (viewportH / 2 - (rect.top + rect.height / 2)) / (viewportH / 2 + rect.height / 2);
      const clamped = Math.max(-1, Math.min(1, progress));
      const offset = clamped * travel;

      if (topLeftRef.current) {
        topLeftRef.current.style.transform = `translate3d(0, ${-offset}px, 0)`;
      }
      if (bottomRightRef.current) {
        bottomRightRef.current.style.transform = `translate3d(0, ${offset}px, 0)`;
      }
    };

    const onScroll = () => {
      if (!ticking) {
        ticking = true;
        requestAnimationFrame(update);
      }
    };

    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, [travel]);

  return (
    <div ref={containerRef} aria-hidden="true" className="absolute inset-0 overflow-hidden pointer-events-none">
      {topLeftSrc && (
        <img
          ref={topLeftRef}
          src={topLeftSrc}
          alt=""
          draggable={false}
          className="absolute -top-6 -left-6 w-36 sm:w-52 md:w-64 h-auto will-change-transform select-none"
        />
      )}
      {bottomRightSrc && (
        <img
          ref={bottomRightRef}
          src={bottomRightSrc}
          alt=""
          draggable={false}
          className="absolute -bottom-6 -right-6 w-36 sm:w-52 md:w-64 h-auto will-change-transform select-none"
        />
      )}
    </div>
  );
};
