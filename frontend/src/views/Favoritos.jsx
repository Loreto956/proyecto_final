import React, {useContext} from "react"
import { ProductsContext } from "../contexts/FavsContext"
import "../styles/productos.css";
import productoImg from "../assets/imagenNoDisponible.png";

const ProductosFavoritos = () => {

    const { products, likedProducts, handleLike } = useContext(ProductsContext)

    const likedProductsList = products.filter(product => likedProducts.includes(product.id))

    return (
      <div className="container mt-4">
      <h2>Mis productos favoritos</h2>
      <div className="row">
        {likedProductsList.map(producto => (
          <div key={producto.id} className="col-md-4 mb-4">
            <div className="card" style={{ width: '18rem' }}>
            <img
              className="card-img-top"
              src={productoImg}
              alt={producto.nombre}
            />
            <div className="card-body">
              <h5 className="card-title">{producto.nombre}</h5>
              <p className="card-text">${new Intl.NumberFormat('es-Es').format(producto.precio)}</p>
              <button 
                className={`btn ${likedProducts.includes(producto.id) ? "btn-danger" : "btn-outline-danger"} mt-3`}
                onClick={() => handleLike(producto.id)}
              >
                  {likedProducts.includes(producto.id) ? "❤️" : "🤍"}
              </button>
              </div> 
            </div>
          </div>
        ))}
          </div>
      </div>
  );
};

export default ProductosFavoritos