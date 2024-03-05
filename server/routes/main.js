import express from "express";
import { db } from "../config/db.js";
const router = express.Router();

// Routes
router.get("/", (req, res) => {
  res.render("index");
});

router.get("/about", (req, res) => {
  res.render("about");
});

router.get("/contact", (req, res) => {
  res.render("contact");
});

// Exporting the Routes of main website
export { router as mainRoute };
