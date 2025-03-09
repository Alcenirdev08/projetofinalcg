import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './services/App'; // Certifique-se de que o componente App está no caminho correto

const rootElement = document.getElementById('root');
const root = ReactDOM.createRoot(rootElement);

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
