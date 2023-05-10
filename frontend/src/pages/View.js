import React, { useState, useEffect } from 'react';
import { useParams, Link } from "react-router-dom";
import axios from 'axios';
import "./View.css";

const View = () => {
    const [user, setState] = useState({});

    const { id } = useParams();
    useEffect(() => {
        axios.get(`http://localhost:5000/api/get/${id}`).then((resp) => setState({ ...resp.data[0] }));
    }, [id]);
    
  return (
      <div style={{ margin: "150px" }}>
          <div className='card'>
              <div className='card-header'>
                  <p>WORK DETAILS</p>
              </div>
              <div className='container'>
                  <strong>No.</strong>
                  <span>{id}</span>
                  <br /><br />
                  <strong>Pending Work: </strong>
                  <span>{user.work}</span>
                  <br /><br />
                  <strong>Time Limit: </strong>
                  <span>{user.timeLimit}</span>
                  <br /><br />
                  <Link to="/">
                    <div className="btn btn-view">Go Back</div>
                  </Link>
              </div>
          </div>
      {/* <h2>VIEW</h2> */}
    </div>
  )
}

export default View
