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
                            <LinkContainer to='/reports'>
                                <Nav.Link>Reports</Nav.Link>
                            </LinkContainer>
                            <LinkContainer to='/maintain'>
                                <Nav.Link>New Maintenance Record</Nav.Link>
                            </LinkContainer>
                            <LinkContainer to='/spare-parts'>
                                <Nav.Link>Spare Parts</Nav.Link>
                            </LinkContainer>
                            <LinkContainer to='/request'>
                                <Nav.Link>Request Permission</Nav.Link>
                            </LinkContainer>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </header>
    )
}

export default Header;