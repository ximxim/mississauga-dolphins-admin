import React, { Component } from 'react';
import { getStore } from '../redux/store';

import SignIn from '../routes/signin';

export default function requiresAuth(Comp) {
    return class Auth extends Component {

        render() {
            const state = getStore().getState();
            if (! state.authUser.uid) {
                return <SignIn />
            } else {
                return <Comp {...this.props} />;
            }
        }
    }
}
