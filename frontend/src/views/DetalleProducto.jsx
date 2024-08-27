import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import "../styles/detalleProducto.css";

const DetalleProducto = () => {
  const { id } = useParams();
  const [producto, setProducto] = useState(null);

  useEffect(() => {
    // Aquí podrías hacer una solicitud para obtener los detalles del producto por ID
    setProducto({
      id: 1,
      nombre: "Juguete para perro",
      precio: 10000,
      descripcion: "Un juguete divertido para tu perro.",
      imagen: "../assets/imagenNoDisponible.png",
      stock: 5,
      comentarios: [
        { usuario: "Juana Salas", rating: 4, comentario: "¡Mi perro lo ama!" },
        { usuario: "Juan Pérez", rating: 5, comentario: "Excelente calidad." },
      ],
    });
  }, [id]);

  return (
    producto && (
      <div className="detalle-producto-container">
        <img src={producto.imagen} alt={producto.nombre} />
        <div className="detalle-producto-info">
          <h2>{producto.nombre}</h2>
          <p>{producto.descripcion}</p>
          <p><strong>Precio:</strong> ${producto.precio.toLocaleString()}</p>
          <p><strong>Stock disponible:</strong> {producto.stock}</p>
          <div className="cantidad-container">
            <label htmlFor="cantidad">Cantidad:</label>
            <input type="number" id="cantidad" min="1" max={producto.stock} defaultValue="1" />
          </div>
          <button className="primary-button">Agregar al carrito</button>
          <div className="favoritos-container">
            <button className="heart-button">&#10084;</button>
          </div>
          <div className="comentarios-section">
            <h3>Comentarios</h3>
            {producto.comentarios.map((comentario, index) => (
              <div key={index} className="comentario">
                <p><strong>{comentario.usuario}</strong> - {comentario.rating} estrellas</p>
                <p>{comentario.comentario}</p>
              </div>
            ))}
            <form className="form-comentario">
              <h4>Agregar un comentario</h4>
              <input type="number" min="1" max="5" placeholder="Calificación (1-5)" />
              <textarea placeholder="Escribe tu comentario"></textarea>
              <button type="submit" className="primary-button">Enviar</button>
            </form>
          </div>
        </div>
      </div>
    )
  );
};

export default DetalleProducto;
