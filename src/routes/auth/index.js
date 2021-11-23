// imports
const express = require("express");
const login = require("./login");

const authRouter = express.Router();

authRouter.use(login);

module.exports = authRouter;
