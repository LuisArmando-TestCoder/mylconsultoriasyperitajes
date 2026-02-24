import React from 'react';
import styles from './StatsGrid.module.scss';
import StatItem from '../StatItem/StatItem';
import { clsx } from 'clsx';

export interface StatData {
  value: string;
  label: string;
}

interface StatsGridProps {
  stats: StatData[];
  className?: string;
}

export default function StatsGrid({ stats, className }: StatsGridProps) {
  return (
    <div className={clsx(styles.stats_grid, className)}>
      {stats.map((stat, index) => (
        <StatItem
          key={index}
          id={`stat-${index}`}
          value={stat.value}
          label={stat.label}
        />
      ))}
    </div>
  );
}
