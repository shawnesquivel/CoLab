const mongoose = require("mongoose");

// the schema describes the shape of the model

const UserSchema = new mongoose.Schema(
  {
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
  },
  { collection: "users" }
);

// mongoose will use the 'collection' name users instead of userschemas
// the model is the instance of the schema
const model = mongoose.model("UserSchema", UserSchema);

module.exports = model;
