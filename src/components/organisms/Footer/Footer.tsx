"use client";

import React, { useRef } from 'react';
import styles from './Footer.module.scss';
import Typography from '@/components/atoms/Typography/Typography';
import { Mail, Phone, MapPin, Instagram, Facebook, ArrowUp, ChevronRight } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(ScrollTrigger);

export default function Footer() {
  const currentYear = new Date().getFullYear();
  const footerRef = useRef<HTMLElement>(null);

  useGSAP(() => {
    const columns = gsap.utils.toArray(`.${styles.footer__column}`);
    
    gsap.from(columns, {
      scrollTrigger: {
        trigger: footerRef.current,
        start: "top 90%",
      },
      y: 30,
      opacity: 0,
      duration: 0.8,
      stagger: 0.1,
      ease: "power3.out",
    });
  }, { scope: footerRef });

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer id="main-footer" className={styles.footer} ref={footerRef}>
      <div id="footer-bg-text" className={styles.footer__bgText}>PERITAJE</div>
      
      <div id="footer__container" className={styles.footer__container}>
        <div id="footer__grid" className={styles.footer__grid}>
          {/* Brand Column */}
          <div id="footer-col-brand" className={styles.footer__column}>
            <a href="#" className={styles.footer__logoLink}>
              <Typography id="footer-logo" variant="h3" tag="span" className={styles.footer__logo}>
                M&L<span>.</span>
              </Typography>
            </a>
            <Typography id="footer-tagline" variant="body" className={styles.footer__description}>
              Servicios profesionales de peritaje automotriz y consultoría técnica con alcance nacional en Costa Rica.
            </Typography>
            <div id="footer-socials" className={styles.footer__socials}>
              <a href="#" aria-label="Facebook"><Facebook size={20} href={"https://www.facebook.com/MyLConsultoriayPeritaje"} /></a>
              <a href="#" aria-label="Instagram"><Instagram size={20} href={"https://www.instagram.com/MyLConsultoriasyPeritajes/"} /></a>
            </div>
          </div>

          {/* Quick Links Column */}
          <div id="footer-col-links" className={styles.footer__column}>
            <Typography id="footer-links-title" variant="h3" tag="h4" className={styles.footer__columnTitle}>
              Explorar
            </Typography>
            <ul className={styles.footer__list}>
              <li><a href="#"><ChevronRight size={14} /> Inicio</a></li>
              <li><a href="#servicios"><ChevronRight size={14} /> Servicios</a></li>
              <li><a href="#contacto"><ChevronRight size={14} /> Contacto</a></li>
            </ul>
          </div>

          {/* Services Column */}
          <div id="footer-col-services" className={styles.footer__column}>
            <Typography id="footer-services-title" variant="h3" tag="h4" className={styles.footer__columnTitle}>
              Servicios
            </Typography>
            <ul className={styles.footer__list}>
              <li><a href="#servicios">Peritajes Judiciales</a></li>
              <li><a href="#servicios">Valoración de Siniestros</a></li>
              <li><a href="#servicios">Investigación de Accidentes</a></li>
              <li><a href="#servicios">Consultoría Técnica</a></li>
            </ul>
          </div>

          {/* Contact Column */}
          <div id="footer-col-contact" className={styles.footer__column}>
            <Typography id="footer-contact-title" variant="h3" tag="h4" className={styles.footer__columnTitle}>
              Contacto
            </Typography>
            <div className={styles.footer__contactInfo}>
              <a href="tel:+50684085447"><Phone size={18} /> (+506) 8408 5447</a>
              <a href="tel:+50689984852"><Phone size={18} /> (+506) 8998 4852</a>
              <a href="mailto:info@mylconsultoriasyperitajes.com"><Mail size={18} /> info@mylconsultoriasyperitajes.com</a>
              <p><MapPin size={18} /> San José, Costa Rica</p>
            </div>
          </div>
        </div>

        <div id="footer__bottom" className={styles.footer__bottom}>
          <div id="footer-legal" className={styles.footer__legal}>
            <Typography id="footer-copyright" variant="caption">
              © {currentYear} M&L Consultorías y Peritajes. Todos los derechos reservados.
            </Typography>
          </div>
          <button 
            id="back-to-top"
            onClick={scrollToTop} 
            className={styles.footer__backToTop}
            aria-label="Volver arriba"
          >
            <ArrowUp size={20} />
          </button>
        </div>
      </div>
    </footer>
  );
}
