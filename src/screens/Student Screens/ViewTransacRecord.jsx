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

export default class ViewTransacRecordList extends Component {
  constructor(props) {
    super(props);
    this.state = { userTransac: [] };
  }

  componentDidMount() {
    axios
      .get(`${process.env.REACT_APP_API_URL}/user/${isAuth()._id}`)
      .then(response => {
        if (isAuth().enrolled == "") {
          toast.error("There are no transactions");
        }
        this.setState({ userTransac: response.data.transaction })
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