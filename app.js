import express from "express";
import env from "dotenv";
import expressLayout from "express-ejs-layouts";
// Importing Main Website Routes
import { mainRoute } from "./server/routes/main.js";
env.config();

const app = express();
const PORT = 3000 || process.env.PORT;

app.use(express.static("public"));

// Templating Engine
app.use(expressLayout);
app.set("layout", "./layouts/main");
app.set("view engine", "ejs");

// Using the Main Website Routes
app.use("/", mainRoute);

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
