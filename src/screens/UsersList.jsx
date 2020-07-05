import React, { Component } from 'react';
import axios from 'axios';
import { Nav, Navbar, NavDropdown, NavLink, FormControl, Button, Collapse, NavItem, FormGroup } from 'react-bootstrap';
import { updateUser, isAuth, getCookie, signout } from '../helpers/auth';
import { ToastContainer, toast } from 'react-toastify';



const UserAccounts = props => (

  <tr>
    <td>{props.user.name}</td>
    <td>{props.user.email}</td>
    {/* <td>{props.user.hashed_password}</td> */}
    <td>{props.user.createdAt}</td>
    <td>{props.user.updatedAt}</td>
    <td>{props.user.role}</td>
    <td>
      <a href="#" onClick={() => { props.deleteUser(props.user._id) }}><i class="fa fa-trash" aria-hidden="true"></i></a>
    </td>
  </tr>
)

export default class UsersList extends Component {
  constructor(props) {
    super(props);

    this.deleteUser = this.deleteUser.bind(this)

    this.state = {users: []};
  }

  componentDidMount() {
    axios.get(`${process.env.REACT_APP_API_URL}/users`)
      .then(response => {
        this.setState({ users: response.data })
      })
      .catch((error) => {
        console.log(error);
      })
  }

  deleteUser(id) {
    axios.delete(`${process.env.REACT_APP_API_URL}/user/${id}`)
      .then(response => { console.log(response.data)});
    this.setState({
      users: this.state.users.filter(el => el._id !== id)
    })
  }

  userList() {
    return this.state.users.map(currentuser => {
      // return <UserAccounts user={currentuser}/>;
      return <UserAccounts user={currentuser} deleteUser={this.deleteUser} key={currentuser._id}/>;
    })
  }

  render() {
    return (
      <div className="container">
      <Navbar className="navbar navbar-dark bg-primary" expand="lg">
        <Navbar.Brand href="#home">AMS</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto">
            <Nav.Link href="/">Home</Nav.Link>
            <Nav.Link href="/usersInfo">User Management</Nav.Link>
            <NavDropdown title="Activity" id="basic-nav-dropdown">
              <NavDropdown.Item href="/activitylist">List</NavDropdown.Item>
              <NavDropdown.Item href="/addActivity">Add Activity</NavDropdown.Item>
            </NavDropdown>
            <Nav.Link href="/admin">Account</Nav.Link>

            <NavItem>
              <NavLink className='nav-link' exact to='/logout'>
                <i className='fa fa-sign-out'></i>
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink className='nav-link' exact to='/login'>
                <i className='fa fa-sign-in'></i>
              </NavLink>
            </NavItem>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
        <div></div>
        <table className="table" class="table table-bordered">
          <thead className="thead-light">
            <tr>
              <th>Name</th>
              <th>E-mail address</th>
              {/* <th>Password</th> */}
              <th>Created time</th>
              <th>Updated time</th>
              <th>Role</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
            { this.userList() }
          </tbody>
        </table>
      </div>
    )
  }
}