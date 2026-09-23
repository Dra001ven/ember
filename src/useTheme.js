import { useEffect, useState } from 'react';

export function useTheme() {
  const [theme, setTheme] = useState(() => {
    try {
      return localStorage.getItem('theme') || 'auto';
    } catch {
      return 'auto';
    }
  });

  useEffect(() => {
    if (theme === 'auto') {
      document.documentElement.removeAttribute('data-theme');
    } else {
      document.documentElement.setAttribute('data-theme', theme);
    }
    try {
      localStorage.setItem('theme', theme);
    } catch {
      // ignore storage errors (e.g. private browsing)
    }
  }, [theme]);

  const toggleTheme = () => {
    setTheme((current) => {
      if (current === 'dark') return 'light';
      if (current === 'light') return 'auto';
      return 'dark';
    });
  };

  return { theme, toggleTheme };
}
