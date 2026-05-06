import styles from './MetricCard.module.css';

/**
 * <MetricCard> — Tarjeta de métrica reutilizable.
 *
 * Recibe los datos por **props** (lectura inmutable; nunca mutar `props.*`)
 * y renderiza contenido anidado proyectado vía **children**.
 *
 * Estilado: CSS Modules (scope local, sin colisiones globales).
 *
 * @param {Object} props
 * @param {string} props.label                                  - Título de la métrica.
 * @param {string|number} props.value                           - Valor a mostrar.
 * @param {number} props.delta                                  - Variación (%).
 * @param {'success'|'accent'|'warning'|'danger'} [props.tone]  - Tono visual.
 * @param {import('react').ReactNode} [props.children]          - Contenido anidado.
 * @returns {import('react').ReactElement}
 */
function MetricCard({ label, value, delta, tone = 'accent', children }) {
  // Composición de clases: base + tono. CSS Modules genera nombres con hash
  // (p.ej. _card_1a2b3) por lo que no chocarán con clases de otros módulos.
  const cardClass = `${styles.card} ${styles[`tone_${tone}`] ?? ''}`.trim();
  const isPositive = delta >= 0;
  const deltaClass = isPositive ? styles.deltaUp : styles.deltaDown;

  return (
    <article className={cardClass}>
      <header className={styles.head}>
        <span className={styles.label}>{label}</span>
        <span className={deltaClass} aria-label="Variación porcentual">
          {isPositive ? '▲' : '▼'} {Math.abs(delta).toFixed(1)}%
        </span>
      </header>

      <strong className={styles.value}>{value}</strong>

      {/* `children` es la prop especial donde React inyecta el contenido
          colocado entre <MetricCard>...</MetricCard>. Nunca debe mutarse. */}
      {children ? <div className={styles.footer}>{children}</div> : null}
    </article>
  );
}

export default MetricCard;
