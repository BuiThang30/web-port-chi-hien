'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Nav from '@/components/nav/nav';
import styles from './page.module.css';

type InnovationItem = {
  title: string;
  icon: { src: string; w: number; h: number; dx: number; dy: number } | null;
  subtitle?: string; 
  desc: string;
  link?: { url: string; text: string }; 
  images: { src: string }[];
  isTwoColumn?: boolean;
  columns?: {
    heading: string;
    textBeforeLink?: string; // Text đứng trước Link
    link?: { url: string; text: string };
    textAfterLink?: string; // Text đứng sau Link
    image: { src: string }; 
  }[];
};

const DEFAULT_TEXT =
  "Innovation and Research: Before I even knew what engineering meant, I had long adored learning about the many scientific phenomena that surround us every day. So it comes as no surprise that I quickly took a liking to researching and developing devices and tools to solve problems, whether major or minor.";

const innovationData: Record<string, InnovationItem> = {
  tekmonk: {
    title: "TEKMONK",
    icon: { src: "/image/icon-laptop.png", w: 140, h: 100, dx: 0, dy: -10 },
    desc: "Tekmonk was my first major programming competition and one of my longest-running projects. With no prior experience in web development, my friends and I learned through constant trial and error while building a platform combining features of LinkedIn and Google Maps. Our persistence took us to the National Round, where we received the Promising Award.",
    images: [
      { src: "/image/tekmonk-1.png" },
      { src: "/image/tekmonk-2.png" }
    ]
  },
  vsic: {
    title: "VSIC",
    icon: { src: "/image/icon-robot.png", w: 130, h: 110, dx: 10, dy: 5 },
    desc: "VSIC was my first official research competition and a humbling but valuable experience. Our air-monitoring robot earned a Consolation Prize, while the judges’ feedback helped me recognize where our work could improve. More importantly, the experience motivated me to refine my approach and aim higher in future research competitions.",
    images: [
      { src: "/image/vsic-1.png" },
      { src: "/image/vsic-2.png" }
    ]
  },
  wico: {
    title: "WICO",
    icon: { src: "/image/icon-tower.png", w: 70, h: 220, dx: 0, dy: 30 },
    desc: "WICO 2026 was my biggest research competition yet, bringing together over 1,000 participants from 26 countries. Competing alongside talented young researchers from around the world was both challenging and inspiring. I was proud to lead my team to a Gold Medal with our water-testing device, proving how far persistence, teamwork, and careful experimentation could take us.",
    images: [
      { src: "/image/wico-1.png" },
      { src: "/image/wico-2.png" },
      { src: "/image/wico-3.png" }
    ]
  },
  internship: {
    title: "INTERNSHIP",
    icon: null,
    desc: "Foundation is incredibly important, not just in civil engineering but also in mechanical engineering. Crabs, frogs, and many other species have extremely complex biomechanical systems that help them move through the wild. The same can be said of some fire trucks, which require outriggers to maintain stability. My fascination with this mechanical component led me to an internship at Hiep Hoa Fire Truck Manufacturing Co., Ltd., where I had the opportunity to study and work on multiple mechanical components of several types of fire trucks.",
    images: [
      { src: "/image/internship-1.png" },
      { src: "/image/internship-2.png" },
      { src: "/image/internship-3.png" }
    ]
  },
  "vietnam-summer-school-of-science": {
    title: "VIETNAM SUMMER SCHOOL OF SCIENCE",
    icon: null,
    subtitle: "Research at 13th Vietnam Summer School of Science",
    desc: "Participating in this year’s Vietnam Summer School of Science taught me a lot about research methodology and integrity, application of AI in research, and international collaboration in science. Then, I got to implement these lessons in practice through the Science-A-Thon competition. You can see our research paper on a model for improving and strengthening AI’s role in self-study and homework completion.",
    link: { url: "https://drive.google.com/file/d/1caq5vznxZQIfN5qfvnlizZrQMSLp4s8N/view", text: "Here" },
    images: [
      { src: "/image/vsss-1.png" },
      { src: "/image/vsss-2.png" },
      { src: "/image/vsss-3.png" }
    ]
  },
"other-research": { 
    title: "OTHER RESEARCH",
    icon: { src: "/image/icon-document.png", w: 130, h: 100, dx: 10, dy: -10 },
    isTwoColumn: true,
    columns: [
      {
        heading: "Sign Language Communication Research at Hanoi University of Science and Technology",
        textBeforeLink: "This long-term research project is especially meaningful to me because of my desire to make technology more accessible to people with disabilities. I contributed to developing and testing our AI model by collecting visual data and evaluating its performance. Our work resulted in a ",
        link: { url: "https://drive.google.com/file/d/11ZGfK_rjWkby7JeokKl6MfAPY1-T2XuU/view", text: "research paper" },
        textAfterLink: " on an AI-powered mobile framework for bidirectional sign-language communication, turning my interest in engineering into research with real social impact.",
        image: { src: "/image/other-1.png" } 
      },
      {
        heading: "Reconstruction Dataset Research at Hanoi University of Science and Technology",
        textBeforeLink: "Bringing together two fields that fascinate me—engineering and AI—this research showed me how technology can be used to tackle real-world medical challenges. Our team worked on improving AI-based reconstruction of cranial defects by building a specialized 3D skull dataset and developing a standardized data-processing pipeline. Being part of this project gave me the opportunity to explore how computational engineering can contribute to personalized healthcare. You can read our research paper on deep learning-based cranial defect reconstruction ",
        link: { url: "https://drive.google.com/file/d/1NvgCjdY811M6dPyfNNCDtWRrdLIA-dJw/view", text: "here" },
        textAfterLink: ".",
        image: { src: "/image/other-2.png" } 
      }
    ],
    desc: "",
    images: []
  }
};

