'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Nav from '@/components/nav/nav';
import styles from './page.module.css';

// 1. Định nghĩa Type cho cấu trúc có Slide
type Slide = {
  subtitle: string;
  desc: string;
  images: { src: string }[];
};

type RoboticsItem = {
  title: string;
  icon: { src: string; w: number; h: number; dx: number; dy: number } | null;
  slides: Slide[];
};

// Khung Text mặc định
const DEFAULT_TEXT =
  "Growing up, I have always been captivated by huge mechanical robots in movies like \"Transformers\" and super intelligent humanoid machines in \"The Terminator.\" Fortunately for me, I got to experience what robots are actually capable of and share my love for these buddies with many students in my city.";

// 2. Dữ liệu các mục
const roboticsData: Record<string, RoboticsItem> = {
  "overwatch": {
    title: "OVERWATCH",
    icon: { src: "/image/icon-polygons.png", w: 205, h: 110, dx: 0, dy: 0 },
    slides: [
      {
        subtitle: "VEX V5 Robotics Competition Road to Nationals, Northern Qualification Season 25-26",
        desc: "Going into our first tournament of the season, we fully expected to be outmatched by most of our opponents. Fortunately, we adapted and teamed up with a strong ally team, which enabled us to clinch the Tournament Champion award.",
        images: [{ src: "/image/overwatch-1.png" }]
      },
      {
        subtitle: "2025-2026 Asia Open Signature Event V5RC High School",
        desc: "Although we didn’t win any major award at our first international tournament, I appreciated the chance to face such strong opponents. They showed us how much harder we needed to work to qualify for the World Championship. It was also the debut of our second robot, which would eventually help us leave our mark at the national competition.",
        images: [{ src: "/image/overwatch-2-1.png" }, { src: "/image/overwatch-2-2.png" }]
      },
      {
        subtitle: "VEX V5 Robotics Competition High School Vietnam National Championship: Push Back",
        desc: "Of all the tournaments our team has competed in, I am proudest of what we accomplished at this championship. Sleepless nights at the captain’s house paid off with two of the most prestigious awards in the entire tournament: the Robot Skills Champion and Innovate Award. Personally, I redesigned and restructured more than 100 pages of the Engineering Notebook, where I documented and explained the robots’ mechanics with the help of one other teammate.",
        images: [{ src: "/image/overwatch-3-1.png" }, { src: "/image/overwatch-3-2.png" }, { src: "/image/overwatch-3-3.png" }]
      },
      {
        subtitle: "Vietnam Signature: New Year’s Mayhem (2026 VEX Robotics World Championship Qualification)",
        desc: "Unfortunately, I was unable to attend this event because of a schedule conflict. Still, I looked for meaningful ways to support our team, whether by brainstorming ideas for our third and final robot or by helping them prepare for the judges’ interview. Although I couldn't be there in person, I wanted them to know they had my full support, and I hoped my contributions would help them perform at their best. Eventually, we managed to secure a ticket to the World Championship through high rankings on the Robot Skills leaderboard.",
        images: [{ src: "/image/overwatch-4.png" }]
      }
    ]
  },
  "community-events": {
    title: "COMMUNITY EVENTS",
    icon: { src: "/image/icon-hoodie-blue.png", w: 127, h: 204, dx: 0, dy: 0 },
    slides: [
      {
        subtitle: "Robotics for Good Youth Challenge Vietnam 2025-2026, Hanoi Regional Tournament",
        desc: "To be well prepared for this event, I spent countless hours studying the rulebook and attending referee briefings. I was so excited to be a co-organizer and referee that I officiated as many matches as I could, from the opening rounds to the final showdowns. Seeing how passionate young competitors were made all the hard work worthwhile. If there had been a 'Referee of the Tournament' award, I think I would have won it.",
        images: [{ src: "/image/community-1-1.png" }, { src: "/image/community-1-2.png" }, { src: "/image/community-1-3.png" }]
      },
      {
        subtitle: "STEM day at Tran Duy Hung Secondary School",
        desc: "This is another event I remember fondly, because we got to meet and inspire so many students interested in STEM and robotics. Sharing our robots and answering their questions reminded me of how I once felt discovering this field for the first time. I also got to see a number of impressive student science projects, which showed me how much creativity and potential these young scientists have.",
        images: [{ src: "/image/community-2.png" }]
      }
    ]
  },
  "gart": {
    title: "GART",
    icon: { src: "/image/icon-hoodie-red.png", w: 101, h: 204, dx: 0, dy: 0 },
    slides: [
      {
        subtitle: "GART Expo 2025",
        desc: "This is where I got my first taste of robotics. Although I was only a volunteer and not yet an official member, I was treated like family from the moment I arrived. Surrounded by robots, passion projects, and people who shared my curiosity, I experienced the competitive yet close-knit community of robotics engineers, and it motivated me to become a full member of the club.",
        images: [{ src: "/image/gart-2025.png" }] // Thay bằng tên file giấy chứng nhận của bạn
      },
      {
        subtitle: "GART Expo 2026",
        desc: "This year, I returned to help organize the event as a member of the Electronic Programming Team. I contributed ideas and guided visitors through DIY, gaming, and exhibition activities at the largest GART Expo in the club’s history. Seeing the event grow so much, and finally getting to be part of the team that made it happen, made me proud of how far I had come since my first visit as a volunteer.",
        images: [{ src: "/image/gart-1.png" }, { src: "/image/gart-2.png" }]
      }
    ]
  }
};

type RoboticsKey = keyof typeof roboticsData;

export default function RoboticsPage() {
  const [activeItem, setActiveItem] = useState<RoboticsKey | null>(null);
  const [activeSlide, setActiveSlide] = useState(0); 
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
      const matchedKey = (Object.keys(roboticsData) as RoboticsKey[]).includes(hash as RoboticsKey)
        ? (hash as RoboticsKey)
        : null;

      if (matchedKey !== activeItem) {
        setActiveItem(matchedKey);
        setActiveSlide(0);
      }
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
  }, [activeItem]);

  const current = activeItem ? roboticsData[activeItem] : null;
  const slide = current ? current.slides[activeSlide] : null;

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

        {current && slide ? (
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

            <h2 className={styles.slideSubtitle}>{slide.subtitle}</h2>
            <p className={styles.slideDescription}>{slide.desc}</p>
            
            <div className={styles.imageGallery}>
              {slide.images.map((img, index) => (
                <div key={`${activeItem}-${activeSlide}-${index}`} className={styles.imageWrapper}>
                  <Image
                    src={img.src}
                    alt={`${activeItem} slide ${activeSlide} photo ${index + 1}`}
                    width={0}
                    height={0}
                    sizes="1000px"
                    style={{ width: 'auto', height: '100%', display: 'block' }}
                  />
                </div>
              ))}
            </div>

            {current.slides.length > 1 && (
              <div className={styles.paginationContainer}>
                {current.slides.map((_, idx) => (
                  <button
                    key={idx}
                    className={`${styles.pageButton} ${activeSlide === idx ? styles.activePage : ''}`}
                    onClick={() => setActiveSlide(idx)}
                  >
                    {idx + 1}
                  </button>
                ))}
              </div>
            )}
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