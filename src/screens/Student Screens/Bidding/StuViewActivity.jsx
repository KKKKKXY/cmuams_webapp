import React, { Component, useState } from 'react';
import axios from 'axios';
import PrivateNavbar from '../PrivateNavbar';
import Tooltip from '@material-ui/core/Tooltip';
import { ToastContainer, toast } from 'react-toastify';
import Popup from "../../../helpers/Popup";
import BidForm from "./Popup Forms/BidForm"
import * as bidActivityService from "../../../services/BidActivityService";
import Table from 'react-bootstrap/Table'
import { Button } from 'react-bootstrap';
import { setActivityLocalStorage } from '../../../helpers/auth';

const Activities = props => {
    const [openPopup, setOpenPopup] = useState(false)

    const bid = (transter, resetForm) => {
        console.log('Bid Round 1')
        bidActivityService.insertBidTransfer(transter)
        resetForm()
        setOpenPopup(false)
    }

    return (
        <>
            < tr >
                <td>{props.activity.activityName}</td>
                <td>{props.activity.description}</td>
                <td>{props.activity.bidDate}</td>
                <td>{props.activity.seats}</td>
                <td>
                <Tooltip title="Activity information" placement="right">
                    <a href="#" onClick={() => props.viewActivityInfo(props.activity._id)}><i className='fa fa-search-plus fa-2x' style={{ color: 'grey' }}></i></a>
                </Tooltip>
                </td>
                <td>
                    <Tooltip title="Bid Activity" placement="right">
                        <a href="#" onClick={() => setOpenPopup(true)}>
                            <i className='fas fa-coins fa-2x' style={{ color: '#E2C000' }}></i>
                        </a>
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

function BidActivityName(id, activityName, activityDate, bidDate) {
    this.id = id;
    this.activityName = activityName;
    this.activityDate = activityDate;
    this.bidDate = bidDate;
}

export default class StuViewActivity extends Component {

    constructor(props) {
        super(props);
        this.catchActivity = this.catchActivity.bind(this);
        this.viewActivityInfo = this.viewActivityInfo.bind(this);

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
                    tmpArray.push(new BidActivityName((i + 1).toString(), response.data[i].activityName, response.data[i].activityDate, response.data[i].bidDate))
                }
                this.setState({
                    activities: (response.data).sort((a, b) => {
                        //sort by date
                        if (a.bidDate < b.bidDate)
                            return -1;
                        else if (a.bidDate > b.bidDate)
                            return 1;

                        return 0;
                    }),
                    options: tmpArray
                })
            })
            .catch((error) => {
                console.log(error);
            })
    }

    catchActivity() {
        return this.state.options;
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

    activityList() {
        return this.state.activities.map(currentactivity => {
            return <Activities activity={currentactivity} key={currentactivity._id} catchActivity={this.catchActivity} viewActivityInfo={this.viewActivityInfo}/>;
        })
    }

    render() {
        return (
            <div className="container">
                <PrivateNavbar />
                <ToastContainer />
                <Table
                    responsive="xl"
                    striped bordered hover
                    size="sm"
                    className="table table-bordered"
                >
                    <thead className="thead-light">
                        <tr>
                            <td>Name</td>
                            <td>Description</td>
                            <td>Bidding Date</td>
                            <td>Seats</td>
                            <td>More</td>
                            <td>Bid</td>
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