/**
 * <Header> — Cabecera del dashboard.
 *
 * Estrategia de estilado: **inline styles** (objeto JS), a propósito,
 * para CONTRASTAR con los CSS Modules usados en el resto del árbol.
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
    position: 'relative',
    padding: '36px 32px 28px',
    borderBottom: '1px solid var(--color-border)',
    background:
      'linear-gradient(180deg, rgba(56,189,248,0.10), rgba(15,23,42,0))',
    overflow: 'hidden',
  };

  const eyebrowStyle = {
    display: 'inline-flex',
    alignItems: 'center',
    gap: '8px',
    fontSize: '11px',
    fontWeight: 700,
    letterSpacing: '0.14em',
    color: 'var(--color-accent)',
    textTransform: 'uppercase',
    padding: '4px 10px 4px 8px',
    borderRadius: '999px',
    background: 'rgba(56, 189, 248, 0.10)',
    border: '1px solid rgba(56, 189, 248, 0.35)',
    marginBottom: '14px',
  };

  const dotStyle = {
    width: '6px',
    height: '6px',
    borderRadius: '50%',
    background: 'var(--color-accent)',
    boxShadow: '0 0 8px var(--color-accent)',
  };

  const titleStyle = {
    fontSize: '36px',
    color: 'var(--color-text)',
    marginBottom: '4px',
    letterSpacing: '-0.025em',
    fontWeight: 700,
    background:
      'linear-gradient(180deg, #f1f5f9 30%, rgba(241,245,249,0.55) 100%)',
    WebkitBackgroundClip: 'text',
    backgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
  };

  const subtitleStyle = {
    fontSize: '14px',
    color: 'var(--color-muted)',
    letterSpacing: '0.01em',
    maxWidth: '60ch',
  };

  return (
    <header style={headerStyle}>
      <span style={eyebrowStyle}>
        <span style={dotStyle} /> EN VIVO · TIEMPO REAL
      </span>
      <h1 style={titleStyle}>{title}</h1>
      <p style={subtitleStyle}>{subtitle}</p>
    </header>
  );
}

export default Header;
