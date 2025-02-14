import React from 'react';
import './App.css';
import Chat from './Chat';
import View from './viewMember';
import { BrowserRouter,Routes,Route } from "react-router";

function App() {
  return (
    <div className="App">
     <BrowserRouter>
     <Routes>
      <Route>
      <Route path="/" element={<Chat />} />
      <Route path="/view" element={<View />} />
      </Route>
    </Routes>
    </BrowserRouter>
    </div>
  );
}

export default App;