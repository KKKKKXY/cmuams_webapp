import React from 'react';
import PrivateNavbar from './PrivateNavbar';


function Rules({ history }) {
    return (
        <div className="container">
                <PrivateNavbar />       
      <div className='min-h-screen bg-gray-100 text-gray-900 flex justify-center'>
        <div className='max-w-screen-xl m-0 sm:m-20 bg-white shadow sm:rounded-lg flex justify-center flex-1'>
          <div className='lg:w-1/2 xl:w-5/12 p-6 sm:p-12'>
            <div className='mt-12 flex flex-col'>
              <h1 className='text-2xl xl:text-3xl font-extrabold'>
                ----A.M.S.----
              </h1>
              <p>
              AMS is committed to enabling students to compete for activities with limited seats in a fairer way. The bidding rules are as follows:
              </p>
              <p>
                  1. There are two rounds of bidding for each actvity.
              </p>
              <p>
                  2. Every student in this system is eligible to enter the first round of bidding.
              </p>
              <p>
                  3. Only students who bid in the first round are eligible to enter the second round of bidding.
              </p>
              <p>
                  4. Only students who bid in the second round and whose bid rank is within the number specified in the activity will be eligible to transfer coins to the activity.
              </p>
              <p>
                  5. Only students who transfer coins to the activity are enrolled successful.
              </p>
              
                <div className='my-12 border-b text-center'>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
  
  export default Rules;