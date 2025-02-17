import express from "express";
import http from "http";
import cors from "cors";
import { Server } from "socket.io";
import pg from "pg";
import { dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
// const pool = require("./db");


const db=new pg.Client({
  user:"postgres",
  host:"localhost",
  database:"Student",
  password:"alamir@po",
  port:5432,
});

const app = express();
const server = http.createServer(app);
const __dirname = dirname(fileURLToPath(import.meta.url));
app.use(express.json());
app.use(cors());
app.use(express.static("public"));

const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000", // React frontend URL
    methods: ["GET", "POST"],
  },
});
db.connect();


app.post('/add_user',async(req,res)=>{
  const Department=req.body.department;
  const Class_Room=req.body.class_room;
  const Instructor=req.body.instructor;
  const Course=req.body.course;
  const Date=req.body.date;
  const Start_Time=req.body.start_time;
  const End_Time=req.body.end_time;
  try {
      await db.query('INSERT INTO student_details(Department,Class_Room,Instructor,Course,Date,Start_Time,End_Time)values($1,$2,$3,$4,$5,$6,$7)',
        [Department,Class_Room,Instructor,Course,Date,Start_Time,End_Time]);
       return res.json({success:"Schedule add successfully"});
  } catch (error) {
    console.log(error);
  }
});

app.get('/students',async(req,res)=>{
try {
  const responce= await db.query('SELECT * FROM student_details');

  return res.json(responce.rows);

} catch (error) {
  console.log(error);
  
}

});

app.get('/get_students/:id',async(req,res)=>{
  const id=req.params.id;

  try {
    const responce= await db.query('SELECT * FROM student_details where id=$1',[id]);
    return res.json(responce.rows);
  } catch (error) {
    console.log(error);
    
  }

  });

  app.post('/edit_user/:id',async(req,res)=>{
    const id=req.params.id;
    try {
       await db.query('UPDATE student_details SET Department=$1,Class_Room=$2,Instructor=$3,Course=$4,Date=$5,Start_Time=$6,End_Time=$7 where id=$8',
        [req.body.department,req.body.class_room,req.body.instructor,req.body.course,req.body.date,req.body.start_time,req.body.end_eime,id]);
        return res.json({success:"Schedule update successfully"});
    } catch (error) {
      console.log(error);
    }
    });
  
    app.delete('/delete/:id',async(req,res)=>{
      const id=req.params.id;
      try {
         await db.query('DELETE FROM student_details  where id=$1',[id]);
          return res.json({success:"Schedule DELETE successfully"});
      } catch (error) {
        console.log(error);
      }
      });

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
    io.emit("receive_message", { name: `${username}`, message: `${username} joined the chat!` });
  });

  // Handle user disconnect
  socket.on("disconnect", () => {
    const username = users[socket.id];
    delete users[socket.id];
    io.emit("user_list", Object.values(users));
    io.emit("receive_message", { name:  `${username}`, message: `${username} left the chat.` });
    console.log(`User disconnected: ${socket.id}`);
  });
});

server.listen(5000, () => {
  console.log("Server running on port 5000");
});
