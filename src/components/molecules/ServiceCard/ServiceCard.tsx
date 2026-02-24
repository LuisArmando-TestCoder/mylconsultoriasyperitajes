import React from 'react';
import styles from './ServiceCard.module.scss';
import Typography from '@/components/atoms/Typography/Typography';
import { LucideIcon } from 'lucide-react';

interface ServiceCardProps {
  id: string;
  title: string;
  description: string;
  Icon: LucideIcon;
  index: number;
}

export default function ServiceCard({ id, title, description, Icon, index }: ServiceCardProps) {
  return (
    <div id={id} className={styles.service_card}>
      <div id={`${id}__icon-wrapper`} className={styles.service_card__icon_wrapper}>
        <Icon id={`${id}__icon`} size={40} strokeWidth={1.5} />
      </div>
      <Typography
        id={`${id}__title`}
        variant="h3"
        tag="h3"
        className={styles.service_card__title}
      >
        {title}
      </Typography>
      <Typography
        id={`${id}__description`}
        variant="body"
        className={styles.service_card__description}
      >
        {description}
      </Typography>
      <div id={`${id}__index`} className={styles.service_card__index}>
        0{index + 1}
      </div>
    </div>
  );
}
