import React, { Component } from 'react';
import PrivateNavbar from '../PrivateNavbar';
import { ToastContainer } from 'react-toastify';
import { BidOneResult } from './BidOneResult';
import { BidTwoResult } from './BidTwoResult';
import { EnrolledList } from './EnrolledList';

export default class BiddingSummary extends Component {

  render() {
    return (
      <div className="container">

        <PrivateNavbar />
        <div></div>
        <ToastContainer />

        <BidOneResult/>
        {/* <BidTwoResult /> */}
        {/* <EnrolledList /> */}

      </div>
    )
  }
}