'use client';

import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import styles from './page.module.css';

const memoryData = {
  ROBOTICS: {
    title: "ROBOTICS",
    categoryPath: "robotics",
    items: [
      { name: "GART →", id: "gart" },
      { name: "OVERWATCH →", id: "overwatch" },
      { name: "COMMUNITY EVENTS →", id: "community-events" }
    ],
    desc: "Growing up, I have always been captivated by huge mechanical robots in movies like \"Transformers\" and super intelligent humanoid machines in \"The Terminator.\" Fortunately for me, I got to experience what robots are actually capable of and share my love for these buddies with many students in my city."
  },
  INNOVATION: {
      title: "INNOVATION AND RESEARCH",
      categoryPath: "innovation",
      items: [
        { name: "TEKMONK →", id: "tekmonk" },
        { name: "VSIC →", id: "vsic" },
        { name: "WICO →", id: "wico" },
        { name: "INTERNSHIP →", id: "internship" },
        { name: "VIETNAM SUMMER SCHOOL OF SCIENCE →", id: "vietnam-summer-school-of-science" },
        { name: "OTHER RESEARCH →", id: "other-research" }
      ],
      desc: "Innovation and Research: Before I even knew what engineering meant, I had long adored learning about the many scientific phenomena that surround us every day. So it comes as no surprise that I quickly took a liking to researching and developing devices and tools to solve problems, whether major or minor."
    },
  SPORTS: {
    title: "SPORTS",
    categoryPath: "sports",
    items: [
      { name: "SWIMMING →", id: "swimming" },
      { name: "SOCCER →", id: "soccer" },
      { name: "BADMINTON →", id: "badminton" }
    ],
    desc: "Of course, being a mechanical engineer is a ton of fun, but it can be frustrating when the robot overheats for seemingly no reason. When that happens, I always turn to playing sports to let off steam. My passion for sports didn't start after I decided to pursue engineering - it has accompanied me ever since I was a child."
  },
  COMMUNITY: {
    title: "COMMUNITY SERVICES",
    categoryPath: "community",
    items: [
      { name: "CEREBRAL PALSY FAMILY ASSOCIATION VIETNAM →", id: "cerebral-palsy" },
      { name: "ADVISOR-ADVISEE 2025 →", id: "advisor-advisee-2025" },
      { name: "HUMANITAS →", id: "humanitas" },
      { name: "\"ZERO-DONG\" CHARITY FAIR →", id: "zero-dong-charity-fair" },
      { name: "BEACONINRAIN SOS ALERT SYSTEM →", id: "beaconinrain-sos" },
      { name: "VOLUNTEER WORK IN BA VI →", id: "volunteer-ba-vi" },
      { name: "\"BLUE RACETRACK\" SWIMMING CHALLENGE →", id: "blue-racetrack" }
    ],
    desc: "Community Services: Engineering became an interest of mine because I wanted to help people and communities overcome the various problems that beset their daily lives, but I also hope to empower them in ways beyond that."
  },
  OTHER: {
    title: "OTHER",
    categoryPath: "other",
    items: [
      { name: "ACHIEVEMENTS →", id: "achievements" },
      { name: "HOBBIES →", id: "hobbies" }
    ],
    desc: "Other: Beyond robotics, research, sports and community work, here are the achievements and hobbies that round out who I am."
  }
};

type CategoryKey = keyof typeof memoryData;

const MOBILE_BREAKPOINT = 900;

