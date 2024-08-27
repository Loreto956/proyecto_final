import React from "react";
import axios from 'axios'
import { useState, useContext } from 'react'
import { useNavigate } from "react-router-dom";
import { ENDPOINT } from "../config/constants";
import Context from "../contexts/Context";
import '../styles/registrarse_iniciar_sesion.css'

const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i

const initialForm = { email: '', password: '' }

const handleUser = (event) => setUser({ ...user, [event.target.name]: event.target.value })



const InicioSesion = () =>{

    const navigate = useNavigate()
    const [user, setUser] = useState(initialForm)
    const { updateUser } = useContext(Context)

    const handleUser = (event) => setUser({ ...user, [event.target.name]: event.target.value })

    const handleForm = (event) => {
        event.preventDefault()
    
        if (!user.email.trim() || !user.password.trim()) {
          return window.alert('Email y password obligatorias.')
        }
    
        if (!emailRegex.test(user.email)) {
          return window.alert('El formato del email no es correcto!')
        }
    
        axios.post(ENDPOINT.login, user)
          .then(({ data }) => {
            window.sessionStorage.setItem('token', data.token)
            window.alert('Usuario identificado con éxito 😀.')
            updateUser({})
            navigate('/perfil')
          })
          .catch(({ response: { data } }) => {
            console.error(data)
            window.alert(`${data.message} 🙁.`)
          })
      }
    


      return (
        <form onSubmit={handleForm}>
          <h1>Iniciar Sesión</h1>
          <div>
            <input
              value={user.email}
              onChange={handleUser}
              type='email'
              name='email'
              className='form-input'
              placeholder='Enter email'
            />
          </div>
          <div>
            <input
              value={user.password}
              onChange={handleUser}
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