import React, {  createContext, useState, useEffect} from 'react'

export const ProductsContext = createContext();

const ShopProvider = ({ children }) => {

    const [products, setProducts] = useState([]);
    const [likedProducts, setLikedProducts] = useState([]);

    useEffect(() => {
        fetch('https://66cfc346181d059277dc42d0.mockapi.io/api/v1/productos')
            .then(response => response.json())
            .then(data => {
                setProducts(data)
            })
            .catch(error => {
                console.error('Error al obtener los datos:', error);
              });
    }, [])

    const handleLike = (productId) => {
        setLikedProducts(prevLikedProducts =>
          prevLikedProducts.includes(productId)
            ? prevLikedProducts.filter(id => id !== productId)
            : [...prevLikedProducts, productId]
        );
    };

    return (
        <ProductsContext.Provider value={{products, likedProducts, handleLike}}>
            {children}
        </ProductsContext.Provider>
    )

}

export default ShopProvider;