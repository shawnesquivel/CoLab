const mongoose = require("mongoose");

// the schema describes the shape of the model
// option: collection - sets the collection name, otherwises the name will be pluralized
const UserSchema = new mongoose.Schema(
  {
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    roles: {
      Admin: Number,
      Influencer: { type: Number, default: 2000 },
      Brand: Number,
    },
    firstName: { type: String, default: "Shay" },
    lastName: { type: String, default: "Hayashi" },
    companyName: String,
    dateOfBirth: { type: Date, default: new Date() },
    currentProjects: [{ type: mongoose.Schema.Types.Mixed }],
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
        default: "https://instagram.com/shayhayashico",
      },
      tiktok: { type: String, default: "https://tiktok.com/@shayhayashi" },
      youtube: { type: String, default: "https://youtube.com/c/ShayHayashi" },
    },
    hasActions: { type: Boolean, default: false },
  },
  { collection: "users" }
);

// title: {type: String, default: 'August Campaign'},
// description: {type: String, default: 'To promote our new diffuser'},
// guaranteedProduct: {type: String, default: 'Diffuser'},
// paymentMethod: {type: String, default: 'Cash'},
// paymentPrice: {type: Number, default: 100},
// paymentProduct: {type: String, default: 'Diffuser Oil'},
// feedback: String,
// status: { type: String, default: "Needs Review"}
// picture: {
//   type: String,
//   default:
//     "https://scontent.fcxh2-1.fna.fbcdn.net/v/t1.15752-9/298150279_372327245064921_5588736467645810256_n.jpg?stp=dst-jpg_s1080x2048&_nc_cat=103&ccb=1-7&_nc_sid=ae9488&_nc_ohc=w01KUkII9ycAX-NFFkL&_nc_ht=scontent.fcxh2-1.fna&oh=03_AVIafFXHusEPtkk4sUeMRsuedGlacGYmEdE4BVu_L6CWUw&oe=631E25C1",
// }

// mongoose will use the 'collection' name users instead of userschemas
// the model is the instance of the schema
const model = mongoose.model("UserSchema", UserSchema);

module.exports = model;
