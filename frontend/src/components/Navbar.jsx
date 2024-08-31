import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { Container, Navbar as BSNavbar, Nav, Button } from 'react-bootstrap'; // Importar componentes de Bootstrap


const Navbar = () => {
    const navigate = useNavigate();
    const { currentUser, logoutUser } = useAuth();

    const handleLogout = () => {
        logoutUser();
        navigate('/');
    };

    const setActiveClass = ({ isActive }) => (isActive ? "active" : "notActive");

    const renderLinks = () => (
        <Nav className="me-auto">
            <Nav.Link as={NavLink} className={setActiveClass} to="/">
                🐾 Peluditos Shop
            </Nav.Link>
            {currentUser && (
                <>
                    <Nav.Link as={NavLink} className={setActiveClass} to="/productos">
                        Tienda
                    </Nav.Link>
                    <Nav.Link as={NavLink} className={setActiveClass} to="/perfil">
                        Mi perfil
                    </Nav.Link>
                    <Nav.Link as={NavLink} className={setActiveClass} to="/carrito">
                        Carrito
                    </Nav.Link>
                </>
            )}
        </Nav>
    );

    const renderAuthLinks = () => {
        if (!currentUser) {
            return (
                <>
                    <Nav.Link as={NavLink} className={setActiveClass} to="/login">
                        Iniciar sesión
                    </Nav.Link>
                    <Nav.Link as={NavLink} className={setActiveClass} to="/registrarse">
                        Registrarse
                    </Nav.Link>
                </>
            );
        }

        return (
            <>
                <Button
                    className="me-2"
                    variant="primary"
                    onClick={() => navigate('/carrito')}>
                    Ir a pagar
                </Button>
                <Button
                    variant="secondary"
                    onClick={handleLogout}>
                    Cerrar sesión
                </Button>
            </>
        );
    };

    return (
        <BSNavbar bg="light" expand="lg" style={{ marginBottom: 0 }}>
            <Container style={{ marginBottom: 0 }} className="ms auto d-flex justify-content-between align-items-center fs-5">
                <BSNavbar.Toggle aria-controls="basic-navbar-nav ms-auto" />
                <BSNavbar.Collapse id="basic-navbar-nav ms-auto">
                    {renderLinks()}
                    <Nav className="ms-auto">
                        {renderAuthLinks()}
                    </Nav>
                </BSNavbar.Collapse>
            </Container>
        </BSNavbar>
    );
};

export default Navbar;
