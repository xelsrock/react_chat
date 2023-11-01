import React, { useContext } from 'react';
import { HashRouter } from 'react-router-dom';
import { useAuthState } from 'react-firebase-hooks/auth';

import Navbar from './components/Navbar';
import AppRouter from './components/AppRouter';
import { Context } from '.';
import Loader from './components/Loader';

import './App.css';

const App = () => {
  const { auth } = useContext(Context);
  const [user, loading, error] = useAuthState(auth);

  if (loading) {
    return <Loader/>
  }

  return (
    <HashRouter>
      <Navbar />
      <AppRouter/>
    </HashRouter>
  );
};

export default App;
