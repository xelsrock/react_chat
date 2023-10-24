import React from 'react';

import { Avatar, Grid } from '@mui/material';

const Message = ({ user, message, messages, anchorRef, index }) => {
  return (
    <div
      ref={index === messages.length - 1 ? anchorRef : null}
      style={{
        margin: 10,
        border: user.uid === message.uid ? '2px solid green' : '1px solid gray',
        marginLeft: user.uid === message.uid ? 'auto' : '10px',
        width: 'fit-content',
        padding: '5px',
      }}>
      <Grid container>
        <Avatar src={message.photoURL} />
        <div
          style={{ margin: '5px 0 0 5px', textAlign: 'center'}}>
          {message.displayName}
        </div>
      </Grid>
      <div style={{marginTop: '10px'}}>{message.text}</div>
    </div>
  );
};

export default Message;
