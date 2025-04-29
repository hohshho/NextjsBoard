'use client'

import { useRef, useEffect } from 'react'

export default function useDebounceCallback(callback: () => void, delay: number) {
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const debouncedFn = () => {
    if (timerRef.current) clearTimeout(timerRef.current);
    timerRef.current = setTimeout(callback, delay);
  };

  useEffect(() => {
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, []);

  return debouncedFn;
}