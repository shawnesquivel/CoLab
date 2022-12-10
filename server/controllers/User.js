const verifyJWT = require("../utilities/verifyJWT");
const {
  FindUserByUserName,
  FindUserById,
} = require("../utilities/UserQueries");
const User = require("../model/user"); // Document (model instance)
const bcrypt = require("bcryptjs"); //password hasher
const jwt = require("jsonwebtoken");
// Very sensitive - keep safe.
const JWT_SECRET_KEY = "mv(3jfoa.@01va(Adup";

const GetUser = async (req, res) => {
  console.log("Inside GetUser");
  // Payload contains JWT and user
  console.log(req.body);
  const { user, pwd } = req.body;

  try {
    const [user, _id] = verifyJWT(token);
    const userRecord = await FindUserById(_id);

    console.log("User Record", user, _id, userRecord);

    return res.json({ status: "OK", userProfile: userRecord });
  } catch (err) {
    console.log(err);
    res.json({ status: "Error", error: "Could not verify identity" });
  }
};

const Login = async (req, res) => {
  const { user, pwd } = req.body;
  console.log("Server received login request:", user, pwd);

  // Find the User record
  // .lean() returns a Plain Old Java Object (POJO) instead of the entire
  const userRecord = await User.findOne({ username: user }).exec();

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
    const roles = Object.values(userRecord.roles);
    const token = jwt.sign(
      {
        id: userRecord._id,
        username: userRecord.username,
        roles: roles,
      },
      JWT_SECRET_KEY
    );
    console.log(token);
    if (token) {
      console.log("Succesfully signed token");

      res.json({ status: "OK", token: token, roles: roles });
    } else {
      console.log("Did not sign token");
    }
  } else {
    console.log("inside the err2");
    return res.json({ status: "error" });
  }
};

const TestUser = async (req, res) => {
  res.send("hello world");
};

module.exports = {
  GetUser,
  TestUser,
  Login,
};
