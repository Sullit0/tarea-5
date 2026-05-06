import { version as reactVersion } from 'react';
import styles from './Footer.module.css';

/**
 * <Footer> — Pie del dashboard.
 *
 * Sirve también como evidencia visible de CSR: la cadena `reactVersion`
 * se obtiene del bundle JS al ejecutarse en el cliente, no del HTML inicial.
 *
 * @returns {import('react').ReactElement}
 */
function Footer() {
  return (
    <footer className={styles.footer}>
      <span>
        Dashboard SPA · React v{reactVersion} + Vite — Render del lado del cliente (CSR)
      </span>
      <span className={styles.note}>
        El HTML servido inicialmente está vacío; el árbol React se monta tras
        descargar y ejecutar <code>main.jsx</code>.
      </span>
    </footer>
  );
}

export default Footer;
