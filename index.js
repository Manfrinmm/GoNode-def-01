const express = require("express");
const njk = require("nunjucks");

const app = express();

njk.configure("views", {
  autoescape: true,
  express: app,
  watch: true
});

app.use(express.urlencoded({ extended: false }));

app.set("view engine", "njk");

app.get("/", (req, res) => {
  return res.render("home");
});

app.post("/check", (req, res) => {
  const { age } = req.body;
  if (age > 18) return res.redirect(`/major/?age=${age}`);

  return res.redirect(`/minor/?age=${age}`);
});

const middlewareCheck = (req, res, next) => {
  const { age } = req.query;
  if (age == 0) return res.redirect("/");
  return next();
};

app.get("/major", middlewareCheck, (req, res) => {
  const { age } = req.query;
  res.render("maior", { age });
});

app.get("/minor", middlewareCheck, (req, res) => {
  const { age } = req.query;
  res.render("menor", { age });
});

app.listen(3333);
