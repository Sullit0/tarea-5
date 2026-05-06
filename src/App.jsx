import Header from './components/Header.jsx';
import Dashboard from './components/Dashboard.jsx';
import Footer from './components/Footer.jsx';

/**
 * Componente raíz <App>. Actúa como orquestador del árbol de render:
 * importa hijos y los compone, sin lógica de negocio ni estado local.
 *
 * Árbol JSX → React.createElement:
 *   <App>
 *     <Header />
 *     <Dashboard ...>
 *       <MetricCard /> ...
 *     </Dashboard>
 *     <Footer />
 *   </App>
 *
 * @returns {import('react').ReactElement}
 */
function App() {
  // Datos estáticos definidos en App únicamente para inyectarlos al
  // <Dashboard> mediante props. Mantenemos a App libre de lógica:
  // solo declara y delega.
  const metrics = [
    {
      id: 'usuarios',
      label: 'Usuarios activos',
      value: 1284,
      delta: +8.2,
      tone: 'success',
      hint: 'Últimas 24 h',
    },
    {
      id: 'ingresos',
      label: 'Ingresos del día',
      value: 'S/ 9 540',
      delta: +3.4,
      tone: 'accent',
      hint: 'Comparado con ayer',
    },
    {
      id: 'errores',
      label: 'Errores 5xx',
      value: 12,
      delta: -42.1,
      tone: 'danger',
      hint: 'Últimos 60 min',
    },
    {
      id: 'latencia',
      label: 'Latencia p95',
      value: '184 ms',
      delta: +1.1,
      tone: 'warning',
      hint: 'API gateway',
    },
  ];

  return (
    <>
      <Header
        title="Panel de Operaciones"
        subtitle="Práctica Semana 05 — React + Vite (CSR)"
      />
      <Dashboard
        heading="Resumen en tiempo real"
        description="Datos pasados como props desde <App>. Cada tarjeta es un <MetricCard> con CSS Modules y contenido vía children."
        metrics={metrics}
      />
      <Footer />
    </>
  );
}

export default App;
