import React from "react";
import "./Home.css";
import Data from "../Department/Data";
import Department from "../Department/Department";
import Footer from "../Footer/Footer";
function Home()
{
    return(
        <div className="home-container">
       <section id="home">
        <h1>Wellcome to the Registration system for club</h1>
        <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.
         It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.</p>
       </section>
       <section id="departmnet">
       <h1 className="deph1" >Departments</h1>
        <div className="department-card">
           {Data.map((data,index)=>
            <Department 
                key={index}
                department={data.department}
                image={data.image}
            />
           )}
        </div>
       </section>
       <section id="footer">
        <Footer />
       </section>
        </div>
    );
}

export default Home;