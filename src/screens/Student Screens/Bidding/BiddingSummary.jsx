import React, { Component } from 'react';
import PrivateNavbar from '../PrivateNavbar';
import { ToastContainer } from 'react-toastify';
import { BidResult } from './BidResult';
import { PendingTransfer } from './PendingTransfer';

export default class BiddingSummary extends Component {

  render() {
    return (
      <div className="container">

        <PrivateNavbar />
        <div></div>
        <ToastContainer />

        <BidResult/>
        <PendingTransfer />

      </div>
    )
  }
}