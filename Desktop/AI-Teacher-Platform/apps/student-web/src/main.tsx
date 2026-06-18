import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import App from './App';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
      <Toaster
        position="top-right"
        toastOptions={{
          style: {
            background: '#161625',
            color: '#F1F5F9',
            border: '1px solid #1E2334',
          },
          success: {
            iconTheme: { primary: '#10B981', secondary: '#F1F5F9' },
          },
          error: {
            iconTheme: { primary: '#F43F5E', secondary: '#F1F5F9' },
          },
        }}
      />
    </BrowserRouter>
  </React.StrictMode>
);
