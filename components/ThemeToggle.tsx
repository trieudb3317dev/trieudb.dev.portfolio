'use client';

import { Sun, Moon } from 'lucide-react';
import { useEffect, useState } from 'react';
import { ThemeToggleContent } from './ThemeToggleContent';

export function ThemeToggle() {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return (
      <div className="p-2 rounded-lg bg-emerald-100 dark:bg-emerald-900 w-9 h-9" />
    );
  }

  return <ThemeToggleContent />;
}
