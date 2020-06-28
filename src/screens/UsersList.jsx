import React, { Component } from 'react';
import axios from 'axios';
import { Nav, Navbar, NavDropdown, NavLink, FormControl, Button, Collapse, NavItem, FormGroup } from 'react-bootstrap';


const UserAccounts = props => (
  <tr>
    <td>{props.user.name}</td>
    <td>{props.user.email}</td>
    <td>{props.user.hashed_password}</td>
    <td>{props.user.role}</td>
    {/* <td>
      <Link to={"/edit/"+props.exercise._id}>edit</Link> | <a href="#" onClick={() => { props.deleteExercise(props.exercise._id) }}>delete</a>
    </td> */}
  </tr>
)

export default class UsersList extends Component {
  constructor(props) {
    super(props);

    // this.deleteExercise = this.deleteExercise.bind(this)

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

//   deleteExercise(id) {
//     axios.delete('http://localhost:5000/exercises/'+id)
//       .then(response => { console.log(response.data)});

//     this.setState({
//       exercises: this.state.exercises.filter(el => el._id !== id)
//     })
//   }

  userList() {
    return this.state.users.map(currentuser => {
      return <UserAccounts user={currentuser}/>;
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
            <Nav.Link href="/usersInfo">User Manage</Nav.Link>
            <NavDropdown title="Activity" id="basic-nav-dropdown">
              <NavDropdown.Item href="/activitylist">List</NavDropdown.Item>
              <NavDropdown.Item href="/addActivity">Add Activity</NavDropdown.Item>
            </NavDropdown>
            <Nav.Link href="/usersInfo">Update Profile</Nav.Link>

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
        <table className="table">
          <thead className="thead-light">
            <tr>
              <th>Username</th>
              <th>Email</th>
              <th>Password</th>
              <th>Role</th>
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