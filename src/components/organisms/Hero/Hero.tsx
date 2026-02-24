"use client";

import React, { useRef } from 'react';
import styles from './Hero.module.scss';
import Typography from '@/components/atoms/Typography/Typography';
import Button from '@/components/atoms/Button/Button';
import Hero3D from '../Hero3D/Hero3D';
import ClientOnly from '@/components/atoms/ClientOnly';
import { SplitText } from '@/components/atoms/SplitText/SplitText';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

export default function Hero() {
  const container = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const tl = gsap.timeline();
    
    tl.from("#hero-title", {
      y: 100,
      opacity: 0,
      duration: 1.2,
      ease: "power4.out",
    })
    .from("#hero-description-wrapper", {
      y: 50,
      opacity: 0,
      duration: 1,
      ease: "power3.out",
    }, "-=0.8")
    .from("#hero__actions", {
      y: 30,
      opacity: 0,
      duration: 0.8,
      ease: "power2.out",
    }, "-=0.6");
  }, { scope: container });

  return (
    <section id="hero" className={styles.hero} ref={container}>
      <ClientOnly>
        <Hero3D />
      </ClientOnly>
      
      <div id="hero__content" className={styles.hero__content}>
        <div className={styles.hero__header}>
          <Typography
            id="hero-title"
            variant="h1"
            tag="h1"
            className={styles.hero__title}
          >
            <SplitText id="hero-title-split-1">Claridad Técnica</SplitText>
            <br />
            <span id="hero-title-accent" className={styles.hero__title_accent}>
              <SplitText id="hero-title-split-2">Sector Automotriz</SplitText>
            </span>
          </Typography>
          
          <div id="hero-description-wrapper" className={styles.hero__description_wrapper}>
            <Typography
              id="hero-description"
              variant="body"
              className={styles.hero__description}
            >
              M&L Consultorías y Peritajes: Informes periciales estructurados, 
              verificables y comprensibles para procesos administrativos y judiciales.
            </Typography>
          </div>
        </div>

        <div id="hero__actions" className={styles.hero__actions}>
          <Button id="hero-cta-primary" variant="primary" href="/#servicios">
            Nuestros Servicios
          </Button>
          <Button id="hero-cta-secondary" variant="outline" href="/#contacto">
            Contacto
          </Button>
        </div>
      </div>
    </section>
  );
}
