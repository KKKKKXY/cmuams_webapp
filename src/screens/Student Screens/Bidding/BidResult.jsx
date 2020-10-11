import React, { Component, useState } from 'react';
import axios from 'axios';
import { isAuth } from '../../../helpers/auth';
import * as bidActivityService from "../../../services/BidActivityService";
import Table from 'react-bootstrap/Table'
import Tooltip from '@material-ui/core/Tooltip';
import Popup from "../../../helpers/Popup";
import UpdateCoinForm from "./Popup Forms/UpdateCoinForm"
import Moment from 'moment';

const BidResultList = props => {
    const [openPopup, setOpenPopup] = useState(false)
    const bid = (transter, resetForm) => {
        console.log('Can Update Coins')
        bidActivityService.updateCoinsAmount(transter)
        resetForm()
        setOpenPopup(false)
    }

    return (
        <>
            <tr>
                <td>{props.bidResult.rank}</td>
                <td>{props.bidResult.to}</td>
                <td>{props.bidResult.amount}</td>
                <td>{props.bidResult.last}</td>
                <td>{props.bidResult.end}</td>
                <td>
                    <Tooltip title="Update coins" placement="left">
                        <a href="#" onClick={() => { setOpenPopup(true) }}><i className='fas fa-sync-alt fa-2x' style={{
                            color: '#4993DD',
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center"
                        }}></i></a>
                    </Tooltip>
                </td>
            </tr>

            <Popup
                title="Update your coins amount"
                subtitle="Please check and input coins amount"
                openPopup={openPopup}
                setOpenPopup={setOpenPopup}
            >
                <UpdateCoinForm bid={bid} activityName={props.bidResult.to} />
            </Popup>
        </>
    )
}

const Sort = props => (
    <tr>
        <td>{props.sortList.student}</td>
        <td>{props.sortList.to}</td>
        <td>{props.sortList.amount}</td>
        <td>{props.sortList.transferDate}</td>
    </tr>
)

function Result(_id, rank, to, amount, last, end) {
    this._id = _id;
    this.rank = rank;
    this.to = to;
    this.amount = amount;
    this.last = last;
    this.end = end;
}

function All(_id, to, amount, student, transferDate) {
    this._id = _id;
    this.to = to;
    this.amount = amount;
    this.student = student;
    this.transferDate = transferDate;
}

export class BidResult extends Component {

    constructor(props) {
        super(props);

        this.state = {
            rank: '',
            to: '',
            amount: '',
            last: '',
            end: '',
            result: [],
            allTransfer: []
        };
    }

    componentDidMount() {
        axios.get(`${process.env.REACT_APP_API_URL}/activities`)
            .then(response => {
                let activities = response.data
                let students = []
                let _id = ''
                let rank = ''
                let to = ''
                let amount = ''
                let last = ''
                let end = ''
                let result = []
                let allTransfer = []

                console.log(isAuth().name)
                for (var i = 0; i < activities.length; i++) {
                    // toast.info('You don\'t have activity to bid');
                    students = activities[i].students

                    if (students.length > 0) {
                        students.sort((a, b) => {
                            //sort by amount
                            if (a.amount < b.amount)
                                return 1;
                            else if (a.amount > b.amount)
                                return -1;

                            //sort by date
                            if (a.transferDate < b.transferDate)
                                return -1;
                            else if (a.transferDate > b.transferDate)
                                return 1;

                            return 0;
                        })

                        const bidTransfer = students.filter(student => student.student == isAuth().name)

                        const bidDate = activities[i].bidDate
                        const date = ((new Date(bidDate)).setHours((new Date(bidDate)).getHours() + 1))

                        _id = bidTransfer[0]._id
                        rank = students.findIndex(currentsortList => { return currentsortList.student == isAuth().name; }) + 1
                        to = activities[i].activityName
                        amount = parseInt(bidTransfer[0].amount)
                        last = students[students.length - 1].amount
                        end = Moment(date).format('MMMM Do YYYY, h:30:00 a')

                        if (bidTransfer != '') {
                            result.push(new Result(_id, rank, to, amount, last, end))
                        }

                        for (var j = 0; j < students.length; j++) {
                            allTransfer.push(new All(students[j]._id, to, students[j].amount, students[j].student, Moment(students[j].transferDate).format('MMMM Do YYYY, h:mm:ss a')))
                        }
                    }
                    else {
                        console.log('length <= 0')
                        // toast.info('You don\'t have bidding activity');
                    }
                }
                this.setState({
                    rank: rank,
                    to: to,
                    amount: amount,
                    last: last,
                    end: end,
                    result: result,
                    allTransfer: allTransfer
                })

                console.log(this.state)
            })
            .catch((error) => {
                console.log(error);
            })
    }

