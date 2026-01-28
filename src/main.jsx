import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './main.css'
import LoginPage from './pages/LoginPage'
import CambiarContrasena from './pages/CambiarContrasena'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import UserMainPage from './pages/UserMainPage'
import AdminMainPage from './pages/AdminMainPage'
import FiltrarGraficoEgreso from './pages/FiltrarGraficoEgreso'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path='/' element={ <LoginPage />}/>
        <Route path='/cambiarcontra' element={ <CambiarContrasena />}/>
        <Route path='/usermain' element={ <UserMainPage />}/>
        <Route path='/adminmain' element={ <AdminMainPage />}/>
        <Route path='/grafico-egresos' element={ <FiltrarGraficoEgreso />}/>
      </Routes>
    </BrowserRouter>
  </StrictMode>,
)
