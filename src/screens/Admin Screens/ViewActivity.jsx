import React, { Component } from 'react';
import axios from 'axios';
import AdminNavbar from './AdminNavbar';
import { makeStyles } from '@material-ui/core/styles';
import Tooltip from '@material-ui/core/Tooltip';
import { setActivityLocalStorage } from '../../helpers/auth';
import { ToastContainer, toast } from 'react-toastify';
import Table from 'react-bootstrap/Table'

const useStyles = makeStyles((theme) => ({
    fab: {
        paddingLeft: theme.spacing(2),
    }
}));

const Activities = props => (
    <tr>
        <td>{props.activity.activityName}</td>
        <td>{props.activity.activityDate}</td>
        <td>{props.activity.responsiblePerson}</td>
        <td>
        <Tooltip title="Student List" placement="right">
        <a href="#" onClick={() => props.viewStudent(props.activity._id)}><i className="fas fa-list-ol fa-2x" aria-hidden="true" style={{ color: 'grey' }}></i></a>
        </Tooltip>
            {/* <Button variant="outline-info" onClick={() => props.viewStudent(props.activity._id)}>Student</Button>{' '} */}
        </td>
        <td>
        <Tooltip title="Activity information" placement="right">
                    <a href="#" onClick={() => props.viewActivityInfo(props.activity._id)}><i className='fa fa-search-plus fa-2x' style={{ color: 'grey' }}></i></a>
                </Tooltip>
            {/* <Button variant="outline-info" onClick={() => props.viewActivityInfo(props.activity._id)}>Info</Button>{' '} */}
        </td>

        <td>
            <Tooltip title="Delete" placement="top">
                <a href="#" onClick={() => { if (window.confirm('Are you sure you wish to delete (' + props.activity.activityName + ') ?')) props.deleteActivity(props.activity._id); }}><i className="fas fa-trash-alt fa-2x" aria-hidden="true" style={{ color: 'red' }}></i></a>
            </Tooltip>
            <Tooltip title="Edit" placement="top" className={useStyles().fab}>
                <a href="#" onClick={() => props.editActivity(props.activity._id)}><i className="fas fa-edit fa-2x" aria-hidden="true"></i></a>
            </Tooltip>
        </td>
    </tr>
)

export default class ViewActivity extends Component {
    constructor(props) {
        super(props);
        this.deleteActivity = this.deleteActivity.bind(this);
        this.editActivity = this.editActivity.bind(this);
        this.viewStudent = this.viewStudent.bind(this);

        this.viewActivityInfo = this.viewActivityInfo.bind(this);
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

    viewStudent(id) {
        axios.get(`${process.env.REACT_APP_API_URL}/activity/${id}`)
            .then(res => {
                setActivityLocalStorage(res, () => { });
                if (localStorage.getItem('activity')) {
                    window.location.href = '/viewStudent'
                }
            })
            .catch(err => {
                console.log(err.response);
                toast.error(err.response.data.error);
                toast.error(err.response.data.errors);
            });
    }

    viewActivityInfo(id) {
        axios.get(`${process.env.REACT_APP_API_URL}/activity/${id}`)
            .then(res => {
                setActivityLocalStorage(res, () => { });
                if (localStorage.getItem('activity')) {
                    window.location.href = '/viewActivityDetail'
                }
            })
            .catch(err => {
                console.log(err.response);
                toast.error(err.response.data.error);
                toast.error(err.response.data.errors);
            });
    }



    deleteActivity(id) {
        axios.delete(`${process.env.REACT_APP_API_URL}/activity/${id}`)
            .then(response => {
                toast.success(response.data.message);
            })
            .catch(err => {
                console.log(err.response);
                toast.error(err.response.data.error);
                toast.error(err.response.data.errors);
            });
        this.setState({
            activities: this.state.activities.filter(el => el._id !== id)
        })
    }

    editActivity(id) {
        axios.get(`${process.env.REACT_APP_API_URL}/activity/${id}`)
            .then(res => {
                setActivityLocalStorage(res, () => { });
                if (localStorage.getItem('activity')) {
                    window.location.href = '/editActivity'
                }
            })
            .catch(err => {
                console.log(err.response);
                toast.error(err.response.data.error);
                toast.error(err.response.data.errors);
            });
    }

    activityList() {
        return this.state.activities.map(currentactivity => {
            return <Activities activity={currentactivity} deleteActivity={this.deleteActivity} editActivity={this.editActivity} key={currentactivity._id} viewActivityInfo={this.viewActivityInfo} viewStudent={this.viewStudent} />;
        })
    }

    render() {
        return (
            <div className="container">
                <AdminNavbar />
                <ToastContainer />
                <div style={{ float: 'right' }}>
                    <Tooltip title="Create New Activity" placement="left">
                    <a href="#" onClick={() => window.location.href = '/addActivity'}><i className="fad fa-plus-square fa 1x w-100 fa-3x" aria-hidden="true"></i></a>
                        {/* <Icon className="fa fa-plus-circle" style={{ color: green[500], fontSize: 50, margin: 10 }} onClick={() => window.location.href = '/addActivity'}></Icon> */}
                    </Tooltip>
                </div>
                <Table
                    responsive="xl"
                    striped bordered hover
                    size="sm"
                    className="table table-bordered"
                >
                    <thead className="thead-light">
                        <tr>
                            <td>Activity Name</td>
                            <td>Activity Date</td>
                            <td>Stuff</td>
                            <td>Student List</td>
                            <td>Detail</td>
                            <td>Delete/Edit</td>
                        </tr>
                    </thead>
                    <tbody>
                        {this.activityList()}
                    </tbody>
                </Table>
            </div>

        )
    }
}