const express = require("express");
const router = express.Router();
const { GetUser, TestUser, Login } = require("../controllers/User");

// test route for MVC architecture
router.get("/", TestUser);
router.post("/", GetUser);
router.post("/login", Login);

module.exports = router;
