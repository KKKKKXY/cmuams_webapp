import React, { Component, useState } from 'react';
import axios from 'axios';
import { isAuth } from '../../../helpers/auth';
import Table from 'react-bootstrap/Table'
import Tooltip from '@material-ui/core/Tooltip';
import Popup from "../../../helpers/Popup";
import Moment from 'moment';
import PendingTransferForm from "./PendingTransferForm"
import { toast } from 'react-toastify';


const Transfer = props => {
    const [openPopup, setOpenPopup] = useState(false)

    return (
        <>
            <tr>
                <td>{props.rank}</td>
                <td>{props.pendingTransfer.to}</td>
                <td>{props.pendingTransfer.amount}</td>
                <td>{props.start}</td>
                <td>{props.end}</td>
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
                <PendingTransferForm activityName={props.pendingTransfer.to} amount={props.pendingTransfer.amount} />
            </Popup>
        </>
    )
}

const Sort = props => (
    <tr>
        <td>{props.sortList.from}</td>
        <td>{props.sortList.to}</td>
        <td>{props.sortList.date}</td>
        <td>{props.sortList.amount}</td>
    </tr>
)


export class BidTwoResult extends Component {
    constructor(props) {
        super(props);
        this.state = {
            pendingBid: [],
            sortList: []
        };
    }

    componentDidMount() {
        axios.get(`${process.env.REACT_APP_API_URL}/secondBidRoundTransfer`)
            .then(response => {
                this.setState({
                    pendingBid: response.data.filter(transfers => transfers.from == isAuth().name),
                    sortList: (response.data).sort((a, b) => {
                        //sort by amount
                        if (a.amount < b.amount)
                            return 1;
                        else if (a.amount > b.amount)
                            return -1;

                        //sort by name
                        if (a.date < b.date)
                            return -1;
                        else if (a.date > b.date)
                            return 1;

                        return 0;
                    })
                })
                this.sleep(3000).then(() => {
                    toast.warning('You have transfer not complete')
                })
            })
            .catch((error) => {
                console.log(error);
            })
    }

    sleep(time) {
        return new Promise((resolve) => setTimeout(resolve, time)
        )
    }

    pendingTransferList() {
        console.log('bid 2 transfer')
        console.log(this.state.pendingBid)

        return this.state.pendingBid.map(currentpendingBid => {
            console.log('start time: ' + this.start())
            console.log('end time: ' + this.end())

            const nowDate = Moment(new Date()).format('MMMM Do YYYY, h:mm:ss a')
            if (nowDate < this.start()) {
                console.log('not reach start time')
                this.sleep(5000).then(() => {
                    toast.warning('The time for transfering has not yet reached');
                })

                this.sleep(2500).then(() => {
                    toast.info('Please back on: ' + this.start());
                })

                return null;
            }
            else if (nowDate > this.end()) {
                console.log('more than and time')
                console.log(currentpendingBid.to)
                axios.
                    post(`${process.env.REACT_APP_API_URL}/cleanUpRound2List`,
                        {
                            to: currentpendingBid.to
                        })
                    .then(res => {
                        console.log('delete all round 2 bid result! ')
                        this.sleep(2500).then(() => {
                            toast.error(res.data.message);
                        })

                    })
                    .catch(err => {
                        console.log(err.response);
                        this.sleep(2500).then(() => {

                            toast.error(err.response.data.error);
                            toast.error(err.response.data.errors);
                        })
                        });
            }
            else {
                console.log('between two times')
                return <Transfer pendingTransfer={currentpendingBid} key={currentpendingBid._id} rank={this.rank()} start={this.start()} end={this.end()} />;

            }

    })

    // console.log('bid 2 transfer')
    // console.log(this.state.pendingBid)
    // return this.state.pendingBid.map(currentpendingBid => {
    //     return <Transfer pendingTransfer={currentpendingBid} key={currentpendingBid._id} rank={this.rank()} start={this.start()} end={this.end()} />;
    // })
}

rank() {
    return (this.state.sortList.findIndex(currentsortList => {
        return currentsortList.from == isAuth().name;
    })) + 1
}

start() {
    const transferStartDate = this.state.pendingBid.map(result => result.date)
    const date = (new Date(transferStartDate)).setHours((new Date(transferStartDate)).getHours() + 1)
    return Moment(date).format('MMMM Do YYYY, h:30:00 a')
}

end() {
    const transferStartDate = this.state.pendingBid.map(result => result.date)
    const date = (new Date(transferStartDate)).setHours((new Date(transferStartDate)).getHours() + 2)

    return Moment(date).format('MMMM Do YYYY, h:00:00 a')
}

sortList() {
    return this.state.sortList.map(currentsortList => {
        return <Sort sortList={currentsortList} key={currentsortList._id} />;
    })
}

render() {
    return (
        <div>

            <h5 style={{ 'color': 'grey' }}>2nd Round Bid Result</h5>

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
                        <td>Transfer Start</td>
                        <td>Transfer End</td>
                        <td>Transfer</td>
                    </tr>
                </thead>
                <tbody>
                    {this.pendingTransferList()}
                </tbody>
            </Table>

            <h5 style={{ 'color': 'grey' }}>Bid Two List</h5>
            <Table
                responsive="xl"
                striped bordered hover
                size="sm"
                className="table table-bordered"
                style={{ 'marginBottom': '30px' }}
            >
                <thead style={{ backgroundColor: '#C9CCC7' }}>
                    <tr>
                        <td>from</td>
                        <td>to</td>
                        <td>date</td>
                        <td>amonut</td>
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