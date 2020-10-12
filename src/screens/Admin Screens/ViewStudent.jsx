import React, { Component } from 'react';
import { ToastContainer } from 'react-toastify';
import axios from 'axios';
import { activityId } from '../../helpers/auth';
import "react-datepicker/dist/react-datepicker.css";
import AdminNavbar from './AdminNavbar';
import Table from 'react-bootstrap/Table'
import { green } from '@material-ui/core/colors';
import Icon from '@material-ui/core/Icon';
import Tooltip from '@material-ui/core/Tooltip';
import { Button } from 'react-bootstrap';



const Sort = props => (
    <tr>
        <td>{activityId().activityName}</td>
        <td>{props.sortList.student}</td>
        <td>{props.sortList.amount}</td>
        <td>{props.sortList.transferDate}</td>
    </tr>
)

export default class ViewStudent extends Component {
    constructor(props) {
        super(props);

        this.state = {
            students: []
        };
    }

    componentDidMount() {
        axios.get(`${process.env.REACT_APP_API_URL}/activity/${activityId()._id}`)
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
                            <td>activityName</td>
                            <td>Student</td>
                            <td>Amonut</td>
                            <td>Date</td>
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