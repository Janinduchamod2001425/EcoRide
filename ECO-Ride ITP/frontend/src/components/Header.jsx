import React from 'react';
import { Navbar, Nav, Container } from 'react-bootstrap';
import Logo from '../images/Ecar.png';
import '../styles/Header.css';
import { LinkContainer } from 'react-router-bootstrap';

const Header = () => {
    return (
        <header>
            <Navbar className='header' bg='dark' variant='dark' expand='lg' collapseOnSelect>
                <Container>
                    <LinkContainer to='/'>
                        <Navbar.Brand className='topic'>Ec<span style={{color: 'lime'}}>o</span>Ride<img src={Logo} className='logo'/></Navbar.Brand>
                    </LinkContainer>
                    <Navbar.Toggle aria-controls='basic-navbar-nav' />
                    <Navbar.Collapse id='basic-navbar-nav'>
                        <Nav className='ms-auto'>
                            <LinkContainer to='/login'>
                                <Nav.Link>Sign In</Nav.Link>
                            </LinkContainer>
                            <LinkContainer to='/register'>
                                <Nav.Link>Sign Up</Nav.Link>
                            </LinkContainer>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </header>
    )
}

export default Header;