import React, { useState,useEffect } from "react";
import "./style.css"; // Import manual CSS
import Chat from "../chat/Chat";
import Schedule from "../Schedule/Schedule";
import Home from "../Home/Home";
import injibar from "../asset/images/injibar.jfif"
const App = () => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);
    const [activePage, setActivePage] = useState('Home'); // Default page

    // Toggle Sidebar
    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen);

    };
    const toggleSidebarcl = () => {
      setIsSidebarOpen(!isSidebarOpen);
  };
    
    // Handle Sidebar Item Click
    const handlePageChange = (page) => {
        setActivePage(page);
    };

      useEffect(() => {
        const handleClickOutside = (event) => {
          if (event.target.id !== 'sidebar' && event.target.id !== 'hamburger') {
            setIsSidebarOpen(false);
          }
        };
        
        document.addEventListener('click', handleClickOutside);
        return () => {
          document.removeEventListener('click', handleClickOutside);
        };
      }, []);
    return (
        
        <div className="dashboard-container">
        <div className="home-header">
            <div className="hamburger">
            <button id="hamburger" className={`menu-icon ${isSidebarOpen ? "open" : ""}`} onClick={toggleSidebar}>
                    ☰
                </button>
                </div>
                <div className="title-header">
                  <div className="name-injibara">
                  <div>
                  <img className="injibar-image" src={injibar} alt="injibara logo" />
                  </div>
                  <div>
                  <h1>Injibara university</h1>
                  <p>Explore your creative potential</p>
                  </div>
                  </div>
               
                <div className="name-system">
                  <h2>College of Engineering and Technology</h2>
                  <p>Student registration system for club</p>
                 </div>
                 </div>
                </div>
            <div id="sidebar" className={`sidebar ${isSidebarOpen ? "open" : ""}`}>
            <button className="close-btn" onClick={toggleSidebarcl}>✖</button>
                <h2>Dashboard</h2>
                <ul>
                    <li onClick={() => handlePageChange("Home")}>🏠 Home</li>
                    <li onClick={() => handlePageChange("Chat")}>🏠 Chat</li>
                    <li onClick={() => handlePageChange("Schedule")}>👤 Schedule</li>
                    <li onClick={() => handlePageChange("Settings")}>⚙️ Settings</li>
                </ul>
            </div>
        
            <div className="main-content">
                <div className="content">
                     {activePage === "Home" && <Home />}
                    {activePage === "Chat" && <Chat />}
                    {activePage === "Schedule" && <Schedule />}
                    {activePage === "Settings" && <h1 > ❄  Setting </h1>}
                </div>
            </div>
        </div>
    );
};

export default App;
