import express from "express";
import { db } from "../config/db.js";
const router = express.Router();

// Routes

// Home Page Route
router.get("/", async (req, res) => {
  try {
    const perPage = 5; // Number of items to display on each page
    let page = req.query.page || 1;
    const result = await db`SELECT * FROM articles ORDER BY createdat DESC`;
    let data = result.slice(perPage * page - perPage, perPage * page);

    const count = result.length;
    const nextPage = parseInt(page) + 1;
    const hasNextPage = Math.ceil(count / perPage) >= nextPage;
    const previousPage = parseInt(page) - 1;
    const haspreviousPage = page > 1;

    res.render("index", {
      data,
      currentPage: page,
      nextPage: hasNextPage ? nextPage : null,
      previousPage: haspreviousPage ? previousPage : null,
    });
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

// Article Page Route
router.get("/article/:id", async (req, res) => {
  try {
    let art_id = req.params.id;
    const result = await db`SELECT * FROM articles WHERE art_id = ${art_id}`;
    const post = result[0];
    res.render("article", { post });
  } catch (error) {}
});

// Exporting the Routes of main website
export { router as mainRoute };
