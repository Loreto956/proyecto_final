import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "../styles/productos.css";

const Productos = () => {
  const [productos, setProductos] = useState([]);

  useEffect(() => {
    // Aquí se puede hacer solicitud para obtener los productos del usuario
    setProductos([
      { id: 1, nombre: "Juguete para perro", precio: 10000, imagen: "../assets/imagenNoDisponible.png" },
      { id: 2, nombre: "Comida para gato", precio: 5000, imagen: "../assets/imagenNoDisponible.png" },
    ]);
  }, []);

  return (
    <div className="productos-container">
      <h2>Productos</h2>
      <div className="productos-grid">
        {productos.map((producto) => (
          <div key={producto.id} className="producto-card">
            <img src={producto.imagen} alt={producto.nombre} />
            <h3>{producto.nombre}</h3>
            <p>${producto.precio.toLocaleString()}</p>
            <Link to={`/producto/${producto.id}`} className="primary-button">
              Ver detalles
            </Link>
          </div>
        ))}
      </div>
      <button className="primary-button">Agregar nuevo producto</button>
    </div>
  );
};

export default Productos;
