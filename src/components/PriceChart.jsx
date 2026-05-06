import styles from './PriceChart.module.css';

/**
 * <PriceChart> — Gráfico de precio en SVG inline (construido a mano).
 *
 * Sin librerías externas (Recharts/Chart.js). Renderiza:
 *  - Línea suavizada (Bezier por tramo) sobre la serie histórica
 *  - Área con gradiente vertical bajo la línea
 *  - Eje Y con 4 ticks (precio formateado)
 *  - Etiquetas X (fechas) distribuidas
 *  - Punto pulsante en el último valor (animación SMIL)
 *  - Indicador "LIVE" con pulso CSS
 *
 * Es un componente puro: todo viene por props (flujo unidireccional).
 *
 * @param {Object} props
 * @param {string} props.symbol        - Símbolo (ej. "BTC/USD").
 * @param {number[]} props.series      - Serie histórica de precios.
 * @param {string[]} props.labels      - Etiquetas X (misma longitud que series).
 * @param {string} props.currentValue  - Precio actual ya formateado (ej. "$98 420").
 * @param {number} props.changePct     - Variación % en el rango.
 * @param {string} [props.range]       - Etiqueta del rango (ej. "30d").
 * @param {string} [props.accent]      - Color base (hex). Por defecto se deriva
 *                                       del signo de `changePct`.
 * @returns {import('react').ReactElement}
 */
function PriceChart({
  symbol,
  series,
  labels,
  currentValue,
  changePct,
  range = '30d',
  accent,
}) {
  // Geometría del viewBox. preserveAspectRatio en el SVG permite que escale.
  const W = 800;
  const H = 280;
  const P = { top: 24, right: 16, bottom: 32, left: 64 };
  const innerW = W - P.left - P.right;
  const innerH = H - P.top - P.bottom;

  const min = Math.min(...series);
  const max = Math.max(...series);
  const span = max - min || 1;

  const isUp = changePct >= 0;
  const stroke = accent ?? (isUp ? '#34d399' : '#f87171');

  // Mapeo de cada punto al espacio del SVG.
  const points = series.map((v, i) => ({
    x: P.left + (i / (series.length - 1)) * innerW,
    y: P.top + (1 - (v - min) / span) * innerH,
    v,
  }));

  // Path suavizado con Bezier (control points en la mitad horizontal de cada tramo).
  const linePath = points.reduce((d, p, i) => {
    if (i === 0) return `M ${p.x.toFixed(2)},${p.y.toFixed(2)}`;
    const prev = points[i - 1];
    const cpx = ((prev.x + p.x) / 2).toFixed(2);
    return `${d} C ${cpx},${prev.y.toFixed(2)} ${cpx},${p.y.toFixed(2)} ${p.x.toFixed(2)},${p.y.toFixed(2)}`;
  }, '');

  const last = points[points.length - 1];
  const first = points[0];
  const baseline = P.top + innerH;
  const areaPath = `${linePath} L ${last.x.toFixed(2)},${baseline} L ${first.x.toFixed(2)},${baseline} Z`;

  // Ticks del eje Y (5 niveles entre min y max).
  const Y_TICKS = 4;
  const yTicks = Array.from({ length: Y_TICKS + 1 }, (_, i) => {
    const v = min + (span * i) / Y_TICKS;
    const y = P.top + (1 - i / Y_TICKS) * innerH;
    return { v, y };
  });

  // Submuestreo de etiquetas X: ~6 marcadores como máximo + el último.
  const labelStep = Math.max(1, Math.ceil(labels.length / 6));
  const xLabels = points.map((p, i) => ({
    x: p.x,
    label: labels[i],
    visible: i % labelStep === 0 || i === labels.length - 1,
  }));

  // Ids únicos para gradientes (evita colisión si se montan varios charts).
  const safeId = symbol.replace(/[^a-zA-Z0-9]/g, '');
  const areaGradId = `area-${safeId}`;
  const lineGradId = `line-${safeId}`;

  const formatTick = (v) =>
    v >= 1000
      ? `$${(v / 1000).toFixed(v >= 10_000 ? 1 : 2)}k`
      : `$${v.toFixed(2)}`;

  return (
    <section className={styles.panel}>
      <header className={styles.head}>
        <div className={styles.titleBlock}>
          <span className={styles.symbol}>
            {symbol} <span className={styles.range}>· {range}</span>
          </span>
          <div className={styles.priceRow}>
            <strong className={styles.price}>{currentValue}</strong>
            <span className={isUp ? styles.up : styles.down}>
              {isUp ? '▲' : '▼'} {Math.abs(changePct).toFixed(2)}%
            </span>
          </div>
        </div>
        <span
          className={styles.live}
          style={{ '--live-color': stroke }}
          aria-label="Datos en vivo"
        >
          <span className={styles.dot} /> LIVE
        </span>
      </header>

      <svg
        viewBox={`0 0 ${W} ${H}`}
        preserveAspectRatio="none"
        className={styles.svg}
        role="img"
        aria-label={`Gráfico histórico de ${symbol}`}
      >
        <defs>
          <linearGradient id={areaGradId} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor={stroke} stopOpacity="0.45" />
            <stop offset="100%" stopColor={stroke} stopOpacity="0" />
          </linearGradient>
          <linearGradient id={lineGradId} x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor={stroke} stopOpacity="0.55" />
            <stop offset="100%" stopColor={stroke} stopOpacity="1" />
          </linearGradient>
        </defs>

        {/* Grilla horizontal + etiquetas del eje Y */}
        {yTicks.map((t, i) => (
          <g key={`y-${i}`}>
            <line
              x1={P.left}
              x2={W - P.right}
              y1={t.y}
              y2={t.y}
              stroke="rgba(148, 163, 184, 0.10)"
              strokeWidth="1"
            />
            <text
              x={P.left - 10}
              y={t.y + 3}
              fontSize="10"
              fill="#94a3b8"
              textAnchor="end"
              fontFamily="ui-monospace, Consolas, monospace"
            >
              {formatTick(t.v)}
            </text>
          </g>
        ))}

        {/* Etiquetas del eje X */}
        {xLabels.map(
          (xl, i) =>
            xl.visible && (
              <text
                key={`x-${i}`}
                x={xl.x}
                y={H - 10}
                fontSize="10"
                fill="#94a3b8"
                textAnchor="middle"
                fontFamily="ui-monospace, Consolas, monospace"
              >
                {xl.label}
              </text>
            )
        )}

        {/* Área (relleno de gradiente) */}
        <path d={areaPath} fill={`url(#${areaGradId})`} />

        {/* Línea suavizada */}
        <path
          d={linePath}
          fill="none"
          stroke={`url(#${lineGradId})`}
          strokeWidth="2.5"
          strokeLinejoin="round"
          strokeLinecap="round"
        />

        {/* Punto final pulsante (SMIL → SVG nativo, sin JS extra) */}
        <circle cx={last.x} cy={last.y} r="9" fill={stroke} fillOpacity="0.18">
          <animate
            attributeName="r"
            values="6;14;6"
            dur="1.8s"
            repeatCount="indefinite"
          />
          <animate
            attributeName="fill-opacity"
            values="0.32;0;0.32"
            dur="1.8s"
            repeatCount="indefinite"
          />
        </circle>
        <circle cx={last.x} cy={last.y} r="3.5" fill={stroke} />
      </svg>
    </section>
  );
}

export default PriceChart;
