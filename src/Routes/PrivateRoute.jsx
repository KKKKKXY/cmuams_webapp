import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { isAuth } from '../helpers/auth';

const PrivateRoute = ({ component: Component, ...rest }) => (
    <Route
        {...rest}
        render={props =>
            isAuth() && isAuth().role === 'student' ? (
                <Component {...props} />
            ) : (
                    <Redirect
                        to={{
                            pathname: '/login',
                            state: { from: props.location }
                        }}
                    />
                )
        }
    ></Route>
);

export default PrivateRoute;