import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './main.css'
import LoginPage from './pages/LoginPage'
import RegisterPage from './pages/RegisterPage'
import CambiarContrasena from './pages/CambiarContrasena'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import UserMainPage from './pages/UserMainPage'
import UserMainPageFiltros from './pages/UserMainPageFiltros'
import AdminMainPage from './pages/AdminMainPage'
import Navegacion from './components/Navegacion'
import FiltrarGraficoEgreso from './pages/FiltrarGraficoEgreso'
import UserMainPageSeguridad from './pages/UserMainPageSeguridad'
import UserCambiarContra from './pages/UserCambiarContra'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<LoginPage />}/>
        <Route path='/register' element={<RegisterPage />}/>
        <Route path='/cambiarcontra' element={<CambiarContrasena />}/>
        <Route path='/usermain' element={ <UserMainPage />}/>
        <Route path='/usermainfiltros' element={ <UserMainPageFiltros />}/>
        <Route path='/adminmain' element={ <AdminMainPage />}/>
        <Route path='/grafico-egresos' element={ <FiltrarGraficoEgreso />}/>
        <Route path='/usermainseguridad' element={ <UserMainPageSeguridad />}/>
        <Route path='/usercambiarcontra' element={ <UserCambiarContra/>}/>
      </Routes>
    </BrowserRouter>
  </StrictMode>,
)
