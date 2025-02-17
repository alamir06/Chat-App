import React, { useState, useEffect,useRef } from "react";
import { io } from "socket.io-client";
import "./chat.css";

const socket = io("http://localhost:5000");


const Chat = () => {
  const [username, setUsername] = useState("");
  const [userJoined, setUserJoined] = useState(false);
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [users, setUsers] = useState([]);
  const chatEndRef = useRef(null);
  useEffect(() => {
    fetch("http://localhost:5000/messages")
      .then((res) => res.json())
      .then((data) => setMessages(data))
      .catch((err) => console.error("Error fetching messages:", err));
  }, []);


  useEffect(() => {
    socket.on("receive_message", (data) => {
      setMessages((prevMessages) => [...prevMessages, data]);
    });

    socket.on("user_list", (userList) => {
      setUsers(userList);
    });

    return () => {
      socket.off("receive_message");
      socket.off("user_list");
    };
  }, []);


const scrollToBottom = () => {
  chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
};
useEffect(() => {
  scrollToBottom();
}, [messages]);

const handlkeydown=(e)=>{
  if (e.key === "Enter" && message.trim() !== "") {
    joinChat();
  }
};
  const joinChat = () => {
    if (username.trim()) {
      socket.emit("join_chat", username);
      setUserJoined(true);
    }
  };

  const sendMessage = (e) => {
    if ( message.trim()) {
      socket.emit("send_message", { name: username, message });
      setMessage("");
    }
  };

   const handleKeyDown=(e)=>{
      if (e.key === "Enter" && message.trim() !== "") {
          sendMessage();
      }
  };

   
  return (
    
    <div className="container">
    <div className="link">
   
    </div>
    
      {!userJoined ? (
        <div className="joinContainer">
        
          <input
            type="text"
            placeholder="Enter your name"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="input"
            onKeyDown={handlkeydown}
          />
          <button onClick={joinChat} className="button">
            Join Chat
          </button>
        </div>
      ) : (
        <div className="chatContainer">
          <div className="usersList">
            <h3>Active Users:{users.length}</h3>
            {/* <button onClick={view}> View Active users</button> */}
            
          </div>
          <div className="chatBox">
            {messages.map((msg, index) => (
              <div
              className="message"
                key={index}
                style={{
                  message,
                  alignSelf: msg.name === username ? "flex-end" : "flex-start",
                  backgroundColor: msg.name === username ? "#4caf50" : "#81DAE3",
                  Color: msg.name === username ? "#FFCF50" : "#e0e0e0",
                }}
              >
                <strong>{msg.name}:</strong> {msg.message}
              </div>
            ))}
          </div>
          <div className="inputContainer" ref={chatEndRef}>
            <input
              type="text"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Type a message..."
              className="input"
              onKeyDown={handleKeyDown}
            />
            <button onClick={sendMessage} className="button">
              Send
            </button>
          </div>
        </div>
      )}
    </div>
  );
};



export default Chat;
