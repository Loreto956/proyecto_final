import React, { useState, useContext, useEffect } from "react";
import productosData from "../data/productos.json"; // Importamos el JSON de productos
import Context from "../contexts/Context"; // Contexto para obtener el usuario actual

const MisProductos = () => {
  const { getUser } = useContext(Context);
  const [productos, setProductos] = useState([]);
  const [nuevoProducto, setNuevoProducto] = useState({
    nombre: "",
    descripcion: "",
    marca: "",
    categoria: "Perro", // Valor inicial por defecto
    precio: "",
    stock: "",
    imagen: "",
    user_id: getUser?.id || 1, // Asignar el ID del usuario actual
  });
  const [imagenPreview, setImagenPreview] = useState("");

  useEffect(() => {
    if (getUser) {
      // Filtrar los productos que pertenecen al usuario actual
      const productosUsuario = productosData.filter(
        (producto) => producto.user_id === getUser.id
      );
      setProductos(productosUsuario);
    }
  }, [getUser]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name === "precio") {
      // Validar que solo se ingresen números en el campo precio
      if (!isNaN(value) && Number(value) >= 0) {
        setNuevoProducto({
          ...nuevoProducto,
          [name]: value,
        });
      }
    } else {
      setNuevoProducto({
        ...nuevoProducto,
        [name]: value,
      });
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setNuevoProducto({
      ...nuevoProducto,
      imagen: URL.createObjectURL(file),
    });
    setImagenPreview(URL.createObjectURL(file));
  };

  const agregarProducto = () => {
    setProductos([...productos, { ...nuevoProducto, id: productos.length + 1 }]);
    setNuevoProducto({
      nombre: "",
      descripcion: "",
      marca: "",
      categoria: "Perro",
      precio: "",
      stock: "",
      imagen: "",
      user_id: getUser.id,
    });
    setImagenPreview("");
  };

  const eliminarProducto = (id) => {
    const nuevosProductos = productos.filter(producto => producto.id !== id);
    setProductos(nuevosProductos);
  };

  const editarProducto = (id) => {
    const productoAEditar = productos.find(producto => producto.id === id);
    setNuevoProducto(productoAEditar);
    setImagenPreview(productoAEditar.imagen);
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
          {productos.map((producto) => (
            <tr key={producto.id}>
              <td>{producto.nombre}</td>
              <td>{producto.descripcion}</td>
              <td>{producto.marca}</td>
              <td>{producto.categoria}</td>
              <td>{producto.precio}</td>
              <td>{producto.stock}</td>
              <td>
                <img src={producto.imagen || "default.png"} alt={producto.nombre} width="50" />
              </td>
              <td>
                <button className="btn btn-outline-info me-4" onClick={() => editarProducto(producto.id)}>Editar</button>
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
        {imagenPreview && <img src={imagenPreview} alt="Preview" width="100" />}
        <button className="btn btn-warning mt-2" onClick={agregarProducto}>
          {nuevoProducto.id ? "Actualizar Producto" : "Agregar Producto"}
        </button>
      </div>
    </div>
  );
};

export default MisProductos;

