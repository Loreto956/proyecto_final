import React, { createContext, useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { ENDPOINT } from '../config/constants';
import Cookies from 'js-cookie';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = Cookies.get('token');
    if (token) {
      fetchUserData(token);
    } else {
      setLoading(false);
    }
  }, []);

  const fetchUserData = async (token) => {
    try {
      const response = await axios.get(ENDPOINT.users, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setCurrentUser({...response.data, token});
    } catch (error) {
      console.error('Error fetching user data:', error);
      Cookies.remove('token')
      setCurrentUser(null);;
    } finally {
      setLoading(false);
    }
  };

  const registerUser = async (userData) => {
    try {
      
      await axios.post(ENDPOINT.users, userData);
      return { success: true, message: 'Usuario registrado con éxito.' };
    } catch (error) {
      console.error('Error al registrar usuario:', error);
      return { success: false, message: 'Error al registrar usuario.' };
    }
  };

  const loginUser = async (email, password) => {
    try {
      const response = await axios.post(ENDPOINT.login, { email, password });
      if (response.data.token) {
        Cookies.set('token', response.data.token, { expires: 7 }); // La cookie expira en 7 días
        await fetchUserData(response.data.token);
        return { success: true, message: 'Inicio de sesión exitoso.' };
      }
    } catch (error) {
      console.error('Error de login:', error);
      return { success: false, message: 'Email o contraseña incorrectos.' };
    }
  };

  const logoutUser = () => {
    Cookies.remove('token');
    setCurrentUser(null);
  };

  const updateUser = async (userData) => {
    try {
      const token = Cookies.get('token');
      const response = await axios.put(ENDPOINT.users, userData, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setCurrentUser(response.data);
      return { success: true, message: 'Perfil actualizado con éxito.' };
    } catch (error) {
      console.error('Error al actualizar usuario:', error);
      return { success: false, message: 'Error al actualizar el perfil.' };
    }
  };

  const value = {
    currentUser,
    registerUser,
    loginUser,
    logoutUser,
    updateUser,
    loading
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export default AuthContext;