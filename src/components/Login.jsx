import React, { useContext } from 'react';
import firebase from 'firebase/compat/app';

import { Box, Button, Container, Grid } from '@mui/material';

const Login = () => {
  const login = async () => {
    const provider = new firebase.auth.GoogleAuthProvider();

    await firebase
      .auth()
      .signInWithPopup(provider)
      .then((result) => {
        const user = result.user;
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;

        alert(`Ошибка ${errorCode}: ${errorMessage}`);
      });

    
  };

  return (
    <Container>
      <Grid
        container
        style={{ height: window.innerHeight - 50 }}
        alignItems="center"
        justifyContent="center">
        <Grid
          style={{ width: 400, backgroundColor: 'lightblue' }}
          container
          alignItems="center"
          flexDirection="column">
            <div style={{marginTop: '20px', fontSize: '22px', color: 'gray'}}>Присоединяйся к онлайн чату</div>

          <Box p={5}>
            <Button onClick={login} variant="outlined" size="large">
              Войти с помощью Google
            </Button>
          </Box>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Login;
