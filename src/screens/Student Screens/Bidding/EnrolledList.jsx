import React, { Component } from 'react';
import axios from 'axios';
import { isAuth } from '../../../helpers/auth';
import Table from 'react-bootstrap/Table'
import { toast } from 'react-toastify';
import { setActivityLocalStorage } from '../../../helpers/auth';
import Moment from 'moment';
import PrivateNavbar from '../PrivateNavbar';
import Tooltip from '@material-ui/core/Tooltip';

const Enrolled = props => (
    <tr>
        <td>{props.enrolledActivity.activityName}</td>
        <td>{Moment(props.enrolledActivity.activityDate).format('MMMM Do YYYY, HH:mm:ss')}</td>
        <td>{props.enrolledActivity.location}</td>
        <td>
            <Tooltip title="Activity information" placement="right">
                <a href="#" onClick={() => props.viewActivityInfo(props.enrolledActivity._id)}><i className='fa fa-search-plus fa-2x' style={{ color: 'grey' }}></i></a>
            </Tooltip>
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
                            <td>Activity Name</td>
                            <td>Activity Date</td>
                            <td>Location</td>
                            <td>Detail</td>
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