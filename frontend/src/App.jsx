import './App.css'
import {Routes, Route } from 'react-router-dom'
import Context from './contexts/Context'
import useAuth from './hooks/useUser'

import Navbar from './components/Navbar'
import Home from './views/Home'
import Footer from './components/Footer'
import InicioSesion from './views/InicioSesion'
import Registrarse from './views/Registrarse'

import './App.css'

function App() {

  const globalState = useAuth()

  return (
    <>
      <Context.Provider value={globalState}>
      <div className='app-container'>
        <Navbar/>
          <main style={{backgroundColor: '#faf4d3'}}>
            <Routes>
              <Route path='/' element={<Home/>}/>
              <Route path='/login' element={<InicioSesion/>}/>
              <Route path='/registrarse' element={<Registrarse/>}/>
            </Routes>
          </main>
        <Footer/>
        </div>
      </Context.Provider>
    </>
  )
}

export default App
