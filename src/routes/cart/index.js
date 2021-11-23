const express = require("express");
const add = require("./add");
const update = require("./update");
const destroy = require("./destroy");
const get = require("./get");
const auth = require("../../middleware/auth");

const cartRouter = express.Router();

if (process.env.ENV != "test") {
  cartRouter.use(auth);
}

// Authenticated Routes
cartRouter.use(add);
cartRouter.use(update);
cartRouter.use(destroy);
cartRouter.use(get);

module.exports = cartRouter;
