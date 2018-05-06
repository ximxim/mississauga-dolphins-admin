import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'remote-redux-devtools';
import createSagaMiddleware from 'redux-saga';

import reducers from './reducers';
import promise from './promise';
import rootSaga from './rootSaga';
import * as firebase from '../utils/firebase';

let store = {};

export default function configureStore() {
    firebase.initialize();
    const sagaMiddleware = createSagaMiddleware();

    const composeEnhancers = composeWithDevTools({
        name: 'mississauga-dolphins-admin',
        hostname: 'localhost',
        port: 5678,
    });
    store = createStore(reducers, composeEnhancers(applyMiddleware(sagaMiddleware, promise)));

    sagaMiddleware.run(rootSaga);

    return store;
}

export function getStore() {
    return store
}