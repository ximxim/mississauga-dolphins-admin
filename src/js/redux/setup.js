import React, { Component } from 'react';
import { Provider } from 'react-redux';

import configureStore from './store';

export default function withSetup(App) {
    return class Setup extends Component {
        render() {
            return (
                <Provider store={configureStore()}>
                    <App />
                </Provider>
            );
        }
    }
}