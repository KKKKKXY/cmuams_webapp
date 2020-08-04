import React, { Component } from 'react';
import axios from 'axios';
import AdminNavbar from './AdminNavbar';
import { ToastContainer, toast } from 'react-toastify';

const UserAccounts = props => (

  <tr>
    <td>{props.user.name}</td>
    <td>{props.user.email}</td>
    <td>{props.user.createdAt}</td>
    <td>{props.user.updatedAt}</td>
    <td>{props.user.role}</td>
    <td>
      <a href="#" onClick={() => { if (window.confirm('Are you sure you wish to delete (' + props.user.name + ') ?')) props.deleteUser(props.user._id) }}><i class="fa fa-trash" aria-hidden="true"></i></a>
    </td>
  </tr>
)

export default class UsersList extends Component {
  constructor(props) {
    super(props);
    this.deleteUser = this.deleteUser.bind(this)
    this.state = { users: [] };
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
      .then(response => {
        toast.success(response.data.message);
      })
      .catch(err => {
        console.log(err.response);
        toast.error(err.response.data.error);
        toast.error(err.response.data.errors);
      });

    this.setState({
      users: this.state.users.filter(el => el._id !== id)
    })
  }

  userList() {
    return this.state.users.map(currentuser => {
      return <UserAccounts user={currentuser} deleteUser={this.deleteUser} key={currentuser._id} />;
    })
  }

  render() {
    return (
      <div className="container">
        <AdminNavbar />
        <div></div>
        <ToastContainer />
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
            {this.userList()}
          </tbody>
        </table>
      </div>
    )
  }
}