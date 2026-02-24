'use client';

import React from 'react';
import styles from './AboutInfographics.module.scss';
import Typography from '@/components/atoms/Typography/Typography';
import { Car, Shield, Scale, Cpu, Handshake, GraduationCap } from 'lucide-react';
import { clsx } from 'clsx';
import { SplitText } from '@/components/atoms/SplitText/SplitText';

const infographicsData = [
  {
    title: "Patrimonio y Movilidad",
    text: "En Costa Rica, un vehículo representa trabajo, movilidad y responsabilidad legal. En ese entorno, M&L Consultorías y Peritajes acompaña casos donde lo que está en juego es claridad técnica: qué pasó, qué se evidencia y qué corresponde asumir con fundamento.",
    icon: Car,
  },
  {
    title: "Fortaleza Argumentativa",
    text: "Nuestro enfoque está orientado a fortalecer argumentos en sede administrativa y judicial mediante informes periciales estructurados, verificables y comprensibles para personas sin formación técnica.",
    icon: Scale,
  },
  {
    title: "Excelencia y Tecnología",
    text: "Nos caracterizamos por poseer personal altamente capacitado con técnicas de avalúos eficientes, acceso a tecnologías innovadoras y altos controles de calidad en nuestros procesos periciales y ejecuciones constructivas.",
    icon: Cpu,
  },
  {
    title: "Alianzas Estratégicas",
    text: "Nuestra trayectoria se ve respaldada por alianzas estratégicas con instituciones de renombre como Cesvi Colombia y el Colegio de Abogados y Abogadas de Costa Rica, impartiendo capacitación especializada.",
    icon: Handshake,
  },
  {
    title: "Compromiso Educativo",
    text: "Bajo la dirección del Lic. Luis Diego Murillo, colaboramos con el IVTM y Economy Rent a Car en la formación de nuevos técnicos, reafirmando nuestro compromiso con la excelencia en el sector pericial.",
    icon: GraduationCap,
  },
];

export default function AboutInfographics() {
  return (
    <section id="nosotros" className={styles.infographics}>
      {infographicsData.map((item, index) => (
        <div 
          key={index} 
          className={clsx(
            styles.infographics__item,
            index % 2 !== 0 && styles['infographics__item--reverse']
          )}
        >
          <div className={styles.infographics__content}>
            <Typography id={`info-caption-${index}`} variant="caption" color="accent">
              0{index + 1}
            </Typography>
            <Typography id={`info-title-${index}`} variant="h2" tag="h2">
              <SplitText id={`info-split-${index}`}>{item.title}</SplitText>
            </Typography>
            <Typography id={`info-text-${index}`} variant="body">
              {item.text}
            </Typography>
          </div>
          <div className={styles.infographics__graphic}>
            <div className={styles.infographics__icon_wrapper}>
              <item.icon size={100} strokeWidth={1} />
            </div>
          </div>
        </div>
      ))}

      <div className={styles.infographics__stats}>
        <div className={styles.infographics__stat}>
          <Typography id="stat-1-val" variant="h1" className={styles.infographics__stat_val}>20+</Typography>
          <Typography id="stat-1-label" variant="caption" className={styles.infographics__stat_label}>Años de Experiencia</Typography>
        </div>
        <div className={styles.infographics__stat}>
          <Typography id="stat-2-val" variant="h1" className={styles.infographics__stat_val}>100%</Typography>
          <Typography id="stat-2-label" variant="caption" className={styles.infographics__stat_label}>Objetividad Técnica</Typography>
        </div>
      </div>
    </section>
  );
}
