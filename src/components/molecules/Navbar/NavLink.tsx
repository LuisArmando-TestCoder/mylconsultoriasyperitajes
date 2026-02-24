import React from 'react';
import Link from 'next/link';
import styles from './NavLink.module.scss';
import clsx from 'clsx';

interface NavLinkProps {
  name: string;
  href: string;
  index: number;
  isActive?: boolean;
  onClick: () => void;
}

const NavLink: React.FC<NavLinkProps> = ({ name, href, index, isActive, onClick }) => {
  return (
    <li 
      id={`nav-item-${index}`} 
      className={styles.navItem}
      style={{ '--index': index } as React.CSSProperties}
    >
      <Link
        id={`nav-link-${index}`}
        href={href}
        className={clsx(styles.navLink, isActive && styles.active)}
        onClick={onClick}
      >
        <div className={styles.icon}></div>
        <span className={styles.text}>{name}</span>
      </Link>
    </li>
  );
};

export default NavLink;
