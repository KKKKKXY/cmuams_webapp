import React, { Component, useState } from 'react';
import axios from 'axios';
import PrivateNavbar from './PrivateNavbar';
import Tooltip from '@material-ui/core/Tooltip';
import { ToastContainer} from 'react-toastify';
import Popup from "../../helpers/Popup";
import BidForm from "./BidForm"
import * as bidActivityService from "../../services/BidActivityService";

const Activities = props => {
    const [openPopup, setOpenPopup] = useState(false)

    const bid = (transter, resetForm) => {
        console.log('Bid Round 1')
        console.log(transter)
        if (transter.id == 0)
            bidActivityService.insert1stTransfer(transter)
        resetForm()
        setOpenPopup(false)
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
                    <Tooltip title="Bid 1st Round" placement="right">
                        <a href="#" onClick={() => { setOpenPopup(true) }}><i className='fas fa-coins fa-2x' style={{ color: '#E2C000' }}></i></a>
                    </Tooltip>
                </td>
            </tr >

            <Popup
                title="Bidding Activity Transfer Round 1"
                subtitle="The activities available for bidding will be displayed"
                openPopup={openPopup}
                setOpenPopup={setOpenPopup}
            >
                <BidForm bid={bid} options={props.catchActivity()} />
            </Popup>
        </>
    )
}

function Receiver(_id, id, name, bidRound1Time, bidRound2Time) {
    this._id = _id;
    this.id = id;
    this.name = name;
    this.bidRound1Time = bidRound1Time;
    this.bidRound2Time = bidRound2Time;
}

export default class StuViewActivity extends Component {

    constructor(props) {
        super(props);
        this.catchActivity = this.catchActivity.bind(this);
        this.state = {
            activities: [],
            options: []
        };
    }

    componentDidMount() {
        //get all activities
        axios.get(`${process.env.REACT_APP_API_URL}/activities`)
            .then(response => {
                let tmpArray = []
                for (var i = 0; i < response.data.length; i++) {
                    tmpArray.push(new Receiver(response.data[i]._id, (i + 1).toString(), response.data[i].activityName, response.data[i].startDate, response.data[i].bidEndDate))
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

    activityList() {
        return this.state.activities.map(currentactivity => {
            return <Activities activity={currentactivity} key={currentactivity._id} catchActivity={this.catchActivity} />;
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