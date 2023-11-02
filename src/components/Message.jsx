import React from 'react';

import { Avatar, Grid } from '@mui/material';

const Message = ({ user, message, messages, anchorRef, index }) => {
  const convertedTimestamp = (mess) => {
    const date = new Date(mess.createdAt?.seconds * 1000);

    const hours = date.getHours() || '';
    let minutes = date.getMinutes() || '';

    if (minutes < 10) {
      minutes = '0' + minutes;
    }

    return `${hours}:${minutes}`;
  };

  return (
    <div
      ref={index === messages.length - 1 ? anchorRef : null}
      style={{
        margin: '10px',
        marginLeft: user.uid === message.uid ? 'auto' : '10px',
        width: 'fit-content',
        padding: '10px',
        borderRadius: '20px',
        backgroundColor: '#182533',
      }}>
      {user.uid !== message.uid && (
        <Grid container>
          <Avatar src={message.photoURL} />
          <div style={{ margin: '5px 0 0 10px', textAlign: 'center', color: '#62d4e3' }}>
            {message.displayName}
          </div>
        </Grid>
      )}
      <div style={{ marginTop: user.uid === message.uid ? '0px' : '10px', color: '#fff' }}>
        {message.text}
      </div>
      <div
        style={{
          color: '#fff',
          opacity: '0.5',
          marginLeft: 'auto',
          width: 'fit-content',
          marginTop: '5px',
        }}>
        {convertedTimestamp(message)}
      </div>
    </div>
  );
};

export default Message;
