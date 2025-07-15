// main.jsx (TOP of the file BEFORE any other import)
import { Buffer } from 'buffer';
import process from 'process';

window.global = globalThis;
window.Buffer = Buffer;
window.process = process;


import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import { AuthProvider } from './contexts/AuthContext.jsx'
import { SocketProvider } from './contexts/SocketContext.jsx'


createRoot(document.getElementById('root')).render(

  <StrictMode>
    <AuthProvider>
      <SocketProvider>

        <BrowserRouter><App /></BrowserRouter>
      </SocketProvider>

    </AuthProvider>
  </StrictMode>,
)
