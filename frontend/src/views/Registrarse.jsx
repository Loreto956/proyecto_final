import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'
import '../styles/registrarse_iniciar_sesion.css'
import users from "../data/usuarios.json"

const getExistingUserIds = (users) => users.map(user => user.id);

const generateUniqueId = (existingIds) => {
  let id;
  do {
    id = Math.floor(Math.random() * 100) + 1;
  } while (existingIds.includes(id));
  return id;
};

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
  const [existingUserIds, setExistingUserIds] = useState([]);

  useEffect(() => {
    const ids = getExistingUserIds(users);
    setExistingUserIds(ids);
  }, []);

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

    const newUserId = generateUniqueId(existingUserIds);

    const userWithId = { ...user, id: newUserId }

    const { success, message } = registerUser(userWithId);
    window.alert(message);

    if (success) {
      navigate('/login');
    }
  }

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
