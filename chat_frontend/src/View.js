import React, { useState, useEffect } from "react";
import { io } from "socket.io-client";
import { Link } from "react-router-dom";

const socket = io("http://localhost:5000");

function View()
{
    
      const [messages, setMessages] = useState([]);
      const [users, setUsers] = useState([]);

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


    return(
        <div className="view-container">
         <Link  to='/' className="views">Back Chat</Link>
        <div className="usersLists">
            <h3>Active Users:-{users.length}</h3>
       {messages.map((user, index) => (
      <div key={index} className="user">{user.name}</div>
       ))}
          </div>
        </div>
    );
}


export default View;