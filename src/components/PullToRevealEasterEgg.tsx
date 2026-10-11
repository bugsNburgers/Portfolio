'use client';

import React, { useEffect, useRef, useState } from 'react';
import styled, { createGlobalStyle, keyframes } from 'styled-components';

const PullGlobalStyles = createGlobalStyle`
  @import url('https://fonts.googleapis.com/css2?family=Press+Start+2P&display=swap');

  html {
    overscroll-behavior-y: none;
  }
`;

const pixelBlink = keyframes`
  0%, 49% { opacity: 1; }
  50%, 100% { opacity: 0; }
`;

const bounceArrow = keyframes`
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(3px); }
`;

// Stretchy electric-cyan membrane that grows from the bottom edge
const PullOverlay = styled.div<{ $atBottom: boolean }>`
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;
  height: 0;
  z-index: 9998;
  pointer-events: none;
  will-change: height;
  contain: layout style paint;

  .pull__skin {
    position: absolute;
    inset: 0;
    background: #64ffda;
    opacity: 0.55;
    will-change: opacity;

    svg {
      position: absolute;
      left: 0;
      bottom: 100%;
      width: 100%;
      height: 130px;
      display: block;
      pointer-events: none;
    }

    path {
      fill: #64ffda;
    }
  }

  .pull__hint {
    position: absolute;
    left: 0;
    right: 0;
    bottom: 5px;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 7px;
    color: #0a192f;
    font: 700 12px/1 'Fira Code', ui-monospace, monospace;
    letter-spacing: 0.04em;
    pointer-events: none;
    z-index: 5;
    transition: opacity 0.25s ease, transform 0.25s ease;

    .arrow {
      font-size: 13px;
      display: inline-block;
      animation: ${bounceArrow} 1.4s ease-in-out infinite;
    }
  }

  .pull__label {
    position: absolute;
    left: 0;
    right: 0;
    top: 18px;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 10px;
    color: #0a192f;
    opacity: 0;
    will-change: opacity;
    font: 600 15px/1 'Fira Code', ui-monospace, monospace;
    letter-spacing: 0.02em;
  }

  .pull__ring {
    width: 30px;
    height: 30px;
    transform: rotate(-90deg);

    circle {
      fill: none;
      stroke: #0a192f;
      stroke-width: 3;
      stroke-linecap: round;
    }

    .track {
      opacity: 0.2;
    }
  }
`;

// Inline video container in the page flow below the footer
const InlineVideoContainer = styled.div<{ $visible: boolean }>`
  position: relative;
  width: 95%;
  max-width: 1380px;
  margin: 20px auto 36px auto;
  aspect-ratio: 96 / 74;
  min-height: 480px;
  max-height: 88vh;
  overflow: hidden;
  border-radius: 12px;
  display: ${({ $visible }) => ($visible ? 'block' : 'none')};

  @media (max-width: 768px) {
    width: 98%;
    min-height: 260px;
    margin: 14px auto 24px auto;
  }

  iframe {
    position: absolute;
    inset: 0;
    width: 100%;
    height: 100%;
    border: none;
    display: block;
    background: transparent;
  }
`;

// True 8-bit pixel countdown directly over page background
const PixelCountdownCard = styled.div`
  position: absolute;
  inset: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 20px;
  padding: 24px;
  background: transparent;
  border: none;
  box-shadow: none;
  z-index: 10;
  font-family: 'Press Start 2P', 'Courier New', monospace;
  text-align: center;
  image-rendering: pixelated;
  pointer-events: none;

  .pixel-number {
    font-size: clamp(72px, 12vw, 120px);
    color: #64ffda;
    line-height: 1;
    text-shadow:
      0 0 24px rgba(100, 255, 218, 0.6),
      0 0 48px rgba(100, 255, 218, 0.3);
    letter-spacing: -4px;
  }

  .pixel-audio-badge {
    display: inline-flex;
    align-items: center;
    gap: 12px;
    font-size: clamp(10px, 1.3vw, 12px);
    color: #ccd6f6;
    letter-spacing: 1px;
    text-transform: uppercase;
    text-shadow: 0 0 8px rgba(204, 214, 246, 0.4);

    .icon {
      color: #64ffda;
      animation: ${pixelBlink} 1s steps(1) infinite;
    }
  }

  .pixel-note {
    font-size: clamp(9px, 1.1vw, 11px);
    color: #8892b0;
    max-width: 520px;
    line-height: 1.8;
    letter-spacing: 1px;
    text-shadow: 0 0 6px rgba(136, 146, 176, 0.4);
  }
`;

