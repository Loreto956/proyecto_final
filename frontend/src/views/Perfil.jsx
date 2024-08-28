import React, { useContext, useEffect, useState } from "react";
// import Context from "../contexts/AuthContext";
import { useAuth } from "../contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import "../styles/perfil.css";

const Perfil = () => {
  // const { getUser } = useContext(Context);
  const { currentUser } = useAuth()
  const navigate = useNavigate();
  const [userData, setUserData] = useState({});

  useEffect(() => {
    if (!currentUser) {
      navigate("/login");
    } else {
      // Aquí se puede hacer la solicitud para obtener los datos del usuario
      setUserData({
        nombre: currentUser.nombre,
        apellido: currentUser.apellido,
        email: currentUser.email,
      });
    }
  }, [currentUser, navigate]);

  return (
    <div className="perfil-container">
      <h2>Hola {userData.nombre}! Bienvenido a Peluditos shop</h2>
      <div className="perfil-info">
        <p><strong>Nombre:</strong> {userData.nombre}</p>
        <p><strong>Apellido:</strong> {userData.apellido}</p>
        <p><strong>Email:</strong> {userData.email}</p>
        <button className="primary-button" onClick={() => navigate("/productos")}>
          Ver mis productos
        </button>
        <button className="primary-button" onClick={() => navigate("/favoritos")}>
          Ver mis favoritos
        </button>
      </div>
    </div>
  );
};

export default Perfil;
