import React, { Component, useState } from 'react';
import axios from 'axios';
import PrivateNavbar from './PrivateNavbar';
import Tooltip from '@material-ui/core/Tooltip';
import { isAuth, setActivityLocalStorage } from '../helpers/auth';
import { ToastContainer, toast } from 'react-toastify';
import Popup from "../helpers/Popup";
import BidForm from "./BidForm"
import * as bidActivityService from "../services/BidActivityService";

const Activities = props => {
    const [openPopup, setOpenPopup] = useState(false)
    const [records, setRecords] = useState(bidActivityService.getAllTransfers())
    const bid = (transter, resetForm) => {
        if (transter.id == 0)
            bidActivityService.insertTransfer(transter)
        resetForm()
        setOpenPopup(false)
        setRecords(bidActivityService.getAllTransfers())
    }

    return (
        <>
            < tr >
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
                        <a href="#" onClick={() => { setOpenPopup(true); }}><i className="fas fa-plus-square" aria-hidden="true"></i></a>
                        {/* <a href="#" onClick={() => { props.enrollActivity(props.activity._id) }}><i className="fas fa-plus-square" aria-hidden="true"></i></a> */}
                    </Tooltip>
                </td>
            </tr >

            <Popup
                title="Bidding Activity Transfer"
                openPopup={openPopup}
                setOpenPopup={setOpenPopup}
            >
                <BidForm bid={bid}  options={props.catchActivity()}/>
            </Popup>
        </>
    )
}

function Receiver(id, name) {
    this.id = id;
    this.name = name;
}

export default class StuViewActivity extends Component {

    constructor(props) {
        super(props);
        this.enrollActivity = this.enrollActivity.bind(this);
        this.catchActivity = this.catchActivity.bind(this);
        this.state = {
            activities: [],
            options: []
        };
    }

    componentDidMount() {
        axios.get(`${process.env.REACT_APP_API_URL}/activities`)
            .then(response => {
                let tmpArray = []
                for (var i = 0; i < response.data.length; i++) {
                    tmpArray.push(new Receiver((i + 1).toString(), response.data[i].activityName))
                }
                this.setState({
                    activities: response.data,
                    options: tmpArray
                })
                console.log('componentDidMount()');
                console.log(this.state.options);

            })
            .catch((error) => {
                console.log(error);
            })
    }

    catchActivity() {
        return this.state.options;
    }

    enrollActivity(activityId) {
        axios.post(`${process.env.REACT_APP_API_URL}/student/enrollActivity/${activityId}/${isAuth()._id}`)
            .then(res => {
                setActivityLocalStorage(res, () => { });
                toast.success(res.data.message);
            })
            .catch(err => {
                console.log(err.response);
                toast.error(err.response.data.error);
                toast.error(err.response.data.errors);
            });
    }

    activityList() {
        return this.state.activities.map(currentactivity => {
            return <Activities activity={currentactivity} key={currentactivity._id} catchActivity={this.catchActivity} enrollActivity={this.enrollActivity} />;
        })
    }

    render() {
        return (
            <div className="container">
                <PrivateNavbar />
                <div></div>
                <ToastContainer />
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