import express from "express";
import http from "http";
import cors from "cors";
import { Server } from "socket.io";
import pg from "pg";
// const pool = require("./db");


const db=new pg.Client({
  user:"postgres",
  host:"localhost",
  database:"Chat",
  password:"alamir@po",
  port:5432,
});

const app = express();
const server = http.createServer(app);
app.use(express.json());
app.use(cors());
const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000", // React frontend URL
    methods: ["GET", "POST"],
  },
});
db.connect();


app.get("/messages", async (req, res) => {
  try {
    const result = await db.query("SELECT * FROM chat ORDER BY created_at ASC");
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch messages" });
  }
});

let users = {};

io.on("connection", (socket) => {
  console.log(`User connected: ${socket.id}`);

  socket.on("send_message", async (data) => {
    const { name, message } = data;

    try {
      // Save message to database
      const result = await db.query("INSERT INTO chat(name, message) VALUES ($1, $2) RETURNING *",
        [name, message]
      );
      io.emit("receive_message", result.rows[0]);
    } catch (err) {
      console.error(err);
    }
  });

  // User joins chat
  socket.on("join_chat", (username) => {
    users[socket.id] = username;
    io.emit("user_list", Object.values(users));
    io.emit("receive_message", { name: "System", message: `${username} joined the chat!` });
  });

  // Handle user disconnect
  socket.on("disconnect", () => {
    const username = users[socket.id];
    delete users[socket.id];
    io.emit("user_list", Object.values(users));
    io.emit("receive_message", { name: "System", message: `${username} left the chat.` });
    console.log(`User disconnected: ${socket.id}`);
  });
});

server.listen(5000, () => {
  console.log("Server running on port 5000");
});
