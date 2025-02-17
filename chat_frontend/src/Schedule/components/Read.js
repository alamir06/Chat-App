import React,{useState,useEffect} from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";

function Read()
{ 
const [data,setData] = useState([]);
const { id } =useParams();

useEffect(()=>{
   axios
   .get(`http://localhost:5000/get_students/${id}`)
   .then((res)=>{
        setData(res.data)
    })
    .catch((error)=>console.log(error));
},[id]);
    return(
        <div className="container-fluid bg-primary containerrr">
         <h1>User</h1>
         <Link to='/' className="btn btn-success" >Back</Link>
         {data.map((students)=>{
                return(
                <ul className="list-group">
                <li className="list-group-item">
                <b>Department:</b>
                {students["department"]}
                </li>
                <li className="list-group-item">
                <b>Class_Room:</b>
                {students["class_room"]}
                </li>
                <li className="list-group-item">
                <b>Instructor:</b>
                {students["instructor"]}
                </li>
                <li className="list-group-item">
                <b>Course:</b>
                {students["course"]}
                </li>
                <li className="list-group-item">
                <b>Date:</b>
                {students["date"]}
                </li>
                <li className="list-group-item">
                <b>Start_Time:</b>
                {students["start_time"]}
                </li>
                <li>
                <b>End_Time:</b>
                {students["end_time"]}
                </li>
                </ul>
            );
         })}
        </div>
    );
}
export default Read;