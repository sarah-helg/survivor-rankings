import React, { ReactNode } from 'react';
import styles from './card.module.css'; // Import CSS module styles

export const Card = ({ children }: { children: ReactNode }) => {
  return <div className={styles.card}>{children}</div>; // Apply styles using the className
};

export const CardHeader = ({ children }: { children: ReactNode }) => {
  return <div className={styles.cardHeader}>{children}</div>;
};

export const CardTitle = ({ children }: { children: ReactNode }) => {
  return <div className={styles.cardTitle}>{children}</div>;
};

export const CardContent = ({ children }: { children: ReactNode }) => {
  return <div className={styles.cardContent}>{children}</div>;
};
