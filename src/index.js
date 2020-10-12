import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route, Redirect, Switch } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';
import "bootstrap/dist/css/bootstrap.min.css";
import App from './App';
import PrivateRoute from './Routes/PrivateRoute';
import AdminRoute from './Routes/AdminRoute';
import Login from './screens/Component Screens/Login';
import Register from './screens/Student Screens/Register';
import ForgetPassword from './screens/Component Screens/ForgetPassword';
import ResetPassword from './screens/Component Screens/ResetPassword';
import Activate from './screens/Student Screens/Activate';
import Private from './screens/Student Screens/Private';
import StuViewActivity from './screens/Student Screens/Bidding/StuViewActivity'
import BiddingSummary from './screens/Student Screens/Bidding/BiddingSummary'
import Wallet from "./screens/Student Screens/Wallet"
import Admin from './screens/Admin Screens/Admin';
import UsersList from './screens/Admin Screens/UsersList';
import AddActivity from './screens/Admin Screens/AddActivity';
import ViewActivity from './screens/Admin Screens/ViewActivity';
import EditActivity from './screens/Admin Screens/EditActivity';
import ViewTransacRecord from './screens/Student Screens/ViewTransacRecord';
import Transfer from './screens/Student Screens/Transfer';
import Rules from './screens/Student Screens/Rules'
import ViewActivityInfo from './screens/Student Screens/ViewActivityInfo'
import EnrolledList from './screens/Student Screens/Bidding/EnrolledList'
import ViewStudent from './screens/Admin Screens/ViewStudent';
import ViewActivityDetail from './screens/Admin Screens/ViewActivityDetail';




ReactDOM.render(
  <BrowserRouter>
    <Switch>
      <Route path='/' exact render={props => <App {...props} />} />
      <Route path='/login' exact render={props => <Login {...props} />} />
      <Route path='/users/password/forget' exact render={props => <ForgetPassword {...props} />} />
      <Route path='/users/password/reset/:token' exact render={props => <ResetPassword {...props} />} />
      <Route path='/register' exact render={props => <Register {...props} />} />
      <Route path='/users/activate/:token' exact render={props => <Activate {...props} />} />

      <AdminRoute path="/admin" exact component={Admin} />
      <AdminRoute path="/usersInfo" exact component={UsersList} />
      <AdminRoute path="/addActivity" exact component={AddActivity} />
      <AdminRoute path="/activitylist" exact component={ViewActivity} />
      <AdminRoute path='/editActivity' exact component={EditActivity} />
      <AdminRoute path='/viewStudent' exact component={ViewStudent} />
      <AdminRoute path='/viewActivityDetail' exact component={ViewActivityDetail} />

      <PrivateRoute path="/private" exact component={Private} />
      <PrivateRoute path="/stuviewactivity" exact component={StuViewActivity} />
      <PrivateRoute path="/biddingSummary" exact component={BiddingSummary} />
      <PrivateRoute path="/wallet" exact component={Wallet} />
      <PrivateRoute path='/transacRecord' exact component={ViewTransacRecord} />
      <PrivateRoute path='/transfer' exact component={Transfer} />
      <PrivateRoute path='/rules' exact component={Rules} />
      <PrivateRoute path='/enrolledList' exact component={EnrolledList} />
      <PrivateRoute path='/viewActivityInfo' exact component={ViewActivityInfo} />

      <Redirect to='/' />
    </Switch>
  </BrowserRouter>,
  document.getElementById('root')
);
