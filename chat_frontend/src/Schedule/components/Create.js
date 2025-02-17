import React, { useState } from "react";
import axios from "axios";
import {Link, useNavigate} from "react-router-dom";

function Create ()
{
    const [valus,setValues] = useState ({
      department:"",
        class_room:"",
        instructor:"",
        course:"",
        date:"",
        start_time:"",
        end_time:"",  
    });
  const navigate= useNavigate();

    const handleChange = (event) => {
        const {name,value} = event.target;
         setValues((preValues)=>{
            return {
                ...preValues,
                [name]:value
            }
         })
       
       
      };
      


    function handleSubmit(e)
    {
        e.preventDefault();

        axios.post('http://localhost:5000/add_user',valus)
        .then((res)=>{
            navigate('/');
            console.log(res);
        })
        .catch((err)=>console.log(err));
    }
    return(
        <div className="container   containerrr">
            <div className="row">
                <h3>Add Schedule</h3>
                <div className="d-flex justify-content-end">
                 <Link to='/' className='btn btn-success add'>Home</Link>
                       </div>

                <form onSubmit={handleSubmit}>
                    <div className="form-group my-3">
                      <label htmlFor="department">Department:</label>
                      <input
                       type="text"
                        name="department"
                        required onChange={handleChange}
                        value={valus.department} />
                    </div>
                    <div className="form-group my-3">
                      <label htmlFor="class_room">Class Room: </label>
                      <input type="text" name="class_room" required onChange={handleChange}
                      value={valus.class_room} />
                    </div>
                    <div className="form-group my-3">
                      <label htmlFor="instructor">Instructor: </label>
                      <input type="text" name="instructor" required onChange={handleChange} 
                      value={valus.instructor}/>
                    </div>
                    <div className="form-group my-3">
                      <label htmlFor="course">Course</label>
                      <input type="text" name="course" required onChange={handleChange} 
                      value={valus.course}/>
                    </div>
                    <div className="form-group my-3">
                      <label htmlFor="date">Date</label>
                      <input type="date" name="date" required onChange={handleChange} 
                      value={valus.date}/>
                    </div>
                    <div className="form-group my-3">
                      <label htmlFor="start_time">Start Time</label>
                      <input type="time" name="start_time" required onChange={handleChange} 
                      value={valus.start_time}/>
                    </div>
                    <div className="form-group my-3">
                      <label htmlFor="end_time">End Time</label>
                      <input type="time" name="end_time" required onChange={handleChange} 
                      value={valus.end_time}/>
                    </div>
                    <div className="form-group my-3">
                        <button type="submit" className="btn btn-success SAVE">Save</button>
                    </div>
                </form>
            </div>
        </div>
    );
}
export default Create;