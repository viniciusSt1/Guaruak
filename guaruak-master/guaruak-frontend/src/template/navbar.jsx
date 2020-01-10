import React from 'react';
import { Link } from 'react-router-dom';
import { Container, Navbar, Nav } from 'react-bootstrap';

export default props => (
    <Navbar bg="success" variant="dark" expand="sm">
        <Container>
            <Navbar.Brand href="#home">Guaruak</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="ml-auto">
                    <Nav.Item className={props.activeItem === "home" ? "active" : ""}>
                        <Link className="nav-link" to="/">Home</Link>
                    </Nav.Item>
                </Nav>
            </Navbar.Collapse>
        </Container>
    </Navbar>
);