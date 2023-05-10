import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./Home.css";
import { toast } from "react-toastify";
import axios from "axios";
import del from "../pages/images/delete4.png";
import edit from "../pages/images/pencil2.png";
import view from "../pages/images/view2.png";
import add from "../pages/images/add.png";

const Home = () => {
  const [data, setData] = useState([]);
  //since we are dealing with AP, we ahve to use async()
  function loadData() {
    axios.get("http://localhost:5000/api/get").then((res) => {
      setData(res.data);
    });
  };

  useEffect(() => {
    loadData();
  }, []);

  // loadData();
  const deleteContact = (id) => {
    if (window.confirm("Are you sure to delete this task?")) {
      //it will be in template literal
      axios.delete(`http://localhost:5000/api/remove/${id}`);
      toast.success("Deleted Successfully!");
      setTimeout(() => loadData(),300);
    }
  }

  return (
    <div style={{ marginTop: "150px" }}>
      <h3>Explore Your Potential</h3>
      <Link to="/addContact"> 
        <button className="btn btn-add">ADD </button>
      </Link>
      {/* <h2>HOME</h2> */}
      <table className="styled-table">
        <thead className="heading">
          <tr>
            <th style={{ textAlign: "center" }}> No. </th>
            <th style={{ textAlign: "center" }}> Work </th>
            <th style={{ textAlign: "center" }}> TimeLimit </th>
            {/* DELETE ,VIEW, EDIT BUTTONS */}
            <th style={{ textAlign: "center" }}> Action </th>
          </tr>
        </thead>
        
          {data.map((item, index) => {
            return (
              <> 
              <tbody>
              <tr key={item.id}>
                <th scope="row">{index + 1}</th>
                <td>{item.work}</td>
                <td>{item.timeLimit}</td>
                    <td>
                      {/* template literal */}
                  <Link to={`/update/${item.id}`}>
                         <img classname="edit_img" src={ edit } /> 
                  </Link>

                       <img onClick={()=> deleteContact(item.id)} src={ del } /> 

                  <Link to={`/view/${item.id}`}>
                         <img src={ view }></img> 
                  </Link>
                </td>
                </tr>
                </tbody>
                </>
            )
          })};
      </table>
    </div>
  );
};

export default Home;

//rafce-> for generating snippet
