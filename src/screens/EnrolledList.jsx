import React, { Component } from 'react';
import axios from 'axios';
import PrivateNavbar from './PrivateNavbar';
import { isAuth, getCookie } from '../helpers/auth';
import { toast } from 'react-toastify';


const UserAccounts = props => (
  <tr>
    <td>{props.user.enrolled && props.user.enrolled.constructor === Array && props.user.enrolled.map(item => <><span>{item.activityName}</span><span></span></>)}</td>
    <td>{props.user.enrolled && props.user.enrolled.constructor === Array && props.user.enrolled.map(item => <><span>{item.description}</span><span></span></>)}</td>
    <td>{props.user.enrolled && props.user.enrolled.constructor === Array && props.user.enrolled.map(item => <><span>{item.startDate}</span><span></span></>)}</td>
    <td>{props.user.enrolled && props.user.enrolled.constructor === Array && props.user.enrolled.map(item => <><span>{item.bidEndDate}</span><span></span></>)}</td>
    <td>{props.user.enrolled && props.user.enrolled.constructor === Array && props.user.enrolled.map(item => <><span>{item.location}</span><span></span></>)}</td>
    <td>{props.user.enrolled && props.user.enrolled.constructor === Array && props.user.enrolled.map(item => <><span>{item.responsiblePerson}</span><span></span></>)}</td>
    <td>{props.user.enrolled && props.user.enrolled.constructor === Array && props.user.enrolled.map(item => <><span>{item.phoneNo}</span><span></span></>)}</td>
    <td>{props.user.enrolled && props.user.enrolled.constructor === Array && props.user.enrolled.map(item => <><span>{item.limitParticipant}</span><span></span></>)}</td>
  </tr>
)

export default class UsersList extends Component {
  constructor(props) {
    super(props);

    this.state = { users: [] };
  }

  componentDidMount() {
    const token = getCookie('token');
    axios
      .get(`${process.env.REACT_APP_API_URL}/users`)
      .then(response => {
        this.setState({ users: response.data })
      })
      .catch((error) => {
        console.log(error);
      })
  }

  // componentDidMount() {
  //   const token = getCookie('token');
  //   axios
  //     .get(`${process.env.REACT_APP_API_URL}/user/${isAuth()._id}`, {
  //       headers: {
  //         Authorization: `Bearer ${token}`
  //       }
  //     })
  //     .then(response => {
  //       if (isAuth().enrolled == "") {
  //         toast.error("There are no enrolled activities");
  //         this.setState({ users: response.data })
  //       }
  //       this.setState({ users: response.data })
  //     })
  //     .catch((error) => {
  //       console.log(error);
  //     })
  // }

  userList() {
    return this.state.users.map(currentuser => {
      return <UserAccounts user={currentuser} key={currentuser._id}/>
    })
  }

  render() {
    return (
      <div className="container">
        <PrivateNavbar />
        <div></div>
        <table className="table table-bordered">
          <thead className="thead-light">
            <tr>
              <td>Name</td>
              <td>Description</td>
              <td>Start Date</td>
              <td>Bid End Date</td>
              <td>Location</td>
              <td>Responsible Person</td>
              <td>Phone No</td>
              <td>Limit Participant</td>
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