require("dotenv").config({ path: "./.env" });
const express = require("express");
const router = require("./app/router");
const app = express();
const port = process.env.PORT || 5000;
const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: true }));

app.set("view engine", "pug");
app.set("views", "./views");

app.use(express.static("public"));

app.use(express.json());

app.use("/v1", router);

app.use((_, res) => {
  res.status(404).render("404");
});

app.listen(port, () => {
  console.log(`Server started on http://localhost:${port}`);
});
