'use client';

import React, { useRef } from 'react';
import styles from './Cases.module.scss';
import Typography from '@/components/atoms/Typography/Typography';
import { SplitText } from '@/components/atoms/SplitText/SplitText';
import { siteContent } from '@/lib/siteContent';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export default function Cases() {
  const containerRef = useRef<HTMLDivElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const items = gsap.utils.toArray(`.${styles.cases__item}`);
    
    // Animate the vertical line drawing
    gsap.fromTo(lineRef.current, 
      { scaleY: 0 },
      { 
        scaleY: 1, 
        ease: "none",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top center",
          end: "bottom center",
          scrub: true,
        }
      }
    );

    // Animate items appearing
    items.forEach((item: any, index: number) => {
      const isEven = index % 2 === 0;
      
      gsap.from(item, {
        x: isEven ? -100 : 100,
        opacity: 0,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: item,
          start: "top 85%",
          end: "top 50%",
          toggleActions: "play none none reverse",
        }
      });

      // Animate the dot on the line
      const dot = item.querySelector(`.${styles.cases__dot}`);
      gsap.from(dot, {
        scale: 0,
        duration: 0.5,
        delay: 0.2,
        scrollTrigger: {
          trigger: item,
          start: "top 85%",
        }
      });
    });
  }, { scope: containerRef });

  return (
    <section id="casos" className={styles.cases}>
      <div ref={containerRef} className={styles.cases__container}>
        <div className={styles.cases__header}>
          <Typography id="cases-caption" variant="caption" color="accent">
            Expertiz
          </Typography>
          <Typography id="cases-title" variant="h2" tag="h2">
            <SplitText id="cases-split-title">Casos Atendidos</SplitText>
          </Typography>
        </div>

        <div className={styles.cases__journey}>
          {/* Central Path Line */}
          <div ref={lineRef} className={styles.cases__line} />

          <div className={styles.cases__list}>
            {siteContent.cases.map((item, index) => {
              const Icon = item.icon;
              return (
                <div 
                  key={index} 
                  className={styles.cases__item}
                  data-side={index % 2 === 0 ? 'left' : 'right'}
                >
                  <div className={styles.cases__content}>
                    <div className={styles.cases__iconWrapper}>
                      <Icon className={styles.cases__icon} />
                    </div>
                    <div className={styles.cases__text}>
                      <Typography 
                        id={`case-title-${index}`}
                        variant="h3" 
                        tag="h3" 
                        className={styles.cases__itemTitle}
                      >
                        {item.title}
                      </Typography>
                      <Typography 
                        id={`case-desc-${index}`}
                        variant="body" 
                        className={styles.cases__description}
                      >
                        {item.description}
                      </Typography>
                    </div>
                  </div>
                  {/* The dot that sits on the central line */}
                  <div className={styles.cases__dot} />
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
