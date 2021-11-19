const express = require("express");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const cors = require("cors");
const jwt = require("jsonwebtoken");
const User = require("../routes/models/user");

mongoose.connect("mongodb://192.168.6.201:27017/auth");

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

const port = process.env.PORT || 5000;

app.post("/signup", (req, res, next) => {
  const newUser = new User({
    email: req.body.email,
    name: req.body.name,
    password: bcrypt.hashSync(req.body.password, 10),
    role: req.body.role,
  });
  console.log(newUser);
  newUser.save((err) => {
    if (err) {
      return res.status(400).json({
        title: "Error",
        error: "Email in use",
      });
    }
    return res.status(200).json({
      title: "Success",
    });
  });
});

app.post("/login", (req, res, next) => {
  User.findOne({ email: req.body.email }, (err, user) => {
    if (err)
      return res.status(500).json({
        title: "server error",
        error: err,
      });
    //incorrect user
    if (!user) {
      return res.status(401).json({
        title: "User not found",
        error: "Invalid credentials",
      });
    }
    //incorrect password
    if (!bcrypt.compareSync(req.body.password, user.password)) {
      return res.status(401).json({
        title: "login failed",
        error: "invalid credentials",
      });
    }
    //all is correct - craete a JWT token and go to landing
    let token = jwt.sign({ userId: user._id }, "secretkey");
    return res.status(200).json({
      title: "login success!",
      token: token,
      role: user.role,
    });
  });
});
// user info
app.get("/user", (req, res, next) => {
  let token = req.headers.token;
  jwt.verify(token, "secretkey", (err, decoded) => {
    if (err)
      return res.status(401).json({
        title: "unauthtorized",
      });
    //token is valid
    User.findOne({ _id: decoded.userId }, (err, user) => {
      if (err) return console.log(err);
      return res.status(200).json({
        title: "user grabbed",
        user: {
          email: user.email,
          name: user.name,
        },
      });
    });
  });
});

app.get("/", (req, res, next) => {
  res.send("Express auth server is running!");
});

app.listen(port, (err) => {
  if (err) return console.log(err);
  console.log(`Auth server running on port ${port}`);
});
