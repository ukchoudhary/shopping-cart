/** @format */
const { validationResult } = require("express-validator");

const validator = async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        message: "Invalid parameters",
        error: errors.array(),
      });
    }
    next();
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: "Invalid parameters",
      error: error,
    });
  }
};

module.exports = validator;
