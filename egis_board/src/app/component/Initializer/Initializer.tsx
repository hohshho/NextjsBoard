'use client';

import { useEffect } from 'react';

export default function Initializer() {
  useEffect(() => {
    // JavaScript 기반 UI 동작 라이브러리
    import('bootstrap/dist/js/bootstrap.bundle.min.js');
  }, []);

  return null;
}