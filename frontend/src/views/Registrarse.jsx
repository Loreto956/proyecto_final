
import axios from 'axios'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { ENDPOINT } from '../config/constants'
import '../styles/registrarse.css'

const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i
const initialForm = {
    nombre: '',
    apellido: '',
    email: '',
    password: '',
    confirmedPassword: ''
}


const Registrarse = () => {
  const navigate = useNavigate()
  const [user, setUser] = useState(initialForm)

  const handleUser = (event) => setUser({ ...user, [event.target.name]: event.target.value })

  const handleForm = (event) => {
    event.preventDefault()

    if (
        !user.nombre.trim() ||
        !user.apellido.trim() ||
        !user.email.trim() ||
        !user.password.trim()
    ) {
      return window.alert('Todos los campos son obligatorias.')
    }

    if(user.password !== user.confirmedPassword){
        return window.alert('Las contraseñas no coinciden')
    }

    if (!emailRegex.test(user.email)) {
      return window.alert('El formato del email no es correcto!')
    }

    axios.post(ENDPOINT.users, user)
      .then(() => {
        window.alert('Usuario registrado con éxito 😀.')
        navigate('/login')
      })
      .catch(({ response: { data } }) => {
        console.error(data)
        window.alert(`${data.message} 🙁.`)
      })
  }

  useEffect(() => {
    if (window.sessionStorage.getItem('token')) {
      navigate('/perfil')
    }
  }, [navigate])

  return (
    <form onSubmit={handleForm}>
      <h3>Registrar nuevo usuario</h3>
      <div>
        <input
          value={user.nombre}
          onChange={handleUser}
          name='nombre'
          className='form-input'
          placeholder='Nombre'
        />
      </div>
      <div>
        <input
          value={user.apellido}
          onChange={handleUser}
          name='apellido'
          className='form-input'
          placeholder='Apellido'
        />
      </div>
      <div>
        <input
          value={user.email}
          onChange={handleUser}
          name='email'
          className='form-input'
          placeholder='Correo electrónico'
        />
      </div>
      <div>
        <input
          value={user.password}
          onChange={handleUser}
          className='form-input'
          name='password'
          type='password'
          placeholder='Contraseña'
        />
      </div>
      <div>
        <input
          value={user.confirmedPassword}
          onChange={handleUser}
          className='form-input'
          name='confirmedPassword'
          type='password'
          placeholder='Confirmar contraseña'
        />
      </div>
      
      <button className='form-button' type='submit'>Registrarme</button>
    </form>
  )
}

export default Registrarse
