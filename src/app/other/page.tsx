'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Nav from '@/components/nav/nav';
import styles from './page.module.css';

type HobbySlide = {
  caption?: string;
  images: { src: string; label?: string }[];
};

type OtherItem = {
  title: string;
  type: 'achievements' | 'hobbies';
  rows?: { src: string }[][];
  slides?: HobbySlide[];
};

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
    type: "hobbies",
    slides: [
      {
        images: [
          { src: "/image/hobby-chess.png", label: "Chess" },
          { src: "/image/hobby-manga.png", label: "Manga" }
        ]
      },
      {
        images: [
          { src: "/image/hobby-rubik.png", label: "Speedcubing" },
          { src: "/image/hobby-pokemon.png", label: "Pokemon collectibles" }
        ]
      },
      {
        caption: "Visiting universities around the world",
        images: [
          { src: "/image/hobby-uni-1.png" },
          { src: "/image/hobby-uni-2.png" },
          { src: "/image/hobby-uni-3.png" },
          { src: "/image/hobby-uni-4.png" }
        ]
      }
    ]
  }
};

type OtherKey = keyof typeof otherData;
const MOBILE_BREAKPOINT = 900;

export default function OtherPage() {
  const [activeItem, setActiveItem] = useState<OtherKey | null>(null);
  const [activeHobbySlide, setActiveHobbySlide] = useState(0); 
  
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
      const matched = (Object.keys(otherData) as OtherKey[]).includes(hash as OtherKey)
        ? (hash as OtherKey)
        : null;
        
      if (matched !== activeItem) {
        setActiveItem(matched);
        setActiveHobbySlide(0); 
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
                  <path d="M3 3L39 39M39 3L3 39" stroke="#FFFFFF" strokeWidth="2.5" strokeLinecap="round" />
                </svg>
              </button>

              {current.type === 'achievements' && (
                <div className={styles.achievementsLayout}>
                  <div className={styles.topSection}>
                    <div className={styles.titleColumn}>
                      <h1 className={styles.sportTitle}>{current.title}</h1>
                    </div>
                    
                    <div className={styles.topSliderContainer}>
                      {current.rows && current.rows.length > 0 && (
                        <div className={styles.sliderWrapper}>
                          <div className={`${styles.sliderRow} ${styles.slideLeft}`}>
                            {[...Array(4)].map((_, loopIndex) => (
                              <React.Fragment key={`top-${loopIndex}`}>
                                {current.rows![0].map((img, imgIdx) => (
                                  <div key={`top-${loopIndex}-${imgIdx}`} className={styles.certImageWrapper}>
                                    <Image
                                      src={img.src} alt={`Certificate 0-${imgIdx}`}
                                      width={0} height={0} sizes="500px" className={styles.certImg}
                                      style={{ width: 'auto', height: '100%', objectFit: 'contain' }}
                                    />
                                  </div>
                                ))}
                              </React.Fragment>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>

                  <div className={styles.bottomSlidersContainer}>
                    {current.rows?.slice(1).map((row, index) => {
                      const isSlideRight = index % 2 === 0; 
                      return (
                        <div key={`bottom-${index}`} className={styles.sliderWrapper}>
                          <div className={`${styles.sliderRow} ${isSlideRight ? styles.slideRight : styles.slideLeft}`}>
                            {[...Array(4)].map((_, loopIndex) => (
                              <React.Fragment key={`bottom-${loopIndex}`}>
                                {row.map((img, imgIdx) => (
                                  <div key={`bottom-${loopIndex}-${imgIdx}`} className={styles.certImageWrapper}>
                                    <Image
                                      src={img.src} alt={`Certificate ${index + 1}-${imgIdx}`}
                                      width={0} height={0} sizes="500px" className={styles.certImg}
                                      style={{ width: 'auto', height: '100%', objectFit: 'contain' }}
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

              {current.type === 'hobbies' && current.slides && (
                <div className={styles.hobbiesLayout}>
                  <div className={styles.hobbiesHeader}>
                    <h1 className={styles.sportTitle}>{current.title}</h1>
                  </div>

                  <div className={styles.hobbiesContent}>
                    <div className={styles.hobbiesImageGallery}>
                      {current.slides[activeHobbySlide].images.map((img, idx) => (
                        <div key={idx} className={styles.hobbyImageCard}>
                          <div className={styles.hobbyImgWrapper}>
                            <Image
                              src={img.src}
                              alt={img.label || `Hobby ${idx}`}
                              width={0} height={0} sizes="800px"
                              className={styles.hobbyImg} /* << ÁP DỤNG CLASS MỚI ĐỂ KHÔNG CẮT ẢNH */
                              style={{ width: 'auto', height: '100%', objectFit: 'contain' }}
                            />
                          </div>
                          {img.label && <span className={styles.hobbyLabel}>{img.label}</span>}
                        </div>
                      ))}
                    </div>
                    {current.slides[activeHobbySlide].caption && (
                      <p className={styles.hobbyCaption}>{current.slides[activeHobbySlide].caption}</p>
                    )}
                  </div>

                  <div className={styles.paginationContainer}>
                    {current.slides.map((_, idx) => (
                      <button
                        key={idx}
                        className={`${styles.pageButton} ${activeHobbySlide === idx ? styles.activePage : ''}`}
                        onClick={() => setActiveHobbySlide(idx)}
                      >
                        {idx + 1}
                      </button>
                    ))}
                  </div>
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
                    
                    {/* ACHIEVEMENTS MOBILE */}
                    {item.type === 'achievements' && (
                      <div className={styles.achievementsLayout}>
                        <div className={styles.topSection}>
                          <div className={styles.titleColumn}>
                            <h1 className={styles.sportTitle}>{item.title}</h1>
                          </div>
                          <div className={styles.topSliderContainer}>
                            {item.rows && item.rows.length > 0 && (
                              <div className={styles.sliderWrapper}>
                                <div className={`${styles.sliderRow} ${styles.slideLeft}`}>
                                  {[...Array(4)].map((_, loopIndex) => (
                                    <React.Fragment key={`mob-top-${loopIndex}`}>
                                      {item.rows![0].map((img, imgIdx) => (
                                        <div key={`mob-top-${loopIndex}-${imgIdx}`} className={styles.certImageWrapper}>
                                          <Image src={img.src} alt="" width={0} height={0} sizes="500px" className={styles.certImg} style={{ width: 'auto', height: '100%', objectFit: 'contain' }} />
                                        </div>
                                      ))}
                                    </React.Fragment>
                                  ))}
                                </div>
                              </div>
                            )}
                          </div>
                        </div>

                        <div className={styles.bottomSlidersContainer}>
                          {item.rows?.slice(1).map((row, index) => {
                            const isSlideRight = index % 2 === 0;
                            return (
                              <div key={`mob-bottom-${index}`} className={styles.sliderWrapper}>
                                <div className={`${styles.sliderRow} ${isSlideRight ? styles.slideRight : styles.slideLeft}`}>
                                  {[...Array(4)].map((_, loopIndex) => (
                                    <React.Fragment key={`mob-bottom-${loopIndex}`}>
                                      {row.map((img, imgIdx) => (
                                        <div key={`mob-bottom-${loopIndex}-${imgIdx}`} className={styles.certImageWrapper}>
                                          <Image src={img.src} alt="" width={0} height={0} sizes="500px" className={styles.certImg} style={{ width: 'auto', height: '100%', objectFit: 'contain' }} />
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

                    {/* HOBBIES MOBILE */}
                    {item.type === 'hobbies' && item.slides && (
                      <div className={styles.hobbiesLayout}>
                        <div className={styles.titleColumn}>
                          <h1 className={styles.sportTitle}>{item.title}</h1>
                        </div>
                        
                        <div className={styles.mobileSlidesList}>
                          {item.slides.map((slide, sIdx) => (
                            <div key={`mob-slide-${sIdx}`} className={styles.mobileSlideItem}>
                              <div className={styles.hobbiesImageGallery}>
                                {slide.images.map((img, iIdx) => (
                                  <div key={`mob-img-${iIdx}`} className={styles.hobbyImageCard}>
                                    <div className={styles.hobbyImgWrapper}>
                                      <Image
                                        src={img.src}
                                        alt={img.label || `Hobby`}
                                        width={0} height={0} sizes="100vw"
                                        className={styles.hobbyImg} /* << ÁP DỤNG CLASS MỚI */
                                        style={{ width: '100%', height: 'auto', objectFit: 'contain' }}
                                      />
                                    </div>
                                    {img.label && <span className={styles.hobbyLabel}>{img.label}</span>}
                                  </div>
                                ))}
                              </div>
                              {slide.caption && (
                                <p className={styles.hobbyCaption}>{slide.caption}</p>
                              )}
                            </div>
                          ))}
                        </div>
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