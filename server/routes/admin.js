import express from "express";
import { db } from "../config/db.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
const router = express.Router();

const adminLayout = "../views/layouts/admin";
const jwtSecret = process.env.JWT_SECRET;

// Check Login
function authMiddleware(req, res, next) {
  const token = req.cookies.token;

  if (!token) {
    return res.redirect("/admin");
  }
  try {
    const decoded = jwt.verify(token, jwtSecret);
    req.userId = decoded.userId;
    next();
  } catch (error) {
    res.status(401).json({ message: "Unauthorized" });
  }
}

function authMiddleware2(req, res, next) {
  const token = req.cookies.token;

  if (!token) {
    next();
  } else {
    return res.redirect("/dashboard");
  }
}

// Admin Login Page Route
router.get("/admin", authMiddleware2, (req, res) => {
  try {
    res.render("admin/index", { layout: adminLayout });
  } catch (error) {
    console.log(error);
  }
});

// Dashboard Page Route
router.get("/dashboard", authMiddleware, async (req, res) => {
  try {
    const data = await db`SELECT * FROM articles ORDER BY art_id DESC`;
    res.render("admin/dashboard", { data, layout: adminLayout });
  } catch (error) {
    console.log(error);
  }
});

// Add Article GET Page Route
router.get("/add-article", authMiddleware, (req, res) => {
  res.render("admin/add-article", { layout: adminLayout });
});

// Edit Article GET Page Route
router.get("/edit-article/:id", authMiddleware, async (req, res) => {
  const art_id = req.params.id;
  const result = await db`SELECT * FROM articles WHERE art_id = ${art_id}`;
  const data = result[0];
  res.render("admin/edit-article", { data, layout: adminLayout });
});

// Logout Page Get Route
router.get("/logout", (req, res) => {
  res.clearCookie("token");
  res.redirect("/admin");
});

// Admin Login Check Page Route
router.post("/admin", async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await db`SELECT * FROM users WHERE username=${username}`;
    if (user.length === 0) {
      return res.status(401).json({ message: "Invalid Credentials" });
    }
    const validPassword = await bcrypt.compare(password, user[0].password);
    if (!validPassword) {
      return res.status(401).json({ message: "Invalid Credentials" });
    }
    const token = jwt.sign({ userId: user[0].id }, jwtSecret);
    res.cookie("token", token, { httpOnly: true });

    res.redirect("/dashboard");
  } catch (error) {
    console.log(error);
  }
});

// Add Article POST Route
router.post("/add-article", async (req, res) => {
  try {
    const { title, body } = req.body;
    const date = new Date();
    await db`INSERT INTO articles(title, body, createdat, updatedat) VALUES (${title},${body},${date.toDateString()},${date.toDateString()})`;
    res.redirect("/dashboard");
  } catch (error) {
    console.log(error);
  }
});

// Edit Article PUT Page Route
router.put("/edit-article/:id", authMiddleware, async (req, res) => {
  const art_id = req.params.id;
  const { title, body } = req.body;
  const date = new Date();
  await db`UPDATE articles SET title=${title}, body=${body}, updatedat=${date.toDateString()} WHERE art_id = ${art_id}`;
  res.redirect(`/edit-article/${art_id}`);
});

// Delete Article PUT Page Route
router.delete("/delete-article/:id", authMiddleware, async (req, res) => {
  const art_id = req.params.id;
  await db`DELETE FROM articles WHERE art_id = ${art_id}`;
  res.redirect(`/dashboard`);
});

// // Admin Register Page Route
// router.post("/register", async (req, res) => {
//   try {
//     const { username, password } = req.body;
//     const hashedPassword = await bcrypt.hash(password, 10);
//     try {
//       const user =
//         await db`INSERT INTO users (username,password) VALUES (${username},${hashedPassword}) RETURNING *`;
//       res.status(201).json({ message: "User Created", user });
//     } catch (error) {
//       if (error.code === 11000) {
//         res.status(409).json({ message: "User Already in Use" });
//       }
//       res.status(500).json({ message: "Internal server error" });
//     }
//   } catch (error) {
//     console.log(error);
//   }
// });

// Exporting the Routes of main website
export { router as adminRoute };
