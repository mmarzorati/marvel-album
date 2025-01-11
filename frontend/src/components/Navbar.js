import React, { useState, useEffect } from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import '../scss/Navbar.scss';

const NavbarComponent = () => {

    const clearStorage = () => {
        localStorage.clear();
        window.location.replace('/login')
    };

    return (
        <Navbar bg="dark" data-bs-theme="dark">
            <Container>
                <Nav className="me-auto">
                    <Nav.Link className='nav-object' href="/album">
                        Album
                        {/* <img
                            alt=""
                            src="/img/logo.svg"
                            width="30"
                            height="30"
                            className="d-inline-block align-top"
                        /> */}
                    </Nav.Link>
                    <Nav.Link className='nav-object' href="/shop">Shop</Nav.Link>
                    <Nav.Link className='nav-object' href="/trades">Trades</Nav.Link>
                </Nav>
                <Nav>
                    <Nav.Link className='nav-object' href="/profile">
                        Profile
                    </Nav.Link>
                    <Nav.Link onClick={clearStorage} className='nav-object' >Logout</Nav.Link>
                </Nav>
            </Container>
        </Navbar>
    );
};

export default NavbarComponent;