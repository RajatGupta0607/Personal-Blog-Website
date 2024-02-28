const express = require("express");
const router = express.Router();

// Routes
router.get("/", (req, res) => {
  res.send("Hello World");
});

// Exporting the Routes of main website
module.exports = router;
