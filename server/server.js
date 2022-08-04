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

  // Compares the password and the hashed password
  if (await bcrypt.compare(pwd, userRecord.password)) {
    // Public information, do not put sensitive info.
    // The JWT signs the header/payload based on our signature.
    const token = jwt.sign(
      { id: userRecord._id, username: userRecord.username },
      JWT_SECRET_KEY
    );
    console.log(token);
    if (token) {
      console.log("Succesfully signed token");

      res.json({ status: "OK", data: token });
    } else {
      console.log("Did not sign token");
    }
  } else {
    return res.json({ status: "error" });
  }
});

// ENDPOINT #3 - CHANGE PASSWORD
app.post("/api/changepassword", async (req, res) => {
  const { oldPwd, newPwd, token } = req.body;
  console.log(oldPwd, newPwd, token);
  try {
    // verify the token - will throw error if not verified
    console.log("inside the try block");

    const user = jwt.verify(JSON.parse(token).data, JWT_SECRET_KEY);
    // TDL: check old password matches the hashed password
    // insert code here
    // TDL: check new password meets requirements via REGEX (extract out from Register)

    const newHashedPwd = await bcrypt.hash(newPwd, 10);
    console.log("Password was hashed:", newHashedPwd);
    const _id = user.id;
    await User.updateOne(
      { _id },
      {
        $set: { password: newHashedPwd },
      }
    );
    const userRecord = await User.findOne({ _id });
    console.log("Password was updated", userRecord);
    res.json({ status: "OK" });
  } catch (err) {
    console.log(err);
    res.json({ status: "Error", error: "Could not verify identity" });
  }
});

// Testing: If you modify the exampleToken (JWT token), then the jwt.verify will throw an error.
// const exampleToken = {
//   status: "OK",
//   data: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYyZWI0MGIzYzMxNjE4NDUxNGQ1YTI2MCIsInVzZXJuYW1lIjoibmVsc29uIiwiaWF0IjoxNjU5NTg2MDgyfQ.Us8ereJui9JUDSAFEGY-EgmiGk6IA0Sw4gi59fFf-G4",
// };
// const user = jwt.verify(exampleToken.data, JWT_SECRET_KEY);
// const nelson = User.findOne({ username: "nelson" });
// console.log(nelson);
