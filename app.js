const express = require("express");
const env = require("dotenv");
const expressLayout = require("express-ejs-layouts");
const main = require("./server/routes/main");
env.config();

const app = express();
const PORT = 3000 || process.env.PORT;

app.use(express.static("public"));

// Templating Engine
app.use(expressLayout);
app.set("layout", "./layouts/main");
app.set("view engine", "ejs");

app.use("/", main);

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
