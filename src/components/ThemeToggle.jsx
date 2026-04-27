import { useState } from 'react';

export default function ThemeToggle({ theme, onToggle }) {
  const [hov, setHov] = useState(false);
  const isLight = theme === 'light';

  return (
    <button
      onClick={onToggle}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      aria-label={isLight ? 'Switch to dark theme' : 'Switch to light theme'}
      title={isLight ? 'Switch to dark' : 'Switch to light'}
      style={{
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        width: 32, height: 32, borderRadius: 7,
        border: `1px solid ${hov ? 'var(--accent)' : 'var(--border)'}`,
        background: hov ? 'var(--chip-bg)' : 'transparent',
        color: hov ? 'var(--accent)' : 'var(--fg2)',
        transition: 'all 0.2s', cursor: 'pointer', pointerEvents: 'all',
      }}
    >
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor"
        strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
        style={{ transition: 'transform 0.4s cubic-bezier(0.34,1.56,0.64,1)', transform: isLight ? 'rotate(180deg)' : 'rotate(0deg)' }}>
        {isLight ? (
          <g>
            <circle cx="12" cy="12" r="4" />
            <line x1="12" y1="2" x2="12" y2="4" />
            <line x1="12" y1="20" x2="12" y2="22" />
            <line x1="4.93" y1="4.93" x2="6.34" y2="6.34" />
            <line x1="17.66" y1="17.66" x2="19.07" y2="19.07" />
            <line x1="2" y1="12" x2="4" y2="12" />
            <line x1="20" y1="12" x2="22" y2="12" />
            <line x1="4.93" y1="19.07" x2="6.34" y2="17.66" />
            <line x1="17.66" y1="6.34" x2="19.07" y2="4.93" />
          </g>
        ) : (
          <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
        )}
      </svg>
    </button>
  );
}
