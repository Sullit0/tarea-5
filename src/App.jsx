import Header from './components/Header.jsx';
import Dashboard from './components/Dashboard.jsx';
import RecentTrades from './components/RecentTrades.jsx';
import Footer from './components/Footer.jsx';

/**
 * Componente raíz <App>. Actúa como orquestador del árbol de render:
 * importa hijos y los compone, sin lógica de negocio ni estado local.
 *
 * Árbol JSX → React.createElement:
 *   <App>
 *     <Header />
 *     <Dashboard ...>
 *       <MetricCard /> ...     // pasados via prop `metrics`
 *       <RecentTrades />       // proyectado via `children`
 *     </Dashboard>
 *     <Footer />
 *   </App>
 *
 * @returns {import('react').ReactElement}
 */
function App() {
  // Datos estáticos de un "Trading Desk". Definidos en App únicamente para
  // inyectarlos al <Dashboard> mediante props (flujo unidireccional).
  // Mantenemos a App libre de lógica: solo declara y delega.
  const metrics = [
    {
      id: 'portfolio',
      label: 'Valor de Portafolio',
      value: '$128 540.22',
      delta: +4.2,
      tone: 'success',
      hint: 'Equity total · 7d',
    },
    {
      id: 'pnl',
      label: 'P&L · 24 h',
      value: '+$5 418.90',
      delta: +3.1,
      tone: 'success',
      hint: 'Realizado + flotante',
    },
    {
      id: 'btc',
      label: 'BTC / USD',
      value: '$98 420',
      delta: +2.8,
      tone: 'accent',
      hint: 'Spot · Binance',
    },
    {
      id: 'eth',
      label: 'ETH / USD',
      value: '$3 620.55',
      delta: -1.4,
      tone: 'danger',
      hint: 'Spot · Binance',
    },
    {
      id: 'winrate',
      label: 'Win Rate',
      value: '67.4 %',
      delta: +1.2,
      tone: 'success',
      hint: 'Últimas 50 ops',
    },
    {
      id: 'positions',
      label: 'Posiciones Abiertas',
      value: 14,
      delta: +18.0,
      tone: 'accent',
      hint: '+2 hoy',
    },
    {
      id: 'hold',
      label: 'Hold Promedio',
      value: '4 h 22 m',
      delta: -8.0,
      tone: 'warning',
      hint: 'Scalping intradía',
    },
    {
      id: 'drawdown',
      label: 'Max Drawdown',
      value: '-8.4 %',
      delta: -0.6,
      tone: 'danger',
      hint: 'Peor racha del mes',
    },
  ];

  // Lista de operaciones recientes — se proyecta al <Dashboard> vía children
  // (composición vs herencia: el padre decide qué se renderiza en el slot).
  const trades = [
    { id: 't1', pair: 'BTC/USDT', side: 'LONG',  size: '0.50',  pnl: +312.40, time: '14:08' },
    { id: 't2', pair: 'ETH/USDT', side: 'SHORT', size: '4.20',  pnl: -86.10,  time: '13:51' },
    { id: 't3', pair: 'SOL/USDT', side: 'LONG',  size: '38.00', pnl: +144.22, time: '13:32' },
    { id: 't4', pair: 'AVAX/USDT', side: 'LONG', size: '60.00', pnl: +42.05,  time: '12:48' },
    { id: 't5', pair: 'BTC/USDT', side: 'SHORT', size: '0.18',  pnl: -54.90,  time: '11:19' },
  ];

  return (
    <>
      <Header
        title="Trading Desk"
        subtitle="Tarea 5 — React + Vite (CSR) · Práctica Semana 05"
      />
      <Dashboard
        heading="Métricas en vivo"
        description="Datos pasados como props desde <App>. Cada tarjeta es un <MetricCard> con CSS Modules y contenido auxiliar vía children. La sección inferior se proyecta al Dashboard usando el slot `children`."
        metrics={metrics}
      >
        <RecentTrades trades={trades} />
      </Dashboard>
      <Footer />
    </>
  );
}

export default App;
