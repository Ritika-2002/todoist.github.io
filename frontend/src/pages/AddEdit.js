import React, { useState, useEffect } from 'react';
import Picker from "emoji-picker-react";
import { useParams, Link } from 'react-router-dom';
import "./AddEdit.css";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from 'react-router-dom';
 


const initialState = {
  work: "",
  timeLimit:"",
}

const AddEdit = () => {
  const [state, setState] = useState(initialState);
  const navigate = useNavigate();

  const { id } = useParams();
  useEffect(() => {
    axios.get(`http://localhost:5000/api/get/${id}`).then((resp) => setState({ ...resp.data[0] }));
  }, [id]);

  //ADDING EMOJIS
  const [showPicker, setShowPicker] = useState(false);

  const onEmojiClick = (event, emojiObject) => {
    setState(prevInput => prevInput + emojiObject.emoji);
    setShowPicker(false);
  }


  //GETTING WORK AND TIMELIMIT VALUES
  const { work, timeLimit } = state;
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!work || !timeLimit) {
      toast.error("Please provide value to each input field");
    }
    else {
      if (!id) {
        axios.post("http://localhost:5000/api/post", {
          work,
          timeLimit
        }).then(() => {
          setState({ work: "", timeLimit: "" })
        }).catch((err) => toast.error(err.response.data));
        toast.success("Task added successfully");
      }
      else {
        axios.post(`http://localhost:5000/api/update/${id}`, {
          work,
          timeLimit
        }).then(() => {
          setState({ work: "", timeLimit: "" })
        }).catch((err) => toast.error(err.response.data));
        toast.success("Task updated successfully");
      }
      setTimeout(() => navigate.push("/"), 500);
    }
  };
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setState({ ...state, [name]: value });
  }

//LET'S RETURN IT
  return (
    <div style={{ marginTop: "100px" }}>
      <form style={{
        margin: "auto",
        padding: "15px",
        maxWidth: "400px",
        alignContent: "center"
      }}
        onSubmit={handleSubmit}>
        <label htmlFor='work'>Work</label>
        <input type="text"
          id="work"
          name="work"
          placeholder="what do you want to do?"
          value={work || ""}
          onChange={handleInputChange} />
        {/* <img onClick={() => setShowPicker(val => !val)} src={smile}></img>
         
        {showPicker && <Picker
          pickerStyle={{ width: '100%' }}
          onEmojiClick={{onEmojiClick}} />} */}
        
        <label htmlFor='timeLimit'>TimeLimit</label>
        <input type="number"
          id="timeLimit"
          name="timeLimit"
          placeholder="How much time you need?"
          value={timeLimit || ""}
          onChange={handleInputChange} />
        <input type="submit" value={id ? "Update" : "Save"} />
        <Link to="/">
          <input type="button" value="Go Back"/>
        </Link>
      </form>
    </div>
  );
}

export default AddEdit;
