const mongoose = require("mongoose");

// the schema describes the shape of the model
// option: collection - sets the collection name, otherwises the name will be pluralized
const ProjectSchema = new mongoose.Schema(
  {
    brandRepAssigned: {
      type: mongoose.Schema.Types.Mixed,
      required: true,
      default: "Saje",
    },
    influencerAssigned: {
      type: mongoose.Schema.Types.Mixed,
      required: true,
      default: "Shay",
    },
    title: { type: String, required: true },
    description: String,
    deadline: { type: Date, required: true, default: new Date() },
    guaranteedProducts: [String],
    paymentMethod: { type: String, default: "cash" },
    paymentPrice: { type: Number, default: 1000 },
    paymentProduct: { type: String, default: "oils" },
    status: { type: String, default: "Reviewing Contract" },
    waitingForBrand: { type: Boolean, default: false },
    waitingForInfluencer: { type: Boolean, default: true },
    deliverable: {
      type: String,
      default:
        "https://scontent.fcxh2-1.fna.fbcdn.net/v/t1.15752-9/298150279_372327245064921_5588736467645810256_n.jpg?stp=dst-jpg_s1080x2048&_nc_cat=103&ccb=1-7&_nc_sid=ae9488&_nc_ohc=Za5CumN7k5oAX_bBmUh&_nc_ht=scontent.fcxh2-1.fna&oh=03_AVJYi7QHyyvrJVJVsNUsIQRxj2FdejWEtPrKNowM3cElnw&oe=63260EC1",
    },
    keywords: [{ type: String, default: "lifestyle" }],
    commentList: [{ type: mongoose.Schema.Types.Mixed, default: "lifestyle" }],
    taskList: [{ type: String, default: "Instagram Story" }],
  },
  { collection: "projects" }
);

// mongoose will use the 'collection' name users instead of userschemas
// the model is the instance of the schema
const model = mongoose.model("ProjectSchema", ProjectSchema);

module.exports = model;
