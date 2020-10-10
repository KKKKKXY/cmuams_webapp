import React, { useState, useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import axios from 'axios';
import { getCookie, signout, activityId, updateActivity } from '../../helpers/auth';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import AdminNavbar from './AdminNavbar';

const EditActivity = ({ history }) => {
  const [formData, setFormData] = useState({
    activityName: '',
    description: '',
    activityDate: '',
    bidDate: '',
    location: '',
    responsiblePerson: '',
    contact: '',
    seats: '',
    textChange: 'Update'
  });

  useEffect(() => {
    loadActivity();
  }, []);

  const loadActivity = () => {
    axios
      .get(`${process.env.REACT_APP_API_URL}/activity/${activityId()._id}`)
      .then(res => {
        const { activityName, description, activityDate, bidDate, location, responsiblePerson, contact, seats } = res.data.activity;
        setFormData({ ...formData, activityName, description, activityDate, bidDate, location, responsiblePerson, contact, seats });
      })
      .catch(err => {
        toast.error(`Error To Your Information ${err.response.statusText}`);
        if (err.response.status === 401) {
          signout(() => {
            history.push('/activitylist');
          });
        }
      });
  };

  const { activityName, description, location, responsiblePerson, contact, seats, textChange } = formData;
  // console.log(activityDate)
  const [activityDate, setActivityDate] = useState();
  const [bidDate, setBidDate] = useState();
  const handleChange = text => e => {
    setFormData({ ...formData, [text]: e.target.value });
  };

  const handleSubmit = e => {
    const token = getCookie('token');
    e.preventDefault();
    setFormData({ ...formData, textChange: 'Submitting' });
    if (activityDate < new Date() || bidDate < new Date()) {
      toast.error('Select Date should exceed now date');
    }
    else {
      if ((activityDate > bidDate) && (activityDate >= new Date()) && (bidDate >= new Date())) {
        axios
          .put(
            `${process.env.REACT_APP_API_URL}/activity/update/${activityId()._id}`,
            {
              activityName,
              description,
              activityDate,
              bidDate,
              location,
              responsiblePerson,
              contact,
              seats
            },
            {
              headers: {
                Authorization: `Bearer ${token}`
              }
            }
          )
          .then(res => {
            updateActivity(res, () => {
              toast.success(res.data.message);
              setFormData({ ...formData, textChange: 'Update' });
            });
          })
          .catch(err => {
            console.log(err.response);
            toast.error(err.response.data.error);
            toast.error(err.response.data.errors);
          });
      }

      else {
        toast.error('The bid should is held before activity start')
      }

    }


  };

  return (
    <div className="container">
      <AdminNavbar />
      <div className='min-h-screen bg-gray-100 text-gray-900 flex justify-center'>
        <ToastContainer />
        <div className='max-w-screen-xl m-0 sm:m-20 bg-white shadow sm:rounded-lg flex justify-center flex-1'>
          <div className='lg:w-1/2 xl:w-5/12 p-6 sm:p-12'>
            <div className='mt-12 flex flex-col items-center'>
              <h1 className='text-2xl xl:text-3xl font-extrabold'>
                Edit Activity
          </h1>
              <form
                className='w-full flex-1 mt-8 text-indigo-500'
                onSubmit={handleSubmit}
              >
                <input
                  className='w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white mt-5'
                  type='text'
                  placeholder='Activity Name'
                  onChange={handleChange('activityName')}
                  value={activityName}
                />

                <input
                  className='w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white mt-5'
                  type='text'
                  placeholder='Description'
                  onChange={handleChange('description')}
                  value={description}
                />

                <DatePicker
                  className='w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white mt-5'
                  placeholderText="Activity Date"
                  selected={activityDate}
                  onChange={date => setActivityDate(date)}
                  showTimeSelect
                  dateFormat="MMMM d, yyyy HH:mm"
                />
                <DatePicker
                  className='w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white mt-5'
                  placeholderText="Bidding Date"
                  selected={bidDate}
                  onChange={date => setBidDate(date)}
                  showTimeSelect
                  dateFormat="MMMM d, yyyy HH:mm"
                />

                <input
                  className='w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white mt-5'
                  type='text'
                  placeholder='Location'
                  onChange={handleChange('location')}
                  value={location}
                />

                <input
                  className='w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white mt-5'
                  type='text'
                  placeholder='Stuff'
                  onChange={handleChange('responsiblePerson')}
                  value={responsiblePerson}
                />

                <input
                  className='w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white mt-5'
                  type='text'
                  placeholder='Contact'
                  onChange={handleChange('contact')}
                  value={contact}
                />

                <input
                  className='w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white mt-5'
                  type='text'
                  placeholder='Seats'
                  onChange={handleChange('seats')}
                  value={seats}
                />

                <button
                  type='submit'
                  className='mt-5 tracking-wide font-semibold bg-indigo-500 text-gray-100 w-full py-4 rounded-lg hover:bg-indigo-700 transition-all duration-300 ease-in-out flex items-center justify-center focus:shadow-outline focus:outline-none'
                >
                  <i className='fas fa-user-plus fa 1x w-6  -ml-2' />
                  <span className='ml-3'>{textChange}</span>
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditActivity;