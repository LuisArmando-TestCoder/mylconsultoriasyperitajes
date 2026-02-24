import React from 'react';
import Link from 'next/link';
import styles from './Button.module.scss';
import clsx from 'clsx';

interface ButtonProps {
  id: string;
  children: React.ReactNode;
  onClick?: (e: React.MouseEvent) => void;
  type?: 'button' | 'submit' | 'reset';
  variant?: 'primary' | 'secondary' | 'outline';
  className?: string;
  href?: string;
  disabled?: boolean;
}

export default function Button({
  id,
  children,
  onClick,
  type = 'button',
  variant = 'primary',
  className,
  href,
  disabled,
}: ButtonProps) {
  const content = (
    <span id={`${id}__text`} className={styles.button__text}>
      {children}
    </span>
  );

  const buttonClasses = clsx(styles.button, styles[`button--${variant}`], className);

  if (href) {
    return (
      <Link id={id} href={href} className={buttonClasses} onClick={onClick}>
        <span className={styles.button__bg} />
        {content}
      </Link>
    );
  }

  return (
    <button id={id} type={type} className={buttonClasses} onClick={onClick} disabled={disabled}>
      <span className={styles.button__bg} />
      {content}
    </button>
  );
}
