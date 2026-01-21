import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.tsx';
import './i18n';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { initGA } from './utils/analytics';
import { initAutoTracking } from './utils/autoTracking';
import { initScrollDepthTracking, initTimeOnPageTracking } from './utils/enhancedAnalytics';

// Initialize Google Analytics
initGA();

// Initialize automatic event tracking
initAutoTracking();

// Initialize enhanced engagement tracking (scroll depth, time on page)
initScrollDepthTracking();
initTimeOnPageTracking();

// Initialize AOS
AOS.init({
  duration: 1000,
  once: true,
  easing: 'ease-out-cubic',
  offset: 100,
});

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
