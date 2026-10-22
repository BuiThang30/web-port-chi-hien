'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import styles from './nav.module.css';

type NavItem = {
  name: string;
  path: string;
  color: string;      // màu khi hover / khi đang ở trang đó
  subColor?: string;  // màu các mục sổ xuống (mặc định dùng color)
  items: { name: string; id: string }[];
};

const NAV_ITEMS: NavItem[] = [
  { name: 'HOME', path: '/', color: '#FFFFFF', items: [] },
  {
    name: 'ROBOTICS',
    path: '/robotics',
    color: '#FFFD00',
    items: [
      { name: 'OVERWATCH', id: 'overwatch' },
      { name: 'COMMUNITY EVENTS', id: 'community-events' },
      { name: 'GART', id: 'gart' }
    ]
  },
  {
    name: 'INNOVATION AND RESEARCH',
    path: '/innovation',
    color: '#244863',
    items: [
      { name: 'TEKMONK', id: 'tekmonk' },
      { name: 'VSIC', id: 'vsic' },
      { name: 'WICO', id: 'wico' },
      { name: 'OTHER RESEARCH', id: 'other-research' }
    ]
  },
  {
    name: 'SPORTS',
    path: '/sports',
    color: '#00FFF4',
    subColor: '#0A5C6E', // dropdown màu xanh đậm như thiết kế (cyan sẽ bị chìm vào nền)
    items: [
      { name: 'SWIMMING', id: 'swimming' },
      { name: 'SOCCER', id: 'soccer' },
      { name: 'BADMINTON', id: 'badminton' }
    ]
  },
  {
    name: 'COMMUNITY SERVICES',
    path: '/community',
    color: '#BC4A92',
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
    color: '#FFFB0E',
    items: [
      { name: 'ACHIEVEMENTS', id: 'achievements' },
      { name: 'HOBBIES', id: 'hobbies' }
    ]
  },
];

export default function Nav() {
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);
  const pathname = usePathname();

  return (
    <nav className={styles.menuContainer}>
      {/* Logo bên trái */}
      <Link href="/" className={styles.logo}>
        CHI HIEN&apos;S FOLIO
      </Link>

      {/* Danh sách menu bên phải */}
      <div className={styles.navRight}>
        {NAV_ITEMS.map((item, index) => {
          const isHovered = hoveredItem === item.name;
          const isActive = pathname === item.path; // trang hiện tại sáng màu như thiết kế
          // 2 item cuối sát mép phải -> dropdown căn phải để không tràn khỏi trang
          const alignRight = index >= NAV_ITEMS.length - 2;

          return (
            <div
              key={item.name}
              className={styles.navItemWrapper}
              onMouseEnter={() => setHoveredItem(item.name)}
              onMouseLeave={() => setHoveredItem(null)}
            >
              <Link
                href={item.path}
                className={styles.menuText}
                style={{ color: isHovered || isActive ? item.color : '#FFFFF6' }}
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
  );
}