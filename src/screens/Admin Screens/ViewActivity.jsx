import React, { Component } from 'react';
import axios from 'axios';
import AdminNavbar from './AdminNavbar';
import { makeStyles } from '@material-ui/core/styles';
import Tooltip from '@material-ui/core/Tooltip';
import { setActivityLocalStorage } from '../../helpers/auth';
import { ToastContainer, toast } from 'react-toastify';
import { green } from '@material-ui/core/colors';
import Icon from '@material-ui/core/Icon';

const useStyles = makeStyles((theme) => ({
    fab: {
        paddingLeft: theme.spacing(2),
    }
}));

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
            <Tooltip title="Delete" placement="top">
                <a href="#" onClick={() => { if (window.confirm('Are you sure you wish to delete (' + props.activity.activityName + ') ?')) props.deleteActivity(props.activity._id); }}><i className="fa fa-trash" aria-hidden="true"></i></a>
            </Tooltip>
            <Tooltip title="Edit" placement="top" className={useStyles().fab}>
                <a href="#" onClick={() => props.editActivity(props.activity._id)}><i className="fas fa-pencil-alt" aria-hidden="true"></i></a>
            </Tooltip>
        </td>
    </tr>
)

export default class ViewActivity extends Component {
    constructor(props) {
        super(props);
        this.deleteActivity = this.deleteActivity.bind(this);
        this.editActivity = this.editActivity.bind(this);
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
                console.log(id);
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
            return <Activities activity={currentactivity} deleteActivity={this.deleteActivity} editActivity={this.editActivity} key={currentactivity._id} />;
        })
    }

    render() {
        return (
            <div className="container">
                <AdminNavbar />
                <ToastContainer />
                <div style={{ float: 'right' }}>
                    <Tooltip title="Create New Activity" placement="left">
                        <Icon className="fa fa-plus-circle" style={{ color: green[500], fontSize: 50, margin: 10 }} onClick={() => window.location.href = '/addActivity'}></Icon>
                    </Tooltip>
                </div>
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
                            <td>Delete/Edit</td>
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