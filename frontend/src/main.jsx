import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import '@fontsource/raleway';
import '@fontsource/raleway/500.css';
import '@fontsource/raleway/700.css';
import { CssBaseline } from '@mui/material';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <CssBaseline />
    <App />
  </StrictMode>,
)
