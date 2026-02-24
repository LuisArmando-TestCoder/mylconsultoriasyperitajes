'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import styles from './Navbar.module.scss';
import Typography from '@/components/atoms/Typography/Typography';
import clsx from 'clsx';
import { siteContent } from '@/lib/siteContent';
import NavLink from './NavLink';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const sections = ['hero', 'servicios', 'contacto'];
    const observerOptions = {
      root: null,
      rootMargin: '-20% 0px -80% 0px', // Trigger when section is near the top
      threshold: 0,
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    }, observerOptions);

    sections.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <nav 
      id="main-nav" 
      className={clsx(
        styles.navbar, 
        isOpen && styles['navbar--open'],
        isScrolled && styles['navbar--scrolled']
      )}
    >
      <div id="navbar__container" className={styles.navbar__container}>
        <div id="navbar__logo" className={styles.navbar__logo}>
          <Link href="/#" className={styles.navbar__logo_link}>
            <span className={styles.navbar__logo_dot}></span>
            <Typography id="logo-text" variant="h3" tag="span" className={styles.navbar__logo_text}>
              M&L
            </Typography>
          </Link>
        </div>

        <button 
          className={clsx(styles.navbar__toggle, isOpen && styles['navbar__toggle--active'])} 
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Toggle menu"
        >
          <div className={styles.navbar__toggle_inner}>
            <span></span>
            <span></span>
            <span></span>
          </div>
        </button>

        <div className={clsx(styles.navbar__menu, isOpen && styles['navbar__menu--open'])}>
          <ul id="navbar__links" className={styles.navbar__links}>
            {siteContent.navigation.map((link, index) => {
              const hrefId = link.href.split('#')[1] || 'hero';
              return (
                <NavLink
                  key={index}
                  index={index}
                  name={link.name}
                  href={link.href}
                  isActive={activeSection === hrefId}
                  onClick={() => setIsOpen(false)}
                />
              );
            })}
          </ul>
        </div>
      </div>
    </nav>
  );
}
