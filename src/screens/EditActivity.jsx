import React, { useState, useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import axios from 'axios';
import { getCookie, signout, activityId, updateActivity } from '../helpers/auth';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import AdminNavbar from './AdminNavbar';

const EditActivity = ({ history }) => {
  const [formData, setFormData] = useState({
    activityName: '',
    description: '',
    startDate: '',
    bidEndDate: '',
    location: '',
    responsiblePerson: '',
    phoneNo: '',
    limitParticipant: '',
    textChange: 'Update'
  });

  useEffect(() => {
    loadActivity();
  }, []);

  const loadActivity = () => {
    const activity = getCookie('activity');
    console.log(activity);
    console.log(activityId()._id);
    axios
      .get(`${process.env.REACT_APP_API_URL}/activity/${activityId()._id}`)
      .then(res => {
        const { activityName, description, startDate, bidEndDate, location, responsiblePerson, phoneNo, limitParticipant } = res.data.activity;
        setFormData({ ...formData, activityName, description, startDate, bidEndDate, location, responsiblePerson, phoneNo, limitParticipant });
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

  const { activityName, description, location, responsiblePerson, phoneNo, limitParticipant, textChange } = formData;
  const [startDate, setStartDate] = useState();
  const [bidEndDate, setBidEndDate] = useState();
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
        `${process.env.REACT_APP_API_URL}/activity/update`,
        {
          activityName,
          description,
          startDate,
          bidEndDate,
          location,
          responsiblePerson,
          phoneNo,
          limitParticipant
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
                <div className='mx-auto max-w-xs relative'>
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

                  <div className="form-group">
                    <div>
                      <DatePicker
                        className='w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white mt-5'
                        selected={startDate}
                        placeholderText="Start Date"
                        onChange={date => setStartDate(date)}
                      />
                    </div>
                  </div>
                  <div className="form-group">
                    <div>
                      <DatePicker
                        className='w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white mt-5'
                        placeholderText="Biding End Date"
                        selected={bidEndDate}
                        onChange={date => setBidEndDate(date)}
                      />
                    </div>
                  </div>
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
                    placeholder='Responsible Person'
                    onChange={handleChange('responsiblePerson')}
                    value={responsiblePerson}
                  />

                  <input
                    className='w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white mt-5'
                    type='text'
                    placeholder='Phone No.'
                    onChange={handleChange('phoneNo')}
                    value={phoneNo}
                  />

                  <input
                    className='w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white mt-5'
                    type='text'
                    placeholder='Limit Participant'
                    onChange={handleChange('limitParticipant')}
                    value={limitParticipant}
                  />

                  <button
                    type='submit'
                    className='mt-5 tracking-wide font-semibold bg-indigo-500 text-gray-100 w-full py-4 rounded-lg hover:bg-indigo-700 transition-all duration-300 ease-in-out flex items-center justify-center focus:shadow-outline focus:outline-none'
                  >
                    <i className='fas fa-user-plus fa 1x w-6  -ml-2' />
                    <span className='ml-3'>{textChange}</span>
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditActivity;