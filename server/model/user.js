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
    firstName: { type: String, default: "FirstName" },
    lastName: { type: String, default: "LastName" },
    currentProjects: [{ type: mongoose.Schema.Types.ObjectId }],
    keywords: [{ type: String, default: "lifestyle" }],
    profilePicURL: {
      type: String,
      default:
        "https://scontent.fcxh2-1.fna.fbcdn.net/v/t1.15752-9/297566251_1034401040586937_7774569904522633283_n.jpg?_nc_cat=107&ccb=1-7&_nc_sid=ae9488&_nc_ohc=U_4XvOo4rNEAX_CbBXC&_nc_ht=scontent.fcxh2-1.fna&oh=03_AVIUBDXm5i5apbdHy85MhjjOXuCpJX2XY6JPHjcsPk5nGQ&oe=63219DB0",
    },
    mediaKit: {
      type: String,
      default: "https://drive.google.com/",
    },
    socialMediaLinks: {
      instagram: {
        type: String,
      },
      tiktok: { type: String },
      youtube: { type: String },
    },
    hasActions: { type: Boolean, default: false },
    hasUpdatedProfile: { type: Boolean, default: false },
  },
  { collection: "users" }
);

// mongoose will use the 'collection' name users instead of userschemas
// the model is the instance of the schema
const model = mongoose.model("UserSchema", UserSchema);

module.exports = model;
