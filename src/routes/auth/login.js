// imports
const express = require("express");
const readDatabase = require("../../utils/readDatabase");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const loginRouter = express.Router();

loginRouter.post("/login", async (req, res, next) => {
  try {
    const { user_name, password } = req.body;
    const database = await readDatabase();
    const user = database.user.find((item) => item.user_name === user_name);
    if (!user) {
      return res.status(401).send({
        success: false,
        message: "either user name or password is wrong",
        error: null,
      });
    }
    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      return res.status(401).send({
        success: false,
        message: "either user name or password is wrong",
        error: null,
      });
    }

    const secret = process.env.TOKEN_SECRET_KEY;
    const expiresIn = process.env.TOKEN_EXPIRE_TIME;

    const accessToken = jwt.sign(
      {
        userId: user.id,
      },
      secret,
      {
        expiresIn,
      }
    );
    return res.status(200).send({
      success: true,
      message: "login successfull",
      data: { user: user, accessToken },
    });
  } catch (err) {
    throw err;
  }
});

module.exports = loginRouter;
