import React, { useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import { ProductsContext } from "../contexts/FavsContext";
import IconStar from "../components/IconStar";
import "../styles/productos.css";

const Productos = () => {

  const { products, handleLike, likedProducts } = useContext(ProductsContext)

  return (

    <div className="productos-container">
    <h2>Productos</h2>
    <div className="productos-grid">
      {products.length > 0 ? (
        products.map((producto) => (
          <div key={producto.id} className="producto-card">
            <img
              src={producto.imagen}
              alt={producto.nombre}
              className="product-image"
            />
            <h3>{producto.nombre}</h3>
            <p>${producto.precio.toLocaleString()}</p>
            <Link to={`/producto/${producto.id}`} className="primary-button">
              Ver detalles
            </Link>
            <button 
              className="like-button"
              onClick={() => handleLike(producto.id)}
            >
              <IconStar
                filled={likedProducts.includes(producto.id)}
                size="24px"
                color="gold"
              />
            </button>
          </div>
        ))
      ) : (
        <p>No hay productos disponibles.</p>
      )}
    </div>
    <button className="primary-button">Agregar nuevo producto</button>
  </div>

  );
};

export default Productos;
