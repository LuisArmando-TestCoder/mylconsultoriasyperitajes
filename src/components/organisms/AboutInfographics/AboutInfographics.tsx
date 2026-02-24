'use client';

import React from 'react';
import styles from './AboutInfographics.module.scss';
import StatsGrid from '@/components/molecules/StatsGrid/StatsGrid';
import { siteContent } from '@/lib/siteContent';
import InfoBlock from '@/components/molecules/InfoBlock/InfoBlock';

export default function AboutInfographics() {
  return (
    <section id="nosotros" className={styles.infographics}>
      {siteContent.about.infographics.map((item, index) => (
        <InfoBlock
          key={index}
          id={`info-${index}`}
          index={index}
          title={item.title}
          text={item.text}
          icon={item.icon}
          reverse={index % 2 !== 0}
        />
      ))}

      <StatsGrid stats={siteContent.about.stats} />
    </section>
  );
}
