import React, { useState } from "react";
import "./style.css"; // Import manual CSS
import Chat from "./Chat";
import View from "./View";
import Sidebar from "./Sidebar";
const App = () => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);
    const [activePage, setActivePage] = useState(''); // Default page

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

    return (
        <div className="dashboard-container">
            {/* Sidebar */}
            <div className={`sidebar ${isSidebarOpen ? "open" : ""}`}>
            <button className="close-btn" onClick={toggleSidebarcl}>✖</button>
                <h2>Dashboard</h2>
                <ul>
                    <li onClick={() => handlePageChange("Home")}>🏠 Home</li>
                    <li onClick={() => handlePageChange("View")}>👤 View</li>
                    <li onClick={() => handlePageChange("Settings")}>⚙️ Settings</li>
                </ul>
            </div>

            {/* Main Content */}
            <div className="main-content">
                {/* Hamburger Icon */}
                <button className={`menu-icon ${isSidebarOpen ? "open" : ""}`} onClick={toggleSidebar}>
                    ☰
                </button>

                {/* Dynamic Page Content */}
                <div className="content">
                    {activePage === "Home" && <Chat />}
                    {activePage === "View" && <Sidebar />}
                    {activePage === "Settings" && <h1> ❄  Setting </h1>}
                </div>
            </div>
        </div>
    );
};

export default App;
