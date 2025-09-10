import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App.tsx';
import './index.css';

// Determine if we're in admin mode based on environment variables
const isAdmin = import.meta.env.MODE === 'admin';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <App isAdmin={isAdmin} />
    </BrowserRouter>
  </StrictMode>
);