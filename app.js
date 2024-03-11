import env from "dotenv";
env.config();

import express from "express";
import expressLayout from "express-ejs-layouts";
// Importing Main Website Routes
import { mainRoute } from "./server/routes/main.js";
import { adminRoute } from "./server/routes/admin.js";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import session from "express-session";

const app = express();
const PORT = 3000;

app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());

// Templating Engine
app.use(expressLayout);
app.set("layout", "./layouts/main");
app.set("view engine", "ejs");

// Using the Main Website Routes
app.use("/", mainRoute);
app.use("/", adminRoute);

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
