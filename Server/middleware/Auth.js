const jwt = require("jsonwebtoken");
require("dotenv").config();

exports.auth = async (req, res, next) => {
  try {
    let token = req.headers.authorization || req.cookies.token || req.body.token;

    // Check if token exists
    if (!token) {
      // console.log("token not found");
      return res.status(401).json({
        success: false,
        message: "Token not found.",
      });
    }

    // Remove "Bearer " prefix from token
    if (token.startsWith("Bearer ")) {
      token = token.slice(7);
    }

    // verify the token
    try {
      const decode = jwt.verify(token, process.env.JWT_SECRET);
      req.user = decode;
      next(); // Call next middleware
    } catch (err) {
      return res.status(401).json({
        success: false,
        message: "Token is not valid",
      });
    }
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      success: false,
      message: "Something went wrong while token verification.",
    });
  }
}

exports.isAdmin = async (req, res, next) => {
  try {
      if (req.user.accountType !== "Admin") {
          return res.status(401).json({
              success: false,
              message: "This is the protected route for Admin only.",
          });
      }
      next();

  } catch (err) {
      return res.status(500).json({
          success: false,
          message: "User role can't be verified",
      });
  }
}