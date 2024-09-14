import { CartContext } from "../contexts/CartContext";
import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom"; // Para la navegación a detalles
import { ProductsContext } from "../contexts/FavsContext"
import axios from 'axios';
import { ENDPOINT } from "../config/constants";
import Cookies from 'js-cookie';

const Productos = () => {
  const { addToCart } = useContext(CartContext);
  const navigate = useNavigate();
  const { products, setProducts, loading, likedProducts, handleLike } = useContext(ProductsContext);
  const [showSuccessAlert, setShowSuccessAlert] = useState(false);
  const [isLoading, setIsLoading] = useState(loading);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    fetchAllProducts();
  }, []);

  const fetchAllProducts = async () => {
    try {
      setIsLoading(true);
      const token = Cookies.get('token');
      if (!token) {
        throw new Error('No se encontró el token de autenticación');
      }
      const response = await axios.get(ENDPOINT.productos, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setProducts(response.data);
      setShowSuccessAlert(true);
      setTimeout(() => setShowSuccessAlert(false), 5000);
    } catch (error) {
      console.error("Error al cargar productos:", error);
      setIsError(true);
    } finally {
      setIsLoading(false);
    }
  };

  const formatPrice = (price) => {
    return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  };

//   Verifica si los productos están cargando
  if (isLoading) {
    return <div>Cargando productos...</div>;
  }

  // Renderizar los productos
  return (
    <div className="container mt-4">
      {isError && (
        <div className="alert alert-danger">
          Error al cargar productos desde el servidor. 
          {!Cookies.get('token') && " No se encontró el token de autenticación. Por favor, inicie sesión nuevamente."}
        </div>
      )}
      {showSuccessAlert && !isLoading && products.length > 0 && (
        <div className="alert alert-success">Productos cargados correctamente</div>
      )}
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