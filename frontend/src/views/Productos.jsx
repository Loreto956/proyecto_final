import { CartContext } from "../contexts/CartContext";
import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { ENDPOINT } from "../config/constants"; // URL de la Api
import productosData from "../data/productos.json"; // Importar JSON local
import { useNavigate } from "react-router-dom"; // Para la navegación a detalles
import { ProductsContext } from "../contexts/FavsContext"

const Productos = () => {
  const { addToCart } = useContext(CartContext);
  const navigate = useNavigate();
  const { products, loading, hasError, showError, likedProducts, handleLike } = useContext(ProductsContext);

  const formatPrice = (price) => {
    return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  };

//   Verifica si los productos están cargando
  if (loading) {
    return <div>Cargando productos...</div>;
  }

  // Renderizar los productos
  return (
    <div className="container mt-4">
      {hasError && showError && <div className="alert alert-danger">Error al cargar productos desde el servidor, mostrando datos locales</div>}
      <div className="row">
        {products.map((producto) => (
          <div key={producto.id} className="col-md-4 mb-4">
            <div className="card" style={{ width: '18rem' }}>
              <img src={producto.imagen} className="card-img-top" alt={producto.nombre} />
              <div className="card-body">
                <h5 className="card-title">{producto.nombre}</h5>
                <p>${formatPrice(producto.precio)}</p>
                <button 
                  className="btn btn-warning me-3" 
                  onClick={() => navigate(`/producto/${producto.id}`)}> 
                  Ver Detalle
                </button>
                <button 
                  className={`btn ${likedProducts.includes(producto.id) ? "btn-danger" : "btn-outline-danger"}`}
                  onClick={() => handleLike(producto.id)}
                >
                  {likedProducts.includes(producto.id) ? "❤️" : "🤍"}
                </button>
                <button 
                  className="btn btn-success mt-3"
                  onClick={() => addToCart(producto)}
                >
                  Agregar al carrito
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="d-flex justify-content-end">
        <button 
            className="btn btn-warning"
            onClick={() => navigate('/mis-productos')}
            >Agregar producto +
            
            </button>
      </div>
    </div>
  );
};

export default Productos;
