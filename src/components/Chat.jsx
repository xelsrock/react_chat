import React, { useContext, useEffect, useRef, useState } from 'react';
import { useCollectionData } from 'react-firebase-hooks/firestore';
import firebase from 'firebase/compat/app';

import { Context } from '..';
import { useAuthState } from 'react-firebase-hooks/auth';
import { Avatar, Button, Container, Grid, TextField } from '@mui/material';
import Loader from './Loader';

const Chat = () => {
  const anchorRef = useRef(null);

  const { auth, firestore } = useContext(Context);
  const [user] = useAuthState(auth);
  const [messages, loading] = useCollectionData(
    firestore.collection('messages').orderBy('createdAt'),
  );

  const [value, setValue] = useState('');

  const sendMessage = async () => {
    firestore.collection('messages').add({
      uid: user.uid,
      displayName: user.displayName,
      photoURL: user.photoURL,
      text: value,
      createdAt: firebase.firestore.FieldValue.serverTimestamp(),
    });

    setValue('');
  };

  useEffect(() => {
    anchorRef.current?.scrollIntoView({smooth:'scroll-behavior'});
  }, [messages]);

  if (loading) {
    return <Loader />;
  }

  return (
    <Container>
      <Grid
        container
        style={{ height: window.innerHeight - 50, marginTop: '20px' }}
        justifyContent="center">
        <div
          style={{
            width: '80%',
            height: '60vh',
            border: '1px solid gray',
            overflowY: 'auto',
          }}>
          {messages.map((message, index) => (
            <div
              key={message.createdAt}
              ref={index === messages.length - 1 ? anchorRef : null}
              style={{
                margin: 10,
                border: user.uid === message.uid ? '2px solid green' : '1px solid gray',
                marginLeft: user.uid === message.uid ? 'auto' : '10px',
                width: 'fit-content',
                padding: 5,
              }}>
              <Grid container>
                <Avatar src={message.photoURL} />
                <div>{message.displayName}</div>
              </Grid>
              <div>{message.text}</div>
            </div>
          ))}
        </div>
        <Grid container flexDirection="column" alignItems="flex-end" style={{ width: '80%' }}>
          <TextField
            value={value}
            onChange={(event) => setValue(event.target.value)}
            fullWidth
            maxRows={2}
            variant="outlined"
          />
          <Button onClick={sendMessage} variant="outlined" style={{ marginTop: '20px' }}>
            Отправить
          </Button>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Chat;
