import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [mainContent, setMainContent] = useState("Welcome to the App!");

  const handleHamburgerClick = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const handleSidebarItemClick = (content) => {
    setMainContent(content);
    setIsSidebarOpen(false); // Close sidebar after selecting item
  };

  // Close sidebar if clicked outside
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
    <div className="app">
      {/* Hamburger Menu */}
      <div id="hamburger" className="hamburger" onClick={handleHamburgerClick}>
        &#9776;
      </div>

      {/* Sidebar */}
      <div id="sidebar" className={`sidebar ${isSidebarOpen ? 'open' : ''}`}>
        <ul>
          <li onClick={() => handleSidebarItemClick('Content 1')}>Item 1</li>
          <li onClick={() => handleSidebarItemClick('Content 2')}>Item 2</li>
          <li onClick={() => handleSidebarItemClick('Content 3')}>Item 3</li>
        </ul>
      </div>

      {/* Main Content */}
      <div className="content">
        <h1>{mainContent}</h1>
      </div>
    </div>
  );
}

export default App;
