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
import StuViewActivity from './screens/Student Screens/StuViewActivity';
import EnrollList from "./screens/Student Screens/EnrolledList";
import Wallet from "./screens/Student Screens/Wallet"
import Admin from './screens/Admin Screens/Admin';
import UsersList from './screens/Admin Screens/UsersList';
import AddActivity from './screens/Admin Screens/AddActivity';
import ViewActivity from './screens/Admin Screens/ViewActivity';
import EditActivity from './screens/Admin Screens/EditActivity';
import ViewTransacRecord from './screens/Student Screens/ViewTransacRecord';
import Transfer from './screens/Student Screens/Transfer';
import Rules from './screens/Student Screens/Rules'

ReactDOM.render(
  <BrowserRouter>
    <Switch>
      <Route path='/' exact render={props => <App {...props} />} />
      <Route path='/login' exact render={props => <Login {...props} />} />
      <Route path='/register' exact render={props => <Register {...props} />} />
      <Route path='/users/password/forget' exact render={props => <ForgetPassword {...props} />} />
      <Route path='/users/password/reset/:token' exact render={props => <ResetPassword {...props} />} />
      <Route path='/users/activate/:token' exact render={props => <Activate {...props} />} />
      <PrivateRoute path="/private" exact component={Private} />
      <PrivateRoute path="/stuviewactivity" exact component={StuViewActivity} />
      <PrivateRoute path="/enrolllist" exact component={EnrollList}/>
      <PrivateRoute path="/wallet" exact component = {Wallet}/>
      <AdminRoute path="/admin" exact component={Admin} />
      <AdminRoute path="/usersInfo" exact component={UsersList} />
      <AdminRoute path="/addActivity" exact component={AddActivity} />
      <AdminRoute path="/activitylist" exact component={ViewActivity} />
      <Route path='/editActivity' exact render={props => <EditActivity {...props} />} />
      <Route path='/transacRecord' exact render={props => <ViewTransacRecord {...props} />} />
      <Route path='/transfer' exact render={props => <Transfer {...props} />} />
      <Route path='/rules' exact render={props => <Rules {...props} />} />

      <Redirect to='/' />
    </Switch>
  </BrowserRouter>,
  document.getElementById('root')
);
