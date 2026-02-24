'use client';

import React, { useRef } from 'react';
import Typography from '@/components/atoms/Typography/Typography';
import styles from './StatItem.module.scss';
import { clsx } from 'clsx';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

interface StatItemProps {
  id: string;
  value: string;
  label: string;
  className?: string;
}

export default function StatItem({ id, value, label, className }: StatItemProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const valueRef = useRef<HTMLSpanElement>(null);

  // Extract number and suffix from value string (e.g., "20+" -> { num: 20, suffix: "+" })
  const numMatch = value.match(/(\d+)/);
  const suffixMatch = value.match(/([^\d]+)$|^(?=[^\d])/);
  
  const targetNumber = numMatch ? parseInt(numMatch[0], 10) : 0;
  const suffix = suffixMatch ? suffixMatch[0] : '';
  const prefix = value.startsWith(suffix) && suffix !== '' ? suffix : '';
  const actualSuffix = prefix === '' ? suffix : value.replace(prefix, '').replace(targetNumber.toString(), '');

  useGSAP(() => {
    if (!containerRef.current || !valueRef.current) return;

    const obj = { val: 0 };
    
    gsap.fromTo(containerRef.current, 
      { 
        opacity: 0, 
        y: 50,
        scale: 0.9,
      },
      {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 1,
        ease: 'power4.out',
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top bottom-=100',
          toggleActions: 'play none none reverse',
        }
      }
    );

    gsap.to(obj, {
      val: targetNumber,
      duration: 2,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: containerRef.current,
        start: 'top bottom-=100',
      },
      onUpdate: () => {
        if (valueRef.current) {
          valueRef.current.innerText = `${prefix}${Math.floor(obj.val)}${actualSuffix}`;
        }
      }
    });
  }, { scope: containerRef });

  return (
    <div ref={containerRef} className={clsx(styles.stat_item, className)}>
      <div className={styles.stat_item__card}>
        <div className={styles.stat_item__val_container}>
          <Typography 
            tag="span"
            id={`${id}-val`} 
            variant="h1" 
            className={styles.stat_item__val}
          >
            <span ref={valueRef}>0</span>
          </Typography>
        </div>
        <Typography 
          id={`${id}-label`} 
          variant="caption" 
          className={styles.stat_item__label}
        >
          {label}
        </Typography>
      </div>
      <div className={styles.stat_item__glow} />
    </div>
  );
}
