'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Nav from '@/components/nav/nav';
import styles from './page.module.css';

// 1. Định nghĩa Type cho dữ liệu
type CommunityItem = {
  title: string;
  icon: { src: string; w: number; h: number; dx: number; dy: number } | null;
  desc: string;
  images: { src: string }[];
};

// Nội dung trạng thái mặc định (khi không bật popup)
const DEFAULT_TEXT =
  "Community Services: Engineering became an interest of mine because I wanted to help people and communities overcome the various problems that beset their daily lives, but I also hope to empower them in ways beyond that.";

// ==========================================
// 2. DỮ LIỆU ĐÃ ĐƯỢC CHỈNH CHUẨN 100% THEO FILE DOCX
// ==========================================
const communityData: Record<string, CommunityItem> = {
  "cerebral-palsy": {
    title: "CEREBRAL PALSY FAMILY ASSOCIATION VIETNAM",
    icon: { src: "/image/icon-lantern.png", w: 180, h: 122, dx: 10, dy: -5 },
    desc: "Despite having known about the hardships faced by patients with cerebral palsy beforehand, I was taken aback by the sheer willpower of the children at the Cerebral Palsy Family Association Vietnam headquarters. Their determination, warmth, and cheerful spirit left a lasting impression on me and made this experience far more meaningful than I had expected.",
    images: [
      { src: "/image/cerebral-1.png" },
      { src: "/image/cerebral-2.png" }
    ]
  },
  "advisor-advisee-2025": {
    title: "ADVISOR-ADVISEE 2025",
    icon: { src: "/image/icon-id-badge.png", w: 210, h: 139, dx: 15, dy: -10 },
    desc: "Having struggled to find the right English resources for my own high school entrance exam, I wanted to make the journey easier for someone else. Through my school’s Advisor–Advisee project, I mentored a ninth-grade student by creating a study roadmap and sharing useful resources. Seeing her succeed and gain admission to her dream school was one of my most rewarding experiences.",
    images: [
      { src: "/image/advisor-1.png" }
    ]
  },
  "humanitas": {
    title: "HUMANITAS",
    icon: { src: "/image/icon-laptop-blue.png", w: 249, h: 153, dx: 15, dy: 5 },
    desc: "Through Humanitas, our team traveled to Ban Lien, Lao Cai, to support local homestays by introducing new technology and practical solutions. Our goal was to help local families strengthen their tourism activities and create more sustainable economic opportunities for their community.",
    images: [
      { src: "/image/humanitas-1.png" },
      { src: "/image/humanitas-2.png" },
      { src: "/image/humanitas-3.png" }
    ]
  },
  "zero-dong-charity-fair": {
    title: '"ZERO-DONG" CHARITY FAIR',
    icon: { src: "/image/icon-zero.png", w: 249, h: 153, dx: 0, dy: 0 },
    desc: "The “Zero-Dong” Charity Fair, organized annually by alumni of Thai Binh High School for the Gifted, provides essential goods to low-income families before Tet. The event holds special meaning for me: Thai Binh, my mother’s hometown, was deeply affected by the 1944–1945 famine. Taking part connects me not only to my family’s roots, but also to a tradition of giving back to the community.",
    images: [
      { src: "/image/zero-dong-1.png" },
      { src: "/image/zero-dong-2.png" }
    ]
  },
  "beaconinrain-sos": {
    title: "BEACONINRAIN SOS ALERT SYSTEM",
    icon: { src: "/image/icon-sos.png", w: 231, h: 135, dx: 15, dy: -5 },
    desc: "After witnessing firsthand the damage caused by typhoons and natural disasters, I set out to develop BeaconInRain, an SOS alert system designed to help rescuers locate people in need. From programming and assembling the devices to building the website, the process was challenging but deeply rewarding—turning engineering into a small beacon of hope in the storm.",
    images: [
      { src: "/image/sos-1.png" },
      { src: "/image/sos-2.png" },
      { src: "/image/sos-3.png" }
    ]
  },
  "volunteer-ba-vi": {
    title: "VOLUNTEER WORK IN BA VI",
    icon: { src: "/image/icon-solar-panel.png", w: 201, h: 136, dx: 15, dy: -10 },
    desc: "Supporting a local business in Ba Vi gave me the chance to contribute through hands-on work, from installing solar-powered lights to learning about and planting herbal crops for future harvest. The experience showed me how simple, practical solutions can support both sustainability and local livelihoods.",
    images: [
      { src: "/image/bavi-1.png" },
      { src: "/image/bavi-2.png" }
    ]
  },
  "blue-racetrack": {
    title: '"BLUE RACETRACK" SWIMMING CHALLENGE',
    icon: { src: "/image/icon-goggles.png", w: 181, h: 59, dx: 15, dy: -20 },
    desc: "Swimming has been part of my life since childhood, thanks to my father. Inspired by those memories, I helped organize the “Blue Racetrack” Swimming Challenge to encourage children to discover the joy of swimming—and perhaps inspire their parents to dive in alongside them.",
    images: [
      { src: "/image/swimming-challenge-1.png" },
      { src: "/image/swimming-challenge-2.png" },
      { src: "/image/swimming-challenge-3.png" }
    ]
  }
};

