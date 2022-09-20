const Jwt = require("jsonwebtoken");

const verifyToken = (req, res, next) => {
  // get token from request
  //  const token = req.get("authorization").split(" ")[1];

  const token = req.get("authorization");
  if (!token) return res.status(401).send("Access Denied");

  try {
    const verifiedToken = Jwt.verify(token, process.env.JWT_SECRET);
    console.log(verifiedToken);

    req.body.user = verifiedToken;
  } catch (error) {
    // if(typeof error == Jwt.JsonWebTokenError)/
    return res.status(401).send("invalid token");
  }

  return next();
};

module.exports = verifyToken;
