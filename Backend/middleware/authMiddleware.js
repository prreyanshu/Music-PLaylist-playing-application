const jwt = require("jsonwebtoken");
require("dotenv").config(); // Load environment variables

const protect = (req, res, next) => {
  let token = req.headers.authorization; // Get token from headers

  if (!token || !token.startsWith("Bearer ")) {
    return res.status(401).json({ msg: "Unauthorized: No token provided" });
  }

  try {
    token = token.split(" ")[1]; // Extract actual token after "Bearer"
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    req.user = decoded.userId; // Attach userId from token to request object
    next(); // Proceed to the next middleware
  } catch (err) {
    res.status(401).json({ msg: "Unauthorized: Invalid token" });
  }
};


// const { protect } = require("../middleware/authMiddleware");
// router.get("/", protect, getPlaylists);


module.exports = { protect };
