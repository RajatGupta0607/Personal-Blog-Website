import express from "express";
import { db } from "../config/db.js";
const router = express.Router();

// Routes

// Home Page Route
router.get("/", async (req, res) => {
  try {
    const data = (await db.query("SELECT * FROM articles")).rows;
    res.render("index", { data });
  } catch (error) {
    console.log(error);
  }
});

// About Page Route
router.get("/about", (req, res) => {
  res.render("about");
});

// Contact Page Route
router.get("/contact", (req, res) => {
  res.render("contact");
});

router.get("/article/:id", (req, res) => {
  res.render("article");
});

// Exporting the Routes of main website
export { router as mainRoute };
