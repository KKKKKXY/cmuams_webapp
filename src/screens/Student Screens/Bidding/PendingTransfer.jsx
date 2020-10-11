import React, { Component, useState } from 'react';
import axios from 'axios';
import { isAuth } from '../../../helpers/auth';
import Table from 'react-bootstrap/Table'
import Tooltip from '@material-ui/core/Tooltip';
import Popup from "../../../helpers/Popup";
import Moment from 'moment';
import PendingTransferForm from "./Popup Forms/PendingTransferForm"
import { toast } from 'react-toastify';


const Transfer = props => {
    const [openPopup, setOpenPopup] = useState(false)

    return (
        <>
            <tr>
                <td>{props.pendingTransfer.rank}</td>
                <td>{props.pendingTransfer.to}</td>
                <td>{props.pendingTransfer.amount}</td>
                <td>{props.pendingTransfer.last}</td>
                <td>{props.pendingTransfer.end}</td>
                <td>
                    <Tooltip title="Confirm Transfer Information" placement="left">
                        <a href="#" onClick={() => { setOpenPopup(true) }}><i className='fas fa-exchange-alt fa-2x'
                            style={{
                                color: '#7AA300',
                                display: "flex",
                                justifyContent: "center",
                                alignItems: "center"
                            }}>
                        </i></a>
                    </Tooltip>
                </td>
            </tr>

            <Popup
                title="Confirm Information To Complete Transfer"
                subtitle="The last process for signing up activity"
                openPopup={openPopup}
                setOpenPopup={setOpenPopup}
            >
                <PendingTransferForm activityName={props.pendingTransfer.to} amount={props.pendingTransfer.amount}/>
            </Popup>
        </>
    )
}

function Result(_id, rank, to, amount, last, end) {
    this._id = _id;
    this.rank = rank;
    this.to = to;
    this.amount = amount;
    this.last = last;
    this.end = end;
}

export class PendingTransfer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            rank: '',
            to: '',
            amount: '',
            last: '',
            end: '',
            pendingBid: []
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
                let pendingBid = []

                for (var i = 0; i < activities.length; i++) {
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
                            pendingBid.push(new Result(_id, rank, to, amount, last, end))
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
                    pendingBid: pendingBid
                })
            })
            .catch((error) => {
                console.log(error);
            })


        // this.setState({
        //         pendingBid: response.data.filter(transfers => transfers.from == isAuth().name),
        //         sortList: (response.data).sort((a, b) => {
        //             //sort by amount
        //             if (a.amount < b.amount)
        //                 return 1;
        //             else if (a.amount > b.amount)
        //                 return -1;

        //             //sort by name
        //             if (a.date < b.date)
        //                 return -1;
        //             else if (a.date > b.date)
        //                 return 1;

        //             return 0;
        //         })
        //     })

        // console.log('Bid Result: ')
        // console.log(this.state.bidOneResult)
        // console.log('Sort List: ')
        // console.log(this.state.sortList)

        //     this.sleep(3000).then(() => {
        //         toast.warning('You have transfer not complete')
        //     })
        // })
        // .catch((error) => {
        //     console.log(error);

    }

    sleep(time) {
        return new Promise((resolve) => setTimeout(resolve, time)
        )
    }

    pendingTransferList() {
        return this.state.pendingBid.map(currentPendingTransfer => {
            const nowDate = Moment(new Date()).format('MMMM Do YYYY, h:mm:ss a')
            return <Transfer pendingTransfer={currentPendingTransfer} key={currentPendingTransfer._id} />;
        })


        // console.log('bid 2 transfer')
        // console.log(this.state.pendingBid)

        // return this.state.pendingBid.map(currentpendingBid => {
        //     console.log('start time: ' + this.start())
        //     console.log('end time: ' + this.end())

        //     const nowDate = Moment(new Date()).format('MMMM Do YYYY, h:mm:ss a')
        //     if (nowDate < this.start()) {
        //         console.log('not reach start time')
        //         this.sleep(5000).then(() => {
        //             toast.warning('The time for transfering has not yet reached');
        //         })

        //         this.sleep(2500).then(() => {
        //             toast.info('Please back on: ' + this.start());
        //         })

        //         return null;
        //     }
        //     else if (nowDate > this.end()) {
        //         console.log('more than and time')
        //         console.log(currentpendingBid.to)
        //         axios.
        //             post(`${process.env.REACT_APP_API_URL}/cleanUpRound2List`,
        //                 {
        //                     to: currentpendingBid.to
        //                 })
        //             .then(res => {
        //                 console.log('delete all round 2 bid result! ')
        //                 this.sleep(2500).then(() => {
        //                     toast.error(res.data.message);
        //                 })

        //             })
        //             .catch(err => {
        //                 console.log(err.response);
        //                 this.sleep(2500).then(() => {

        //                     toast.error(err.response.data.error);
        //                     toast.error(err.response.data.errors);
        //                 })
        //             });
        //     }
        //     else {
        //         console.log('between two times')
        //         return <Transfer pendingTransfer={currentpendingBid} key={currentpendingBid._id} rank={this.rank()} start={this.start()} end={this.end()} />;

        //     }

        // })

        // console.log('bid 2 transfer')
        // console.log(this.state.pendingBid)
        // return this.state.pendingBid.map(currentpendingBid => {
        //     return <Transfer pendingTransfer={currentpendingBid} key={currentpendingBid._id} rank={this.rank()} start={this.start()} end={this.end()} />;
        // })
    }

    render() {
        return (
            <div>
                <h5 style={{ 'color': 'grey' }}>Watting to transfer</h5>
                <Table
                    responsive="xl"
                    striped bordered hover
                    size="sm"
                    className="table table-bordered"
                    style={{ 'marginBottom': '30px' }}
                >
                    <thead style={{ backgroundColor: '#C9CCC7' }}>
                        <tr>
                            <td>Rank</td>
                            <td>Activity Name</td>
                            <td>Amount</td>
                            <td>Lastone pay amount</td>
                            <td>Bid End Time</td>
                            <td>Transfer</td>
                        </tr>
                    </thead>
                    <tbody>
                        {this.pendingTransferList()}
                    </tbody>
                </Table>
            </div>
        );
    }

}