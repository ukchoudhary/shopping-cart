// imports
const express = require("express");
const readDatabase = require("../../utils/readDatabase");
const writeDatabase = require("../../utils/writeDatabase");
const { body } = require("express-validator");
const validator = require("../../middleware/bodyValidator");

const getCartRouter = express.Router();

getCartRouter.delete(
  "/:cartId/delete",
  body("productId").isNumeric(),
  validator,
  async (req, res, next) => {
    try {
      const { cartId } = req.params;
      const { productId } = req.body;

      const database = await readDatabase();
      const cartIndex = database.cart.findIndex((item) => item.id == cartId);
      if (cartIndex < 0) {
        return res
          .status(405)
          .send({ success: false, message: "no cart found.", error: null });
      }
      const productIndex = database.cart[cartIndex].products.findIndex(
        (item) => item.id == productId
      );
      if (productIndex < 0) {
        return res
          .status(405)
          .send({ success: false, message: "no product found.", error: null });
      }
      database.cart[cartIndex].products.splice(productIndex, 1);

      await writeDatabase(database);

      return res.status(200).send({
        success: true,
        message: "removed successfuly",
        data: {},
      });
    } catch (err) {
      throw err;
    }
  }
);

module.exports = getCartRouter;
