import React, { Component, useState } from 'react';
import axios from 'axios';
import PrivateNavbar from './PrivateNavbar';
import { isAuth } from '../../helpers/auth';
import { ToastContainer, toast } from 'react-toastify';
import * as bidActivityService from "../../services/BidActivityService";
import Table from 'react-bootstrap/Table'
import Tooltip from '@material-ui/core/Tooltip';
import Popup from "../../helpers/Popup";
import Bid2Form from "./Bid2Form"
import Moment from 'moment';
import PendingTransferForm from "./PendingTransferForm"



const Enrolled = props => (
  <tr>
    <td>{props.enrolledActivity.activityName}</td>
    <td>{props.enrolledActivity.description}</td>
    <td>{props.enrolledActivity.startDate}</td>
    <td>{props.enrolledActivity.bidEndDate}</td>
    <td>{props.enrolledActivity.location}</td>
    <td>{props.enrolledActivity.responsiblePerson}</td>
    <td>{props.enrolledActivity.phoneNo}</td>
    <td>{props.enrolledActivity.limitParticipant}</td>
  </tr>
)

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

            {/* <a href="#" onClick={() => { setOpenPopup(true) }}><i className='fas fa-coins fa-2x' style={{ color: '#E2C000' }}></i></a> */}
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

export default class ViewEnrolledList extends Component {

  render() {
    return (
      <div className="container">

        <PrivateNavbar />
        <div></div>
        <ToastContainer />

        <BidResult />
        <PendingTransfer />
        <EnrolledL />

      </div>
    )
  }

}

export class BidResult extends Component {
  constructor(props) {
    super(props);
    this.rank = this.rank.bind(this)
    this.state = {
      bidOneResult: [],
      sortList: [],
      alltransfer: []
    };
  }

  componentDidMount() {
    axios.get(`${process.env.REACT_APP_API_URL}/firstBidRoundTransfer`)
      .then(response => {
        console.log(response.data)
        this.setState({
          alltransfer: response.data,
          bidOneResult: response.data.filter(transfers => transfers.from == isAuth().name),
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
        // console.log('Bid Result: ')
        // console.log(this.state.bidOneResult)
        // console.log('Sort List: ')
        // console.log(this.state.sortList)
      })
      .catch((error) => {
        console.log(error);
      })

  }

  bidResultList() {
    return this.state.bidOneResult.map(currentbidResult => {
      return <SecondBid bidResult={currentbidResult} key={currentbidResult._id} rank={this.rank()} last={this.last()} start={this.start()} end={this.end()} />;
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
    console.log(bid1StartDate)
    const date = (new Date(bid1StartDate)).setHours((new Date(bid1StartDate)).getHours() + 1)

    return Moment(date).format('MMMM Do YYYY, h:00:00 a')
  }

  end() {
    const bid1StartDate = this.state.bidOneResult.map(result => result.date)
    console.log(bid1StartDate)
    const date = ((new Date(bid1StartDate)).setHours((new Date(bid1StartDate)).getHours() + 2))
    return Moment(date).format('MMMM Do YYYY, h:00:00 a')
  }

  render() {
    return (
      <div style={{ 'marginTop': '10px' }}>
        <h5 style={{ 'color': 'grey', 'backgroundColor': '#FFD632' }}>1st Round Bid Result</h5>

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
            {this.bidResultList()}
          </tbody>
        </Table>

        <h5 style={{ 'color': 'grey', 'backgroundColor': '#C9CCC7' }}>Transter List</h5>
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

export class EnrolledL extends Component {
  constructor(props) {
    super(props);

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
        console.log(response.data)
      })
      .catch((error) => {
        console.log(error);
      })
  }

  enrolledActivityList() {
    return this.state.userInfo.map(currentenrolledactivity => {
      return <Enrolled enrolledActivity={currentenrolledactivity} key={currentenrolledactivity._id} />;
    })
  }

  render() {
    return (

      <div>
        <h5 style={{ 'color': 'grey', 'backgroundColor': '#71CE3B' }}>Enrolled Activities</h5>

        <Table
          responsive="xl"
          striped bordered hover
          size="sm"
          className="table table-bordered"
          style={{ 'marginBottom': '30px' }}
        >
          <thead style={{ backgroundColor: '#71CE3B' }}>
            <tr>
              <td>Name</td>
              <td>Description</td>
              <td>Start Date</td>
              <td>Bid End Date</td>
              <td>Location</td>
              <td>Responsible Person</td>
              <td>Phone No</td>
              <td>Limit Participant</td>
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

export class PendingTransfer extends Component {
  constructor(props) {
    super(props);
    this.rank = this.rank.bind(this)
    this.state = {
      pendingBid: [],
      sortList: []
    };
  }

  componentDidMount() {
    axios.get(`${process.env.REACT_APP_API_URL}/secondBidRoundTransfer`)
      .then(response => {
        this.setState({
          pendingBid: response.data,
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
      })
      .catch((error) => {
        console.log(error);
      })
  }

  pendingTransferList() {
    return this.state.pendingBid.map(currentpendingBid => {
      return <Transfer pendingTransfer={currentpendingBid} key={currentpendingBid._id} rank={this.rank()} start={this.start()} end={this.end()} />;
    })
  }

  rank() {
    return (this.state.sortList.findIndex(currentsortList => {
      return currentsortList.from == isAuth().name;
    })) + 1
  }

  start() {
    const transferStartDate = this.state.pendingBid.map(result => result.date)
    console.log(transferStartDate)
    const date = (new Date(transferStartDate)).setHours((new Date(transferStartDate)).getHours() + 1)

    return Moment(date).format('MMMM Do YYYY, h:00:00 a')
  }

  end() {
    const transferStartDate = this.state.pendingBid.map(result => result.date)
    console.log(transferStartDate)
    const date = (new Date(transferStartDate)).setHours((new Date(transferStartDate)).getHours() + 2)

    return Moment(date).format('MMMM Do YYYY, h:00:00 a')
  }

  render() {
    return (
      <div>

        <h5 style={{ 'color': 'grey', 'backgroundColor': '#C9CCC7' }}>2nd Round Bid Result</h5>

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
      </div>
    );
  }

}