import { useState, useCallback } from 'react';

export const useTerminal = () => {
  const [terminalContent, setTerminalContent] = useState<string[]>([]);
  const [colorClass, setColorClass] = useState('c1');

  const setColor = useCallback((c: string) => {
    setColorClass(c);
  }, []);

  const write = useCallback((s: string, speed: number, delay: number, callback?: () => void) => {
    let i = 0;
    const interval = setInterval(() => {
      setTerminalContent(prev => [...prev, s[i]]);
      i++;
      if (i === s.length) {
        clearInterval(interval);
        if (callback) setTimeout(callback, delay);
      }
    }, speed);
  }, []);

  const newLine = useCallback(() => {
    setTerminalContent(prev => [...prev, '\n']);
  }, []);

  return { terminalContent, colorClass, setColor, write, newLine };
};
