import React, { Component } from 'react';
import { Redirect, Route, BrowserRouter } from 'react-router-dom';

import withSetup from './js/redux/setup';

import signin from './js/routes/signin';

const InitialPath = ({ component: Component, ...rest, authUser }) =>
    <Route
        {...rest}
        render={props =>
            authUser
                ? <Component {...props} />
                : <Redirect
                    to={{
                        pathname: '/signin',
                        state: { from: props.location }
                    }}
                />}
    />;

class App extends Component {

    render() {
        return (
            <BrowserRouter>
                <React.Fragment>
                    <InitialPath path="/scores" authUser={this.props.user} component={signin} />
                    <Route path="/signin" component={signin} />
                </React.Fragment>
            </BrowserRouter>
        );
    }
}

export default withSetup(App);
