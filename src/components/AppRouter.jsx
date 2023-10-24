import React, { useContext } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import { useAuthState } from 'react-firebase-hooks/auth';

import { privateRoutes, publicRoutes } from '../routes';
import { CHAT_ROUTE, LOGIN_ROUTE } from '../utils/consts';
import { Context } from '..';

const AppRouter = () => {
  const { auth } = useContext(Context);
  const [user] = useAuthState(auth);

  return user ? (
    <Routes>
      {privateRoutes.map(({ path, Component }) => (
        <Route key={path} path={path} element={Component} exact />
      ))}
      <Route path="*" element={<Navigate to={CHAT_ROUTE} replace />} exact />
    </Routes>
  ) : (
    <Routes>
      {publicRoutes.map(({ path, Component }) => (
        <Route key={path} path={path} element={Component} exact />
      ))}
      <Route path="*" element={<Navigate to={LOGIN_ROUTE} replace />} exact />
    </Routes>
  );
};

export default AppRouter;
