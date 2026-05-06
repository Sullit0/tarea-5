import MetricCard from './MetricCard.jsx';
import styles from './Dashboard.module.css';

/**
 * Tipo de un dato de métrica que <App> inyecta al <Dashboard>.
 * @typedef {Object} Metric
 * @property {string} id        - Identificador estable (key de lista).
 * @property {string} label     - Título visible de la métrica.
 * @property {string|number} value - Valor formateado o numérico.
 * @property {number} delta     - Variación relativa (%). Positiva o negativa.
 * @property {'success'|'accent'|'warning'|'danger'} tone - Tono visual.
 * @property {string} [hint]    - Texto auxiliar (ventana temporal).
 * @property {number[]} [series] - Serie histórica para sparkline opcional.
 */

/**
 * <Dashboard> — recibe datos por props (flujo unidireccional, props inmutables)
 * y los renderiza componiendo <MetricCard> hijos.
 *
 * Slots de composición:
 *  - `headerSlot`: contenido proyectado *encima* de la grilla (ej. PriceChart).
 *  - `children`  : contenido proyectado *debajo* de la grilla (ej. RecentTrades).
 *
 * Ambos demuestran composición sobre herencia — Dashboard no sabe qué se
 * renderiza ahí, solo expone los huecos.
 *
 * @param {Object} props
 * @param {string} props.heading
 * @param {string} props.description
 * @param {Metric[]} props.metrics
 * @param {import('react').ReactNode} [props.headerSlot] - Slot superior.
 * @param {import('react').ReactNode} [props.children]   - Slot inferior.
 * @returns {import('react').ReactElement}
 */
function Dashboard({ heading, description, metrics, headerSlot, children }) {
  return (
    <main className={styles.dashboard}>
      <section className={styles.intro}>
        <h2 className={styles.heading}>{heading}</h2>
        <p className={styles.description}>{description}</p>
      </section>

      {headerSlot ? <div className={styles.headerSlot}>{headerSlot}</div> : null}

      <section className={styles.grid} aria-label="Métricas">
        {metrics.map((m) => (
          <MetricCard
            key={m.id}
            label={m.label}
            value={m.value}
            delta={m.delta}
            tone={m.tone}
            series={m.series}
          >
            {/* children: contenido anidado proyectado dentro de la card.
                Demuestra composición: el padre decide la estructura interna. */}
            <small>{m.hint}</small>
          </MetricCard>
        ))}
      </section>

      {children ? <div className={styles.bottomSlot}>{children}</div> : null}
    </main>
  );
}

export default Dashboard;
