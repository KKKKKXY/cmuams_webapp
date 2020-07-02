import React, { useState, useEffect } from 'react';
import authSvg from '../assets/update.svg';
import { ToastContainer, toast } from 'react-toastify';
import axios from 'axios';
import { updateUser, isAuth, getCookie, signout } from '../helpers/auth';
import { Nav, Navbar, NavDropdown, NavLink, FormControl, Button, Collapse, NavItem, FormGroup } from 'react-bootstrap';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";

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

    const { activityName, description, startDate, bidEndDate, location, responsiblePerson, phoneNo, limitParticipant, textChange } = formData;
    const handleChange = text => e => {
        setFormData({ ...formData, [text]: e.target.value });
    };
    const onChangeDate = text => date =>  {
        setFormData({ ...formData, [text]: date });
    };
    // const onChangeBidEndDate = text => date =>  {
    //     setFormData({ ...formData, [text]: date });
    // }
    const handleSubmit = e => {
        const token = getCookie('token');
        console.log(token);
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
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            )
            .then(res => {
                updateUser(res, () => {
                    toast.success('Activity Added Successfully');
                    setFormData({ ...formData, textChange: 'Add' });
                });
            })
            .catch(err => {
                console.log(err.response);
            });
    };

    return (
        <div className="container">
            <Navbar className="navbar navbar-dark bg-primary" expand="lg">
                <Navbar.Brand href="#home">AMS</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="mr-auto">
                        <Nav.Link href="/">Home</Nav.Link>
                        <Nav.Link href="/usersInfo">User Manage</Nav.Link>
                        <NavDropdown title="Activity" id="basic-nav-dropdown">
                            <NavDropdown.Item href="/activitylist">List</NavDropdown.Item>
                            <NavDropdown.Item href="/addActivity">Add Activity</NavDropdown.Item>
                        </NavDropdown>
                        <Nav.Link href="/admin">Update Profile</Nav.Link>

                        <NavItem>
                            <NavLink className='nav-link' exact to='/logout'>
                                <i className='fa fa-sign-out'></i>
                            </NavLink>
                        </NavItem>
                        <NavItem>
                            <NavLink className='nav-link' exact to='/login'>
                                <i className='fa fa-sign-in'></i>
                            </NavLink>
                        </NavItem>
                    </Nav>

                </Navbar.Collapse>
            </Navbar>

            <div className='min-h-screen bg-gray-100 text-gray-900 flex justify-center'>
                <ToastContainer />
                <div className='max-w-screen-xl m-0 sm:m-20 bg-white shadow sm:rounded-lg flex justify-center flex-1'>
                    <div className='lg:w-1/2 xl:w-5/12 p-6 sm:p-12'>
                        <div className='mt-12 flex flex-col items-center'>
                            <h1 className='text-2xl xl:text-3xl font-extrabold'>
                                Create New Activity
            </h1>

                            <form
                                className='w-full flex-1 mt-8 text-indigo-500'
                                onSubmit={handleSubmit}
                            >
                                <div className='mx-auto max-w-xs relative'>
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
                                    <div className="form-group">
                                        <label>Start Date: </label>
                                        <div>
                                            <DatePicker
                                                selected={startDate}
                                                onChange={onChangeDate('startDate')}
                                                />
                                        </div>
                                    </div>
                                    <div className="form-group">
                                        <label>Bid End Date: </label>
                                        <div>
                                            <DatePicker
                                                selected={bidEndDate}
                                                onChange={onChangeDate('bidEndDate')}
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

export default AddActivity;