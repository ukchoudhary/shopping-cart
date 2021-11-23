// imports
require("dotenv").config({ path: __dirname + "/.env" });
const express = require("express");
const { json } = require("body-parser");
const cartRouter = require("./routes/cart");
const authRouter = require("./routes/auth");

const app = express();

// middlewares
app.use(json());
app.use("/api/cart", cartRouter);
app.use("/api/auth", authRouter);

// error handler
app.use(function (err, req, res, next) {
  console.error(err.stack);
  res.status(500);
  return res.send("server error");
});

module.exports = { app };
