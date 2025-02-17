import React,{useState,useEffect} from "react";
import { Link, useParams,useNavigate } from "react-router-dom";
import axios from "axios";

function Edit()
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
const navigate = useNavigate();

const handleChange = (event) => {
    const {name,value} = event.target;
     setData([{...data,[name]:value}])
  };

function handleSubmit(e)
    {
        e.preventDefault();

        axios.post(`http://localhost:5000/edit_user/${id}`,data[0])
        .then((res)=>{
            navigate('/');
            console.log(res);
        })
        .catch((err)=>console.log(err));
    }

    // const formatDate = (dateString) => {
    //   const dates = new Date(dateString); // Convert the string to a Date object
    //   return dates.toLocaleDateString('en-US', {
    //     weekday: 'long',   // "Monday"
    //     year: 'numeric',   // "2025"
    //     month: 'long',     // "January"
    //     day: 'numeric'     // "20"
    //   });
    // };
    return(
        <div className="container-fluid bg-primary containerrr">
         <h1>User{id}</h1>
         <Link to='/' className="btn btn-success" >Back</Link>
         {data.map((students)=>{
       
                return(
                    <form onSubmit={handleSubmit}>
                   <div className="form-group my-3">
                      <label htmlFor="Department">Department:&nbsp;&nbsp;&nbsp;</label>
                      <input
                       type="text"
                        name="Department"
                        required onChange={handleChange}
                        value={students.department} />
                    </div>

                 <div className="form-group my-3">
                      <label htmlFor="Class_Room">Class Room:&nbsp;&nbsp;&nbsp;</label>
                      <input type="text" name="Class_Room" required onChange={handleChange}
                      value={students.class_room} />
                    </div>

                    <div className="form-group my-3">
                      <label htmlFor="Instructor">Instructor:&nbsp;&nbsp;&nbsp; </label>
                      <input type="text" name="Instructor" required onChange={handleChange} 
                      value={students.instructor}/>
                    </div>
                    <div className="form-group my-3">
                      <label htmlFor="Course">Course:&nbsp;&nbsp;&nbsp;</label>
                      <input type="text" name="Course" required onChange={handleChange} 
                      value={students.course}/>
                    </div>
                    <div className="form-group my-3">
                      <label htmlFor="Date">Date:&nbsp;&nbsp;&nbsp;</label>
                      <input type="date" name="Date"  onChange={handleChange} 
                      value={students.date}/>
                    </div>
                    <div className="form-group my-3">
                      <label htmlFor="Start_Time">Start Time:&nbsp;&nbsp;&nbsp;</label>
                      <input type="time" name="Start_Time" required onChange={handleChange} 
                      value={students.start_time}/>
                    </div>
                    <div className="form-group my-3">
                      <label htmlFor="End_Time">End Time:&nbsp;&nbsp;&nbsp;</label>
                      <input type="time" name="End_Time" required onChange={handleChange} 
                      value={students.end_time}/>
                    </div>
                    <div className="form-group my-3">
                        <button type="submit" className="btn btn-success">Save</button>
                    </div>
                </form>
            );
         })}
        </div>
    );
}
export default Edit;