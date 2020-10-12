import React, { Component } from 'react';
import axios from 'axios';
import PrivateNavbar from './PrivateNavbar';
import { isAuth } from '../../helpers/auth';
import { toast } from 'react-toastify';

const Transaction = props => (
  <tr>
    <td>{props.transaction.senderEmail}</td>
    <td>{props.transaction.recipientEmail}</td>
    <td>{props.transaction.amount}</td>
    <td>{props.transaction.transferDate}</td>
  </tr>
)

function Transac(senderEmail, recipientEmail, amount, transferDate) {
  this.senderEmail = senderEmail;
  this.recipientEmail = recipientEmail;
  this.amount = amount;
  this.transferDate = transferDate;
}

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
        all = (response.data.transfer)[0]
        console.log(all)
        for (var i = 0; i < all.length; i++) {
          transfer.push(new Transac(all[i].senderEmail, all[i].recipientEmail, all[i].amount, all[i].transferDate))
        }
        console.log(transfer)

        this.setState({ userTransac: transfer })
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
              <td>From</td>
              <td>To</td>
              <td>Amount</td>
              <td>Timestamp</td>
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