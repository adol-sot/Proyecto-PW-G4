import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './main.css'
import LoginPage from './pages/LoginPage'
import RegisterPage from './pages/RegisterPage'
import CambiarContrasena from './pages/CambiarContrasena'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import UserMainPage from './pages/UserMainPage'
import AdminMainPage from './pages/AdminMainPage'
import { AuthProvider } from './context/AuthContext'
import Layout from './components/Layout'
import ProtectedRoute from './components/ProtectedRoute'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthProvider>
      <BrowserRouter>
        <Layout>
          <Routes>
            <Route path='/' element={<LoginPage />}/>
            <Route path='/register' element={<RegisterPage />}/>
            <Route path='/cambiarcontra' element={<CambiarContrasena />}/>
            <Route 
              path='/usermain' 
              element={
                <ProtectedRoute>
                  <UserMainPage />
                </ProtectedRoute>
              }
            />
            <Route 
              path='/adminmain' 
              element={
                <ProtectedRoute requireAdmin={true}>
                  <AdminMainPage />
                </ProtectedRoute>
              }
            />
          </Routes>
        </Layout>
      </BrowserRouter>
    </AuthProvider>
  </StrictMode>,
)
