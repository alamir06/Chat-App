import React from 'react'
import "./footer.css";
const Footer = () => {
  return (
    <div className='Footer'>
        <p>{ new Date().getFullYear() + "/" + new Date().getMonth() + "/" + new Date().getDate()}</p>
        <p>All Right Reserved </p>
        <p>Develop by College of Engineering and Technology student union</p>
    </div>
  )
}

export default Footer;