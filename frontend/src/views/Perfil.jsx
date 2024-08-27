import React, { useContext, useEffect, useState } from "react";
import Context from "../contexts/Context";
import { useNavigate } from "react-router-dom";
import "../styles/perfil.css";

const Perfil = () => {
  const { getUser } = useContext(Context);
  const navigate = useNavigate();
  const [userData, setUserData] = useState({});

  useEffect(() => {
    if (!getUser) {
      navigate("/login");
    } else {
      // Aquí se puede hacer la solicitud para obtener los datos del usuario
      setUserData({
        nombre: "Juan",
        apellido: "Pérez",
        email: "j.perez@example.com",
      });
    }
  }, [getUser, navigate]);

  return (
    <div className="perfil-container">
      <h2>Mi Perfil</h2>
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
