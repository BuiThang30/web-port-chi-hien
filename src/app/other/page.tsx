'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Nav from '@/components/nav/nav';
import styles from './page.module.css';

// 1. Định nghĩa Type cho dữ liệu trang Other
type OtherItem = {
  title: string;
  type: 'achievements' | 'placeholder';
  rows?: { src: string }[][];
};

// 2. Dữ liệu: Hàng 1 (4 ảnh), Hàng 2 (4 ảnh), Hàng 3 (5 ảnh), Hàng 4 (7 ảnh)
const otherData: Record<string, OtherItem> = {
  "achievements": {
    title: "ACHIEVEMENT",
    type: "achievements",
    rows: [
      [
        { src: "/image/cert-1.png" }, { src: "/image/cert-2.png" },
        { src: "/image/cert-3.png" }, { src: "/image/cert-4.png" }
      ],
      [
        { src: "/image/cert-5.png" }, { src: "/image/cert-6.png" },
        { src: "/image/cert-7.png" }, { src: "/image/cert-8.png" }
      ],
      [
        { src: "/image/cert-9.png" }, { src: "/image/cert-10.png" },
        { src: "/image/cert-11.png" }, { src: "/image/cert-12.png" }, { src: "/image/cert-13.png" }
      ],
      [
        { src: "/image/cert-14.png" }, { src: "/image/cert-15.png" },
        { src: "/image/cert-16.png" }, { src: "/image/cert-17.png" }, 
        { src: "/image/cert-18.png" }, { src: "/image/cert-19.png" }, { src: "/image/cert-20.png" }
      ]
    ]
  },
  "hobbies": {
    title: "HOBBIES",
    type: "placeholder"
  }
};

type OtherKey = keyof typeof otherData;
const MOBILE_BREAKPOINT = 900;

export default function OtherPage() {
  const [activeItem, setActiveItem] = useState<OtherKey | null>(null);
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
        (Object.keys(otherData) as OtherKey[]).includes(hash as OtherKey)
          ? (hash as OtherKey)
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

  const current = activeItem ? otherData[activeItem] : null;

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
          {!isMobile && current && (
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

              {current.type === 'achievements' && (
                <div className={styles.achievementsLayout}>
                  <div className={styles.titleColumn}>
                    <h1 className={styles.sportTitle}>{current.title}</h1>
                  </div>

                  <div className={styles.sliderColumn}>
                    {current.rows?.map((row, index) => {
                      const isSlideRight = index % 2 === 0;
                      
                      return (
                        <div key={index} className={styles.sliderWrapper}>
                          <div
                            className={`${styles.sliderRow} ${
                              isSlideRight ? styles.slideRight : styles.slideLeft
                            }`}
                          >
                            {[...Array(4)].map((_, loopIndex) => (
                              <React.Fragment key={loopIndex}>
                                {row.map((img, imgIdx) => (
                                  <div key={`${loopIndex}-${imgIdx}`} className={styles.certImageWrapper}>
                                    <Image
                                      src={img.src}
                                      alt={`Certificate ${index}-${imgIdx}`}
                                      width={0}
                                      height={0}
                                      sizes="500px"
                                      className={styles.certImg}
                                    />
                                  </div>
                                ))}
                              </React.Fragment>
                            ))}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}

              {current.type === 'placeholder' && (
                <div className={styles.placeholderLayout}>
                  <h1 className={styles.sportTitle}>{current.title}</h1>
                  <p className={styles.placeholderText}>
                    Content for this section is currently being updated. Please check back later!
                  </p>
                </div>
              )}
            </div>
          )}

          {/* ----- CHẾ ĐỘ ĐIỆN THOẠI ----- */}
          {isMobile && (
            <div className={styles.mobileScrollContainer}>
              {(Object.keys(otherData) as OtherKey[]).map((key) => {
                const item = otherData[key];
                return (
                  <div key={key} id={key} className={styles.popupBox}>
                    <div className={styles.titleColumn}>
                      <h1 className={styles.sportTitle}>{item.title}</h1>
                    </div>

                    {item.type === 'achievements' && (
                      <div className={styles.sliderColumn}>
                        {item.rows?.map((row, index) => {
                          const isSlideRight = index % 2 === 0;
                          return (
                            <div key={index} className={styles.sliderWrapper}>
                              <div
                                className={`${styles.sliderRow} ${
                                  isSlideRight ? styles.slideRight : styles.slideLeft
                                }`}
                              >
                                {[...Array(4)].map((_, loopIndex) => (
                                  <React.Fragment key={loopIndex}>
                                    {row.map((img, imgIdx) => (
                                      <div key={`${loopIndex}-${imgIdx}`} className={styles.certImageWrapper}>
                                        <Image
                                          src={img.src}
                                          alt={`Certificate ${index}-${imgIdx}`}
                                          width={0}
                                          height={0}
                                          sizes="500px"
                                          className={styles.certImg}
                                        />
                                      </div>
                                    ))}
                                  </React.Fragment>
                                ))}
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    )}

                    {item.type === 'placeholder' && (
                      <div className={styles.placeholderLayout}>
                        <p className={styles.placeholderText}>
                          Content for this section is currently being updated. Please check back later!
                        </p>
                      </div>
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