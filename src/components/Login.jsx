import React, { useContext } from 'react';
import firebase from 'firebase/compat/app';

import { Box, Button, Container, Grid } from '@mui/material';
import { Context } from '../index';

const Login = () => {
  const {auth} = useContext(Context);

  const login = async () => {
    const provider = new firebase.auth.GoogleAuthProvider();
    const {user} = await auth.signInWithPopup(provider);
  }

  return (
    <Container>
      <Grid
        container
        style={{ height: window.innerHeight - 50 }}
        alignItems='center'
        justifyContent='center'>
        <Grid
          style={{ width: 400, backgroundColor: 'lightblue' }}
          container
          alignItems='center'
          flexDirection='column'>
          <Box p={5}>
            <Button onClick={login} variant='outlined' size='large'>Войти с помощью Google</Button>
          </Box>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Login;
