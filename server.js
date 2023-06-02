const express = require("express");
const port = process.env.PORT || 3500;

const router = require("./routers/weatherRouter");
const errorHandler = require("./middlewares/errorHandler");
const app = express();

app.get("/", (req, res) => {
  res.send("project open weather backend");
});

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(router);
app.use(errorHandler);

app.listen(port, () => {
  console.log("server is running at port 3500");
});

module.exports = app;
