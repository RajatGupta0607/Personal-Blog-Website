import express from "express";
import { db } from "../config/db.js";
const router = express.Router();

// Routes
router.get("/", (req, res) => {
  res.render("index");
});

// Exporting the Routes of main website
export { router as mainRoute };
