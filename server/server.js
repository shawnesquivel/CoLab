const express = require("express");
const app = express();
const path = require("path");
const port = 5000;
const request = require("request");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const User = require("./model/user"); // User is a document, which is an instance of the model.
const cors = require("cors"); // allow frontend to make requests to backend on different origins
const bcrypt = require("bcryptjs"); //password hasher
const { resourceLimits } = require("worker_threads");
const jwt = require("jsonwebtoken");
// Very sensitive - keep safe.
const JWT_SECRET_KEY = "mv(3jfoa.@01va(Adup";
const MONGOOSE_URL = "mongodb://127.0.0.1:27017/login-app-db";

// To allow requests from client side server
app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);

// To allow the request body to be parsed
app.use(bodyParser.json());

// CONNECT TO DATABASE
mongoose
  .connect(MONGOOSE_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then((res) => {
    console.log(`Database connected at ${MONGOOSE_URL}`);
  })
  .catch((err) => console.log(err));

app.use("/", express.static(path.join(__dirname, "static")));

// CONNECT TO EXPRESS SERVER
app.listen(port, () => {
  console.log(`Server is online at Port ${port}`);
});

// TEST ENDPOINT
app.get("/", (req, res) => {
  res.send("Welcome to the Express Server!");
});

// ENDPOINT #1 - USER SIGNUP
app.post("/api/register", async (req, res) => {
  console.log("Registration Received: req.body:", req.body); // needs bodyParser installed to decode the body
  const { user, pwd: plainTextPwd } = req.body;

  // Check for valid Username/Password. Better to check in bakcend.
  if (!user || typeof user !== "string") {
    return res.json({ status: "error", error: "invalid username" });
  }
  if (!plainTextPwd || typeof plainTextPwd !== "string") {
    console.log(plainTextPwd);
    return res.json({ status: "error", error: "invalid password" });
  }
  const encryptedPwd = await bcrypt.hash(plainTextPwd, 10); // 10 = how slow the algo will be

  // Create a record/document in the User model
  try {
    const res = await User.create({
      username: user,
      password: encryptedPwd,
    });
    console.log("User was created successfully: ", res);
  } catch (err) {
    console.log(err);
    if (err.code === 11000) {
      return res.json({
        status: "error",
        error: "Username already in use!",
      });
    }
    throw err;
  }
  res.json({ status: "OK" });
});

// ENDPOINT #2 - USER LOGIN
app.post("/api/login", async (req, res) => {
  const { user, pwd } = req.body;
  console.log("Server received login request:", user, pwd);

  // Find the User record
  // .lean() returns a Plain Old Java Object (POJO) instead of the entire
  const userRecord = await User.findOne({ username: user });

  console.log("User in Database:", userRecord);

  if (!userRecord) {
    return res.json({
      status: "error",
      error: "Please double check the username and/or password.",
    });
  }

  // Compares the password and the hash(password)
  if (await bcrypt.compare(pwd, userRecord.password)) {
    // Public information, do not put sensitive info.
    // The JWT signs the header/payload based on our signature.
    const token = jwt.sign(
      { id: userRecord._id, username: userRecord.username },
      JWT_SECRET_KEY
    );
    if (token) {
      console.log("Succesfully signed token");
    }
    return res.json({ status: "OK", data: token });
  }

  res.json({ status: "OK", data: "beep boop" });
});

// ENDPOINT #3 - CHANGE PASSWORD
app.post("/api/changepassword", (req, res) => {
  const { token } = req.body;
  // verify the token
  const userLoggedIn = jwt.verify(token, JWT_SECRET_KEY);
  console.log(userLoggedIn);
  res.json({ status: "OK" });
});
