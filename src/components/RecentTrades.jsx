import styles from './RecentTrades.module.css';

/**
 * @typedef {Object} Trade
 * @property {string} id
 * @property {string} pair        - Par de trading (ej. "BTC/USDT").
 * @property {'LONG'|'SHORT'} side - Dirección de la operación.
 * @property {string} size        - Tamaño de la posición.
 * @property {number} pnl         - P&L cerrado (positivo o negativo).
 * @property {string} time        - Hora de cierre (HH:mm).
 */

/**
 * <RecentTrades> — Tabla compacta de las últimas operaciones.
 *
 * Recibe `trades` por **props** (lectura inmutable). Se renderiza dentro
 * del slot `children` del <Dashboard> — demuestra composición sobre herencia:
 * el dashboard no sabe nada de trades, solo expone un slot, y App decide qué
 * proyectar ahí.
 *
 * @param {Object} props
 * @param {Trade[]} props.trades
 * @returns {import('react').ReactElement}
 */
function RecentTrades({ trades }) {
  return (
    <section className={styles.panel}>
      <header className={styles.head}>
        <h3 className={styles.title}>Operaciones recientes</h3>
        <span className={styles.badge}>{trades.length} órdenes · hoy</span>
      </header>

      <ul className={styles.list}>
        {trades.map((t) => {
          const isProfit = t.pnl >= 0;
          const sideClass = t.side === 'LONG' ? styles.long : styles.short;
          const pnlClass = isProfit ? styles.pnlUp : styles.pnlDown;

          return (
            <li key={t.id} className={styles.row}>
              <span className={styles.pair}>{t.pair}</span>
              <span className={`${styles.side} ${sideClass}`}>{t.side}</span>
              <span className={styles.size}>{t.size}</span>
              <span className={pnlClass}>
                {isProfit ? '+' : '−'}${Math.abs(t.pnl).toFixed(2)}
              </span>
              <span className={styles.time}>{t.time}</span>
            </li>
          );
        })}
      </ul>
    </section>
  );
}

export default RecentTrades;
