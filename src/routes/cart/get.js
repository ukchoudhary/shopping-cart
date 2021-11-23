const express = require("express");
const readDatabase = require("../../utils/readDatabase");

const getCartRouter = express.Router();

getCartRouter.get("/:cartId", async (req, res, next) => {
  try {
    const { cartId } = req.params;
    const database = readDatabase();
    const cart = database.cart.find((item) => (item.id = cartId));
    if (!cart) {
      return res
        .status(405)
        .send({ success: false, message: "no cart found.", error: null });
    }
    const { products } = cart;
    let value = 0;

    const productsDetail = products.map((product) => {
      const { id, quantity } = product;
      const productDetail = database.product[id];
      const { name, image, price } = productDetail;
      value += quantity * price;
      return {
        id,
        name,
        image,
        price,
        quantity,
      };
    });

    const cartDetails = {
      id: cartId,
      productDetail: productsDetail,
      value: value,
    };

    return res.status(200).send({
      success: true,
      message: "fetch successfull",
      data: { cart: cartDetails },
    });
  } catch (err) {
    throw err;
  }
});

module.exports = getCartRouter;
