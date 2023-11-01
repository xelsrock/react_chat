import React, { useContext, useEffect, useRef, useState } from 'react';
import { useCollectionData } from 'react-firebase-hooks/firestore';
import firebase from 'firebase/compat/app';
import { onAuthStateChanged } from 'firebase/auth';

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
  const [authProfile] = useCollectionData(firestore.collection('authProfile'));

  const [value, setValue] = useState('');
  const [profileId, setProfileId] = useState('');

  const sendMessage = async () => {
    if (value.trim().length !== 0) {
      firestore.collection('messages').add({
        uid: user.uid,
        displayName: user.displayName,
        photoURL: user.photoURL,
        text: value,
        createdAt: firebase.firestore.FieldValue.serverTimestamp(),
      });

      setValue('');
    }
  };

  const hanbleEnter = (event) => {
    if (event.code === 'Enter') {
      sendMessage();
    }
  };

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        const uid = user.uid;

        firestore
          .collection('authProfile')
          .doc(uid)
          .set({
            uid,
            displayName: user.displayName,
          })
          .then(() => {
            setProfileId(uid);
          })
          .catch((error) => {
            console.error('Error writing document: ', error);
          });
      } else {
        firestore
          .collection('authProfile')
          .doc(profileId)
          .delete()
          .then(() => {
            setProfileId('');
          })
          .catch((error) => {
            console.error('Error removing document: ', error);
          });
      }
    });
  }, [profileId]);

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
        justifyContent="center"
        alignItems="flex-start">
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
        <Grid
          container
          flexDirection="row"
          justifyContent="space-between"
          alignItems="center"
          style={{ width: '80%' }}
          full="true">
          <TextField
            value={value}
            onChange={(event) => setValue(event.target.value)}
            onKeyDown={(event) => hanbleEnter(event)}
            maxRows={2}
            autoComplete="off"
            variant="outlined"
            placeholder="Написать сообщение..."
            style={{ width: '70%' }}
          />
          <Button
            onClick={sendMessage}
            variant="contained"
            size="large"
            endIcon={<SendIcon />}></Button>
        </Grid>

        <Grid container justifyContent="center" flexDirection="column" alignItems="center">
          <div style={{ fontSize: '22px', marginBottom: '10px' }}>Подключенные пользователи:</div>
          {authProfile.map((profile, index) => (
            <div style={{ marginBottom: '5px' }} key={index}>
              {profile.displayName || profile.uid}
            </div>
          ))}
        </Grid>
      </Grid>
    </Container>
  );
};

export default Chat;
