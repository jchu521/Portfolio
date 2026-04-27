import { useState } from 'react';

export default function NavIcon({ href, label, children }) {
  const [hov, setHov] = useState(false);

  return (
    <a href={href} target="_blank" rel="noreferrer" title={label}
      onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)}
      style={{
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        width: 32, height: 32, borderRadius: 7,
        border: `1px solid ${hov ? 'rgba(79,142,247,0.5)' : 'var(--border)'}`,
        background: hov ? 'rgba(79,142,247,0.1)' : 'transparent',
        color: hov ? 'var(--accent)' : 'var(--fg2)',
        transition: 'all 0.2s', cursor: 'pointer', textDecoration: 'none', fontSize: 15,
      }}>
      {children}
    </a>
  );
}
