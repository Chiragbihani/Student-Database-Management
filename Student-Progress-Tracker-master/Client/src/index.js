import React from 'react';
import './index.css'; // Assuming index.css is a CSS file you want to import
import App from './App'; // Assuming App.js exports default
import { createRoot } from 'react-dom/client';


const root = createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);


