import React, { Component } from 'react';
import { ToastContainer } from 'react-toastify';
import axios from 'axios';
import { activityId } from '../../helpers/auth';
import "react-datepicker/dist/react-datepicker.css";
import AdminNavbar from './AdminNavbar';
import Table from 'react-bootstrap/Table'
import { Button } from 'react-bootstrap';
import Moment from 'moment';

const Sort = props => (
    <tr>
        <td>{activityId().activityName}</td>
        <td>{props.sortList.student}</td>
        <td>{props.sortList.amount}</td>
        <td>{Moment(props.sortList.transferDate).format('MMMM Do YYYY, HH:mm:ss')}</td>
    </tr>
)

export default class ViewStudent extends Component {
    constructor(props) {
        super(props);

        this.state = {
            students: [],
            activityId: ''
        };
    }

    componentDidMount() {
        axios.get(`${process.env.REACT_APP_API_URL}/activity/${this.state.activityId}`)
            .then(response => {
                console.log(response.data)
                this.setState({
                    students: response.data.activity.students
                })
                console.log(this.state.students)
            })
            .catch((error) => {
                console.log(error);
            })
    }

    sortList() {
        console.log(this.state.students)
        return this.state.students.map(currentsortList => {
            return <Sort sortList={currentsortList} key={currentsortList._id} />;
        })
    }

    render() {
        return (
            <div className="container">
                <AdminNavbar />
                <div></div>

                <ToastContainer />


                <Table
                    responsive="xl"
                    striped bordered hover
                    size="sm"
                    className="table table-bordered"
                >
                    <thead style={{ backgroundColor: '#FFD632' }}>
                        <tr>
                            <td>Activity Name</td>
                            <td>Student</td>
                            <td>Amonut</td>
                            <td>Transfer Date</td>
                        </tr>
                    </thead>
                    <tbody>
                        {this.sortList()}
                    </tbody>
                </Table>

                <div style={{ float: 'right' }}>

                    <Button variant="outline-info" onClick={() => window.location.href = '/activitylist'
                    }>Back</Button>{' '}
                </div>
            </div>
        );
    }

    
}