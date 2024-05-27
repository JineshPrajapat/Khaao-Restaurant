import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from "react-router-dom";
import './index.css';
import App from './App';
import { AuthProvider } from './AuthProvider/AuthProvider';
import { AdminAuthProvider } from './AuthProvider/AdminAuthProvider';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <AuthProvider>
    <AdminAuthProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter >
    </AdminAuthProvider>
  </AuthProvider>

);

