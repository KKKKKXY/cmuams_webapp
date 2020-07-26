import React from 'react';
import { Nav, Navbar } from 'react-bootstrap';

function App({ history }) {
  return (
    <div className="container">
      <Navbar className="navbar navbar-dark bg-primary" expand="lg">
        <Navbar.Brand href="#home">AMS</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto">
            <Nav.Link href="/">Home</Nav.Link>
          </Nav>
          <button onClick={event => window.location.href = '/login'}>Log in</button>
          <span>/</span>
          <button onClick={event => window.location.href = '/register'}>Sign up</button>
        </Navbar.Collapse>
      </Navbar>
    </div>
  );
}

export default App;