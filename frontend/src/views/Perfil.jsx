import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Context from "../contexts/Context";
import "../styles/perfil.css";
import usuariosData from "../data/usuarios.json"; // Importamos el JSON local de usuarios
import perfilImg from "../assets/perfil.png"; 

const Perfil = () => {
  const { getUser } = useContext(Context);
  const navigate = useNavigate();
  const [userData, setUserData] = useState({
    nombre: "",
    apellido: "",
    direccion: "",
    telefono: "",
    email: "",
    fecha_registro: "",
  });

  // Efecto para cargar los datos del usuario desde el JSON o contexto
  useEffect(() => {
    const usuarioLocal = usuariosData.find(user => user.email === "juan.perez@example.com");
    if (usuarioLocal) {
      setUserData(usuarioLocal);
    } else if (!getUser) {
      navigate("/login");
    } else {
      setUserData(getUser);
    }
  }, [getUser, navigate]);

  // Manejar la edición de los campos de usuario
  const handleInputChange = (e) => {
    setUserData({
      ...userData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="container mt-5">
        
      <div className="row">
        <div className="col-md-4">
          <img src={perfilImg} alt="Perfil" className="img-fluid rounded-circle mb-4" />
        </div>
        <div className="col-md-8">
          <h2>Hola {userData.nombre}! Bienvenido a Peluditos Shop</h2>
          <form>
            <div className="form-group">
              <label>Nombre</label>
              <input
                type="text"
                className="form-control"
                name="nombre"
                value={userData.nombre}
                onChange={handleInputChange}
              />
            </div>
            <div className="form-group">
              <label>Apellido</label>
              <input
                type="text"
                className="form-control"
                name="apellido"
                value={userData.apellido}
                onChange={handleInputChange}
              />
            </div>
            <div className="form-group">
              <label>Dirección</label>
              <input
                type="text"
                className="form-control"
                name="direccion"
                value={userData.direccion}
                onChange={handleInputChange}
              />
            </div>
            <div className="form-group">
              <label>Teléfono</label>
              <input
                type="text"
                className="form-control"
                name="telefono"
                value={userData.telefono}
                onChange={handleInputChange}
              />
            </div>
            <div className="form-group">
              <label>Email</label>
              <input
                type="email"
                className="form-control"
                name="email"
                value={userData.email}
                onChange={handleInputChange}
                disabled // Email no editable
              />
            </div>
            <div className="form-group">
              <label>Fecha de Registro</label>
              <input
                type="text"
                className="form-control"
                name="fecha_registro"
                value={userData.fecha_registro}
                readOnly
              />
            </div>
          </form>
          <div className="mt-4">
            <button className="btn btn-warning me-3" onClick={() => navigate("/mis-productos")}>
              Mis productos
            </button>
            <button className="btn btn-warning me-3" onClick={() => navigate("/mis-favoritos")}>
              Mis favoritos
            </button>
            <button className="btn btn-warning" onClick={() => navigate("/productos")}>
              Ver tienda
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Perfil;
