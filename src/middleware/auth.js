const jwt = require("jsonwebtoken");

const auth = async (req, res, next) => {
  try {
    const { access_token } = req.headers;
    if (access_token) {
      const decodedToken = await jwt.verify(access_token, "qyfjhvfs");
      const { userId } = decodedToken;
      req.userId = userId;
      return next();
    }
    return res
      .status(401)
      .send({ success: false, message: "no access token found", error: null });
  } catch (err) {
    return res
      .status(401)
      .send({ success: false, message: "UnAuthorised", error: err });
  }
};

module.exports = auth;
