import React, { useState, useContext, useEffect } from "react";
import { useAuth } from "../contexts/AuthContext";
import { ProductsContext } from "../contexts/FavsContext";
import '../styles/misProductos.css';
import axios from 'axios';
import { ENDPOINT } from "../config/constants";

const MisProductos = () => {
  const { currentUser } = useAuth();
  const [misProductos, setMisProductos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [nuevoProducto, setNuevoProducto] = useState({
    nombre: "",
    descripcion: "",
    marca: "",
    categoria: "Perro",
    precio: "",
    stock: "",
    imagen: "",
  });
  const [imagenPreview, setImagenPreview] = useState("");

  useEffect(() => {
    fetchMisProductos();
  }, [currentUser]);

  const fetchMisProductos = async () => {
    try {
      setLoading(true);
      if (!ENDPOINT.uproductos) {
        throw new Error('URL del endpoint no definida');
      }
      const response = await axios.get(ENDPOINT.uproductos, {
        headers: { Authorization: `Bearer ${currentUser.token}` }
      });
      setMisProductos(response.data);
    } catch (error) {
      console.error("Error al obtener los productos:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name === "precio" || name === "stock") {
      if (!isNaN(value) && Number(value) >= 0) {
        setNuevoProducto({ ...nuevoProducto, [name]: value });
      }
    } else {
      setNuevoProducto({ ...nuevoProducto, [name]: value });
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setNuevoProducto({
      ...nuevoProducto,
      imagen: file,
    });
    setImagenPreview(URL.createObjectURL(file));
  };

  const agregarProducto = async () => {
    try {
      const formData = new FormData();
      for (const key in nuevoProducto) {
        formData.append(key, nuevoProducto[key]);
      }

      if (nuevoProducto.id) {
        const response = await axios.put(`${ENDPOINT.actualizarProducto}/${nuevoProducto.id}`, formData, {
          headers: { 
            Authorization: `Bearer ${currentUser.token}`,
            'Content-Type': 'multipart/form-data'
          }
        });
        setMisProductos(misProductos.map(p => p.id === nuevoProducto.id ? response.data.producto : p));
      } else {
        const response = await axios.post(ENDPOINT.registrarProducto, formData, {
          headers: { 
            Authorization: `Bearer ${currentUser.token}`,
            'Content-Type': 'multipart/form-data'
          }
        });
        setMisProductos([...misProductos, response.data]);
      }

      setNuevoProducto({
        nombre: "",
        descripcion: "",
        marca: "",
        categoria: "Perro",
        precio: "",
        stock: "",
        imagen: "",
      });
      setImagenPreview("");
    } catch (error) {
      console.error("Error al agregar/actualizar producto:", error);
    }
  };

  const eliminarProducto = async (id) => {
    try {
      await axios.delete(`${ENDPOINT.uproductos}/${id}`, {
        headers: { Authorization: `Bearer ${currentUser.token}` }
      });
      setMisProductos(misProductos.filter(producto => producto.id !== id));
    } catch (error) {
      console.error("Error al eliminar producto:", error);
      // Aquí puedes añadir una notificación al usuario si lo deseas
    }
  };

  const editarProducto = (producto) => {
    setNuevoProducto(producto);
    setImagenPreview(producto.imagen);
  };

  return (
    <div className="container mt-5">
      <h2>Mis Productos</h2>
      <table className="table table-bordered">
        <thead className="thead-dark">
          <tr>
            <th>Nombre</th>
            <th>Descripción</th>
            <th>Marca</th>
            <th>Categoría</th>
            <th>Precio</th>
            <th>Stock</th>
            <th>Imagen</th>
            <th>Acción</th>
          </tr>
        </thead>
        <tbody>
          {misProductos.map((producto) => (
            <tr key={producto.id}>
              <td>{producto.nombre}</td>
              <td>{producto.descripcion}</td>
              <td>{producto.marca}</td>
              <td>{producto.categoria}</td>
              <td>{producto.precio}</td>
              <td>{producto.stock}</td>
              <td className="td-style">
                <img src={producto.imagen || "default.png"} alt={producto.nombre} className="img-style" />
              </td>
              <td>
                <button className="btn btn-outline-info me-4" onClick={() => editarProducto(producto)}>Editar</button>
                <button className="btn btn-outline-danger" onClick={() => eliminarProducto(producto.id)}>Eliminar</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="form-group">
        <input
          type="text"
          name="nombre"
          placeholder="Nombre"
          value={nuevoProducto.nombre}
          onChange={handleInputChange}
          className="form-control mb-2"
        />
        <input
          type="text"
          name="descripcion"
          placeholder="Descripción"
          value={nuevoProducto.descripcion}
          onChange={handleInputChange}
          className="form-control mb-2"
        />
        <input
          type="text"
          name="marca"
          placeholder="Marca"
          value={nuevoProducto.marca}
          onChange={handleInputChange}
          className="form-control mb-2"
        />
        <select
          name="categoria"
          value={nuevoProducto.categoria}
          onChange={handleInputChange}
          className="form-control mb-2"
        >
          <option value="Perro">Perro</option>
          <option value="Gato">Gato</option>
        </select>
        <input
          type="number"
          name="precio"
          placeholder="Precio"
          value={nuevoProducto.precio}
          onChange={handleInputChange}
          className="form-control mb-2"
        />
        <input
          type="number"
          name="stock"
          placeholder="Stock"
          value={nuevoProducto.stock}
          onChange={handleInputChange}
          className="form-control mb-2"
        />
        <input
          type="file"
          onChange={handleFileChange}
          className="form-control mb-2"
        />
        {imagenPreview && <img src={imagenPreview} alt="Preview" width="50" className="img-style" />}
        <button className="btn btn-warning mt-2" onClick={agregarProducto}>
          {nuevoProducto.id ? "Actualizar Producto" : "Agregar Producto"}
        </button>
      </div>
    </div>
  );
};

export default MisProductos;
