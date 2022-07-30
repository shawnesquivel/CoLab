const express = require("express");
const router = express.Router();

// sign up - posts to the database
router.post("/signup", (req, res) => {
  res.send("send");
});

module.exports = router;
