import React from 'react';
import { Navbar, Nav } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <Navbar bg="dark" variant="dark" expand="lg">
      <Navbar.Toggle aria-controls="navbar-nav" />
      <Navbar.Collapse id="navbar-nav">
        <Nav className="mr-auto">
        <Nav.Link as={Link} to="/">Add Feedback</Nav.Link>
          <Nav.Link as={Link} to="/view-all-feedbacks">View My Feedbacks</Nav.Link>
          <Nav.Link as={Link} to="/view-all-feedbacks-admin">View All Feedbacks</Nav.Link>
          {/* <NavDropdown title="Admin" id="basic-nav-dropdown">
            <NavDropdown.Item as={Link} to="/feedback-report">Feedback Report</NavDropdown.Item>
            <NavDropdown.Item as={Link} to="/customer-feedbacks">Customer Feedbacks</NavDropdown.Item>
          </NavDropdown> */}
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default Header;