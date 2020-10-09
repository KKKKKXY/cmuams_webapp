import React, { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import axios from 'axios';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import AdminNavbar from './AdminNavbar';
import setHours from "date-fns/setHours";
import setMinutes from "date-fns/setMinutes";


const AddActivity = ({ history }) => {
    const [formData, setFormData] = useState({
        activityName: '',
        description: '',
        startDate: new Date(),
        bidEndDate: new Date(),
        location: '',
        responsiblePerson: '',
        phoneNo: '',
        limitParticipant: '',
        textChange: 'Add',
    });

    const { activityName, description, location, responsiblePerson, phoneNo, limitParticipant, textChange } = formData;
    const [startDate, setStartDate] = useState(setHours(setMinutes(new Date(), 0), 0));
    const [bidEndDate, setBidEndDate] = useState(setHours(setMinutes(new Date(), 0), 0));
    const handleChange = text => e => {
        setFormData({ ...formData, [text]: e.target.value });
    };

    const handleSubmit = e => {
        e.preventDefault();
        setFormData({ ...formData, textChange: 'Adding' });
        axios
            .post(
                `${process.env.REACT_APP_API_URL}/activity/add`,
                {
                    activityName,
                    description,
                    startDate: new Date(),
                    bidEndDate: new Date(),
                    location,
                    responsiblePerson,
                    phoneNo,
                    limitParticipant
                }
            )
            .then(res => {
                toast.success(res.data.message);
                setFormData({ ...formData, textChange: 'Add' });
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
                                Create New Activity</h1>
                            <form
                                className='w-full flex-1 mt-8 text-indigo-500'
                                onSubmit={handleSubmit}
                            >
                                {/* <div className='mx-auto max-w-xs relative'> */}
                                <input
                                    className='w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white'
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
                                    placeholderText="Start Date"
                                    selected={startDate}
                                    onChange={date => setStartDate(date)}
                                    showTimeSelect
                                    includeTimes={[
                                        setHours(setMinutes(new Date(), 0), 1),
                                        setHours(setMinutes(new Date(), 0), 2),
                                        setHours(setMinutes(new Date(), 0), 3),
                                        setHours(setMinutes(new Date(), 0), 4),
                                        setHours(setMinutes(new Date(), 0), 5),
                                        setHours(setMinutes(new Date(), 0), 6),
                                        setHours(setMinutes(new Date(), 0), 7),
                                        setHours(setMinutes(new Date(), 0), 8),
                                        setHours(setMinutes(new Date(), 0), 9),
                                        setHours(setMinutes(new Date(), 0), 10),
                                        setHours(setMinutes(new Date(), 0), 11),
                                        setHours(setMinutes(new Date(), 0), 12),
                                        setHours(setMinutes(new Date(), 0), 13),
                                        setHours(setMinutes(new Date(), 0), 14),
                                        setHours(setMinutes(new Date(), 0), 15),
                                        setHours(setMinutes(new Date(), 0), 16),
                                        setHours(setMinutes(new Date(), 0), 17),
                                        setHours(setMinutes(new Date(), 0), 18),
                                        setHours(setMinutes(new Date(), 0), 19),
                                        setHours(setMinutes(new Date(), 0), 20),
                                        setHours(setMinutes(new Date(), 0), 21),
                                        setHours(setMinutes(new Date(), 0), 22),
                                        setHours(setMinutes(new Date(), 0), 23),
                                        setHours(setMinutes(new Date(), 0), 24),
                                    ]}
                                    dateFormat="MMMM d, yyyy HH:mm"
                                />
                                <DatePicker
                                    className='w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white mt-5'
                                    placeholderText="Bidding End Date"
                                    selected={bidEndDate}
                                    onChange={date => setBidEndDate(date)}
                                    showTimeSelect
                                    includeTimes={[
                                        setHours(setMinutes(new Date(), 0), 1),
                                        setHours(setMinutes(new Date(), 0), 2),
                                        setHours(setMinutes(new Date(), 0), 3),
                                        setHours(setMinutes(new Date(), 0), 4),
                                        setHours(setMinutes(new Date(), 0), 5),
                                        setHours(setMinutes(new Date(), 0), 6),
                                        setHours(setMinutes(new Date(), 0), 7),
                                        setHours(setMinutes(new Date(), 0), 8),
                                        setHours(setMinutes(new Date(), 0), 9),
                                        setHours(setMinutes(new Date(), 0), 10),
                                        setHours(setMinutes(new Date(), 0), 11),
                                        setHours(setMinutes(new Date(), 0), 12),
                                        setHours(setMinutes(new Date(), 0), 13),
                                        setHours(setMinutes(new Date(), 0), 14),
                                        setHours(setMinutes(new Date(), 0), 15),
                                        setHours(setMinutes(new Date(), 0), 16),
                                        setHours(setMinutes(new Date(), 0), 17),
                                        setHours(setMinutes(new Date(), 0), 18),
                                        setHours(setMinutes(new Date(), 0), 19),
                                        setHours(setMinutes(new Date(), 0), 20),
                                        setHours(setMinutes(new Date(), 0), 21),
                                        setHours(setMinutes(new Date(), 0), 22),
                                        setHours(setMinutes(new Date(), 0), 23),
                                        setHours(setMinutes(new Date(), 0), 24),
                                    ]}
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
                                {/* </div> */}
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AddActivity;