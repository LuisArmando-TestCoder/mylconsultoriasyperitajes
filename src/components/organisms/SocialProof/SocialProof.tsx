import React from 'react';
import styles from './SocialProof.module.scss';
import Typography from '@/components/atoms/Typography/Typography';

const mentions = [
  {
    tag: 'Alianza Académica',
    content: 'Reconocimiento a los estudiantes del Técnico de Peritaje Automotriz del Instituto Técnico Vargas Matamoros (IVTM) y Economy Rent a Car por el espacio compartido con el Lic. Luis Diego Murillo.',
    author: 'IVTM & Economy Rent a Car',
    org: 'Colaboración Educativa'
  },
  {
    tag: 'Alianza Estratégica',
    content: 'Curso de formación en análisis de accidentes de tránsito con énfasis en análisis de fraude en alianza con M&L Consultorías y Peritajes.',
    author: 'Cesvi Colombia',
    org: 'Centro de Experimentación y Seguridad Vial'
  },
  {
    tag: 'Capacitación Legal',
    content: 'Gane los módulos del Curso en Peritaje Automotriz impartido por M&L Consultorias y Peritajes para el gremio legal.',
    author: 'Colegio de Abogados y Abogadas',
    org: 'Costa Rica'
  },
  {
    tag: 'Testimonio',
    content: 'Con el conocimiento adquirido, podré dar a mis clientes una asesoría con excelentes cimientos técnicos y crecer profesionalmente.',
    author: 'Sindy Rodríguez Arce',
    org: 'Profesional en Derecho'
  }
];

export default function SocialProof() {
  return (
    <section className={styles.social_proof}>
      <div className={styles.social_proof__container}>
        <div className={styles.social_proof__header}>
          <Typography id="social-proof-caption" variant="caption" color="accent">
            Trayectoria y Alianzas
          </Typography>
          <Typography id="social-proof-title" variant="h2" tag="h2">
            Reconocimiento en el Sector
          </Typography>
        </div>
        <div className={styles.social_proof__grid}>
          {mentions.map((mention, index) => (
            <div key={index} className={styles.social_proof__card}>
              <div className={styles.social_proof__card_header}>
                <span className={styles.social_proof__card_tag}>{mention.tag}</span>
              </div>
              <p className={styles.social_proof__card_content}>
                "{mention.content}"
              </p>
              <div className={styles.social_proof__card_footer}>
                <span className={styles.social_proof__card_author}>{mention.author}</span>
                <span className={styles.social_proof__card_org}>{mention.org}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
