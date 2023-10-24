import React, { useContext } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { AppBar, Button, Grid, Toolbar } from '@mui/material';
import { NavLink } from 'react-router-dom';

import { LOGIN_ROUTE } from '../utils/consts';
import { Context } from '..';

const Navbar = () => {
  const { auth } = useContext(Context);
  const [user] = useAuthState(auth);

  const signOut = () => {
    if (window.confirm('Вы действительно хотите выйти?')) {
      auth.signOut();
    }
  };

  return (
    <AppBar color='secondary' position="static">
      <Toolbar>
        <Grid container justifyContent="flex-end">
          {user ? (
            <Button onClick={signOut} variant="contained">
              Выйти
            </Button>
          ) : (
            <NavLink to={LOGIN_ROUTE}>
              <Button variant='contained'>Логин</Button>
            </NavLink>
          )}
        </Grid>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
