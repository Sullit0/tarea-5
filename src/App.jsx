import Header from './components/Header.jsx';
import Dashboard from './components/Dashboard.jsx';
import PriceChart from './components/PriceChart.jsx';
import RecentTrades from './components/RecentTrades.jsx';
import Footer from './components/Footer.jsx';

/**
 * Componente raíz <App>. Actúa como orquestador del árbol de render:
 * importa hijos y los compone, sin lógica de negocio ni estado local.
 *
 * Árbol JSX → React.createElement:
 *   <App>
 *     <Header />
 *     <Dashboard
 *        metrics={...}
 *        headerSlot={<PriceChart />}    // slot superior
 *     >
 *        <RecentTrades trades={...} />  // children → slot inferior
 *     </Dashboard>
 *     <Footer />
 *   </App>
 *
 * @returns {import('react').ReactElement}
 */
function App() {
  // ---------- Serie histórica BTC/USD (30 días) ----------
  const btcSeries = [
    92420, 91800, 93120, 93840, 92950, 94210, 95560, 94830, 93250, 94110,
    95830, 96450, 95910, 94680, 93820, 95210, 96120, 97320, 96850, 95450,
    96920, 97810, 98230, 97550, 96420, 97140, 98050, 98610, 97920, 98420,
  ];
  const btcLabels = [
    '06 Abr', '07', '08', '09', '10', '11 Abr', '12', '13', '14', '15',
    '16 Abr', '17', '18', '19', '20', '21 Abr', '22', '23', '24', '25',
    '26 Abr', '27', '28', '29', '30', '01 May', '02', '03', '04', '06 May',
  ];

  // ---------- 8 métricas con mini-series para sparkline ----------
  const metrics = [
    {
      id: 'portfolio',
      label: 'Valor de Portafolio',
      value: '$128 540',
      delta: +4.2,
      tone: 'success',
      hint: 'Equity total · 7d',
      series: [122100, 122800, 123400, 122900, 124200, 125100, 124700, 125900, 126400, 127200, 127800, 128540],
    },
    {
      id: 'pnl',
      label: 'P&L · 24 h',
      value: '+$5 418',
      delta: +3.1,
      tone: 'success',
      hint: 'Realizado + flotante',
      series: [-200, 320, 410, 290, 1100, 980, 1540, 2200, 2890, 3450, 4720, 5418],
    },
    {
      id: 'btc',
      label: 'BTC / USD',
      value: '$98 420',
      delta: +2.8,
      tone: 'accent',
      hint: 'Spot · Binance',
      series: btcSeries.slice(-12),
    },
    {
      id: 'eth',
      label: 'ETH / USD',
      value: '$3 620',
      delta: -1.4,
      tone: 'danger',
      hint: 'Spot · Binance',
      series: [3712, 3705, 3690, 3702, 3681, 3668, 3675, 3654, 3640, 3632, 3625, 3620],
    },
    {
      id: 'winrate',
      label: 'Win Rate',
      value: '67.4 %',
      delta: +1.2,
      tone: 'success',
      hint: 'Últimas 50 ops',
      series: [62, 63, 64, 64, 65, 65, 66, 65, 66, 67, 67, 67.4],
    },
    {
      id: 'positions',
      label: 'Posiciones Abiertas',
      value: 14,
      delta: +18.0,
      tone: 'accent',
      hint: '+2 hoy',
      series: [10, 11, 11, 12, 12, 13, 13, 13, 12, 13, 14, 14],
    },
    {
      id: 'hold',
      label: 'Hold Promedio',
      value: '4 h 22 m',
      delta: -8.0,
      tone: 'warning',
      hint: 'Scalping intradía',
      series: [5.6, 5.4, 5.5, 5.2, 5.0, 4.9, 4.8, 4.7, 4.6, 4.5, 4.4, 4.36],
    },
    {
      id: 'drawdown',
      label: 'Max Drawdown',
      value: '-8.4 %',
      delta: -0.6,
      tone: 'danger',
      hint: 'Peor racha del mes',
      series: [-7.1, -7.4, -7.8, -8.0, -7.9, -8.2, -8.4, -8.3, -8.5, -8.4, -8.3, -8.4],
    },
  ];

  // ---------- Operaciones recientes (children del Dashboard) ----------
  const trades = [
    { id: 't1', pair: 'BTC/USDT',  side: 'LONG',  size: '0.50',  pnl: +312.40, time: '14:08' },
    { id: 't2', pair: 'ETH/USDT',  side: 'SHORT', size: '4.20',  pnl: -86.10,  time: '13:51' },
    { id: 't3', pair: 'SOL/USDT',  side: 'LONG',  size: '38.00', pnl: +144.22, time: '13:32' },
    { id: 't4', pair: 'AVAX/USDT', side: 'LONG',  size: '60.00', pnl: +42.05,  time: '12:48' },
    { id: 't5', pair: 'BTC/USDT',  side: 'SHORT', size: '0.18',  pnl: -54.90,  time: '11:19' },
  ];

  return (
    <>
      <Header
        title="Trading Desk"
        subtitle="Tarea 5 — React + Vite (CSR) · Práctica Semana 05 · Dashboard de operaciones spot"
      />
      <Dashboard
        heading="Métricas en vivo"
        description="Datos pasados como props desde <App>. El gráfico se proyecta al slot superior (headerSlot); cada tarjeta es un <MetricCard> con CSS Modules + sparkline SVG inline; la lista de operaciones se inyecta vía children."
        metrics={metrics}
        headerSlot={
          <PriceChart
            symbol="BTC/USD"
            series={btcSeries}
            labels={btcLabels}
            currentValue="$98 420"
            changePct={6.49}
            range="30d"
          />
        }
      >
        <RecentTrades trades={trades} />
      </Dashboard>
      <Footer />
    </>
  );
}

export default App;
