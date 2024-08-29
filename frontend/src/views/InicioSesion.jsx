import React from "react";
import { useState} from 'react'
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import '../styles/registrarse_iniciar_sesion.css'

const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i

const initialForm = { email: '', password: '' }

const InicioSesion = () =>{

    const {loginUser} = useAuth()
    const navigate = useNavigate()
    const [credentials, setCredentials] = useState(initialForm)

    const handleChange = (event) => setCredentials({ ...credentials, [event.target.name]: event.target.value })

    const handleSubmit = (event) => {
        event.preventDefault()
    
        if (!credentials.email.trim() || !credentials.password.trim()) {
          return window.alert('Email y password obligatorias.')
        }
    
        if (!emailRegex.test(credentials.email)) {
          return window.alert('El formato del email no es correcto!')
        }

        const { success, message } = loginUser(credentials.email, credentials.password);
        window.alert(message);

        if (success) {
          navigate('/perfil');
        }
      }
    


      return (
        <form onSubmit={handleSubmit}>
          <h3>Iniciar Sesión</h3>
          <div>
            <input
              value={credentials.email}
              onChange={handleChange}
              type='email'
              name='email'
              className='form-input'
              placeholder='Enter email'
            />
          </div>
          <div>
            <input
              value={credentials.password}
              onChange={handleChange}
              type='password'
              name='password'
              className='form-input'
              placeholder='Password'
            />
          </div>
          <button type='submit' className='form-button'>Iniciar Sesión</button>
        </form>
      )    
}

export default InicioSesion