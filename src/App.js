import React, { Component } from 'react';
import { Redirect, Route, BrowserRouter } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';

import withSetup from './js/redux/setup';

import signin from './js/routes/signin';
import scores from './js/routes/scores';

class App extends Component {

    render() {
        if (this.props.location.pathname === '/') {
            return (<Redirect to={'/signin'} />);
        }
        return (
            <div>
                <React.Fragment>
                    <Route path="/signin" component={signin} />
                    <Route path="/scores" component={scores} />
                </React.Fragment>
                <ToastContainer />
            </div>
        );
    }
}

export default withSetup(App);
