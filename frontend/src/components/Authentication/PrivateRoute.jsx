import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import auth from './Auth';

//Private route is like a regulat route - expose component and props - thus ...rest

const PrivateRoute = ({ component: RouteComponent, ...rest }) => (
    <auth.Consumer>
        {
            ({ authenticated }) => (
                <Route
                    render={props =>
                        authenticated ? <RouteComponent {...props} /> : <Redirect to="/login" />
                    } {...rest} />
            )
        }

    </auth.Consumer>
)

export default PrivateRoute