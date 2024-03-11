import express from "express";
import { db } from "../config/db.js";
const router = express.Router();

const adminLayout = "../views/layouts/admin";

// Admin Login Page Route
router.get("/admin", async (req, res) => {
  try {
    res.render("admin/index", { layout: adminLayout });
  } catch (error) {
    console.log(error);
  }
});

// Exporting the Routes of main website
export { router as adminRoute };
