'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Nav from '@/components/nav/nav';
import styles from './page.module.css';

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

const DEFAULT_TEXT =
  "Growing up, I have always been captivated by huge mechanical robots in movies like \"Transformers\" and super intelligent humanoid machines in \"The Terminator.\" Fortunately for me, I got to experience what robots are actually capable of and share my love for these buddies with many students in my city.";

// ==========================================
// DỮ LIỆU ĐÃ ĐƯỢC CHỈNH TEXT CHUẨN FILE DOCX
// VÀ BỔ SUNG ĐẦY ĐỦ ẢNH CHO TỪNG TAB (Slide)
// ==========================================
const roboticsData: Record<string, RoboticsItem> = {
  "overwatch": {
    title: "OVERWATCH",
    icon: { src: "/image/icon-polygons.png", w: 205, h: 110, dx: 0, dy: 0 },
    slides: [
      {
        subtitle: "VEX V5 Robotics Competition Road to Nationals, Northern Qualification Season 25-26",
        desc: "Going into our first tournament of the season, we expected to be outmatched by more experienced teams. By adapting our strategy and forming a strong alliance, we exceeded expectations and claimed the Tournament Champion Award. This experience taught me the value of adaptability, teamwork, and staying competitive under pressure.",
        images: [{ src: "/image/overwatch-1.jpg" }]
      },
      {
        subtitle: "2025-2026 Asia Open Signature Event V5RC High School",
        desc: "Taking our journey beyond national competitions, we had the opportunity to compete internationally at the Asia Open Signature Event in China. Facing strong teams from around the world pushed us to work harder toward our goal of reaching the World Championship. Even more exciting, we earned two awards—First Honor and the Talent Award. The event also marked the debut of our second robot, which would later play a key role at Nationals.",
        images: [
          { src: "/image/overwatch-2-1.png" }, 
          { src: "/image/overwatch-2-2.png" },
          { src: "/image/overwatch-2-3.png" }
        ]
      },
      {
        // Tab 3: Đã có đủ 3 ảnh
        subtitle: "VEX V5 Robotics Competition High School Vietnam National Championship: Push Back",
        desc: "Of all the tournaments we competed in, this championship remains my proudest. Countless late nights of preparation paid off as our team earned two of the tournament’s most prestigious honors: Robot Skills Champion and the Innovate Award. Personally, I worked with a teammate to redesign and restructure our 100+ page Engineering Notebook, documenting and explaining the mechanics and development of our robots.",
        images: [
          { src: "/image/overwatch-3-1.png" }, 
          { src: "/image/overwatch-3-2.png" }, 
          { src: "/image/overwatch-3-3.png" }
        ]
      },
      {
        // Tab 4: Thêm đủ 3 ảnh
        subtitle: "Vietnam Signature: New Year’s Mayhem (2026 VEX Robotics World Championship Qualification)",
        desc: "Our hard work ultimately paid off as we secured a spot at the 2026 VEX Robotics World Championship through a high ranking on the Robot Skills leaderboard—an exciting milestone in our journey from national competitions to the world stage.",
        images: [
          { src: "/image/overwatch-4-1.png" },
          { src: "/image/overwatch-4-2.png" },
          { src: "/image/overwatch-4-3.png" }
        ]
      }
    ]
  },
  "community-events": {
    title: "COMMUNITY EVENTS",
    icon: { src: "/image/icon-hoodie-blue.png", w: 127, h: 204, dx: 0, dy: 0 },
    slides: [
      {
        subtitle: "Robotics for Good Youth Challenge Vietnam 2025-2026, Hanoi Regional Tournament",
        desc: "As a co-organizer and referee, I spent hours studying the rulebook and attending briefings to prepare for the tournament. I officiated matches from the opening rounds to the finals, and seeing the passion and excitement of young competitors made every effort worthwhile. If there had been a “Referee of the Tournament” award, I’d like to think I had a pretty good shot at it.",
        images: [{ src: "/image/community-1-1.png" }, { src: "/image/community-1-2.png" }, { src: "/image/community-1-3.png" }]
      },
      {
        subtitle: "STEM day at Tran Duy Hung Secondary School",
        desc: "This event gave me the opportunity to share our robots and inspire younger students curious about STEM. Their excitement reminded me of my own first steps into robotics, while their creative science projects showed me the incredible potential of the next generation of young innovators.",
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
        desc: "GART Expo 2025 was where my journey into robotics began. Starting as a volunteer, I was welcomed into a community filled with creativity, competition, and shared curiosity. Being surrounded by robots, passion projects, and like-minded people inspired me to take the next step and become a full member of the robotics club.",
        images: [{ src: "/image/gart-2025.png" }] 
      },
      {
        subtitle: "GART Expo 2026",
        desc: "A year after joining GART Expo as a volunteer, I returned as a member of the Electronic Programming Team, helping organize the largest GART Expo in the club’s history. I contributed ideas and guided visitors through DIY, gaming, and exhibition activities. Being part of the team that made the event possible showed me how far I had come—from discovering robotics to helping others experience it.",
        images: [{ src: "/image/gart-1.png" }, { src: "/image/gart-2.png" }]
      }
    ]
  }
};

type RoboticsKey = keyof typeof roboticsData;
const MOBILE_BREAKPOINT = 900;

export default function RoboticsPage() {
  const [activeItem, setActiveItem] = useState<RoboticsKey | null>(null);
  const [activeSlide, setActiveSlide] = useState(0); 
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
            current && slide ? (
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
                    <path d="M3 3L39 39M39 3L3 39" stroke="#FFFFFF" strokeWidth="2.5" strokeLinecap="round" />
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
                        style={{ width: 'auto', height: '100%', display: 'block', objectFit: 'contain' }}
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
            )
          )}

          {/* ----- CHẾ ĐỘ ĐIỆN THOẠI ----- */}
          {isMobile && (
            <div className={styles.mobileScrollContainer}>
              <div className={styles.captionBox}>
                <p className={styles.captionText}>{DEFAULT_TEXT}</p>
              </div>

              {(Object.keys(roboticsData) as RoboticsKey[]).map((key) => {
                const item = roboticsData[key];
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

                    {item.slides.map((s, idx) => (
                      <div key={`${key}-slide-${idx}`} className={styles.mobileSlide}>
                        <h2 className={styles.slideSubtitle}>{s.subtitle}</h2>
                        <p className={styles.slideDescription}>{s.desc}</p>
                        <div className={styles.imageGallery}>
                          {s.images.map((img, imgIdx) => (
                            <div key={`${key}-slide-${idx}-img-${imgIdx}`} className={styles.imageWrapper}>
                              <Image
                                src={img.src}
                                alt={`${item.title} photo`}
                                width={0}
                                height={0}
                                sizes="100vw"
                                style={{ width: '100%', height: 'auto', objectFit: 'contain' }}
                              />
                            </div>
                          ))}
                        </div>
                      </div>
                    ))}
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