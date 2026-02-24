import React from 'react';
import styles from './Cases.module.scss';
import Typography from '@/components/atoms/Typography/Typography';
import { SplitText } from '@/components/atoms/SplitText/SplitText';

const cases = [
  'Determinación de condición general y estado de conservación.',
  'Verificación de daños por siniestro vs preexistencias.',
  'Análisis de calidad de reparaciones en carrocería y pintura.',
  'Evaluación de componentes de dirección, frenos y suspensión.',
  'Lectura y análisis de códigos de diagnóstico.',
  'Valoración de inconsistencias en kilometraje.',
];

export default function Cases() {
  return (
    <section id="casos" className={styles.cases}>
      <div id="cases__container" className={styles.cases__container}>
        <div id="cases__header" className={styles.cases__header}>
          <Typography id="cases-caption" variant="caption" color="accent">
            Expertiz
          </Typography>
          <Typography id="cases-title" variant="h2" tag="h2">
            <SplitText id="cases-title-split">Casos Atendidos</SplitText>
          </Typography>
        </div>

        <div id="cases__list" className={styles.cases__list}>
          {cases.map((item, index) => (
            <div key={index} id={`case-item-${index}`} className={styles.cases__item}>
              <div id={`case-item-dot-${index}`} className={styles.cases__dot} />
              <Typography id={`case-item-text-${index}`} variant="body">
                {item}
              </Typography>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
