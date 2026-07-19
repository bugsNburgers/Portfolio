'use client';

import React, { useEffect, useRef, useState } from 'react';

interface VideoTextProps {
  /** Path to video, e.g. "/video.mp4" */
  src: string;
  /** The text to render with video fill */
  children: string;
  /**
   * CSS styles for sizing the text — font-family, font-size, font-weight, etc.
   * These are applied to an invisible ghost div that drives canvas sizing.
   */
  style?: React.CSSProperties;
  className?: string;
  /** Optional suffix (like a period) to draw after the video text */
  suffix?: string;
  /** Solid color for the suffix (avoids the video mask) */
  suffixColor?: string;
}

/**
 * VideoText
 * ─────────
 * Renders text with a video playing ONLY inside the letter shapes.
 * The area outside the letters is 100% transparent — no box, no rectangle.
 */
const VideoText: React.FC<VideoTextProps> = ({ src, children, style, className, suffix, suffixColor }) => {
  const ghostRef  = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const videoRef  = useRef<HTMLVideoElement>(null);
  const rafRef    = useRef<number>(0);
  
  // Track when video is actually playing so we can hide the fallback text
  const [isVideoReady, setIsVideoReady] = useState(false);
  // Track when fonts have loaded so the canvas doesn't draw a fallback font
  const [isFontReady, setIsFontReady] = useState(false);

  useEffect(() => {
    const ghost  = ghostRef.current;
    const canvas = canvasRef.current;
    const video  = videoRef.current;
    if (!ghost || !canvas || !video) return;

    let alive = true;
    let cachedFont = '';
    let cachedScaledFont = '';
    let cachedW = 0;
    let cachedH = 0;

    // Cache metrics to avoid expensive getComputedStyle calls in the animation loop
    const updateMetrics = () => {
      if (!alive) return;
      const cs = window.getComputedStyle(ghost);
      cachedFont = `${cs.fontWeight} ${cs.fontSize} ${cs.fontFamily}`;
      
      const dpr = window.devicePixelRatio || 1;
      const fontSizeMatch = cs.fontSize.match(/[\d.]+/);
      const fontSizePx = fontSizeMatch ? parseFloat(fontSizeMatch[0]) : 16;
      cachedScaledFont = `${cs.fontWeight} ${fontSizePx * dpr}px ${cs.fontFamily}`;

      cachedW = ghost.getBoundingClientRect().width;
      cachedH = ghost.getBoundingClientRect().height;
      
      if (canvas.width !== Math.floor(cachedW * dpr) || canvas.height !== Math.floor(cachedH * dpr)) {
        canvas.width = Math.floor(cachedW * dpr);
        canvas.height = Math.floor(cachedH * dpr);
      }
    };

    // Observe size changes (e.g. window resize or font load)
    const resizeObserver = new ResizeObserver(() => {
      updateMetrics();
    });
    resizeObserver.observe(ghost);

    document.fonts.ready.then(() => {
      if (alive) {
        updateMetrics();
        setIsFontReady(true);
      }
    });

    const draw = () => {
      if (!alive) return;

      // Only draw if video is ready, playing, and metrics are calculated
      if (video.readyState >= 2 && !video.paused && cachedW > 0 && cachedH > 0 && cachedFont) {
        const ctx = canvas.getContext('2d', { alpha: true });
        if (ctx) {
          const dpr = window.devicePixelRatio || 1;
          const physW = canvas.width;
          const physH = canvas.height;
          
          ctx.clearRect(0, 0, physW, physH);

          // ── Step 1: Paint the video frame over the entire canvas ──────────────
          ctx.globalCompositeOperation = 'source-over';
          ctx.drawImage(video, 0, 0, physW, physH);

          // ── Step 2: destination-in with filled text ────────────
          ctx.globalCompositeOperation = 'destination-in';
          ctx.fillStyle    = 'black';
          ctx.font         = cachedScaledFont;
          
          // Use middle baseline for perfect vertical centering within the line-height
          ctx.textBaseline = 'middle';
          ctx.textAlign    = 'left';
          ctx.fillText(children, 0, physH / 2);

          // ── Step 3: draw suffix if provided ─────────────────────
          if (suffix) {
            ctx.globalCompositeOperation = 'source-over';
            ctx.fillStyle = suffixColor || 'black';
            const textWidth = ctx.measureText(children).width;
            ctx.fillText(suffix, textWidth, physH / 2);
          } else {
            ctx.globalCompositeOperation = 'source-over';
          }
        }
      }

      rafRef.current = requestAnimationFrame(draw);
    };

    const handleVideoReady = () => {
      if (!alive) return;
      setIsVideoReady(true);
      video.play().catch(() => {});
    };

    video.addEventListener('playing', handleVideoReady);
    video.addEventListener('loadeddata', () => {
      video.play().catch(() => {});
    });
    
    // Check if already loaded
    if (video.readyState >= 3) {
      handleVideoReady();
    } else {
      video.load();
    }

    rafRef.current = requestAnimationFrame(draw);

    return () => {
      alive = false;
      cancelAnimationFrame(rafRef.current);
      resizeObserver.disconnect();
      video.removeEventListener('playing', handleVideoReady);
    };
  }, [children, src, suffix, suffixColor]);

  const isFullyReady = isVideoReady && isFontReady;

  return (
    <div
      className={className}
      style={{ position: 'relative', display: 'inline-block', width: 'auto' }}
    >
      <video
        ref={videoRef}
        src={src}
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
        style={{ display: 'none' }}
      />

      {/* 
        Ghost div: 
        1. Gives the container its natural text size.
        2. Shows fallback color immediately while video loads.
        3. Becomes transparent once video AND fonts are ready.
      */}
      <div
        ref={ghostRef}
        aria-hidden="true"
        style={{
          ...style,
          color: isFullyReady ? 'transparent' : (style?.color || 'inherit'),
          display: 'inline-block', // inline-block perfectly aligns baselines with adjacent text
          userSelect: 'none',
          pointerEvents: 'none',
          whiteSpace: 'nowrap', // Canvas fillText doesn't wrap, so ghost shouldn't either
          transition: 'color 0.3s ease-in-out',
          paddingRight: '0.05em', // Give the canvas a tiny bit of breathing room for letter overhang (like the 't')
        }}
      >
        {children}{suffix}
      </div>

      <canvas
        ref={canvasRef}
        aria-label={children}
        style={{
          position:      'absolute',
          top:           0,
          left:          0,
          width:         '100%',
          height:        '100%',
          display:       'block',
          pointerEvents: 'none',
          opacity:       isFullyReady ? 1 : 0,
          transition:    'opacity 0.3s ease-in-out',
        }}
      />
    </div>
  );
};

export default VideoText;
