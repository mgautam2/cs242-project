import React, { useState, useEffect, useRef } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import Typography from '@material-ui/core/Typography';
import MenuIcon from '@material-ui/icons/Menu';
import MicIcon from '@material-ui/icons/Mic';
import MicOffIcon from '@material-ui/icons/MicOff';
import VolumeUpIcon from '@material-ui/icons/VolumeUp';
import VolumeOffIcon from '@material-ui/icons/VolumeOff';
import Peer from "simple-peer";

import Canvas from './Canvas';
import Loading from './Loading';
import StatsBar from './StatsBar';
import ChatBox from './ChatBox';
import { socketManager } from '../utils/socket';
import sound from '../asset/sounds';
import './index.css';


const socket = socketManager.getSocket();
let peerList = []; 

function GameScreen() {
  const [start, setStart] = useState(false);
  const [playerStats, setStats] = useState({});
  const [time, setTime] = useState(0);
  const videoEl = useRef(null);
  const someonevideo = useRef(null);
  const player = useLocation().state;
  const [open, setOpen] = useState(false);
  const [toggleMic, setMicToggle] = useState(false);
  const [toggleSpeaker, setToggleSpeaker] = useState(false);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };
  
  useEffect(() => {
     if (false) {
       navigator.mediaDevices.getUserMedia({ video: true, audio: true }).then(stream => {
          
        if (player === "playerOne") {
          createPeer(socket.id, stream);
        }
                
        socket.on("getSignal", payload => {
          console.log("Got signal")
          const {callerID, signal} = payload;
          addPeer(signal, callerID, stream);
        })
        socket.on("getReturningSignal", payload => {
          peerList[0].signal(payload.signal);
          // console.log('Streaming P2 in P1');
          // startStreaming();
        })
        if (player === 'playerTwo') {
          socket.on("setStreamP2", () => {
            // console.log('Streaming P1 in P2');
            // startStreaming();
          })
        }
       })
    }
  }, []);
  
  // function startStreaming() {
  //   let peer = (player === 'playerOne') ? playerOnesPeer : playerTwosPeer ;
  //   console.log(peer)
  //   peer.on("stream", stream => {
  //           console.log(stream)
  //           someonevideo.current.srcObject = stream;
  //   })
  //   peer.on('connect', () => {
  //     console.log("connection is On")
  //   })
  // }
  
  function createPeer(callerID, stream) {
    const peer = new Peer({
        initiator: true,
        trickle: false,
        stream,
    });
    console.log("Peer for Player Two in p1")
    peerList.push(peer);
    peer.on("signal", signal => {
        socket.emit("sendingSignal", { callerID, signal })
    })
    peer.on('connect', () => {
      console.log('connection ready')
    })
  }
  
  function addPeer(incomingSignal, callerID, stream) {
    const peer = new Peer({
        initiator: false,
        trickle: false,
        stream,
    })
    console.log("Peer for Player One in p2")
    peerList.push(peer);
    peer.on("signal", signal => {
        socket.emit("returningSignal", { callerID, signal })
    })
  
    peer.signal(incomingSignal);
    peer.on('connect', () => {
      console.log('connection ready')
    })
  }
  
  function getPlayerStats(stats, timer) {
    setStats(stats);
    setTime(Math.ceil(timer));
  }
  
  socket.on('initGame', () => {
    // sound.background.play();
    setStart(true);
  })

  return (
    <>
      <div className='game-screen'>
        <MenuIcon id='open-drawer' onClick={handleDrawerOpen}/>
        <div className='game-header'>
          <StatsBar stat={playerStats}  timer={time}/>
        </div>
        <video ref={someonevideo} width="00" height="00" controls/>
        {(start) ? <Canvas statFunc={getPlayerStats} /> : <Loading />}
        <ChatBox openStatus={open} close={handleDrawerClose} />
        <div className='audio-setting'>
          { (toggleMic) ? <MicIcon style={{fontSize: '50px'}} /> 
            : <MicOffIcon style={{fontSize: '50px', paddingLeft: 20}} /> 
          }
          { (toggleMic) ? <VolumeUpIcon style={{fontSize: '50px', paddingLeft: 20}} />
            : <VolumeOffIcon style={{fontSize: '50px', paddingLeft: 20}} /> 
          }
        </div>
      </div>
    </>
  );
}

export default GameScreen;
