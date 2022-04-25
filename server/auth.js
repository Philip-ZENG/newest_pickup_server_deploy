const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");

const verifyToken = (res, req, next) => {
    const token = req.cookies.token;

    if (token) {
        jwt.verify(token, jwtKey, (err, decodedToken) => {
          if (err) {
            return res.redirect('/login');
          } else {
            if (decodedToken.role !== "Basic") {
            return res.redirect('/login');
            } else {
              next();
            }
          }
        })
    } else {
    return res
        .status(401)
        .json({ message: "Not authorized, token not available" })
    }
}

module.exports = verifyToken;
