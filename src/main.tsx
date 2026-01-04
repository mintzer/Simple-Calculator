import React from 'react';
import { createRoot } from 'react-dom/client';
import { Calculator } from './ui/components/Calculator';

const rootElement = document.getElementById('root');
if (rootElement) {
  const root = createRoot(rootElement);
  root.render(
    <React.StrictMode>
      <Calculator />
    </React.StrictMode>
  );
}
