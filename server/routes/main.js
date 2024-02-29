import express from "express";
const router = express.Router();

// Routes
router.get("/", (req, res) => {
  res.render("index");
});

// Exporting the Routes of main website
export { router as mainRoute };
