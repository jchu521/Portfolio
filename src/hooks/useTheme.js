import { useContext, useState, useEffect } from 'react';
import ThemeContext from '../context/ThemeContext';

export const useThemeMode = () => useContext(ThemeContext);

const LIGHT_VARIANTS = {
  '#4f8ef7': '#1d4ed8',
  '#43c59e': '#0f7c5b',
  '#f5a623': '#9a5b00',
  '#e84057': '#b8253a',
  '#9b59b6': '#6b3a82',
  '#2ecc71': '#15803d',
  '#5B9BD5': '#1e5f99',
  '#c08b00': '#8a6300',
  '#FFD400': '#8a6300',
};

export function useColor(c) {
  const theme = useThemeMode();
  if (theme !== 'light') return c;
  return LIGHT_VARIANTS[(c || '').toLowerCase()] || LIGHT_VARIANTS[c] || c;
}

export function useTheme() {
  const [theme, setTheme] = useState(() => {
    if (typeof window === 'undefined') return 'dark';
    const saved = localStorage.getItem('portfolio-theme');
    if (saved === 'dark' || saved === 'light') return saved;
    return window.matchMedia?.('(prefers-color-scheme: light)').matches ? 'light' : 'dark';
  });

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('portfolio-theme', theme);
  }, [theme]);

  return [theme, setTheme];
}
