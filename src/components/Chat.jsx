import React, { useContext, useEffect, useRef, useState } from 'react';
import { useCollectionData } from 'react-firebase-hooks/firestore';
import firebase from 'firebase/compat/app';

import { Context } from '..';
import { useAuthState } from 'react-firebase-hooks/auth';
import { Button, Container, Grid, TextField } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import Loader from './Loader';
import Message from './Message';

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

  const hanbleEnter = (event) => {
    if (event.code === 'Enter') {
      sendMessage();
    }
  };

  useEffect(() => {
    anchorRef.current?.scrollIntoView({ smooth: 'scroll-behavior' });
  }, [messages]);

  if (loading) {
    return <Loader />;
  }

  return (
    <Container>
      <Grid
        container
        style={{ height: window.innerHeight - 100, marginTop: '20px' }}
        justifyContent='center'
        alignItems='flex-start'>
        <div
          className="chat"
          style={{
            width: '80%',
            height: '60vh',
            border: '1px solid gray',
            overflowY: 'auto',
            backgroundColor: 'rgba(246, 246, 246, 0.8)',
          }}>
          {messages.map((message, index) => (
            <Message
              key={message.createdAt}
              index={index}
              user={user}
              message={message}
              messages={messages}
              anchorRef={anchorRef}
            />
          ))}
        </div>
        <Grid container flexDirection="row" alignItems="center" style={{ width: '80%' }} full>
          <TextField
            value={value}
            onChange={(event) => setValue(event.target.value)}
            onKeyDown={(event) => hanbleEnter(event)}
            maxRows={2}
            autoComplete="off"
            variant="outlined"
            placeholder="Написать сообщение..."
            style={{ width: '50%' }}
          />
          <Button
            onClick={sendMessage}
            style={{ marginLeft: '20px' }}
            variant="contained"
            size="large"
            endIcon={<SendIcon />}></Button>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Chat;
