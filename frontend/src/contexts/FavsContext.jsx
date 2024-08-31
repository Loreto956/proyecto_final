import React, {  createContext, useState, useEffect } from 'react'
import axios from 'axios';
import productosData from '../data/productos.json'
import { ENDPOINT } from '../config/constants';
import { useAuth } from './AuthContext';

export const ProductsContext = createContext();

const ShopProvider = ({ children }) => {
    const { currentUser } = useAuth();
    const [products, setProducts] = useState([productosData]);
    const [loading, setLoading] = useState(true);
    const [hasError, setHasError] = useState(false);
    const [showError, setShowError] = useState(true);
    const [likedProducts, setLikedProducts] = useState([]);

    useEffect(() => {
        const fetchProductos = async () => {
          try {
            const response = await axios.get(ENDPOINT.productos);
            setProducts(response.data);
          } catch (error) {
            console.error("Error al cargar productos desde la API, cargando datos locales", error);
            setProducts(productosData);
            setHasError(true);
            setTimeout(() => {
              setShowError(false);
            }, 5000);
          } finally {
            setLoading(false);
          }
        };
        fetchProductos();
      }, [setProducts]);

    const handleLike = (productId) => {
        setLikedProducts(prevLikedProducts =>
          prevLikedProducts.includes(productId)
            ? prevLikedProducts.filter(id => id !== productId)
            : [...prevLikedProducts, productId]
        );
    };


    return (
        <ProductsContext.Provider value={{
            products, 
            setProducts, 
            loading, 
            hasError, 
            showError, 
            likedProducts, 
            handleLike}}>
            {children}
        </ProductsContext.Provider>
    )

}

export default ShopProvider;