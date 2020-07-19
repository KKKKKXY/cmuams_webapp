import React from 'react';
import { toast } from 'react-toastify';
import { signout } from '../helpers/auth';
import { Nav, Navbar} from 'react-bootstrap';


const PrivateNavbar = ({ }) => {
    return (
        <Navbar className="navbar navbar-dark bg-primary" expand="lg">
            <Navbar.Brand href="#home">AMS</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="mr-auto">
                    <Nav.Link href="/">Home</Nav.Link>
                    <Nav.Link href="/stuviewactivity">Activity</Nav.Link>
                    <Nav.Link href="/enrollList">Enrolled List</Nav.Link>
                    <Nav.Link href="/private">Account</Nav.Link>
                </Nav>
                <button onClick={() => { signout(() => { toast.error('Signout Successfully'); window.location.href = '/' }); }}>
                    <i className='fas fa-sign-out-alt  w-6  -ml-2' />
                    <span className='ml-3'>Signout</span></button>
            </Navbar.Collapse>
        </Navbar>
    );
}

export default PrivateNavbar;