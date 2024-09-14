import React, {  createContext, useState, useEffect } from 'react'
import axios from 'axios';
import { ENDPOINT } from '../config/constants';
import { useAuth } from './AuthContext';
import Cookies from 'js-cookie';

export const ProductsContext = createContext();

const ShopProvider = ({ children }) => {
    const { currentUser } = useAuth();
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [hasError, setHasError] = useState(false);
    const [showError, setShowError] = useState(true);
    const [likedProducts, setLikedProducts] = useState([]);

    useEffect(() => {
        const fetchProductos = async () => {
          try {
            const token = Cookies.get('token');
           
            const response = await axios.get(ENDPOINT.productos, {
              headers: {
                Authorization: `Bearer ${token}`
              }
            });
            setProducts(response.data);
          } catch (error) {
            console.error("Error al cargar productos desde la API", error);
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