import React, { useContext } from 'react';
import { CartContext } from '../contexts/CartContext';
import { Link } from 'react-router-dom';

const Carrito = () => {
  const { cart, removeFromCart, updateQuantity } = useContext(CartContext);

  const total = cart.reduce((acc, item) => acc + item.precio * item.quantity, 0);

  return (
    <div className="container mt-4">
      <h2>Carrito de Compras</h2>
      {cart.length === 0 ? (
        <p>Tu carrito está vacío</p>
      ) : (
        <>
          {cart.map((item) => (
            <div key={item.id} className="card mb-3">
              <div className="card-body">
                <h5 className="card-title">{item.nombre}</h5>
                <p className="card-text">Precio: ${item.precio}</p>
                <p className="card-text">
                  Cantidad: 
                  <button onClick={() => updateQuantity(item.id, item.quantity - 1)} className="btn btn-sm btn-secondary mx-2">-</button>
                  {item.quantity}
                  <button onClick={() => updateQuantity(item.id, item.quantity + 1)} className="btn btn-sm btn-secondary mx-2">+</button>
                </p>
                <button onClick={() => removeFromCart(item.id)} className="btn btn-danger">Eliminar</button>
              </div>
            </div>
          ))}
          <div className="text-right">
            <h4>Total: ${total.toFixed(2)}</h4>
            <Link to="/checkout" className="btn btn-success">Proceder al pago</Link>
          </div>
        </>
      )}
    </div>
  );
};

export default Carrito;