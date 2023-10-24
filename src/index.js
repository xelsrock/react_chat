import React, { createContext } from 'react';
import ReactDOM from 'react-dom/client';

import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';

import App from './App';

// Initialize Firebase
firebase.initializeApp({
  apiKey: 'AIzaSyC5IIw1Dkf9xaIdO3aPZOWqjuCqqoaxLc4',
  authDomain: 'chat-6d62a.firebaseapp.com',
  projectId: 'chat-6d62a',
  storageBucket: 'chat-6d62a.appspot.com',
  messagingSenderId: '628819146374',
  appId: '1:628819146374:web:6343fffb4f13a321fe0307',
  measurementId: 'G-V5QNC63WTN',
});

export const Context = createContext(null);

const auth = firebase.auth();
const firestore = firebase.firestore();

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Context.Provider value={{
    firebase,
    auth,
    firestore
  }}>
    <App />
  </Context.Provider>,
);
