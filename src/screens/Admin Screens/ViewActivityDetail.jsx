import React, { useState, useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import axios from 'axios';
import { activityId, isAuth } from '../../helpers/auth';
import "react-datepicker/dist/react-datepicker.css";
import AdminNavbar from './AdminNavbar';
import Moment from 'moment';
import TextField from '@material-ui/core/TextField';


const ViewActivityDetail = ({ history }) => {
    const [formData, setFormData] = useState({
        activityName: '',
        description: '',
        activityDate: '',
        bidDate: '',
        location: '',
        responsiblePerson: '',
        contact: '',
        seats: '',
        creator: ''
    });

    useEffect(() => {
        loadActivity();
    }, []);

    const loadActivity = () => {
        axios
            .get(`${process.env.REACT_APP_API_URL}/activity/${activityId()._id}`)
            .then(res => {
                const { activityName, description, activityDate, bidDate, location, responsiblePerson, contact, seats, creator } = res.data.activity;
                console.log(activityDate)

                console.log(Moment(activityDate).format('MMMM Do YYYY, HH:mm:ss'))
                setFormData({ ...formData, activityName, description, activityDate, bidDate, location, responsiblePerson, contact, seats, creator });
            })
            .catch(err => {
                toast.error(`Error To Your Information ${err.response.statusText}`);
                if (err.response.status === 401) {
                    history.push('/activitylist')
                }
            });
    };


    const { activityName, description, activityDate, bidDate, location, responsiblePerson, contact, seats, creator } = formData;


    const handleSubmit = e => {
        history.push('/activitylist')
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
                                Activity Information</h1>
                            <form
                                className='w-full flex-1 mt-8 text-indigo-500'
                                onSubmit={handleSubmit}
                            >
                                <div>
                                    <TextField
                                        className='w-full mt-3'
                                        id="filled-multiline-static"
                                        label="Activity Name"
                                        multiline
                                        rows={1}
                                        value={activityName}
                                        disabled
                                    />
                                </div>

                                <TextField
                                    className='w-full mt-3'
                                    id="filled-multiline-static"
                                    label="Description"
                                    multiline
                                    rows={4}
                                    value={description}
                                    disabled
                                />


                                <TextField
                                    className='w-full mt-3'
                                    id="filled-multiline-static"
                                    label="Activity Date"
                                    multiline
                                    value={Moment(activityDate).format('MMMM Do YYYY, h:mm:ss a')}
                                    disabled
                                />


                                <TextField
                                    className='w-full mt-3'
                                    id="filled-multiline-static"
                                    label="Bidding Date"
                                    multiline
                                    value={Moment(bidDate).format('MMMM Do YYYY, h:mm:ss a')}
                                    disabled
                                />

                                <TextField
                                    className='w-full mt-3'
                                    id="filled-multiline-static"
                                    label="Activity Location"
                                    multiline
                                    value={location}
                                    disabled
                                />

                                <TextField
                                    className='w-full mt-3'
                                    id="filled-multiline-static"
                                    label="Responsible Person"
                                    multiline
                                    value={responsiblePerson}
                                    disabled
                                />

                                <TextField
                                    className='w-full mt-3'
                                    id="filled-multiline-static"
                                    label="Contact"
                                    multiline
                                    value={contact}
                                    disabled
                                />

                                <TextField
                                    className='w-full mt-3'
                                    id="filled-multiline-static"
                                    label="Seats"
                                    multiline
                                    value={seats}
                                    disabled
                                />

                                <TextField
                                    className='w-full mt-3'
                                    id="filled-multiline-static"
                                    label="Creator"
                                    multiline
                                    value={creator}
                                    disabled
                                />

                                <button
                                    type='submit'
                                    className='mt-5 tracking-wide font-semibold bg-indigo-500 text-gray-100 w-full py-4 rounded-lg hover:bg-indigo-700 transition-all duration-300 ease-in-out flex items-center justify-center focus:shadow-outline focus:outline-none'
                                >
                                    <span className='ml-3'>Back</span>
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ViewActivityDetail;