    sleep(time) {
        return new Promise((resolve) => setTimeout(resolve, time)
        )
    }

    bidResultList() {

        return this.state.result.map(currentbidResult => {

            const nowDate = Moment(new Date()).format('MMMM Do YYYY, h:mm:ss a')
            // if (nowDate < this.start()) {
            //     console.log('not reach start time')
            //     toast.warning('The time for bidding has not yet reached');

            //     this.sleep(2500).then(() => {
            //         toast.info('Please back on: ' + this.start());
            //     })

            //     return null;
            // }

            // else 
            console.log(currentbidResult)
            console.log(currentbidResult.end)
            console.log(nowDate > currentbidResult.end)
            // if (nowDate > currentbidResult.end) {
            //     console.log('more than end time')
            //     console.log(currentbidResult.to)
            //     toast.info('Time is up for bidding \'' + currentbidResult.to + '\'  !!!');
            //     currentbidResult = null
            // axios.
            //     post(`${process.env.REACT_APP_API_URL}/cleanUpRound1List`,
            //         {
            //             to: currentbidResult.to
            //         })
            //     .then(res => {
            //         console.log('delete all round 1 bid result! ')
            //         console.log(res)
            //         toast.error(res.data.message);
            //     })
            //     .catch(err => {
            //         console.log(err.response);
            //         toast.error(err.response.data.error);
            //         toast.error(err.response.data.errors);
            //     });
            // }
            // else {
            console.log('valid bid time')
            console.log(currentbidResult._id)
            return <BidResultList bidResult={currentbidResult} key={currentbidResult._id} />;
            // }
        })
    }

    sortList() {
        return this.state.allTransfer.map(currentsortList => {
            console.log(currentsortList._id)
            return <Sort sortList={currentsortList} key={currentsortList._id} />;
        })
    }

    render() {
        return (
            <div>
                <h5 style={{ 'color': 'grey' }}>Bid Result</h5>

                <Table responsive="xl"
                    striped bordered hover size="sm"
                    className="table table-bordered"
                    style={{ 'marginBottom': '30px' }}
                    title="Employee Details"
                >
                    <thead style={{ backgroundColor: '#FFD632' }}>
                        <tr>
                            <td>Rank</td>
                            <td>Activity Name</td>
                            <td>Amount</td>
                            <td>Lastone pay amount</td>
                            <td>Bid End Time</td>
                            <td>Update Coins</td>
                        </tr>
                    </thead>
                    <tbody>
                        {this.bidResultList()}
                    </tbody>
                </Table>

                <h5 style={{ 'color': 'grey' }}>Bid List</h5>
                <Table
                    responsive="xl"
                    striped bordered hover
                    size="sm"
                    className="table table-bordered"
                    style={{ 'marginBottom': '30px' }}
                >
                    <thead style={{ backgroundColor: '#FFD632' }}>
                        <tr>
                            <td>Student</td>
                            <td>to</td>
                            <td>Amonut</td>
                            <td>Date</td>
                        </tr>
                    </thead>
                    <tbody>
                        {this.sortList()}
                    </tbody>
                </Table>

            </div>
        );
    }

}