export default function Home() {
  const [currentScreen, setCurrentScreen] = useState<'HOME' | 'ABOUT' | 'MEMORY'>('HOME');
  const [activeCategory, setActiveCategory] = useState<CategoryKey | null>(null);
  const [scale, setScale] = useState(1);
  const [isMobile, setIsMobile] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  const memoryPanelRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const calculate = () => {
      const w = window.innerWidth;
      const h = window.innerHeight;
      setIsMobile(w < MOBILE_BREAKPOINT);
      
      // SỬA Ở ĐÂY: Dùng Math.min để toàn bộ khung máy game luôn nằm trọn trong màn hình (không bị cắt)
      setScale(Math.min(w / 1920, h / 1080)); 
    };

    calculate();
    window.addEventListener('resize', calculate);
    window.addEventListener('orientationchange', calculate);

    const mountTimeout = setTimeout(() => setIsMounted(true), 10);
    return () => {
      window.removeEventListener('resize', calculate);
      window.removeEventListener('orientationchange', calculate);
      clearTimeout(mountTimeout);
    };
  }, []);

  useEffect(() => {
    document.body.style.margin = '0';
    document.body.style.padding = '0';
    document.body.style.backgroundColor = 'transparent'; 
    document.body.style.overflow = 'hidden';
  }, []);

  useEffect(() => {
    if (currentScreen !== 'MEMORY') return;

    const handleOutside = (e: PointerEvent) => {
      if (memoryPanelRef.current && !memoryPanelRef.current.contains(e.target as Node)) {
        setActiveCategory(null);
      }
    };

    document.addEventListener('pointerdown', handleOutside);
    return () => document.removeEventListener('pointerdown', handleOutside);
  }, [currentScreen]);

  const handleOpenMemory = () => {
    setCurrentScreen('MEMORY');
    setActiveCategory(null);
  };

  const handleOpenScreen = (screen: 'HOME' | 'ABOUT') => {
    setCurrentScreen(screen);
    setActiveCategory(null);
  };

  return (
    <main className={`${styles.gameContainer} ${isMobile ? styles.isMobile : ''}`}>
      <div
        className={styles.scaleWrapper}
        style={{
          transform: isMobile ? 'none' : `scale(${scale})`,
          opacity: isMounted ? 1 : 0
        }}
      >
        <div className={styles.consoleBg}></div>

        <div className={styles.screenArea}>

          {/* ================= TOP CONTENT ================= */}
          <div className={styles.topContent}>

            {currentScreen === 'HOME' && (
              <div>
                <h1 className={styles.titleHowToPlay}>HOW TO PLAY</h1>
                <p className={styles.instructionText}>
                  Click on &quot;About Me&quot; to get a glimpse into my world.
                </p>
                <p className={styles.instructionText}>
                  Click on &quot;Select the Memory&quot; to see all the memories you can explore.
                </p>
              </div>
            )}

            {currentScreen === 'ABOUT' && (
              <div className={styles.aboutContent}>
                <div className={styles.aboutImageContainer}>
                  <Image
                    src="/image/about.png"
                    alt="Truong Chi Hien"
                    width={300}
                    height={400}
                    className={styles.aboutImg}
                    priority
                  />
                </div>
                <div className={styles.aboutTextBox}>
                  Hi, I&apos;m Hien, an aspiring engineer and hobbyist in many things, including speedcubing, video games, Pokémon collectibles, and more. Besides recently developing a liking for robotics and scientific research, I have always been interested in sports and community work. These interests have shaped who I am today: passionate about competition and eager to empower communities.
                </div>
              </div>
            )}

            {currentScreen === 'MEMORY' && (
              <div className={styles.memoryPanel} ref={memoryPanelRef}>
                <div className={styles.memoryLeftCol}>
                  {(Object.keys(memoryData) as CategoryKey[]).map((key) => (
                    <Link
                      key={key}
                      href={`/${memoryData[key].categoryPath}`}
                      className={`${styles.categoryItem} ${activeCategory === key ? styles.categoryActive : ''}`}
                      onMouseEnter={() => setActiveCategory(key)}
                      onClick={(e) => {
                        if (isMobile && activeCategory !== key) {
                          e.preventDefault();
                          setActiveCategory(key);
                        } else {
                          setActiveCategory(key);
                        }
                      }}
                    >
                      {memoryData[key].title}
                    </Link>
                  ))}
                </div>

                <div className={styles.memoryRightCol}>
                  {activeCategory &&
                    memoryData[activeCategory].items.map((sub) => (
                      <Link
                        key={`${activeCategory}-${sub.id}`}
                        href={`/${memoryData[activeCategory].categoryPath}#${sub.id}`}
                        className={styles.subItem}
                      >
                        {sub.name}
                      </Link>
                    ))}
                </div>
              </div>
            )}
          </div>

          {/* ================= MENU CONTAINER ================= */}
          <div className={styles.menuContainer}>
            <span
              className={`${styles.menuText} ${currentScreen === 'ABOUT' ? styles.menuActive : ''}`}
              onClick={() => handleOpenScreen('ABOUT')}
            >
              ABOUT ME
            </span>

            <span
              className={`${styles.menuText} ${currentScreen === 'MEMORY' ? styles.menuActive : ''}`}
              onClick={handleOpenMemory}
            >
              SELECT THE MEMORY
            </span>

            {currentScreen !== 'HOME' && (
              <span
                className={styles.menuText}
                onClick={() => handleOpenScreen('HOME')}
              >
                HOW TO PLAY
              </span>
            )}
          </div>

          {/* ================= BOTTOM CONTENT ================= */}
          {currentScreen === 'MEMORY' && activeCategory !== null ? (
            <div className={styles.memoryDescription}>
              {memoryData[activeCategory].desc}
            </div>
          ) : (
            <h2 className={styles.mainTitle}>CHI HIEN&apos;S FOLIO</h2>
          )}

        </div>
      </div>
    </main>
  );
}