/**
 * <Header> — Cabecera del dashboard.
 *
 * Estrategia de estilado: **inline styles** (objeto JS), a propósito,
 * para CONTRASTAR con los CSS Modules usados en <MetricCard>.
 *
 * Diferencias clave:
 *  - Inline: máxima especificidad, no soporta pseudo-clases ni media queries
 *    (sin librería extra), pero scope 100% local (no hay clase global).
 *  - CSS Modules: clases hasheadas, scope local por archivo, soporta toda
 *    la potencia CSS (cascada, media queries, pseudo-clases) — recomendado
 *    para componentes con estilos no triviales.
 *
 * @param {Object} props
 * @param {string} props.title
 * @param {string} props.subtitle
 * @returns {import('react').ReactElement}
 */
function Header({ title, subtitle }) {
  // Objetos de estilo en JS — `className` (no `class`) y `camelCase` (no kebab).
  const headerStyle = {
    padding: '32px 28px 24px',
    borderBottom: '1px solid var(--color-border)',
    background:
      'linear-gradient(180deg, rgba(56,189,248,0.10), rgba(15,23,42,0))',
  };

  const titleStyle = {
    fontSize: '28px',
    color: 'var(--color-text)',
    marginBottom: '4px',
  };

  const subtitleStyle = {
    fontSize: '14px',
    color: 'var(--color-muted)',
    letterSpacing: '0.01em',
  };

  return (
    <header style={headerStyle}>
      <h1 style={titleStyle}>{title}</h1>
      <p style={subtitleStyle}>{subtitle}</p>
    </header>
  );
}

export default Header;
