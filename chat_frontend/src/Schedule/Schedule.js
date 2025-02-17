import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import './schedule.css';
import { BrowserRouter,Routes,Route } from "react-router";
import Home from "./components/Home";
import Edit from "./components/Edit";
import Read from "./components/Read";
import Create from "./components/Create";

function Schedule() {

  return (
     <BrowserRouter>
     <Routes>
      <Route>
      <Route path="/" element={<Home />} />
      <Route path="/Edit/:id" element={<Edit />} />
      <Route path="/Read/:id" element={<Read />} />
      <Route path="/Create" element={<Create />} />
      </Route>
     </Routes>
     </BrowserRouter>
  );
}

export default Schedule;