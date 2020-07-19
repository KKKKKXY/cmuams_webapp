import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route, Redirect, Switch } from 'react-router-dom';
import App from './App';
import Login from './screens/Login.jsx';
import Register from './screens/Register';
import Activate from './screens/Activate';
import Private from './screens/Private.jsx';
import Admin from './screens/Admin.jsx';
import ForgetPassword from './screens/ForgetPassword.jsx';
import ResetPassword from './screens/ResetPassword.jsx';

import PrivateRoute from './Routes/PrivateRoute';
import AdminRoute from './Routes/AdminRoute';
import 'react-toastify/dist/ReactToastify.css';
import "bootstrap/dist/css/bootstrap.min.css";
import UsersList from './screens/UsersList';
import AddActivity from './screens/AddActivity';
import ViewActivity from './screens/ViewActivity';

import StuViewActivity from './screens/StuViewActivity';
import AdminNavbar from './screens/AdminNavbar';

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
      <AdminRoute path="/admin" exact component={Admin} />
      <AdminRoute path="/usersInfo" exact component={UsersList} />
      <AdminRoute path="/addActivity" exact component={AddActivity} />
      <AdminRoute path="/activitylist" exact component={ViewActivity} />
      <AdminRoute path="/bar" exact component={AdminNavbar} />
      <Redirect to='/' />
    </Switch>
  </BrowserRouter>,
  document.getElementById('root')
);
