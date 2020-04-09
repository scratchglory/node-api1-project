// npm init -y to generate a package.json file
// npm install
// npm install nodemon
// npm install express (middlware to get requests and repsonse objets)
// must add "server": "nodemon index.js" in script of jackage.json file
// Using EXPRESS
const express = require("express");
const db = require("./db.js");

// create our server instance
const server = express();

// middleware, allowing our api to parse the body into an obj
// this is needed to create a user
server.use(express.json());

server.get("/", (req, res) => {
  res.json({ message: "hello world" });
});

// R - Read
// getting users from database, returning the info to client
server.get("/users", (req, res) => {
  const users = db.getUsers();
  res.json(users);
});

// fetching individual user
server.get("/users/:id", (req, res) => {
  // grab the individual user
  const userId = req.params.id;
  const user = db.getUserById(userId);

  // checking if the user exists or not
  if (user) {
    res.json(user);
  } else {
    res.status(404).json({ message: "User NOWHERE" });
  }
});

// Create - CRUD
// Create new user
server.post("/users", (req, res) => {
  // checking if body has something
  if (!req.body.name) {
    return res.status(404).json({
      message: "Need USER",
    });
  }
  const newUser = db.createUser({
    // name: "Bob Doe",
    // eliminating from hardcoding
    name: req.body.name,
  });
  res.status(201).json(newUser);
});

// Update - CRUD
server.put("/users/:id", (req, res) => {
  const user = db.getUserById(req.params.id);

  // can't update a user that doesn't exist, so make sure it exists first
  if (user) {
    const updatedUser = db.updateUser(user.id, {
      name: req.body.name || user.name,
    });

    res.json(updatedUser);
  } else {
    return res.status(404).json({
      message: "Need USER",
    });
  }
});

// Delete - CRUD
server.delete("/users/:id", (req, res) => {
  const userId = req.params.id;
  const user = db.deleteUser(userId);

  if (user) {
    db.deleteUser(user.id);
    // not returning anything, .end is attached
    res.status(204).end;
  } else {
    return res.status(404).json({
      message: "Need USER",
    });
  }
  res.json(user);
});

server.listen(5050, () => {
  console.log("== On Server 5050 == ");
});
