import React from 'react';
import styles from './Footer.module.scss';
import Typography from '@/components/atoms/Typography/Typography';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer id="main-footer" className={styles.footer}>
      <div id="footer__container" className={styles.footer__container}>
        <div id="footer__info" className={styles.footer__info}>
          <Typography id="footer-logo" variant="h3" tag="span">
            M&L Consultorías y Peritajes
          </Typography>
          <Typography id="footer-tagline" variant="caption">
            Expertos en peritaje automotriz.
          </Typography>
        </div>
        
        <div id="footer__contact" className={styles.footer__contact}>
          <Typography id="footer-contact-title" variant="caption" color="accent">
            Contacto
          </Typography>
          <a id="footer-phone-1" href="tel:+50684085447">
            (+506) 8408 5447
          </a>
          <a id="footer-phone-2" href="tel:+50689984852">
            (+506) 8998 4852
          </a>
          <a id="footer-email-1" href="mailto:info@mylconsultoriasyperitajes.com">
            info@mylconsultoriasyperitajes.com
          </a>
          <a id="footer-email-2" href="mailto:luismurillog@gmail.com">
            luismurillog@gmail.com
          </a>
        </div>

        <div id="footer__legal" className={styles.footer__legal}>
          <Typography id="footer-copyright" variant="caption">
            © {currentYear} M&L Consultorías y Peritajes. Todos los derechos reservados.
          </Typography>
        </div>
      </div>
    </footer>
  );
}
