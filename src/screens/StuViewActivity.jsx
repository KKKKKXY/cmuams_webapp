import React, { Component } from 'react';
import axios from 'axios';
import PrivateNavbar from './PrivateNavbar';
import Tooltip from '@material-ui/core/Tooltip';


const Activities = props => (
    <tr>
        <td>{props.activity.activityName}</td>
        <td>{props.activity.description}</td>
        <td>{props.activity.startDate}</td>
        <td>{props.activity.bidEndDate}</td>
        <td>{props.activity.location}</td>
        <td>{props.activity.responsiblePerson}</td>
        <td>{props.activity.phoneNo}</td>
        <td>{props.activity.limitParticipant}</td>
        <td>
            <Tooltip title="Enroll" placement="top">
            <a href="#" onClick={() => { props.deleteActivity(props.activity._id) }}><i class="fas fa-plus-square" aria-hidden="true"></i></a>
            </Tooltip>
        </td>
    </tr>
)

export default class StuViewActivity extends Component {
    constructor(props) {
        super(props);
        this.state = { activities: [] };
    }

    componentDidMount() {
        axios.get(`${process.env.REACT_APP_API_URL}/activities`)
            .then(response => {
                this.setState({ activities: response.data })
            })
            .catch((error) => {
                console.log(error);
            })
    }


    activityList() {
        return this.state.activities.map(currentactivity => {
            return <Activities activity={currentactivity} key={currentactivity._id} />;
            //   return <Activities user={currentuser} deleteUser={this.deleteUser} key={currentuser._id}/>;
        })
    }

    render() {
        return (
            <div className="container">
                <PrivateNavbar />
                <div></div>
                <table className="table">
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
                            <td>Enroll</td>
                        </tr>
                    </thead>
                    <tbody>
                        {this.activityList()}
                    </tbody>
                </table>
            </div>
        )
    }
}