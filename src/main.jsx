import React from 'react'
import ReactDOM from 'react-dom/client'
import { HashRouter } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'
import App from './App'
import { CartProvider } from './context/CartContext'
import { ThemeProvider } from './context/ThemeContext'
import { DemoProvider } from './context/DemoContext'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ThemeProvider>
      <CartProvider>
        <DemoProvider>
          <HashRouter>
            <App />
            <Toaster
              position="top-right"
              toastOptions={{
                duration: 3500,
                style: {
                  background: '#1A1A2E',
                  color: '#F8F7F4',
                  borderRadius: '12px',
                  border: '1px solid rgba(201,168,76,0.3)',
                  fontSize: '14px',
                  fontFamily: 'Inter, sans-serif',
                },
                success: { iconTheme: { primary: '#C9A84C', secondary: '#fff' } },
              }}
            />
          </HashRouter>
        </DemoProvider>
      </CartProvider>
    </ThemeProvider>
  </React.StrictMode>
)
