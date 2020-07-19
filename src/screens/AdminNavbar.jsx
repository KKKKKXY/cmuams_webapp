import React from 'react';
import { toast } from 'react-toastify';
import { signout } from '../helpers/auth';
import { Nav, Navbar } from 'react-bootstrap';


const AdminNavbar = ({ }) => {
  return (
    <Navbar className="navbar navbar-dark bg-primary" expand="lg">
      <Navbar.Brand href="#home">AMS</Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="mr-auto">
          <Nav.Link href="/">Home</Nav.Link>
          <Nav.Link href="/usersInfo">User Management</Nav.Link>
          <Nav.Link href="/activitylist">Activity</Nav.Link>
          <Nav.Link href="/admin">Account</Nav.Link>
        </Nav>
        <button onClick={() => { signout(() => { toast.error('Signout Successfully'); window.location.href = '/' }); }}>
          <i className='fas fa-sign-out-alt  w-6  -ml-2' />
          <span className='ml-3'>Signout</span></button>

      </Navbar.Collapse>
    </Navbar>
  );
}

export default AdminNavbar;