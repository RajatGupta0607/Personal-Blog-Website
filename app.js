import env from "dotenv";
env.config();

import express from "express";
import expressLayout from "express-ejs-layouts";
// Importing Main Website Routes
import { mainRoute } from "./server/routes/main.js";
// Connect to PostgreSQL Database
import { db } from "./server/config/db.js";
import bodyParser from "body-parser";

const app = express();
const PORT = 3000;

db.connect();

app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));

// Templating Engine
app.use(expressLayout);
app.set("layout", "./layouts/main");
app.set("view engine", "ejs");

// Using the Main Website Routes
app.use("/", mainRoute);

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
