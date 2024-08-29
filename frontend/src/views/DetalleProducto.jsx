import React, { useState, useEffect } from "react";
import productosData from "../data/productos.json"; 
import usuariosData from "../data/usuarios.json"; 
import comentariosData from "../data/comentarios.json"; 
import { useParams } from "react-router-dom"; 
import productoImg from "../assets/imagenNoDisponible.png";

const DetalleProducto = () => {
  const { id } = useParams(); 
  const [producto, setProducto] = useState(null);
  const [vendedor, setVendedor] = useState(null);
  const [comentarios, setComentarios] = useState([]);
  const [favorito, setFavorito] = useState(false);
  const [nuevoComentario, setNuevoComentario] = useState(""); 
  const [rating, setRating] = useState(0); 
  const [cantidad, setCantidad] = useState(1);
  const [error, setError] = useState(""); 

  useEffect(() => {
    const productoEncontrado = productosData.find((prod) => prod.id === parseInt(id));
    setProducto(productoEncontrado);

    if (productoEncontrado) {
      const usuarioEncontrado = usuariosData.find((user) => user.id === productoEncontrado.user_id);
      setVendedor(usuarioEncontrado);

      const comentariosProducto = comentariosData.find(
        (comentario) => comentario.producto_id === productoEncontrado.id
      );
      if (comentariosProducto) {
        setComentarios(comentariosProducto.comentarios);
      }
    }
  }, [id]);

  const handleFavorito = () => {
    setFavorito(!favorito);
  };

  const handleIncrementarCantidad = () => {
    if (cantidad < producto.stock) {
      setCantidad(cantidad + 1);
      setError(""); 
    } else {
      setError("No se puede agregar más del stock disponible.");
    }
  };

  const handleReducirCantidad = () => {
    if (cantidad > 1) {
      setCantidad(cantidad - 1);
      setError(""); 
    }
  };

  const handleAgregarComentario = () => {
    const comentario = {
      usuario: "Usuario Actual", 
      rating,
      comentario: nuevoComentario,
    };
    setComentarios([...comentarios, comentario]); 
    setNuevoComentario(""); 
    setRating(0); 
  };

  if (!producto || !vendedor) {
    return <div>Cargando producto...</div>;
  }

  return (
    <div className="container mt-5">
      <div className="row">
        <div className="col-md-6 d-flex flex-column align-items-center">
          <img
            src={productoImg}
            alt={producto.nombre}
            className="img-fluid mb-4"
            style={{ maxHeight: "400px" }}
          />
          <button
            className={`btn ${favorito ? "btn-danger" : "btn-outline-danger"} mt-3`}
            onClick={handleFavorito}
          >
            {favorito ? "❤️ Agregado a Favoritos" : "🤍 Agregar a Favoritos"}
          </button>
        </div>

        {/* Sección de detalles del producto */}
        <div className="col-md-6">
          <small className="text-muted">Vendedor: {vendedor?.nombre} {vendedor?.apellido}</small>
          <h2>{producto.nombre}</h2>
          <h4>${new Intl.NumberFormat('es-ES').format(producto.precio)}</h4>
          <p>{producto.descripcion}</p>
          
          {/* Sección para agregar al carrito */}
          <div className="d-flex align-items-center">
            <button
              className="btn btn-outline-secondary"
              onClick={handleReducirCantidad}
            >
              -
            </button>
            
            <input
              type="number"
              value={cantidad}
              className="form-control mx-2"
              style={{ width: "60px", textAlign: "center" }}
              readOnly
            />
            <button
              className="btn btn-outline-secondary"
              onClick={handleIncrementarCantidad}
            >
              +
            </button>
            <button className="btn btn-warning m-3">Agregar al Carrito</button>
          </div>
          <p>Stock disponible: {producto.stock}</p>
          {error && <div className="alert alert-danger mt-3">{error}</div>}
        </div>

        {/* Sección de comentarios */}
        <div className="mt-1">
          <h5>Comentario</h5> 
          <div className="d-flex align-items-center my-2">
            {[...Array(5)].map((_, index) => (
              <span
                key={index}
                onClick={() => setRating(index + 1)}
                style={{
                  cursor: "pointer",
                  color: index < rating ? "gold" : "gray",
                }}
              >
                ★
              </span>
            ))}
          </div>
          <textarea
            className="form-control"
            value={nuevoComentario}
            onChange={(e) => setNuevoComentario(e.target.value)}
            placeholder="Escribe tu comentario"
          />
          
          <button className="btn btn-warning mt-3" onClick={handleAgregarComentario}>
            Enviar
          </button>
        </div>

        {/* Mostrar comentarios */}
        <div className="mt-4">
          <h5>Comentarios</h5>
          {comentarios.length > 0 ? (
            comentarios.map((comentario, index) => (
              <div key={index} className="mb-3">
                <strong>{usuariosData.find(user => user.id === comentario.usuario_comentario_id)?.nombre || "Usuario Desconocido"}</strong> -{" "}
                <span style={{ color: "gold" }}>
                  {"★".repeat(comentario.rating)}
                </span>
                <p>{comentario.comentario}</p>
              </div>
            ))
          ) : (
            <p>No hay comentarios aún.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default DetalleProducto;