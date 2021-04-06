import socketIOClient from "socket.io-client";

const ENDPOINT = "http://localhost:4000";

/**
 * Class used to handle socket connection for Tank Game
 */
class socketClass {
  constructor() {
    this.socket = socketIOClient(ENDPOINT, { autoConnect: false, 
      transports: ['websocket', 'polling', 'flashsocket']
    });
    this.socket.on("connect", (data) => {
          console.log("Connected")
    });
  }

  connect() {
    if (!this.socket.disconnected)
      return;
    this.socket.connect();
  }

  disconnect() {
    if (this.socket.disconnected)
      return;
    this.socket.disconnect();
  }
  
  getSocket() {
    return this.socket;
  }
}

export const socketManager = new socketClass();