type CommunityKey = keyof typeof communityData;
const MOBILE_BREAKPOINT = 900;

export default function CommunityPage() {
  const [activeItem, setActiveItem] = useState<CommunityKey | null>(null);
  const [scale, setScale] = useState(1);
  const [navScale, setNavScale] = useState(1);
  const [isMobile, setIsMobile] = useState(false);
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
    document.body.style.backgroundColor = 'transparent';

    const calculateScale = () => {
      const w = window.innerWidth;
      const h = window.innerHeight;
      setIsMobile(w <= MOBILE_BREAKPOINT);

      const scaleX = w / 1920;
      const scaleY = h / 1080;
      
      setScale(Math.min(scaleX, scaleY));
      setNavScale(scaleX);
    };
    calculateScale();
    window.addEventListener('resize', calculateScale);

    const mountTimeout = setTimeout(() => setIsMounted(true), 10);

    const syncFromHash = () => {
      const hash = window.location.hash.replace('#', '');
      setActiveItem(
        (Object.keys(communityData) as CommunityKey[]).includes(hash as CommunityKey)
          ? (hash as CommunityKey)
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

  const current = activeItem ? communityData[activeItem] : null;

  return (
    <main className={`${styles.gameContainer} ${isMobile ? styles.isMobile : ''}`}>
      <div
        className={styles.navLayer}
        style={{ transform: isMobile ? 'none' : `scale(${navScale})`, opacity: isMounted ? 1 : 0 }}
      >
        <Nav />
      </div>

      <div
        className={styles.scaleWrapper}
        style={{ transform: isMobile ? 'none' : `scale(${scale})`, opacity: isMounted ? 1 : 0 }}
      >
        <div className={styles.consoleBg}></div>

        <div className={styles.contentArea}>
          
          {/* ----- CHẾ ĐỘ DESKTOP ----- */}
          {!isMobile && (
            current ? (
              <div key={activeItem} className={styles.popupBox}>
                <button
                  type="button"
                  className={styles.closeButton}
                  aria-label="Close"
                  onClick={() => {
                    setActiveItem(null);
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
                  {current.icon && (
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
                  )}
                </div>
  
                <p className={styles.sportDescription}>{current.desc}</p>
                
                <div className={styles.imageGallery}>
                  {current.images.map((img, index) => (
                    <div key={`${activeItem}-${index}`} className={styles.imageWrapper}>
                      <Image
                        src={img.src}
                        alt={`${activeItem} photo ${index + 1}`}
                        width={0}
                        height={0}
                        sizes="1000px"
                        style={{ height: '100%', width: 'auto', objectFit: 'contain' }}
                      />
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              <div key="default" className={styles.captionBox}>
                <p className={styles.captionText}>{DEFAULT_TEXT}</p>
              </div>
            )
          )}

          {/* ----- CHẾ ĐỘ ĐIỆN THOẠI ----- */}
          {isMobile && (
            <div className={styles.mobileScrollContainer}>
              <div className={styles.captionBox}>
                <p className={styles.captionText}>{DEFAULT_TEXT}</p>
              </div>

              {(Object.keys(communityData) as CommunityKey[]).map((key) => {
                const item = communityData[key];
                return (
                  <div key={key} id={key} className={styles.popupBox}>
                    <div className={styles.titleWrapper}>
                      <h1 className={styles.sportTitle}>{item.title}</h1>
                      {item.icon && (
                        <Image
                          src={item.icon.src}
                          alt={`${item.title} icon`}
                          width={item.icon.w}
                          height={item.icon.h}
                          className={styles.sportIcon}
                          style={{
                            transform: 'none',
                            width: 'auto',
                            height: 'clamp(40px, 12vw, 80px)'
                          }}
                        />
                      )}
                    </div>
                    
                    <p className={styles.sportDescription}>{item.desc}</p>
                    
                    <div className={styles.imageGallery}>
                      {item.images.map((img, idx) => (
                        <div key={`${key}-img-${idx}`} className={styles.imageWrapper}>
                          <Image
                            src={img.src}
                            alt={`${item.title} photo ${idx + 1}`}
                            width={0}
                            height={0}
                            sizes="100vw"
                            style={{ width: '100%', height: 'auto', objectFit: 'contain' }}
                          />
                        </div>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          )}

        </div>
      </div>
    </main>
  );
}