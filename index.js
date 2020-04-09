// npm init -y to generate a package.json file
// npm install
// npm install nodemon
// npm install express (middlware to get requests and repsonse objets)
// must add "server": "nodemon index.js" in script of jackage.json file

// going to return a function
const express = require("express");
const db = require("./db.js")

// Creates the server, return a server object
const server = express();

// req an obj that contains all the info in this http request
// res an obj that contains data that the express server is going to use to send to the user
server.get("/", (req, res) => {
  res.send("Hello from EXPRESS");
});

// R - Read (CRUD)
server.get("/users", (req, res) => {
    const users = db.getUsers();

  res.status(200).json(users);
});

// R - Read individual user
server.get("/users/:id", (req, res) => {
    // grab the individual user
    const userID = req.params.id;
    const user = db.getUserById(userID);

    // checking if the user exists
    if (user) {
        res.json(user);
    } else {
        res.status(404).json({message: "User Nowhere"})
    }
})

// C - Create (CRUD)
server.post("/users", (req, res) => {
  const userInfo = req.body;
  console.log("body: ", userInfo);
});

// U - Update (CRUD)

// D - Delete (CRUD)
server.delete("/users/:id", (req, res) => {
    const
})

server.listen(5000, () => {
  console.log("== server listening on port 5000 ==");
});