const express = require("express");
const app = express();
const path = require("path");
const port = 5000;
const request = require("request");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const User = require("./model/user");

mongoose.connect("mongodb://127.0.0.1:27017/login-app-db", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
app.use("/", express.static(path.join(__dirname, "static")));

app.get("/", (req, res) => {
  res.send("Hello World!");
});

// user signup
app.post("api/register", async (req, res) => {
  console.log(req.body);
});
// set up backend
app.listen(port, () => {
  console.log("server is started on port 5000");
});
