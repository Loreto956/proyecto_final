// import { createContext } from 'react'

// const Context = createContext(null)

// export default Context

import React, { createContext, useState, useContext } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {

  const [users, setUsers] = useState([]); 
  const [currentUser, setCurrentUser] = useState(null);

  const registerUser = (user) => {
  
    if (users.some(u => u.email === user.email)) {
      return { success: false, message: 'El email ya está registrado.' };
    }

 
    setUsers([...users, user]);
    return { success: true, message: 'Usuario registrado con éxito.' };
  };

  const loginUser = (email, password) => {

    const user = users.find(u => u.email === email && u.password === password);
    if (user) {
      setCurrentUser(user);
      return { success: true, message: 'Inicio de sesión exitoso.' };
    }
    return { success: false, message: 'Email o contraseña incorrectos.' };
  };

  const logoutUser = () => setCurrentUser(null);

  return (
    <AuthContext.Provider value={{ registerUser, loginUser, currentUser, logoutUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);

