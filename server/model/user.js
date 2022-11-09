const mongoose = require("mongoose");

// the schema describes the shape of the model
// option: collection - sets the collection name, otherwises the name will be pluralized
const UserSchema = new mongoose.Schema(
  {
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    roles: {
      Admin: { type: Number, default: 0 },
      Influencer: { type: Number, default: 0 },
      Brand: { type: Number, default: 0 },
    },
    company: String,
    firstName: String,
    lastName: String,
    currentProjects: [{ type: mongoose.Schema.Types.ObjectId }],
    keywords: [{ type: String }],
    avatar: String,
    mediaKit: {
      type: String,
      default: "https://drive.google.com/",
    },
    instagram: String,
    tiktok: String,
    youtube: String,
    hasActions: { type: Boolean, default: false },
    hasUpdatedProfile: { type: Boolean, default: false },
  },
  { collection: "users" }
);

// mongoose will use the 'collection' name users instead of userschemas
// the model is the instance of the schema
const model = mongoose.model("UserSchema", UserSchema);

module.exports = model;
