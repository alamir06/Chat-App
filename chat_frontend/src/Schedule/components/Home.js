import React, { useEffect, useState } from "react";
import { Link, } from "react-router-dom";
import axios from "axios";


function  Home()
{
const [data,setData] = useState([]);
const [deleted,setDeleted] = useState(true);
// const {id} =useParams();

useEffect(()=>{
    if(deleted)
    {
        setDeleted(false);
   axios.get('http://localhost:5000/students')
    .then((res)=>{
        setData(res.data)
    })
    .catch((error)=>console.log(error));   
} 
},[deleted]);


function handleDelte(id){
   
       axios.delete(`http://localhost:5000/delete/${id}`)
       .then((res)=>{
            setDeleted(true)
       })
       .catch((err)=>console.log(err));
}


    return (
        <div className="container-fluid bg-primary homecon">
            <h3 className="title"> Schedule</h3>
            <div className="d-flex justify-content-end">
                <Link className="btn btn-success add" to='/Create' >Add Schedule</Link>
            </div>
           <table className="table-with-borders">
            <thead >
                <tr >
                    <th>Department</th>
                    <th>Class Room</th>
                    <th>Instructor</th>
                    <th>Course</th>
                    <th>Date</th>
                    <th>Start Time</th>
                    <th>End Time</th>
                    <th>Actions</th>
                </tr>
            </thead>
            <tbody className="btb">
                {
                    data.map((students,index)=>{
                        const formatDate = (dateString) => {
                            const date = new Date(dateString); // Convert the string to a Date object
                            return date.toLocaleDateString('en-US', {
                              weekday: 'long',   
                              year: 'numeric',  
                              month: 'long',     
                              day: 'numeric'    
                            });
                          };
                        
                        
                        return (<tr key={index}>
                        <td >{students.department}</td>
                        <td >{students.class_room}</td>
                        <td >{students.instructor}</td>
                        <td >{students.course}</td>
                        <td >{formatDate(students.date)}</td>
                        <td>{students.start_time}</td>
                        <td >{students.end_time}</td>
                        <td  className="btb">
                            <Link to={`/Read/${students.id}`} className='btn mx-5 btn-success read'>Read</Link>
                            <Link to={`/Edit/${students.id}`} className='btn mx-2  btn-success edit'>Edit</Link>
                            <Link  className='btn mx-2 btn-danger delete' onClick={()=>handleDelte(students.id)}>Delete</Link>
                        </td>
                      </tr>);
                    })
                }
            </tbody>
           </table>
        </div>
    );
} 

export default Home;