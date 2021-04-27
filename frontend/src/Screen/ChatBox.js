import React, { useState, useEffect } from 'react';
import Typography from '@material-ui/core/Typography';
import Drawer from '@material-ui/core/Drawer';
import { makeStyles } from '@material-ui/core/styles';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import IconButton from '@material-ui/core/IconButton';
import Divider from '@material-ui/core/Divider';


import { socketManager } from '../utils/socket';


const socket = socketManager.getSocket();
const drawerWidth = 450;

const useStyles = makeStyles((theme) => ({
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
    display: 'flex'
  },
  drawerPaper: {
    width: drawerWidth,
  },
  drawerHeader: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-start',
  }
}))

function ChatBox({openStatus, close}) {
  const classes = useStyles();
  const [messages, setMessages] = useState([]);
  const [msg, setMsg] = useState("");
  
  const handleNewMessageChange = ({target}) => {
    setMsg(target.value);
  };

  const handleSendMessage = () => {
    socket.emit('sendMsg', {
      body: msg,
      senderId: socket.id
    });
    setMsg("");
  };
  
  useEffect(() => {
    socket.on("recieveMsg", payload => {
      console.log("got message")
      let newMsgs = messages;
      newMsgs.push(payload)
      setMessages(newMsgs);
    })
  }, []);
  
  
  return (
    <Drawer
      className={classes.drawer}
      variant="persistent"
      anchor="right"
      open={openStatus}
      classes={{
        paper: classes.drawerPaper,
      }}
    >
      <div className={classes.drawerHeader}>
        <IconButton onClick={close}>
          <ChevronRightIcon style={{fontSize: 50}}/>
        </IconButton>
      </div>
      <Divider />
      <div className="messages-container">
        <ol className="messages-list">
          { messages.map((message, i) => (
            <li
              key={i}
              className={`message-item ${
                message.senderId === socket.id ? "my-message" : "received-message"
              }`}
            >
              {message.body}
            </li>
          ))}
        </ol>
      </div>
      <textarea
        value={msg}
        onChange={handleNewMessageChange}
        placeholder="Write message..."
        className="new-message-input-field"
      />
      <button onClick={handleSendMessage} className="send-message-button">
        Send
      </button>
    </Drawer>
  );
}




export default ChatBox;
