const jwt = require("jsonwebtoken");

const protect = (req, res, next) => {
  try {
    // Step 1: Get Authorization header
    const authHeader = req.headers.authorization;

    // Step 2: Check whether token exists
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({
        message: "Not authorized. Token missing.",
      });
    }

    // Step 3: Extract token
    const token = authHeader.split(" ")[1];

    // Step 4: Verify token
    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET
    );

    // Step 5: Store decoded user information
    req.user = decoded;

    // Step 6: Continue to requested route
    next();

  } catch (error) {
    return res.status(401).json({
      message: "Invalid or expired token",
    });
  }
};

module.exports = protect;