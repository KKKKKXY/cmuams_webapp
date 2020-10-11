import React, { Component } from 'react';
import axios from 'axios';
import { isAuth } from '../../../helpers/auth';
import Table from 'react-bootstrap/Table'
import { toast } from 'react-toastify';
import { Button } from 'react-bootstrap';
import { setActivityLocalStorage } from '../../../helpers/auth';
import Moment from 'moment';
import PrivateNavbar from '../PrivateNavbar';


const Enrolled = props => (
    <tr>
        <td>{props.enrolledActivity.activityName}</td>
        <td>{Moment(props.enrolledActivity.activityDate).format('MMMM Do YYYY, h:mm:ss a')}</td>
        <td>{props.enrolledActivity.location}</td>
        <td>
            <Button variant="outline-info" onClick={() => props.viewActivityInfo(props.enrolledActivity._id)}>Info</Button>{' '}

        </td>
    </tr>
)

export default class EnrolledList extends Component {
    constructor(props) {
        super(props);
        this.viewActivityInfo = this.viewActivityInfo.bind(this);

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
            })
            .catch((error) => {
                console.log(error);
            })
    }

    viewActivityInfo(id) {
        axios.get(`${process.env.REACT_APP_API_URL}/activity/${id}`)
            .then(res => {
                setActivityLocalStorage(res, () => { });
                if (localStorage.getItem('activity')) {
                    window.location.href = '/viewActivityInfo'
                }
            })
            .catch(err => {
                console.log(err.response);
                toast.error(err.response.data.error);
                toast.error(err.response.data.errors);
            });
    }

    enrolledActivityList() {
        return this.state.userInfo.map(currentenrolledactivity => {
            return <Enrolled enrolledActivity={currentenrolledactivity} key={currentenrolledactivity._id} viewActivityInfo={this.viewActivityInfo} />;
        })
    }

    render() {
        return (

            <div className="container">
            <PrivateNavbar />
                <Table
                    responsive="xl"
                    striped bordered hover
                    size="sm"
                    className="table table-bordered"
                    style={{ 'marginBottom': '30px' }}
                >
                    <thead style={{ backgroundColor: '#71CE3B' }}>
                        <tr>
                            <td>Name</td>
                            <td>Start Date</td>
                            <td>Location</td>
                            <td>More</td>
                        </tr>
                    </thead>
                    <tbody>
                        {this.enrolledActivityList()}
                    </tbody>
                </Table>
            </div>
        );
    }
}