const jwt = require("jsonwebtoken");

module.exports.verifyJWT = async (req, res, next) => {
  try {
    const token = req.header("Authorization").replace("Bearer ", "");
    if (!token) {
      return res
        .status(401)
        .json({ msg: "No token provided, authorization denied" });
    }

    const decoded = jwt.verify(token,"secret_key");
    req.user = decoded;
    console.log("Decoded user:", decoded);
    next();
  } catch (error) {
    console.error("JWT verification error:", error.message);
    return res.status(401).json({ msg: "Unauthorized: Invalid token" });
  }
};
