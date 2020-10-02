import React, { useState, useEffect } from 'react';
import coinSvg from '../assets/coin.svg';
import walletSvg from '../assets/coin.svg';

import { ToastContainer, toast } from 'react-toastify';
import axios from 'axios';
import { updateUser, isAuth, getCookie, signout } from '../helpers/auth';
import PrivateNavbar from './PrivateNavbar';

const Wallet = ({ history }) => {
  const [formData, setFormData] = useState({
    name: '',
    coins: ''
  });

  useEffect(() => {
    loadProfile();
  }, []);

  const loadProfile = () => {
    const token = getCookie('token');
    axios
      .get(`${process.env.REACT_APP_API_URL}/user/${isAuth()._id}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      .then(res => {
        const {name, coins } = res.data;
        setFormData({ ...formData,  name, coins });
      })
      .catch(err => {
        toast.error(`Error To Your Information ${err.response.statusText}`);
        if (err.response.status === 401) {
          signout(() => {
            history.push('/login');
          });
        }
      });
  };

  const { name, coins } = formData;
  const handleChange = text => e => {
    setFormData({ ...formData, [text]: e.target.value });
  };

  const handleSubmit = e => {
    const token = getCookie('token');
    console.log(token);
    e.preventDefault();
    setFormData({ ...formData, textChange: 'Submitting' });
    axios
      .put(
        `${process.env.REACT_APP_API_URL}/user/update`,
        {
          name,
          coins
        },
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      )
      .then(res => {
        updateUser(res, () => {
          toast.success(res.data.message);
          setFormData({ ...formData, textChange: 'Update' });
        });
      })
      .catch(err => {
        console.log(err.response);
        toast.error(err.response.data.error);
        toast.error(err.response.data.errors);
      });
  };

  return (
    <div className="container">
      <PrivateNavbar />
      <div className='min-h-screen bg-gray-100 text-gray-900 flex justify-center'>
        <ToastContainer />
        <div className='max-w-screen-xl m-0 sm:m-20 bg-white shadow sm:rounded-lg flex justify-center flex-1'>
          <div className='lg:w-1/2 xl:w-5/12 p-6 sm:p-12'>
          <div class="row">
            </div>
      
            <div className='mt-12 flex flex-col items-center'>
              <h1 className='text-2xl xl:text-3xl font-extrabold'>
                Wallet
            </h1>

              <form
                className='w-full flex-1 mt-8 text-indigo-500'
                onSubmit={handleSubmit}
              >
                <div className='mx-auto max-w-xs relative '>
                <p className = 'text-gray-900'>Name</p>
                <input
                    className='w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white'
                    disabled
                    value={name}
                  />
                  <div className = 'leading-none px-2 inline-block text-sm text-gray-600 tracking-wide font-medium bg-white transform translate-y-1/2'></div>
                  <p className = 'text-gray-900'>Available Balance</p>
                  <input
                    className='w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white'
                    disabled
                    value={coins}
                  />

                </div>
                <div className='my-12 border-b text-center'>
                  <div className='leading-none px-2 inline-block text-sm text-gray-600 tracking-wide font-medium bg-white transform translate-y-1/2'>
                </div>
                </div>
                <div className='flex flex-col items-center'>
                <a
                    className='w-full max-w-xs font-bold shadow-sm rounded-lg py-3
           bg-indigo-100 text-gray-800 flex items-center justify-center transition-all duration-300 ease-in-out focus:outline-none hover:shadow focus:shadow-sm focus:shadow-outline mt-5'
                    href='/transfer'
                    target='_self'
                  >
                    <i className='fas fa-coins 1x w-6  -ml-2 text-indigo-500' />
                    <span className='ml-4'>Transfer</span>
                  </a>
                  <a
                    className='w-full max-w-xs font-bold shadow-sm rounded-lg py-3
           bg-indigo-100 text-gray-800 flex items-center justify-center transition-all duration-300 ease-in-out focus:outline-none hover:shadow focus:shadow-sm focus:shadow-outline mt-5'
                    href='/transacRecord'
                    target='_self'
                  >
                    <i className='fad fa-history fa 1x w-6  -ml-2 text-indigo-500' />
                    <span className='ml-4'>Transfer History</span>
                  </a>
                </div>
              </form>
            </div>
          </div>
          <div className='flex-1 bg-indigo-100 text-center hidden lg:flex'>
            <div className='m-12 xl:m-16 w-full bg-contain bg-center bg-no-repeat' style={{ backgroundImage: `url(${coinSvg})` }}></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Wallet;