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
 */

/**
 * <Dashboard> — recibe datos por props (flujo unidireccional, props inmutables)
 * y los renderiza componiendo <MetricCard> hijos. El contenido extra se
 * proyecta vía la prop `children` (composición sobre herencia).
 *
 * @param {Object} props
 * @param {string} props.heading
 * @param {string} props.description
 * @param {Metric[]} props.metrics
 * @param {import('react').ReactNode} [props.children] - Contenido proyectado.
 * @returns {import('react').ReactElement}
 */
function Dashboard({ heading, description, metrics, children }) {
  return (
    <main className={styles.dashboard}>
      <section className={styles.intro}>
        <h2 className={styles.heading}>{heading}</h2>
        <p className={styles.description}>{description}</p>
      </section>

      <section className={styles.grid} aria-label="Métricas">
        {metrics.map((m) => (
          <MetricCard
            key={m.id}
            label={m.label}
            value={m.value}
            delta={m.delta}
            tone={m.tone}
          >
            {/* children: contenido anidado proyectado dentro de la card.
                Demuestra composición: el padre decide la estructura interna. */}
            <small>{m.hint}</small>
          </MetricCard>
        ))}
      </section>

      {children /* slot opcional para extender el dashboard sin tocarlo */}
    </main>
  );
}

export default Dashboard;
