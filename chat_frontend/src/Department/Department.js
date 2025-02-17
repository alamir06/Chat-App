import React from 'react'
import "./department.css";
const Department = (props) => {
  return (
    <div className='card'>
        <h1 className='dep-text'> {props.department}</h1>
        <img className='image-head' src={props.image} />
    </div>
  )
}

export default Department;