import { useId } from 'react';

/**
 * <Sparkline> — Mini-gráfico SVG inline (sin librerías externas).
 *
 * Renderiza una serie numérica como una curva suave con relleno de gradiente.
 * Pensado para incrustarse dentro de un <MetricCard>. Recibe todo por props
 * (puro, sin estado).
 *
 * @param {Object} props
 * @param {number[]} props.series       - Serie de valores (≥ 2 puntos).
 * @param {string} [props.color]        - Color de la curva (hex/rgb/css var).
 * @param {number} [props.height]       - Alto en px (viewBox y/altura visual).
 * @param {string} [props.gradientId]   - Id único para el gradiente del relleno.
 * @returns {import('react').ReactElement|null}
 */
function Sparkline({ series, color = '#38bdf8', height = 36, gradientId }) {
  // useId() genera un id estable y único por instancia (puro, sin Math.random).
  const autoId = useId();
  if (!series || series.length < 2) return null;

  // Espacio del viewBox. Mantenemos width fijo y dejamos al CSS estirar 100%
  // con preserveAspectRatio="none" para que se adapte al contenedor.
  const W = 120;
  const H = height;
  const PAD = 2; // margen vertical para que la línea no se recorte

  const min = Math.min(...series);
  const max = Math.max(...series);
  const span = max - min || 1;

  // Mapeo (índice, valor) → (x, y) en el viewBox.
  const points = series.map((v, i) => {
    const x = (i / (series.length - 1)) * W;
    const y = PAD + (1 - (v - min) / span) * (H - PAD * 2);
    return { x, y };
  });

  // Construye un path con curvas Bezier (un control point por mitad de tramo)
  // para suavizar la línea sin necesidad de calcular tangentes.
  const linePath = points.reduce((d, p, i) => {
    if (i === 0) return `M ${p.x.toFixed(2)},${p.y.toFixed(2)}`;
    const prev = points[i - 1];
    const cpx = ((prev.x + p.x) / 2).toFixed(2);
    return `${d} C ${cpx},${prev.y.toFixed(2)} ${cpx},${p.y.toFixed(2)} ${p.x.toFixed(2)},${p.y.toFixed(2)}`;
  }, '');

  // Path del área (la línea cerrada por debajo) para el gradiente de relleno.
  const last = points[points.length - 1];
  const first = points[0];
  const areaPath = `${linePath} L ${last.x.toFixed(2)},${H} L ${first.x.toFixed(2)},${H} Z`;

  // Id por instancia para evitar colisiones cuando se renderizan varias.
  // useId() lo genera de forma determinística según el lugar en el árbol React.
  const gid = gradientId ?? `spark-${autoId.replace(/:/g, '')}`;

  return (
    <svg
      viewBox={`0 0 ${W} ${H}`}
      preserveAspectRatio="none"
      role="img"
      aria-hidden="true"
      style={{ width: '100%', height: `${H}px`, display: 'block' }}
    >
      <defs>
        <linearGradient id={gid} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={color} stopOpacity="0.45" />
          <stop offset="100%" stopColor={color} stopOpacity="0" />
        </linearGradient>
      </defs>
      <path d={areaPath} fill={`url(#${gid})`} />
      <path
        d={linePath}
        fill="none"
        stroke={color}
        strokeWidth="1.6"
        strokeLinejoin="round"
        strokeLinecap="round"
      />
    </svg>
  );
}

export default Sparkline;
