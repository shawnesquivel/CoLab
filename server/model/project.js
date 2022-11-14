const mongoose = require("mongoose");

// the schema describes the shape of the model
// option: collection - sets the collection name, otherwises the name will be pluralized
const ProjectSchema = new mongoose.Schema(
  {
    brandRepAssigned: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
    },
    influencerAssigned: {
      type: mongoose.Schema.Types.ObjectId,
    },
    company: { type: String, required: true },
    title: { type: String, required: true },
    description: String,
    reviewDeadline: { type: Date, required: true, default: new Date() },
    deadline: { type: Date, required: true, default: new Date() },
    guaranteedProducts: [String],
    paymentMethod: { type: String, default: "wire transfer" },
    paymentPrice: { type: Number, default: 1000 },
    paymentProduct: String,
    status: { type: String, default: "no influencer assigned" },
    waitingForBrand: { type: Boolean, default: false },
    waitingForInfluencer: { type: Boolean, default: true },
    instagramExample: String,
    tiktokExample: String,
    youtubeExample: String,
    instagramDescription: String,
    tiktokDescription: String,
    youtubeDescription: String,
    instagramTask: String,
    tiktokTask: String,
    youtubeTask: String,
    instagramSubmission: String,
    tiktokSubmission: String,
    youtubeSubmission: String,
    numberOfRevisions: { type: Number, default: 1 },
    keywords: [String],
    commentList: [String],
    hashtags: [String],
    tags: [String],
    phrases: [String],
    linkInBio: {
      type: String,
      default: "https://www.glossier.com/products/cloud-paint",
    },
  },
  { collection: "projects" }
);

// mongoose will use the 'collection' name users instead of userschemas
// the model is the instance of the schema
const model = mongoose.model("ProjectSchema", ProjectSchema);

module.exports = model;
