// imports
const express = require("express");
const readDatabase = require("../../utils/readDatabase");
const writeDatabase = require("../../utils/writeDatabase");
const { body } = require("express-validator");
const validator = require("../../middleware/bodyValidator");

const addProductToCartRouter = express.Router();

addProductToCartRouter.post(
  "/:cartId/add",
  body("productId").isNumeric(),
  body("quantity").isNumeric(),
  validator,
  async (req, res, next) => {
    try {
      const { cartId } = req.params;
      const { productId, quantity } = req.body;

      const database = await readDatabase();
      const cartIndex = database.cart.findIndex((item) => (item.id = cartId));
      if (cartIndex < 0) {
        return res
          .status(405)
          .send({ success: false, message: "no cart found.", error: null });
      }

      database.cart[cartIndex].products.push({ id: productId, quantity });

      await writeDatabase(database);

      return res.status(200).send({
        success: true,
        message: "added successfuly",
        data: {},
      });
    } catch (err) {
      throw err;
    }
  }
);

module.exports = addProductToCartRouter;
