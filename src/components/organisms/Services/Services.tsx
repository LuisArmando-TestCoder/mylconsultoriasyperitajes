"use client";

import React, { useRef } from 'react';
import styles from './Services.module.scss';
import Typography from '@/components/atoms/Typography/Typography';
import ServiceCard from '@/components/molecules/ServiceCard/ServiceCard';
import { ShieldCheck, Car, FileText, Search, Activity, ClipboardList } from 'lucide-react';
import { SplitText } from '@/components/atoms/SplitText/SplitText';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(ScrollTrigger);

const servicesData = [
  {
    title: 'Peritajes Judiciales',
    description: 'Peritajes especializados para procesos judiciales con rigor técnico y legal.',
    Icon: ShieldCheck,
  },
  {
    title: 'Peritajes Privados',
    description: 'Informes técnicos detallados para resolución de conflictos entre particulares.',
    Icon: FileText,
  },
  {
    title: 'Valoración de Siniestros',
    description: 'Evaluación técnica de daños y determinación de costos de reparación.',
    Icon: Car,
  },
  {
    title: 'Investigación de Accidentes',
    description: 'Análisis científico de dinámicas de colisión y reconstrucción de eventos.',
    Icon: Search,
  },
  {
    title: 'Capacitación Técnica',
    description: 'Programas de formación en peritaje automotriz para profesionales y empresas.',
    Icon: ClipboardList,
  },
  {
    title: 'Consultoría Especializada',
    description: 'Asesoría técnica de alto nivel para abogados, aseguradoras y flotas.',
    Icon: Activity,
  },
];

export default function Services() {
  const container = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const cards = gsap.utils.toArray(`.${styles.services__grid} > div`);
    
    if (cards.length > 0) {
      gsap.from(cards, {
        scrollTrigger: {
          trigger: `.${styles.services__grid}`,
          start: "top 85%",
        },
        y: 50,
        opacity: 0,
        duration: 0.6,
        stagger: 0.1,
        ease: "power2.out",
        clearProps: "all"
      });
    }
  }, { scope: container });

  return (
    <section id="servicios" className={styles.services} ref={container}>
      <div id="services__header" className={styles.services__header}>
        <Typography id="services-caption" variant="caption" color="accent">
          Especialización
        </Typography>
        <Typography id="services-title" variant="h2" tag="h2">
          <SplitText id="services-title-split">Servicios</SplitText>
        </Typography>
      </div>

      <div id="services__grid" className={styles.services__grid}>
        {servicesData.map((service, index) => (
          <ServiceCard
            key={`service-${index}`}
            id={`service-card-${index}`}
            index={index}
            title={service.title}
            description={service.description}
            Icon={service.Icon}
          />
        ))}
      </div>
    </section>
  );
}
