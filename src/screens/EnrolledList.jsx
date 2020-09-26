import React, { Component } from 'react';
import axios from 'axios';
import PrivateNavbar from './PrivateNavbar';
import { isAuth } from '../helpers/auth';
import { ToastContainer, toast } from 'react-toastify';



const Enrolled = props => (
  <tr>
    <td>{props.enrolledActivity.activityName}</td>
    <td>{props.enrolledActivity.description}</td>
    <td>{props.enrolledActivity.startDate}</td>
    <td>{props.enrolledActivity.bidEndDate}</td>
    <td>{props.enrolledActivity.location}</td>
    <td>{props.enrolledActivity.responsiblePerson}</td>
    <td>{props.enrolledActivity.phoneNo}</td>
    <td>{props.enrolledActivity.limitParticipant}</td>
  </tr>
)

export default class ViewEnrolledList extends Component {
  constructor(props) {
    super(props);

    this.state = { userInfo: [] };
  }

  componentDidMount() {
    axios
    .get(`${process.env.REACT_APP_API_URL}/user/${isAuth()._id}`)
      .then(response => {
        if (response.data.enrolled == "") {
          toast.error("There are no enrolled activities");
        }
        this.setState({ userInfo: response.data.enrolled })
        console.log(response.data)
      })
      .catch((error) => {
        console.log(error);
      })
  }

  enrolledActivityList() {
    return this.state.userInfo.map(currentenrolledactivity => {
      return <Enrolled enrolledActivity={currentenrolledactivity} key={currentenrolledactivity._id} />;
    })
  }

  render() {
    return (
      <div className="container">
        <PrivateNavbar />
        <div></div>
        <ToastContainer />
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
            {this.enrolledActivityList()}
          </tbody>
        </table>
      </div>
    )
  }
}