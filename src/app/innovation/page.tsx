'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Nav from '@/components/nav/nav';
import styles from './page.module.css';

// 1. Định nghĩa Type cho dữ liệu
type InnovationItem = {
  title: string;
  icon: { src: string; w: number; h: number; dx: number; dy: number } | null;
  desc: string;
  images: { src: string }[];
  isTwoColumn?: boolean;
  columns?: {
    heading: string;
    text: string;
    link: { url: string; text: string };
    image: { src: string }; // Thuộc tính ảnh tài liệu
  }[];
};

// Nội dung trạng thái mặc định (không có popup)
const DEFAULT_TEXT =
  "Innovation and Research: Before I even knew what engineering meant, I had long adored learning about the many scientific phenomena that surround us every day. So it comes as no surprise that I quickly took a liking to researching and developing devices and tools to solve problems, whether major or minor.";

// 2. Dữ liệu cho các mục
const innovationData: Record<string, InnovationItem> = {
  tekmonk: {
    title: "TEKMONK",
    icon: { src: "/image/icon-laptop.png", w: 140, h: 100, dx: 0, dy: -10 },
    desc: "This programming research competition was the first, and longest-running, contest I've ever participated in. Since it was the first time my friends and I had tried programming a website, we ran into many issues getting it to look just right. Thankfully, we made it all the way to the National Round and won the Promising Award with a LinkedIn and Google Maps crossover project.",
    images: [
      { src: "/image/tekmonk-1.png" },
      { src: "/image/tekmonk-2.png" }
    ]
  },
  vsic: {
    title: "VSIC",
    icon: { src: "/image/icon-robot.png", w: 130, h: 110, dx: 10, dy: 5 },
    desc: "This competition was the first official research competition that I ever participated in. In all sincerity, it was also a humbling experience, as we received only the Consolation Prize out of 28 teams in the division. Despite that, I still felt proud of our air-monitoring robot and grateful for all the judges' feedback, which showed me exactly where our work could improve and motivated me to aim higher in the next competition.",
    images: [
      { src: "/image/vsic-1.png" },
      { src: "/image/vsic-2.png" }
    ]
  },
  wico: {
    title: "WICO",
    icon: { src: "/image/icon-tower.png", w: 70, h: 220, dx: 0, dy: 30 },
    desc: "WICO 2026 is by far the biggest research competition I've taken part in, with more than 1,000 participants from 26 countries. Standing among so many talented young researchers from around the world was both intimidating and inspiring. I was immensely proud to lead my team to a gold medal with our water-testing device, which showed me that careful testing, teamwork, and persistence can pay off even against strong international competition.",
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
  "other-research": { 
    title: "OTHER RESEARCH",
    icon: { src: "/image/icon-document.png", w: 130, h: 100, dx: 10, dy: -10 },
    isTwoColumn: true,
    columns: [
      {
        heading: "Research at Hanoi University of Science and Technology",
        text: "By far the longest-running research paper I've worked on, this one deeply resonates with me because I have always wanted to help people with disabilities get a leg up in life. To that end, I contributed to building our model by collecting visual data and testing it. You can read our research paper on an AI-powered mobile framework for bidirectional sign-language communication ",
        link: { url: "https://drive.google.com/file/d/11ZGfK_rjWkby7JeokKl6MfAPY1-T2XuU/view", text: "here." },
        image: { src: "/image/other-1.png" } 
      },
      {
        heading: "Research at 13th Vietnam Summer School of Science",
        text: "Participating in this year's Vietnam Summer School of Science taught me a lot about research methodology and integrity, application of AI in research, and international collaboration in science. Then, I got to implement these lessons in practice through the Science-A-Thon competition. You can see our research paper on a model for improving and strengthening AI's role in self-study and homework completion ",
        link: { url: "https://drive.google.com/file/d/1NvgCjdY811M6dPyfNNCDtWRrdLIA-dJw/view", text: "here." },
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
    // Đổi sang 'transparent' để nhìn thấy background mờ (blur)
    document.body.style.backgroundColor = 'transparent';

    const calculateScale = () => {
      const w = window.innerWidth;
      const h = window.innerHeight;
      setIsMobile(w <= MOBILE_BREAKPOINT);

      const scaleX = w / 1920;
      const scaleY = h / 1080;
      
      // SỬ DỤNG Math.min để tránh bị cắt hình viền ngoài
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
  
                {/* Layout dạng 2 cột hiển thị Text và Ảnh */}
                {current.isTwoColumn && current.columns ? (
                  <div className={styles.twoColumnLayout}>
                    {current.columns.map((col, idx) => (
                      <div key={idx} className={styles.columnItem}>
                        {/* Phần nội dung chữ */}
                        <div className={styles.columnContent}>
                          <h3 className={styles.columnHeading}>{col.heading}</h3>
                          <p className={styles.columnText}>
                            {col.text}
                            <a href={col.link.url} className={styles.textLink} target="_blank" rel="noopener noreferrer">
                              {col.link.text}
                            </a>
                          </p>
                        </div>
                        {/* Phần hình ảnh tài liệu */}
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
                                {col.text}
                                <a href={col.link.url} className={styles.textLink} target="_blank" rel="noopener noreferrer">
                                  {col.link.text}
                                </a>
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
                        <p className={styles.sportDescription}>{item.desc}</p>
                        <div className={styles.imageGallery}>
                          {item.images.map((img, idx) => (
                            <div key={`${key}-img-${idx}`} className={styles.imageWrapper}>
                              <Image
                                src={img.src}
                                alt={`${item.title} photo ${idx + 1}`}
                                width={400}
                                height={300}
                                style={{ width: '100%', height: 'auto', objectFit: 'cover' }}
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