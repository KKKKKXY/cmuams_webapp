import React, { Component } from 'react';
import axios from 'axios';
import AdminNavbar from './AdminNavbar';



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
        <td><a href="#" onClick={() => { props.deleteActivity(props.activity._id) }}><i class="fa fa-trash" aria-hidden="true"></i></a></td>
        <td><a href="#" onClick={() => { props.editActivity(props.user._id) }}><i class="fas fa-pencil-alt" aria-hidden="true"></i></a></td>
    </tr>
)

export default class ViewActivity extends Component {
    constructor(props) {
        super(props);

        this.deleteActivity = this.deleteActivity.bind(this)

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

    deleteActivity(id) {
        axios.delete(`${process.env.REACT_APP_API_URL}/activity/${id}`)
            .then(response => { console.log(response.data) });
        this.setState({
            activities: this.state.activities.filter(el => el._id !== id)
        })
    }



    activityList() {
        return this.state.activities.map(currentactivity => {
            //return <Activities activity={currentactivity} key={currentactivity._id} />;
            return <Activities activity={currentactivity} deleteActivity={this.deleteActivity} key={currentactivity._id} />;
        })
    }

    render() {
        return (
            <div className="container">
                <AdminNavbar />
                <div></div>
                <table className="table" class="table table-bordered">
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
                            <td>Delete</td>
                            <td>Edit</td>
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