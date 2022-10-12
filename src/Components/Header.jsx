import React from 'react'
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Figure from 'react-bootstrap/Figure';

export default function Header() {
  return (
    <Navbar bg="light" expand="lg">
      <Container>
        <Navbar.Brand href="#home">
      <Figure.Image
        width={30}
        height={30}
        src="../logo.svg"
      />
            Salary Management App
        </Navbar.Brand>
      </Container>
      <Navbar.Collapse className="justify-content-end">
      <NavDropdown title="Account" id="basic-nav-dropdown">
              <NavDropdown.Item href="#action/3.3">Account Settings</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="#action/3.4">Logout</NavDropdown.Item>
            </NavDropdown>
        </Navbar.Collapse>
    </Navbar>
  );
}
