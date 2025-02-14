import React, { useState, useEffect } from "react";
import { io } from "socket.io-client";
import { Link } from "react-router-dom";

const socket = io("http://localhost:5000");

function View()
{
     const [users, setUsers] = useState([]);
     console.log(users);
     
useEffect(() => {
     socket.on("user_list", (userList) => {
        setUsers(userList);
      });
      return () => {
        socket.off("user_list");
      };
    },[])
    return(
        <div>
         <Link  to='/' >Back</Link>
        <div className="usersList">
            <h3>Active Users:-</h3>
       {users.map((user, index) => (
      <div key={index} className="user">{user}</div>
       ))}
          </div>
        </div>
    );
}


export default View;