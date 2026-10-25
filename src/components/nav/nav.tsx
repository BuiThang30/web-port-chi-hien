'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import styles from './nav.module.css';

type NavItem = {
  name: string;
  path: string;
  color: string;      
  subColor?: string;  
  items: { name: string; id: string }[];
};

const NAV_ITEMS: NavItem[] = [
  { name: 'HOME', path: '/', color: '#FFFD00', items: [] },
  {
    name: 'ROBOTICS',
    path: '/robotics',
    color: '#FFFD00',
    items: [
      { name: 'GART', id: 'gart' },
      { name: 'OVERWATCH', id: 'overwatch' },
      { name: 'COMMUNITY EVENTS', id: 'community-events' }
    ]
  },
  {
    name: 'INNOVATION AND RESEARCH',
    path: '/innovation',
    color: '#FFFD00', 
    items: [
      { name: 'TEKMONK', id: 'tekmonk' },
      { name: 'VSIC', id: 'vsic' },
      { name: 'WICO', id: 'wico' },
      { name: 'INTERNSHIP', id: 'internship' },
      { name: 'VIETNAM SUMMER SCHOOL OF SCIENCE', id: 'vietnam-summer-school-of-science' }, /* <-- ĐÃ THÊM MỚI VÀO ĐÂY */
      { name: 'OTHER RESEARCH', id: 'other-research' }
    ]
  },
  {
    name: 'SPORTS',
    path: '/sports',
    color: '#FFFD00',
    subColor: '#FFFD00', 
    items: [
      { name: 'SWIMMING', id: 'swimming' },
      { name: 'SOCCER', id: 'soccer' },
      { name: 'BADMINTON', id: 'badminton' }
    ]
  },
  {
    name: 'COMMUNITY SERVICES',
    path: '/community',
    color: '#FFFD00',
    items: [
      { name: 'CEREBRAL PALSY FAMILY ASSOCIATION VIETNAM', id: 'cerebral-palsy' },
      { name: 'ADVISOR-ADVISEE 2025', id: 'advisor-advisee-2025' },
      { name: 'HUMANITAS', id: 'humanitas' },
      { name: '"ZERO-DONG" CHARITY FAIR', id: 'zero-dong-charity-fair' },
      { name: 'BEACONINRAIN SOS ALERT SYSTEM', id: 'beaconinrain-sos' },
      { name: 'VOLUNTEER WORK IN BA VI', id: 'volunteer-ba-vi' },
      { name: '"BLUE RACETRACK" SWIMMING CHALLENGE', id: 'blue-racetrack' }
    ]
  },
  {
    name: 'OTHER',
    path: '/other',
    color: '#FFFD00',
    items: [
      { name: 'ACHIEVEMENTS', id: 'achievements' },
      { name: 'HOBBIES', id: 'hobbies' }
    ]
  },
];

export default function Nav() {
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [navStyle, setNavStyle] = useState<React.CSSProperties>({});
  const pathname = usePathname();

  useEffect(() => {
    const calculateOffset = () => {
      const w = window.innerWidth;
      const h = window.innerHeight;
      
      if (w <= 900) {
        setNavStyle({
          paddingLeft: '20px',
          paddingRight: '20px',
          top: '0px',
          position: 'relative' 
        });
        if (mobileOpen && w > 1200) setMobileOpen(false);
        return;
      }

      const scaleX = w / 1920;
      const scaleY = h / 1080;
      const scale = Math.min(scaleX, scaleY);
      
      const gameWidth = 1920 * scale;
      const gameHeight = 1080 * scale;
      
      const emptyLeftReal = Math.max(0, (w - gameWidth) / 2);
      const emptyTopReal = Math.max(0, (h - gameHeight) / 2);
      
      const offsetLeftCSS = emptyLeftReal / scaleX;
      const offsetTopCSS = emptyTopReal / scaleX;
      
      setNavStyle({
        paddingLeft: `${56 + offsetLeftCSS}px`, 
        paddingRight: `${56 + offsetLeftCSS}px`,
        top: `${offsetTopCSS}px`,
        position: 'absolute'
      });
    };

    calculateOffset();
    window.addEventListener('resize', calculateOffset);
    return () => window.removeEventListener('resize', calculateOffset);
  }, [mobileOpen]);

  return (
    <>
      <nav className={styles.menuContainer} style={navStyle}>
        <Link href="/" className={styles.logo}>
          CHI HIEN&apos;S FOLIO
        </Link>

        <div 
          className={`${styles.hamburger} ${mobileOpen ? styles.open : ''}`} 
          onClick={() => setMobileOpen(!mobileOpen)}
        >
          <span></span>
          <span></span>
          <span></span>
        </div>

        <div className={`${styles.navRight} ${mobileOpen ? styles.mobileOpen : ''}`}>
          {NAV_ITEMS.map((item, index) => {
            const isHovered = hoveredItem === item.name;
            const isActive = pathname === item.path; 
            const alignRight = index >= NAV_ITEMS.length - 2;

            return (
              <div
                key={item.name}
                className={styles.navItemWrapper}
                onMouseEnter={() => !mobileOpen && setHoveredItem(item.name)}
                onMouseLeave={() => !mobileOpen && setHoveredItem(null)}
                onClick={() => {
                  if (mobileOpen && item.items.length > 0) {
                    setHoveredItem(isHovered ? null : item.name);
                  }
                }}
              >
                <Link
                  href={item.path}
                  className={styles.menuText}
                  style={{ color: isHovered || isActive ? item.color : '#FFFFF6' }}
                  onClick={() => {
                    if (mobileOpen && item.items.length === 0) setMobileOpen(false);
                  }}
                >
                  {item.name}
                </Link>

                {isHovered && item.items.length > 0 && (
                  <div
                    className={`${styles.dropdownMenu} ${
                      alignRight ? styles.dropdownMenuRight : ''
                    }`}
                  >
                    {item.items.map((sub) => (
                      <Link
                        key={sub.id}
                        href={`${item.path}#${sub.id}`}
                        className={styles.dropdownItem}
                        style={{ color: item.subColor ?? item.color }}
                        onClick={() => setMobileOpen(false)} 
                      >
                        {sub.name}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </nav>

      {mobileOpen && (
        <div 
          style={{ position: 'fixed', top: '88px', left: 0, right: 0, bottom: 0, zIndex: 999 }}
          onClick={() => setMobileOpen(false)}
        />
      )}
    </>
  );
}