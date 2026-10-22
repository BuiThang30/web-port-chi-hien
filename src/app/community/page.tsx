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

// 2. Dữ liệu cho các popup (Đã cập nhật key khớp với ID của bạn)
const communityData: Record<string, CommunityItem> = {
  "cerebral-palsy": {
    title: "CEREBRAL PALSY FAMILY ASSOCIATION VIETNAM",
    icon: { src: "/image/icon-lantern.png", w: 180, h: 122, dx: 10, dy: -5 },
    desc: "Despite having known about the hardships faced by patients with cerebral palsy beforehand, I was taken aback by the sheer willpower of the children at the Cerebral Palsy Family Association Vietnam headquarters. They were so adorable and welcoming.",
    images: [
      { src: "/image/cerebral-1.png" },
      { src: "/image/cerebral-2.png" }
    ]
  },
  "advisor-advisee-2025": {
    title: "ADVISOR-ADVISEE 2025",
    icon: { src: "/image/icon-id-badge.png", w: 210, h: 139, dx: 15, dy: -10 },
    desc: "I used to have nightmares about the high school entrance exam because of how difficult it was to find the right English resources. Thus, I took it upon myself to join a school project to help a 9th grader prepare for it by providing her with a roadmap and proper resources. In turn, she passed with flying colors and gained admission to her dream school.",
    images: [
      { src: "/image/advisor-1.png" }
    ]
  },
  "humanitas": {
    title: "HUMANITAS",
    icon: { src: "/image/icon-laptop-blue.png", w: 249, h: 153, dx: 15, dy: 5 },
    desc: "Our team arrived at an up-and-coming rustic homestay in Ban Lien, Lao Cai, to donate new technology and support nearby homestays in developing their tourism-based economy more effectively.",
    images: [
      { src: "/image/humanitas-1.png" },
      { src: "/image/humanitas-2.png" },
      { src: "/image/humanitas-3.png" }
    ]
  },
  "zero-dong-charity-fair": {
    title: '"ZERO-DONG" CHARITY FAIR',
    icon: null,
    desc: "The 'Zero-Dong' Charity Fair is an annual event held by alumni of Thai Binh High School for the Gifted, my mom among them, with the aim of providing low-income households with essential goods in preparation for the Tet holiday. I feel deeply connected to this event because Thai Binh was one of the provinces that suffered most during the Vietnamese famine of 1944-1945, and it is also my mom's hometown.",
    images: [
      { src: "/image/zero-dong-1.png" },
      { src: "/image/zero-dong-2.png" }
    ]
  },
  "beaconinrain-sos": {
    title: "BEACONINRAIN SOS ALERT SYSTEM",
    icon: { src: "/image/icon-sos.png", w: 231, h: 135, dx: 15, dy: -5 },
    desc: "After witnessing first-hand the damage caused by typhoons and natural disasters, I set out to create a device to help rescue parties reach those in need. Although programming, assembling the devices, and setting up the website was arduous, it was all worth it to see them give people a beacon of hope in the unrelenting rain.",
    images: [
      { src: "/image/sos-1.png" },
      { src: "/image/sos-2.png" },
      { src: "/image/sos-3.png" }
    ]
  },
  "volunteer-ba-vi": {
    title: "VOLUNTEER WORK IN BA VI",
    icon: { src: "/image/icon-solar-panel.png", w: 201, h: 136, dx: 15, dy: -10 },
    desc: "While working to support a local business in Ba Vi, we got to install solar-powered lights, learn about herbal plants, and plant them for harvest.",
    images: [
      { src: "/image/bavi-1.png" },
      { src: "/image/bavi-2.png" }
    ]
  },
  "blue-racetrack": {
    title: '"BLUE RACETRACK" SWIMMING CHALLENGE',
    icon: { src: "/image/icon-goggles.png", w: 181, h: 59, dx: 15, dy: -20 },
    desc: "Since I had a great relationship with swimming as a child because of my father, I figured, why not organize a competition to encourage children to learn how to swim and, better yet, encourage their parents to give it a try?",
    images: [
      { src: "/image/swimming-challenge-1.png" },
      { src: "/image/swimming-challenge-2.png" },
      { src: "/image/swimming-challenge-3.png" }
    ]
  }
};

type CommunityKey = keyof typeof communityData;

export default function CommunityPage() {
  const [activeItem, setActiveItem] = useState<CommunityKey | null>(null);
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
        {/* Lớp nền của Community */}
        <div className={styles.consoleBg}></div>

        {current ? (
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