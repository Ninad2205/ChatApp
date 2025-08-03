import React, { useEffect, useState } from "react";
import "../style.css";
import ChatLists from "./ChatLists";
import InputText from "./InputText";
import UserLogin from "./UserLogin";
import socketIOClient from "socket.io-client";

const ChatContainer = () => {
  const [user, setUser] = useState(localStorage.getItem("user"));
  const [chats, setChats] = useState([]);
  const [connected, setConnected] = useState(false);
  
  // Initialize socket with debug options
  const [socketio] = useState(() => {
    console.log("Initializing socket connection to http://localhost:3001");
    return socketIOClient("http://localhost:3001", {
      transports: ['websocket', 'polling'],
      timeout: 5000,
      forceNew: true
    });
  });

  useEffect(() => {
    console.log("Setting up socket event listeners");

    // Connection successful
    socketio.on("connect", () => {
      console.log("✅ Connected to server with ID:", socketio.id);
      setConnected(true);
    });

    // Connection failed
    socketio.on("connect_error", (error) => {
      console.error("❌ Connection error:", error.message);
      console.error("Error details:", error);
      setConnected(false);
    });

    // Disconnected
    socketio.on("disconnect", (reason) => {
      console.log("🔌 Disconnected from server. Reason:", reason);
      setConnected(false);
    });

    // Receive chat messages
    socketio.on("chat", (receivedChats) => {
      console.log("📨 Received chats:", receivedChats);
      setChats(receivedChats);
    });

    // Cleanup function
    return () => {
      console.log("🧹 Cleaning up socket listeners");
      socketio.off("connect");
      socketio.off("connect_error");
      socketio.off("disconnect");
      socketio.off("chat");
    };
  }, [socketio]);

  const sendToSocket = (chat) => {
    console.log("📤 Sending to socket:", chat);
    if (connected) {
      socketio.emit('chat', chat);
    } else {
      console.warn("⚠️ Cannot send message - not connected to server");
    }
  };

  const addMessage = (chat) => {
    console.log("💬 Adding new message:", chat);
    const newChat = {
      ...chat,
      user: localStorage.getItem("user"),
      avatar: localStorage.getItem("avatar"),
    };
    const updatedChats = [...chats, newChat];
    setChats(updatedChats);
    sendToSocket(updatedChats);
  };

  const Logout = () => {
    console.log("👋 User logging out");
    localStorage.removeItem("user");
    localStorage.removeItem("avatar");
    setUser('');
    if (socketio) {
      socketio.disconnect();
    }
  };

  // Debug info in console
  useEffect(() => {
    console.log("🔍 Current state:", { 
      user, 
      connected, 
      chatsCount: chats.length,
      socketId: socketio?.id 
    });
  }, [user, connected, chats.length, socketio?.id]);

  return (
    <div>
      {user ? (
        <div className="chat_container">
          <div className="chat_header">
            <div className="chat_header_content">
              <div className="user_info">
                <h4>
                  {user}
                  <span className="user_status" style={{
                    color: connected ? '#00d4aa' : '#dc2626',
                    marginLeft: '8px',
                    fontSize: '12px'
                  }}>
                    {connected ? '● Online' : '● Offline'}
                  </span>
                </h4>
                <p style={{ fontSize: '12px', color: '#666' }}>
                  {connected ? `Connected (${socketio?.id?.slice(-6)})` : 'Connecting...'}
                </p>
              </div>

              <div className="app_title">Chat App</div>

              <div onClick={Logout} className="logout_section">
                <button className="logout_btn">Logout</button>
              </div>
            </div>
          </div>

          <div className="chat_content">
            <div className="chat_lists_container">
              {!connected && (
                <div style={{
                  padding: '20px',
                  textAlign: 'center',
                  color: '#dc2626',
                  background: '#fef2f2',
                  borderRadius: '8px',
                  margin: '10px 0'
                }}>
                  🔌 Connecting to server... Check console for details
                </div>
              )}
              <ChatLists chats={chats} />
            </div>
            <div className="input_text_container">
              <InputText addMessage={addMessage} disabled={!connected} />
            </div>
          </div>
        </div>
      ) : (
        <UserLogin setUser={setUser} />
      )}
    </div>
  );
};

export default ChatContainer;