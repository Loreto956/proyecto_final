import React, {useContext} from "react"
import { ProductsContext } from "../contexts/FavsContext"
import IconStar from "../components/IconStar"
import "../styles/productos.css";

const ProductosFavoritos = () => {

    const { products, likedProducts, handleLike } = useContext(ProductsContext)

    const likedProductsList = products.filter(product => likedProducts.includes(product.id))

    return (
        <>
      <h1>Mis productos favoritos</h1>
      <div>
        {likedProductsList.map(product => (
          <div key={product.id} className="producto-card">
            <img
              className="photo"
              src={product.imagen}
              alt={product.nombre}
            />
             <button 
              className="like-button"
              onClick={() => handleLike(product.id)}
            >
              <IconStar
                filled={likedProducts.includes(product.id)}
                size="24px"
                color="gold"
              />
            </button>
          </div>
        ))}
      </div>
    </>
    );
}

export default ProductosFavoritos