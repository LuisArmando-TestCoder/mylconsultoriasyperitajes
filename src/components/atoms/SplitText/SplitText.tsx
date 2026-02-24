'use client'
import React, { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import clsx from 'clsx'
import styles from './SplitText.module.scss'

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger)
}

interface SplitTextProps {
  id: string
  children: string
  className?: string
  delay?: number
}

export const SplitText: React.FC<SplitTextProps> = ({ id, children, className, delay = 0 }) => {
  const ref = useRef<HTMLSpanElement>(null)

  useEffect(() => {
    if (!ref.current) return
    
    // Select words by class name
    const words = ref.current.querySelectorAll(`.${styles.word}`)
    
    gsap.fromTo(words, 
      { 
        y: 100, 
        opacity: 0,
      },
      {
        y: 0,
        opacity: 1,
        ease: 'power2.out',
        stagger: 0.1,
        delay: delay,
        scrollTrigger: {
          trigger: ref.current,
          start: 'top bottom', 
          end: 'center center',
          scrub: 1,
        }
      }
    )
  }, [delay])

  useEffect(() => {
    const timeout = setTimeout(() => {
        ScrollTrigger.refresh()
    }, 100)
    return () => clearTimeout(timeout)
  }, [])

  return (
    <span id={id} ref={ref} className={clsx(styles.wrapper, className)}>
      {children.split(' ').map((word, i, arr) => (
        <React.Fragment key={i}>
          <span className={styles.word}>
            {word}
          </span>
          {i < arr.length - 1 && <br />}
        </React.Fragment>
      ))}
    </span>
  )
}
