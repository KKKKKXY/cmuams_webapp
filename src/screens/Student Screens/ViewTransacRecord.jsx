import React, { Component } from 'react';
import axios from 'axios';
import PrivateNavbar from './PrivateNavbar';
import { isAuth } from '../../helpers/auth';
import Moment from 'moment';

const Transaction = props => (
  <tr>
    <td>{props.transaction.senderEmail}</td>
    <td>{props.transaction.recipientEmail}</td>
    <td>{props.transaction.amount}</td>
    <td>{Moment(props.transaction.transferDate).format('MMMM Do YYYY, HH:mm:ss')}</td>
  </tr>
)

export default class ViewTransacRecordList extends Component {
  constructor(props) {
    super(props);
    this.state = { userTransac: [] };
  }

  componentDidMount() {
    let all = []
    let transfer = []
    axios
      .get(`${process.env.REACT_APP_API_URL}/transacHistory/${isAuth()._id}`)
      .then(response => {
        console.log(response)
        all = response.data.transfer
        this.setState({ userTransac: all })
      })
      .catch((error) => {
        console.log(error);
      })
  }

  transacRecordList() {
    return this.state.userTransac.map(currenttransac => {
      return <Transaction transaction={currenttransac} key={currenttransac._id} />;
    })
  }

  render() {
    return (
      <div className="container">
        <PrivateNavbar />
        <div></div>
        <table className="table table-bordered">
          <thead className="thead-light">
            <tr>
              <td>Sender Email</td>
              <td>Recipient Email</td>
              <td>Amount</td>
              <td>Transfer Date</td>
            </tr>
          </thead>
          <tbody>
            {this.transacRecordList()}
          </tbody>
        </table>
      </div>
    )
  }
}