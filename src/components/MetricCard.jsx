import Sparkline from './Sparkline.jsx';
import styles from './MetricCard.module.css';

const TONE_COLORS = {
  success: '#34d399',
  accent: '#38bdf8',
  warning: '#fbbf24',
  danger: '#f87171',
};

/**
 * <MetricCard> — Tarjeta de métrica reutilizable.
 *
 * Recibe los datos por **props** (lectura inmutable; nunca mutar `props.*`)
 * y renderiza contenido anidado proyectado vía **children**. Si recibe
 * `series`, dibuja una sparkline SVG en la zona inferior.
 *
 * Estilado: CSS Modules (scope local, sin colisiones globales).
 *
 * @param {Object} props
 * @param {string} props.label                                  - Título de la métrica.
 * @param {string|number} props.value                           - Valor a mostrar.
 * @param {number} props.delta                                  - Variación (%).
 * @param {'success'|'accent'|'warning'|'danger'} [props.tone]  - Tono visual.
 * @param {number[]} [props.series]                             - Serie histórica para sparkline.
 * @param {import('react').ReactNode} [props.children]          - Contenido anidado.
 * @returns {import('react').ReactElement}
 */
function MetricCard({ label, value, delta, tone = 'accent', series, children }) {
  // Composición de clases: base + tono. CSS Modules genera nombres con hash
  // (p.ej. _card_1a2b3) por lo que no chocarán con clases de otros módulos.
  const cardClass = `${styles.card} ${styles[`tone_${tone}`] ?? ''}`.trim();
  const isPositive = delta >= 0;
  const deltaClass = isPositive ? styles.deltaUp : styles.deltaDown;
  const sparkColor = TONE_COLORS[tone] ?? TONE_COLORS.accent;

  return (
    <article className={cardClass}>
      <header className={styles.head}>
        <span className={styles.label}>{label}</span>
        <span className={deltaClass} aria-label="Variación porcentual">
          {isPositive ? '▲' : '▼'} {Math.abs(delta).toFixed(1)}%
        </span>
      </header>

      <strong className={styles.value}>{value}</strong>

      {series ? (
        <div className={styles.spark}>
          <Sparkline series={series} color={sparkColor} height={36} />
        </div>
      ) : null}

      {/* `children` es la prop especial donde React inyecta el contenido
          colocado entre <MetricCard>...</MetricCard>. Nunca debe mutarse. */}
      {children ? <div className={styles.footer}>{children}</div> : null}
    </article>
  );
}

export default MetricCard;
