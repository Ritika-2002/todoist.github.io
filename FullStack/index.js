//BASIC CONFIGRATION STARTS HERE
const express = require('express')
const app = express();
const bodyParser = require("body-parser");
//connecting mysql to node js
const mysql = require("mysql2");
//cors-used to access our backend API in our react frontent side
const cors = require("cors");
//establishing the connection here
//USING SQL
const db = mysql.createPool({
    host: "localhost",
    user: "root",
    password: "#Smart@1112",
    database: "crud_fullstack"
});

//middlewares
app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
//BASIC CONFIGRATION ENDS HERE

//creating API 
app.get("/api/get", (req, res) => {
    const sqlGet = "SELECT * FROM todo_fullstack";
    db.query(sqlGet, (error, result) => {
        res.send(result);
    });
});

app.post("/api/post", (req, res) => {
    const { work, timeLimit } = req.body;
    const sqlInsert = ("INSERT INTO todo_fullstack (work, timeLimit) VALUES (?,?)");
    db.query(sqlInsert, [work, timeLimit], (err, result) => {
        if (err) {
            console.log(err);
        }

        // res.send(result);
    })
});


app.delete("/api/remove/:id", (req, res) => {
    const { id } = req.params;
    const sqlRemove = "DELETE FROM todo_fullstack WHERE id=?";
    db.query(sqlRemove,id, (err, result) => {
        if (err) {
            console.log(err);
        }
        //res.send(result);
    })
});

app.get("/api/get/:id", (req, res) => {
    const { id } = req.params;
    const sqlGet = ("SELECT * FROM todo_fullstack WHERE id=?");
    db.query(sqlGet, id, (error, result) => {
        if (error) {
            console.log(error);
        }
        res.send(result);
    });
});

app.post("/api/update/:id", (req, res) => {
    const { id } = req.params;
    const { work,timeLimit} = req.body;
    const sqlUpdate = "UPDATE todo_fullstack SET work=?,timeLimit=? WHERE id=?";
    db.query(sqlUpdate, [work,timeLimit,id], (error, result) => {
        if (error) {
            console.log(error);
        }
        res.send(result);
    });
});

app.get("/", (req, res) => {
        res.send("Hello Express");
});

app.listen(5000,() => {
    console.log("Server is running on Port 5000");
})

 