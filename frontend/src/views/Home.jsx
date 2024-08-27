import React from "react";
import foto from "../assets/beneficios_gato_perro.png"
import '@fortawesome/fontawesome-free/css/all.min.css';


import "../styles/home.css"

const Home = () => {
    return(
        <>
        <div className="banner">
            <div className="slogan">
                <h1>Todo lo que tu mascota necesita, <br/>¡aquí lo puedes vender o comprar!</h1>
            </div>
            <div>
                <img src={foto} alt="imagen mascotas"/>
            </div>
        </div>
        </>
    )
}

export default Home