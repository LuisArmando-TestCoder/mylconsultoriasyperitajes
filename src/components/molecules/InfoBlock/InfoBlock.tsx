import React from 'react';
import styles from './InfoBlock.module.scss';
import Typography from '@/components/atoms/Typography/Typography';
import { SplitText } from '@/components/atoms/SplitText/SplitText';
import { LucideIcon } from 'lucide-react';
import { clsx } from 'clsx';

interface InfoBlockProps {
  id: string;
  index: number;
  title: string;
  text: string;
  icon: LucideIcon;
  reverse?: boolean;
}

export default function InfoBlock({ 
  id, 
  index, 
  title, 
  text, 
  icon: Icon, 
  reverse 
}: InfoBlockProps) {
  return (
    <div 
      className={clsx(
        styles.info_block,
        reverse && styles['info_block--reverse']
      )}
    >
      <div className={styles.info_block__content}>
        <Typography id={`${id}-caption`} variant="caption" color="accent">
          0{index + 1}
        </Typography>
        <Typography id={`${id}-title`} variant="h2" tag="h2">
          <SplitText id={`${id}-split`}>{title}</SplitText>
        </Typography>
        <Typography id={`${id}-text`} variant="body">
          {text}
        </Typography>
      </div>
      <div className={styles.info_block__graphic}>
        <div className={styles.info_block__icon_wrapper}>
          <Icon size={100} strokeWidth={1} />
        </div>
      </div>
    </div>
  );
}
