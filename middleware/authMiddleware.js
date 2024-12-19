const jwt = require("jsonwebtoken");

const protect = (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      token = req.headers.authorization.split(" ")[1]; // Extract token from 'Bearer <token>'
      

      const decoded = jwt.verify(token, 'your_jwt_secret');
      

      req.user = decoded; 

      next(); 
    } catch (error) {
      res.status(401).json({
        message: "Not authorized, token failed",
      });
    }
  }

  if (!token) {
    res.status(401).json({
      message: "Not authorized, no token",
    });
  }
};

module.exports = protect;
