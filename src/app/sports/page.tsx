'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Nav from '@/components/nav/nav';
import styles from './page.module.css';

// Nội dung trạng thái mặc định (không có popup)
const DEFAULT_TEXT =
  "Of course, being a mechanical engineer is a ton of fun, but it can be frustrating when the robot overheats for seemingly no reason. When that happens, I always turn to playing sports to let off steam. My passion for sports didn’t start after I decided to pursue engineering – it has accompanied me ever since I was a child.";

// icon: w/h = kích thước hiển thị (px trong khung 1920x1080), dx/dy = tinh chỉnh vị trí so với tiêu đề
const sportsData = {
  swimming: {
    title: "SWIMMING",
    icon: { src: "/image/icon-swimming.png", w: 165, h: 115, dx: 0, dy: 10 },
    desc: "When we were kids, my father used to take my brother and me to the local swimming pool for lessons. Once we learned to swim, he would drop the locker keys into the water to teach us how to dive. Swimming taught me to keep my composure under pressure and showed me how sports can improve your health",
    images: [
      { src: "/image/swimming-1.png" },
      { src: "/image/swimming-2.png" }
    ]
  },
  soccer: {
    title: "SOCCER",
    icon: { src: "/image/icon-soccer.png", w: 140, h: 159, dx: -10, dy: 8 },
    desc: "Every Sunday, my father would take me to soccer practice, which introduced me to the competitive side of sports. Without soccer, I don’t think I would have learned how important teamwork is and what it means to set your ego aside so your team can shine.",
    images: [
      { src: "/image/soccer-1.png" },
      { src: "/image/soccer-2.png" },
      { src: "/image/soccer-3.png" }
    ]
  },
  badminton: {
    title: "BADMINTON",
    icon: { src: "/image/icon-badminton.png", w: 90, h: 189, dx: 5, dy: -7 },
    desc: "Although badminton wasn’t always my first choice, I fell in love with it after my collarbone injury kept me from playing soccer at my best. I adored the sport because it is so well-rounded and individual, so much so that I joined the school’s badminton club and competed in two tournaments.",
    images: [
      { src: "/image/badminton-1.png" },
      { src: "/image/badminton-2.png" }
    ]
  }
};

type SportKey = keyof typeof sportsData;

export default function SportsPage() {
  const [activeSport, setActiveSport] = useState<SportKey | null>(null);
  const [scale, setScale] = useState(1);       
  const [navScale, setNavScale] = useState(1); 
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    const prev = {
      margin: document.body.style.margin,
      padding: document.body.style.padding,
      overflow: document.body.style.overflow,
      backgroundColor: document.body.style.backgroundColor,
    };
    document.body.style.margin = '0';
    document.body.style.padding = '0';
    document.body.style.overflow = 'hidden';
    document.body.style.backgroundColor = '#000';

    const calculateScale = () => {
      const scaleX = window.innerWidth / 1920;
      const scaleY = window.innerHeight / 1080;
      setScale(Math.max(scaleX, scaleY));
      setNavScale(scaleX);
    };
    calculateScale();
    window.addEventListener('resize', calculateScale);

    const mountTimeout = setTimeout(() => setIsMounted(true), 10);

    const syncFromHash = () => {
      const hash = window.location.hash.replace('#', '');
      setActiveSport(
        (Object.keys(sportsData) as SportKey[]).includes(hash as SportKey)
          ? (hash as SportKey)
          : null
      );
    };
    syncFromHash();
    window.addEventListener('hashchange', syncFromHash);
    window.addEventListener('popstate', syncFromHash);

    const interval = setInterval(syncFromHash, 100);

    return () => {
      window.removeEventListener('resize', calculateScale);
      window.removeEventListener('hashchange', syncFromHash);
      window.removeEventListener('popstate', syncFromHash);
      clearTimeout(mountTimeout);
      clearInterval(interval);
      document.body.style.margin = prev.margin;
      document.body.style.padding = prev.padding;
      document.body.style.overflow = prev.overflow;
      document.body.style.backgroundColor = prev.backgroundColor;
    };
  }, []);

  const current = activeSport ? sportsData[activeSport] : null;

  return (
    <main className={styles.gameContainer}>
      <div
        className={styles.navLayer}
        style={{ transform: `scale(${navScale})`, opacity: isMounted ? 1 : 0 }}
      >
        <Nav />
      </div>

      <div
        className={styles.scaleWrapper}
        style={{ transform: `scale(${scale})`, opacity: isMounted ? 1 : 0 }}
      >
        <div className={styles.consoleBg}></div>

        {current ? (
          <div key={activeSport} className={styles.popupBox}>
            {/* Sử dụng thẻ button để xử lý tắt popup mượt mà, không giật */}
            <button
              type="button"
              className={styles.closeButton}
              aria-label="Close"
              onClick={() => {
                setActiveSport(null);
                // Xóa hash trên URL ngay lập tức mà không delay
                window.history.pushState(null, '', window.location.pathname);
              }}
            >
              <svg width="42" height="42" viewBox="0 0 42 42" fill="none">
                <path
                  d="M3 3L39 39M39 3L3 39"
                  stroke="#FFFFFF"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                />
              </svg>
            </button>

            <div className={styles.titleWrapper}>
              <h1 className={styles.sportTitle}>{current.title}</h1>
              <Image
                src={current.icon.src}
                alt={`${current.title} icon`}
                width={current.icon.w}
                height={current.icon.h}
                className={styles.sportIcon}
                style={{
                  transform: `translate(${current.icon.dx}px, ${current.icon.dy}px)`,
                }}
              />
            </div>

            <p className={styles.sportDescription}>{current.desc}</p>

            <div className={styles.imageGallery}>
              {current.images.map((img, index) => (
                <div key={`${activeSport}-${index}`} className={styles.imageWrapper}>
                  <Image
                    src={img.src}
                    alt={`${activeSport} photo ${index + 1}`}
                    width={0}
                    height={0}
                    sizes="1000px"
                    style={{ height: '100%', width: 'auto' }}
                  />
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div key="default" className={styles.captionBox}>
            <p className={styles.captionText}>{DEFAULT_TEXT}</p>
          </div>
        )}
      </div>
    </main>
  );
}