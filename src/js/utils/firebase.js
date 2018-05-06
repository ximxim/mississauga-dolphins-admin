import * as firebase from 'firebase';

import ENV from '../../env';


let client = null;

export const initialize = () => {
    if (! firebase.apps.length) {
        client = firebase.initializeApp(ENV.firebase);
    }
}

export const getClient = () => client;

