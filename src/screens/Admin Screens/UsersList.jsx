import React, { Component } from 'react';
import axios from 'axios';
import AdminNavbar from './AdminNavbar';
import { ToastContainer, toast } from 'react-toastify';
import Table from 'react-bootstrap/Table'
import Moment from 'moment';

const UserAccounts = props => (

  <tr>
    <td>{props.user.name}</td>
    <td>{props.user.email}</td>
    <td>{Moment(props.user.createdAt).format('MMMM Do YYYY, HH:mm:ss')}</td>
    <td>{Moment(props.user.updatedAt).format('MMMM Do YYYY, HH:mm:ss')}</td>
    <td>{props.user.role}</td>
    <td>
      <a href="#" onClick={() => { if (window.confirm('Are you sure you wish to delete (' + props.user.name + ') ?')) props.deleteUser(props.user._id) }}><i className="fa fa-trash" aria-hidden="true"></i></a>
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
        <Table responsive="xl"
          striped bordered hover
          className="table table-bordered"
          size="sm"
        >

          <thead className="thead-light">
            <tr>
              <th>User Name</th>
              <th>E-mail Address</th>
              <th>Created Time</th>
              <th>Updated Time</th>
              <th>Account Type</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
            {this.userList()}
          </tbody>
        </Table>
      </div>
    )
  }
}