
import axios from 'axios'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { ENDPOINT } from '../config/constants'
import { useAuth } from '../contexts/AuthContext'
import '../styles/registrarse_iniciar_sesion.css'

const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i
const initialForm = {
    nombre: '',
    apellido: '',
    email: '',
    password: '',
    confirmedPassword: ''
}


const Registrarse = () => {
  const {registerUser} = useAuth()
  const navigate = useNavigate()
  const [user, setUser] = useState(initialForm)

  const handleChange = (event) => setUser({ ...user, [event.target.name]: event.target.value })

  const handleSubmit = (event) => {
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

    const { success, message } = registerUser(user);
    window.alert(message);

    if (success) {
      navigate('/login');
    }
  }

  //   axios.post(ENDPOINT.users, user)
  //     .then(() => {
  //       window.alert('Usuario registrado con éxito 😀.')
  //       navigate('/login')
  //     })
  //     .catch(({ response: { data } }) => {
  //       console.error(data)
  //       window.alert(`${data.message} 🙁.`)
  //     })
  // }

  // useEffect(() => {
  //   if (window.sessionStorage.getItem('token')) {
  //     navigate('/perfil')
  //   }
  // }, [navigate])

  return (
    <form onSubmit={handleSubmit}>
      <h3>Registrar nuevo usuario</h3>
      <div>
        <input
          value={user.nombre}
          onChange={handleChange}
          name='nombre'
          className='form-input'
          placeholder='Nombre'
        />
      </div>
      <div>
        <input
          value={user.apellido}
          onChange={handleChange}
          name='apellido'
          className='form-input'
          placeholder='Apellido'
        />
      </div>
      <div>
        <input
          value={user.email}
          onChange={handleChange}
          name='email'
          className='form-input'
          placeholder='Correo electrónico'
        />
      </div>
      <div>
        <input
          value={user.password}
          onChange={handleChange}
          className='form-input'
          name='password'
          type='password'
          placeholder='Contraseña'
        />
      </div>
      <div>
        <input
          value={user.confirmedPassword}
          onChange={handleChange}
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
