const express = require("express");
const app = express();
const port = process.env.PORT || 8000;
const path = require("path");
const hbs = require("hbs");

const static_path = path.join(__dirname, "../public");
const templatepath = path.join(__dirname, "../templates/views");
const partialspath = path.join(__dirname, "../templates/partials");

app.set("view engine", "hbs");
app.set("views", templatepath);
hbs.registerPartials(partialspath);

app.use(express.static(static_path));

app.get("/", (req, res) => {
  res.render("index");
});
app.get("/about", (req, res) => {
  res.render("about");
});
app.get("/wheather", (req, res) => {
  res.render("wheather");
});
app.get("*", (req, res) => {
  res.render("404err", {
    errMesg: "opps ! page not found",
  });
});

app.listen(port, () => {
  console.log(`listening from the port number ${port}`);
});
