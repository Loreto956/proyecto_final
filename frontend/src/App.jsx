import './App.css'
import {Routes, Route } from 'react-router-dom'
// import Context from './contexts/AuthContext'
// import useAuth from './hooks/useAuth'
import { AuthProvider } from './contexts/AuthContext'
import Navbar from './components/Navbar'
import Home from './views/Home'
import Footer from './components/Footer'
import InicioSesion from './views/InicioSesion'
import Registrarse from './views/Registrarse'
import Perfil from './views/Perfil'
import Productos from './views/Productos'
import DetalleProducto from './views/DetalleProducto'


function App() {

  // const globalState = useAuth()

  return (
    <>
      <AuthProvider>
      <div className='app-container'>
        <Navbar/>
          <main style={{backgroundColor: '#faf4d3'}}>
            <Routes>
              <Route path='/' element={<Home/>}/>
              <Route path='/login' element={<InicioSesion/>}/>
              <Route path='/registrarse' element={<Registrarse/>}/>
              <Route path='/perfil' element={<Perfil/>}/>
              <Route path='/productos' element={<Productos/>}/>
              <Route path='/producto/id' element={<DetalleProducto/>}/> 
            </Routes>
          </main>
        <Footer/>
        </div>
      </AuthProvider>
    </>
  )
}

export default App
