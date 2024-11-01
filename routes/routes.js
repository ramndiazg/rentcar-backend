const express = require("express");
const verify = require("../auth/auth.js")
const router = express.Router();

//routes
router.get("/", (req, res) => {
  res.json({ message: "Hello World!" });
});

router.get("/dashboard", verify.verifyToken, (req, res) => {
  res.json({ message: "welcome to dashboard!" });
});

module.exports = router;
