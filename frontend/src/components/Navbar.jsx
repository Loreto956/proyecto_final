import React, { useContext } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import Context from "../contexts/Context";
import "../styles/navbar.css"

const Navbar = () => {

    const navigate = useNavigate()
    const {getUser, updateUser} = useContext(Context)

    const logout = () => {
        updateUser()
        window.sessionStorage.removeItem('token')
        navigate('/')
      }

    const setActiveClass = ({isActive}) => (isActive ? "active" : "notActive")

    const renderLinks = () => {
        return (
            <>
                <NavLink className={setActiveClass} to="/">
                    🐾 Peluditos shop
                </NavLink>
                {getUser && (
                    <NavLink className={setActiveClass} to="/productos">
                        Productos
                    </NavLink>
                )}
            </>
        );
    }
    const isLogin = () => {
        if(!getUser){
            return (
            <>
                        <NavLink 
                            className={setActiveClass}
                            to="/login">
                                Iniciar sesión
                        </NavLink>
                        <NavLink 
                            className={setActiveClass}
                            to="/registrarse">
                            Registrarse
                        </NavLink>
            </>
            )
        }

        return (
           <>
                         <button
                            className="primary-button"
                            to="/carrito">
                            Ir a pagar
                        </button>
                        
                        <button 
                            className="secondary-button" 
                            onClick={logout}
                            to='/'>
                                Cerrar sesión
                        </button>
                       
            </>      
        )
    }

    return (
        <div>
            <nav className="navbar">
                <div className="container-fluid">
                    <div className="navbar-links">
                        {renderLinks()}
                    </div>
                    <div>
                        {isLogin()}
                    </div>
                </div>
            </nav>
        </div>
    )
}

export default Navbar