import React from 'react';
import styles from './Typography.module.scss';
import clsx from 'clsx';

interface TypographyProps {
  id: string;
  tag?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'p' | 'span';
  variant?: 'h1' | 'h2' | 'h3' | 'body' | 'caption';
  children: React.ReactNode;
  className?: string;
  color?: 'default' | 'accent' | 'primary';
}

export default function Typography({
  id,
  tag: Tag = 'p',
  variant = 'body',
  children,
  className,
  color = 'default',
}: TypographyProps) {
  return (
    <Tag
      id={id}
      className={clsx(
        styles.typography,
        styles[`typography--${variant}`],
        styles[`typography--color-${color}`],
        className
      )}
    >
      {children}
    </Tag>
  );
}
