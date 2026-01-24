import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './main.css'
import LoginPage from './pages/LoginPage'
import CambiarContrasena from './pages/CambiarContrasena'
import { BrowserRouter, Route, Routes } from 'react-router-dom'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<LoginPage />}/>
        <Route path='/cambiarcontra' element={<CambiarContrasena />}/>
      </Routes>
    </BrowserRouter>
  </StrictMode>,
)
