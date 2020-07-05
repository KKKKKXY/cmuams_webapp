import React, { Component } from 'react';
import axios from 'axios';
import { Nav, Navbar, NavDropdown, NavLink, FormControl, Button, Collapse, NavItem, FormGroup } from 'react-bootstrap';



const Activities = props => (
    <tr>
        <td>{props.activity.activityName}</td>
        <td>{props.activity.description}</td>
        <td>{props.activity.startDate}</td>
        <td>{props.activity.bidEndDate}</td>
        <td>{props.activity.location}</td>
        <td>{props.activity.responsiblePerson}</td>
        <td>{props.activity.phoneNo}</td>
        <td>{props.activity.limitParticipant}</td>
    </tr>
)

export default class ViewActivity extends Component {
    constructor(props) {
        super(props);


        this.state = { activities: [] };
    }

    componentDidMount() {
        axios.get(`${process.env.REACT_APP_API_URL}/activities`)
            .then(response => {
                this.setState({ activities: response.data })
            })
            .catch((error) => {
                console.log(error);
            })
    }


    activityList() {
        return this.state.activities.map(currentactivity => {
            return <Activities activity={currentactivity} key={currentactivity._id} />;
            //   return <Activities user={currentuser} deleteUser={this.deleteUser} key={currentuser._id}/>;
        })
    }

    render() {
        return (
            <div className="container">
                <Navbar className="navbar navbar-dark bg-primary" expand="lg">
                    <Navbar.Brand href="#home">AMS</Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="mr-auto">
                            <Nav.Link href="/">Home</Nav.Link>
                            <Nav.Link href="/usersInfo">User Management</Nav.Link>
                            <NavDropdown title="Activity" id="basic-nav-dropdown">
                                <NavDropdown.Item href="/activitylist">List</NavDropdown.Item>
                                <NavDropdown.Item href="/addActivity">Add Activity</NavDropdown.Item>
                            </NavDropdown>
                            <Nav.Link href="/admin">Account</Nav.Link>

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
                <div></div>
                <table className="table">
                    <thead className="thead-light">
                        <tr>
                            <td>Name</td>
                            <td>Description</td>
                            <td>Start Date</td>
                            <td>Bid End Date</td>
                            <td>Location</td>
                            <td>Responsible Person</td>
                            <td>Phone No</td>
                            <td>Limit Participant</td>
                        </tr>
                    </thead>
                    <tbody>
                        {this.activityList()}
                    </tbody>
                </table>
            </div>
        )
    }
}