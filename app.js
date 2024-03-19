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
import methodOverride from "method-override";
import { isActiveRoute } from "./server/helpers/routeHelpers.js";

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(methodOverride("_method"));
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: {
      maxAge: 1000 * 60 * 60,
    },
  })
);

// Templating Engine
app.use(expressLayout);
app.set("layout", "./layouts/main");
app.set("view engine", "ejs");

app.locals.isActiveRoute = isActiveRoute;

// Using the Main Website Routes
app.use("/", mainRoute);
app.use("/", adminRoute);

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
