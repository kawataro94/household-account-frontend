import React from 'react';
import ReactDOM from 'react-dom';
import firebase from 'firebase/app';

import {
    apiKey,
    authDomain,
    projectId,
    storageBucket,
    messagingSenderId,
    appId,
    measurementId,
} from '../.env/resources';
import App from './app';
import './style.css';

const root = document.createElement('div');
root.setAttribute('id', 'root');
document.body.appendChild(root);

const firebaseConfig = {
    apiKey,
    authDomain,
    projectId,
    storageBucket,
    messagingSenderId,
    appId,
    measurementId,
};

if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
}

ReactDOM.render(
    <React.StrictMode>
        <App />
    </React.StrictMode>,
    document.getElementById('root')
);
