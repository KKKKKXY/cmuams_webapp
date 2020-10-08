import React, { Component, useState } from 'react';
import axios from 'axios';
import { isAuth } from '../../../helpers/auth';
import * as bidActivityService from "../../../services/BidActivityService";
import Table from 'react-bootstrap/Table'
import Tooltip from '@material-ui/core/Tooltip';
import Popup from "../../../helpers/Popup";
import Bid2Form from "./Bid2Form"
import Moment from 'moment';
import { toast } from 'react-toastify';


const SecondBid = props => {
    const [openPopup, setOpenPopup] = useState(false)
    const bid = (transter, resetForm) => {
        console.log('Bid Round 2')
        if (transter.id == 0)
            bidActivityService.insert2ndTransfer(transter)
        resetForm()
        setOpenPopup(false)
    }

    return (
        <>
            <tr>
                <td>{props.rank}</td>
                <td>{props.bidResult.to}</td>
                <td>{props.bidResult.amount}</td>
                <td>{props.last}</td>
                <td>{props.start}</td>
                <td>{props.end}</td>
                <td>
                    <Tooltip title="Bid 2nd Round" placement="left">
                        <a href="#" onClick={() => { setOpenPopup(true) }}><i className='fas fa-coins fa-2x' style={{ color: '#E2C000' }}></i></a>
                    </Tooltip>
                </td>
            </tr>

            <Popup
                title="Bidding Activity Transfer Round 2"
                subtitle="2nd Round"
                openPopup={openPopup}
                setOpenPopup={setOpenPopup}
            >
                <Bid2Form bid={bid} activityName={props.bidResult.to} />
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


export class BidOneResult extends Component {

    constructor(props) {
        super(props);
        this.rank = this.rank.bind(this)
        this.start = this.start.bind(this)
        this.end = this.end.bind(this)

        this.state = {
            bidOneResult: [],
            sortList: []
        };
    }

    componentDidMount() {
        axios.get(`${process.env.REACT_APP_API_URL}/firstBidRoundTransfer`)
            .then(response => {
                console.log(response.data)
                if (response.data == '') {
                    toast.info('You don\'t have activity to bid');
                }
                this.setState({
                    bidOneResult: response.data.filter(transfers => transfers.from == isAuth().name),
                    sortList: (response.data).sort((a, b) => {
                        //sort by amount
                        if (a.amount < b.amount)
                            return 1;
                        else if (a.amount > b.amount)
                            return -1;

                        //sort by date
                        if (a.date < b.date)
                            return -1;
                        else if (a.date > b.date)
                            return 1;

                        return 0;
                    })
                })
                // console.log('Bid Result: ')
                // console.log(this.state.bidOneResult)
                // console.log('Sort List: ')
                // console.log(this.state.sortList)
            })
            .catch((error) => {
                console.log(error);
            })
    }

    sleep(time) {
        return new Promise((resolve) => setTimeout(resolve, time)
        )
    }

    bidOneResultList() {
        console.log('bid 1 transfer')
        console.log(this.state.bidOneResult)
        return this.state.bidOneResult.map(currentbidResult => {
            console.log('start time: ' + this.start())
            console.log('end time: ' + this.end())

            const nowDate = Moment(new Date()).format('MMMM Do YYYY, h:mm:ss a')
            if (nowDate < this.start()) {
                console.log('not reach start time')
                toast.warning('The time for bidding has not yet reached');

                this.sleep(2500).then(() => {
                    toast.info('Please back on: ' + this.start());
                })

                return null;
            }

            else if (nowDate > this.end()) {
                console.log('more than and time')
                console.log(currentbidResult.to)
                axios.
                    post(`${process.env.REACT_APP_API_URL}/cleanUpRound1List`,
                        {
                            to: currentbidResult.to
                        })
                    .then(res => {
                        console.log('delete all round 1 bid result! ')
                        console.log(res)
                        toast.error(res.data.message);
                    })
                    .catch(err => {
                        console.log(err.response);
                        toast.error(err.response.data.error);
                        toast.error(err.response.data.errors);
                    });
            }
            else {
                console.log('between two times')
                return <SecondBid bidResult={currentbidResult} key={currentbidResult._id} rank={this.rank()} last={this.last()} start={this.start()} end={this.end()} />;
            }
        })
    }

    sortList() {
        return this.state.sortList.map(currentsortList => {
            return <Sort sortList={currentsortList} key={currentsortList._id} />;
        })
    }

    rank() {
        return (this.state.sortList.findIndex(currentsortList => {
            return currentsortList.from == isAuth().name;
        })) + 1
    }

    last() {
        return ((this.state.sortList)[(this.state.sortList).length - 1]).amount
    }

    start() {
        const bid1StartDate = this.state.bidOneResult.map(result => result.date)
        const date = (new Date(bid1StartDate)).setHours((new Date(bid1StartDate)).getHours() + 1)

        return Moment(date).format('MMMM Do YYYY, h:00:00 a')
    }

    end() {
        const bid1StartDate = this.state.bidOneResult.map(result => result.date)
        const date = ((new Date(bid1StartDate)).setHours((new Date(bid1StartDate)).getHours() + 1))
        return Moment(date).format('MMMM Do YYYY, h:30:00 a')
    }

    render() {
        return (
            <div>
                <h5 style={{ 'color': 'grey' }}>1st Round Bid Result</h5>

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
                            <td>Bid Round 2 Start</td>
                            <td>Bid Round 2 End</td>
                            <td>Bid</td>
                        </tr>
                    </thead>
                    <tbody>
                        {this.bidOneResultList()}
                    </tbody>
                </Table>

                <h5 style={{ 'color': 'grey' }}>Bid One List</h5>
                <Table
                    responsive="xl"
                    striped bordered hover
                    size="sm"
                    className="table table-bordered"
                    style={{ 'marginBottom': '30px' }}
                >
                    <thead style={{ backgroundColor: '#FFD632' }}>
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