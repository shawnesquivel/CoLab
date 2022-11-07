const mongoose = require("mongoose");

const imgSchema = new mongoose.Schema({
  name: String,
  img: {
    data: Buffer,
    contentType: String,
  },
});

const model = mongoose.model("ImgSchema", imgSchema);

module.exports = model;