type InnovationKey = keyof typeof innovationData;
const MOBILE_BREAKPOINT = 900;

export default function InnovationPage() {
  const [activeItem, setActiveItem] = useState<InnovationKey | null>(null);
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
        (Object.keys(innovationData) as InnovationKey[]).includes(hash as InnovationKey)
          ? (hash as InnovationKey)
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

  const current = activeItem ? innovationData[activeItem] : null;

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
  
                {current.isTwoColumn && current.columns ? (
                  <div className={styles.twoColumnLayout}>
                    {current.columns.map((col, idx) => (
                      <div key={idx} className={styles.columnItem}>
                        <div className={styles.columnContent}>
                          <h3 className={styles.columnHeading}>{col.heading}</h3>
                          <p className={styles.columnText}>
                            {col.textBeforeLink}
                            {col.link && (
                              <a href={col.link.url} className={styles.textLink} target="_blank" rel="noopener noreferrer">
                                {col.link.text}
                              </a>
                            )}
                            {col.textAfterLink}
                          </p>
                        </div>
                        {col.image && (
                          <div className={styles.columnImageWrapper}>
                            <Image
                              src={col.image.src}
                              alt={col.heading}
                              fill
                              style={{ objectFit: 'contain' }}
                              sizes="300px"
                            />
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                ) : (
                  <>
                    {current.subtitle && <h2 className={styles.slideSubtitle}>{current.subtitle}</h2>}
                    <p className={styles.sportDescription}>
                      {current.desc}
                      {current.link && (
                        <a href={current.link.url} className={styles.textLink} target="_blank" rel="noopener noreferrer">
                          {current.link.text}
                        </a>
                      )}
                    </p>
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
                  </>
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

              {(Object.keys(innovationData) as InnovationKey[]).map((key) => {
                const item = innovationData[key];
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

                    {item.isTwoColumn && item.columns ? (
                      <div className={styles.twoColumnLayout}>
                        {item.columns.map((col, idx) => (
                          <div key={idx} className={styles.columnItem}>
                            <div className={styles.columnContent}>
                              <h3 className={styles.columnHeading}>{col.heading}</h3>
                              <p className={styles.columnText}>
                                {col.textBeforeLink}
                                {col.link && (
                                  <a href={col.link.url} className={styles.textLink} target="_blank" rel="noopener noreferrer">
                                    {col.link.text}
                                  </a>
                                )}
                                {col.textAfterLink}
                              </p>
                            </div>
                            {col.image && (
                              <div className={styles.columnImageWrapper}>
                                <Image
                                  src={col.image.src}
                                  alt={col.heading}
                                  fill
                                  style={{ objectFit: 'contain' }}
                                  sizes="(max-width: 900px) 250px, 300px"
                                />
                              </div>
                            )}
                          </div>
                        ))}
                      </div>
                    ) : (
                      <>
                        {item.subtitle && <h2 className={styles.slideSubtitle}>{item.subtitle}</h2>}
                        <p className={styles.sportDescription}>
                          {item.desc}
                          {item.link && (
                            <a href={item.link.url} className={styles.textLink} target="_blank" rel="noopener noreferrer">
                              {item.link.text}
                            </a>
                          )}
                        </p>
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
                      </>
                    )}
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