const PullToRevealEasterEgg = (): React.ReactElement => {
  const pullRef = useRef<HTMLDivElement>(null);
  const skinRef = useRef<HTMLDivElement>(null);
  const pathRef = useRef<SVGPathElement>(null);
  const labelRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLSpanElement>(null);
  const barRef = useRef<SVGCircleElement>(null);
  const hintRef = useRef<HTMLDivElement>(null);
  const iframeRef = useRef<HTMLIFrameElement>(null);

  const [revealed, setRevealed] = useState(false);
  const [phase, setPhase] = useState<'idle' | 'countdown' | 'playing'>('idle');
  const [countdown, setCountdown] = useState(4);
  const [atBottom, setAtBottom] = useState(false);

  // 4-second countdown logic -> starts video after 4 seconds reaches 0
  useEffect(() => {
    if (phase !== 'countdown') return;

    if (countdown > 1) {
      const timer = setTimeout(() => {
        setCountdown((c) => c - 1);
      }, 1000);
      return () => clearTimeout(timer);
    } else {
      const finishTimer = setTimeout(() => {
        setPhase('playing');
      }, 1000);
      return () => clearTimeout(finishTimer);
    }
  }, [phase, countdown]);

  useEffect(() => {
    if (phase === 'playing') {
      const sendStart = () => {
        if (iframeRef.current && iframeRef.current.contentWindow) {
          iframeRef.current.contentWindow.postMessage('START_PLAYBACK', '*');
        }
      };
      sendStart();
      const t1 = setTimeout(sendStart, 80);
      const t2 = setTimeout(sendStart, 250);
      return () => {
        clearTimeout(t1);
        clearTimeout(t2);
      };
    }
  }, [phase]);

  // Smooth scroll down to inline container as soon as revealed
  useEffect(() => {
    if (revealed && phase === 'countdown') {
      const el = document.getElementById('easter-egg-container');
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'end' });
      } else {
        window.scrollTo({
          top: document.documentElement.scrollHeight,
          behavior: 'smooth',
        });
      }
    }
  }, [revealed, phase]);

  useEffect(() => {
    if (revealed) return;

    const CFG = {
      threshold: 180,
      max: 380,
      releaseIdleMs: 220, // Idle time on wheel that counts as release ("hold and release")
      arriveLockMs: 400,  // Fast scroll stops dead at footer before allowing stretch
      restingH: 26,       // Permanent peeking lip height at footer
      restingBulge: 42,   // Permanent peeking curvature arch in SVG
    };

    const target = document.getElementById('site-content');
    const pull = pullRef.current;
    const skin = skinRef.current;
    const path = pathRef.current;
    const label = labelRef.current;
    const text = textRef.current;
    const bar = barRef.current;
    const hint = hintRef.current;

    if (!pull || !skin || !path || !label || !text || !bar) return;

    const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;

    let p = 0;
    let v = 0;
    let mode: 'idle' | 'pulling' | 'springing' | 'launching' = 'idle';
    let raf = 0;
    let idleT: NodeJS.Timeout | number = 0;
    let crossed = false;
    let touchY: number | null = null;
    let isMouseDown = false;
    let startMouseY = 0;

    const isBottom = () => {
      const scrollY = window.scrollY || document.documentElement.scrollTop;
      const viewportH = window.innerHeight;
      const docH = document.documentElement.scrollHeight;
      return Math.ceil(scrollY + viewportH) >= docH - 8;
    };

    let bottomSince: number | null = isBottom() ? performance.now() - 1000 : null;
    let lastScrollTime = 0;

    const onScroll = () => {
      lastScrollTime = performance.now();
      const b = isBottom();
      setAtBottom(b);
      if (b) {
        if (bottomSince === null) bottomSince = performance.now();
      } else {
        bottomSince = null;
      }
      if (mode === 'idle') {
        render();
      }
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();

    function render() {
      if (!pull || !skin || !path || !label || !bar || !text) return;
      if (mode === 'launching') return;

      const atBottomNow = isBottom();
      const isPulling = p > 0;

      if (isPulling) {
        const h = CFG.restingH + p;
        const ratio = Math.min(p / CFG.threshold, 1);
        const bulge = Math.min(125, CFG.restingBulge + p * 0.65);

        pull.style.height = `${h}px`;
        skin.style.opacity = (0.55 + 0.45 * ratio).toFixed(3);
        path.setAttribute('d', `M0 130 Q50 ${130 - bulge} 100 130 Z`);

        if (hint) {
          hint.style.opacity = '0';
          hint.style.transform = 'translate3d(0, 8px, 0)';
        }

        label.style.opacity = String(Math.min(Math.max((p - 25) / 50, 0), 1));
        bar.style.strokeDashoffset = String(94.25 * (1 - ratio));
        const ready = p >= CFG.threshold;
        text.textContent = ready ? 'now let go' : 'pull to see something fun';

        if (ready && !crossed) {
          crossed = true;
          if (navigator.vibrate) navigator.vibrate(14);
        }
        if (!ready) crossed = false;

        // Elastic stretch of page content upwards
        if (target && !reduce) {
          target.style.transform = `translate3d(0, ${-p * 0.9}px, 0)`;
        }
      } else {
        // Resting state (p === 0)
        if (atBottomNow) {
          // Permanent peeking-out curvature at the bottom edge showing "scroll down for fun"
          pull.style.height = `${CFG.restingH}px`;
          skin.style.opacity = '0.55';
          path.setAttribute('d', `M0 130 Q50 ${130 - CFG.restingBulge} 100 130 Z`);
          if (hint) {
            hint.style.opacity = '1';
            hint.style.transform = 'translate3d(0, 0, 0)';
          }
          label.style.opacity = '0';
        } else {
          pull.style.height = '0px';
          skin.style.opacity = '0';
          path.setAttribute('d', 'M0 130 Q50 130 100 130 Z');
          if (hint) {
            hint.style.opacity = '0';
            hint.style.transform = 'translate3d(0, 8px, 0)';
          }
          label.style.opacity = '0';
        }

        crossed = false;
        if (target && !reduce) {
          target.style.transform = '';
        }
      }
    }

    function applyPull(delta: number) {
      if (raf) cancelAnimationFrame(raf);
      mode = 'pulling';
      const resist = Math.max(0.1, 1 - p / CFG.max);
      p = Math.min(CFG.max, Math.max(0, p + delta * 0.6 * resist));
      render();
    }

    // Underdamped spring back wobble on release
    function springBack() {
      mode = 'springing';
      v = 0;
      let last = performance.now();
      const k = 165;
      const c = 11;

      const step = (t: number) => {
        const dt = Math.min(0.032, (t - last) / 1000);
        last = t;
        v += (-k * p - c * v) * dt;
        p += v * dt;
        render();

        if (Math.abs(p) < 0.3 && Math.abs(v) < 4) {
          p = 0;
          v = 0;
          mode = 'idle';
          if (target) target.style.transform = '';
          render();
          return;
        }
        raf = requestAnimationFrame(step);
      };
      raf = requestAnimationFrame(step);
    }

    // Hold and release: triggers ONLY upon releasing
    function release() {
      if (idleT) clearTimeout(idleT as number);
      if (mode !== 'pulling') return;
      if (p >= CFG.threshold) {
        launch();
      } else {
        springBack();
      }
    }

    // Dismisses membrane and reveals the inline video container
    function launch() {
      if (mode === 'launching') return;
      mode = 'launching';
      if (raf) cancelAnimationFrame(raf);
      if (idleT) clearTimeout(idleT as number);
      p = 0;
      v = 0;

      // Dismiss pull membrane
      if (pull) {
        pull.style.transition = 'height 0.35s ease, opacity 0.35s ease';
        pull.style.height = '0px';
        pull.style.opacity = '0';
      }

      // Reset target transform cleanly
      if (target) {
        target.style.transition = 'transform 0.35s ease';
        target.style.transform = '';
        setTimeout(() => {
          if (target) target.style.transition = '';
        }, 360);
      }

      // Reveal inline video section below footer
      setRevealed(true);
      setCountdown(4);
      setPhase('countdown');
    }

    const onWheel = (e: WheelEvent) => {
      if (mode === 'launching') return;
      let d = e.deltaY;
      if (e.deltaMode === 1) d *= 16;

      // Ensure hard stop at footer: ignore wheel momentum from scrolling down the page
      const settled =
        bottomSince !== null &&
        performance.now() - bottomSince > CFG.arriveLockMs &&
        performance.now() - lastScrollTime > 250;

      if (p === 0 && !(d > 0 && isBottom() && settled)) {
        return;
      }

      e.preventDefault();
      applyPull(d);

      // Hold and release: do NOT launch while active; launch only when user stops/releases wheel
      if (idleT) clearTimeout(idleT as number);
      idleT = setTimeout(release, CFG.releaseIdleMs);
    };

    const onTouchStart = (e: TouchEvent) => {
      touchY = e.touches[0].clientY;
    };

    const onTouchMove = (e: TouchEvent) => {
      if (mode === 'launching' || touchY === null) return;
      const y = e.touches[0].clientY;
      const d = touchY - y;
      touchY = y;

      const settled =
        bottomSince !== null &&
        performance.now() - bottomSince > 200 &&
        performance.now() - lastScrollTime > 150;

      if (p === 0 && !(d > 0 && isBottom() && settled)) return;
      e.preventDefault();
      applyPull(d * 1.5);
    };

    const onTouchEnd = () => {
      touchY = null;
      release();
    };

    const onMouseDown = (e: MouseEvent) => {
      if (mode === 'launching') return;
      if (isBottom() && e.clientY >= window.innerHeight - 80) {
        isMouseDown = true;
        startMouseY = e.clientY;
      }
    };

    const onMouseMove = (e: MouseEvent) => {
      if (!isMouseDown || mode === 'launching') return;
      const d = startMouseY - e.clientY;
      startMouseY = e.clientY;
      if (d > 0 || p > 0) {
        e.preventDefault();
        applyPull(d * 1.5);
      }
    };

    const onMouseUp = () => {
      if (isMouseDown) {
        isMouseDown = false;
        release();
      }
    };

    window.addEventListener('wheel', onWheel, { passive: false });
    window.addEventListener('touchstart', onTouchStart, { passive: true });
    window.addEventListener('touchmove', onTouchMove, { passive: false });
    window.addEventListener('touchend', onTouchEnd);
    window.addEventListener('touchcancel', onTouchEnd);
    window.addEventListener('mousedown', onMouseDown);
    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mouseup', onMouseUp);

    render();

    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('wheel', onWheel);
      window.removeEventListener('touchstart', onTouchStart);
      window.removeEventListener('touchmove', onTouchMove);
      window.removeEventListener('touchend', onTouchEnd);
      window.removeEventListener('touchcancel', onTouchEnd);
      window.removeEventListener('mousedown', onMouseDown);
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseup', onMouseUp);
      if (target) {
        target.style.transform = '';
        target.style.transition = '';
      }
      if (raf) cancelAnimationFrame(raf);
      if (idleT) clearTimeout(idleT as number);
    };
  }, [revealed]);

  return (
    <>
      <PullGlobalStyles />

      {/* Elastic stretchy membrane from pull-to-reveal.html - active until revealed */}
      {!revealed && (
        <PullOverlay ref={pullRef} $atBottom={atBottom} aria-hidden="true">
          <div className="pull__skin" ref={skinRef}>
            <svg viewBox="0 0 100 130" preserveAspectRatio="none">
              <path ref={pathRef} d="M0 130 Q50 130 100 130 Z" />
            </svg>
          </div>

          <div className="pull__hint" ref={hintRef}>
            <span className="arrow">↓</span>
            <span>scroll down for fun</span>
          </div>

          <div className="pull__label" ref={labelRef}>
            <svg className="pull__ring" viewBox="0 0 36 36">
              <circle className="track" cx="18" cy="18" r="15" />
              <circle
                className="bar"
                ref={barRef}
                cx="18"
                cy="18"
                r="15"
                strokeDasharray="94.25"
                strokeDashoffset="94.25"
              />
            </svg>
            <span className="pull__text" ref={textRef}>
              pull to see something fun
            </span>
          </div>
        </PullOverlay>
      )}

      {/* 100% INLINE video container on the page below footer */}
      <InlineVideoContainer id="easter-egg-container" $visible={revealed}>
        {/* Phase 1: 4-second Pixel countdown (transparent background directly over page) */}
        {phase === 'countdown' && (
          <PixelCountdownCard>
            <div className="pixel-number">{countdown}</div>
            <div className="pixel-audio-badge">
              <span className="icon">▶</span>
              <span>VIDEO HAS AUDIO</span>
            </div>
            <div className="pixel-note">
              [NOTE: STRICTLY FOR FUN &amp; NOT PROFESSIONAL]
            </div>
          </PixelCountdownCard>
        )}

        {/* Phase 2: Video player loads quietly in background, reveals and plays when countdown finishes */}
        {revealed && (
          <iframe
            ref={iframeRef}
            src="/video_ascii_player.html?autoplay=false"
            title="ASCII art"
            allow="autoplay"
            sandbox="allow-scripts allow-same-origin"
            tabIndex={-1}
            style={{
              opacity: phase === 'playing' ? 1 : 0,
              pointerEvents: phase === 'playing' ? 'auto' : 'none',
              transition: 'opacity 0.35s ease',
            }}
          />
        )}
      </InlineVideoContainer>
    </>
  );
};

export default PullToRevealEasterEgg;
