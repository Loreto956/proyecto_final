import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { ENDPOINT } from "../config/constants"; // URL de la Api
import productosData from "../data/productos.json"; // Importar JSON local
import { useNavigate } from "react-router-dom"; // Para la navegación a detalles
import productoImg from "../assets/imagenNoDisponible.png"
import { ProductsContext } from "../contexts/FavsContext"

const Productos = () => {
  const [productos, setProductos] = useState([]); // Estado para almacenar productos
  const [loading, setLoading] = useState(true);
  const [hasError, setHasError] = useState(false); // Estado de error
  const navigate = useNavigate();
  const { likedProducts, handleLike } = useContext(ProductsContext);

  // Efecto para cargar los productos desde la API o desde los datos locales
  useEffect(() => {
    const fetchProductos = async () => {
      try {
        const response = await axios.get(ENDPOINT.productos); // Intentar cargar los productos desde el backend
        setProductos(response.data);
      } catch (error) {
        console.error("Error al cargar productos desde la API, cargando datos locales", error);
        setProductos(productosData); // Usar el JSON local en caso de fallo
        setHasError(true); // Establecer el estado de error
      } finally {
        setLoading(false);
      }
    };
    fetchProductos();
  }, []);

//   Verifica si los productos están cargando
  if (loading) {
    return <div>Cargando productos...</div>;
  }

  // Renderizar los productos
  return (
    <div className="container mt-4">
      {hasError && <div className="alert alert-danger">Error al cargar productos desde el servidor, mostrando datos locales</div>}
      <div className="row">
        {productos.map((producto) => (
          <div key={producto.id} className="col-md-4 mb-4">
            <div className="card" style={{ width: '18rem' }}>
              <img src={productoImg} className="card-img-top" alt={producto.nombre} />
              <div className="card-body">
                <h5 className="card-title">{producto.nombre}</h5>
                <p className="card-text">${new Intl.NumberFormat('es-ES').format(producto.precio)}</p>
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
                className="btn btn-success mt-3">
                    Agregar al carrito
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Productos;
