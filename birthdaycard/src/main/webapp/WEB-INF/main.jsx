import React from 'react'
import ReactDOM from 'react-dom/client'
import App from '@/App.jsx'
import '@/index.css'

// Detect system dark mode and toggle .dark class
const applyDarkMode = (dark) => document.documentElement.classList.toggle('dark', dark);
const mq = window.matchMedia('(prefers-color-scheme: dark)');
applyDarkMode(mq.matches);
mq.addEventListener('change', (e) => applyDarkMode(e.matches));

ReactDOM.createRoot(document.getElementById('root')).render(
  <App />
)