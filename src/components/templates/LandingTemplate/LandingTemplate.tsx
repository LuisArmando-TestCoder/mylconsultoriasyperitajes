import React from 'react';
import styles from './LandingTemplate.module.scss';

interface LandingTemplateProps {
  hero: React.ReactNode;
  content: React.ReactNode;
}

export default function LandingTemplate({ hero, content }: LandingTemplateProps) {
  return (
    <div id="landing-template" className={styles.landing}>
      <div className={styles.landing__decor}>
        <div className={styles.landing__videoBg}>
          <video
            autoPlay
            loop
            muted
            playsInline
            className={styles.landing__video}
          >
            <source src="https://www.pexels.com/download/video/6872084/" type="video/mp4" />
          </video>
          <div className={styles.landing__overlay} />
        </div>
        <div className={styles.landing__blob} />
        <div className={styles.landing__blob} />
        <div className={styles.landing__blob} />
      </div>
      <div id="template-hero" className={styles.landing__hero}>
        {hero}
      </div>
      <div id="template-content" className={styles.landing__content}>
        {content}
      </div>
    </div>
  );
}
