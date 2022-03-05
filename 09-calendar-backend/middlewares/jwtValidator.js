const { response } = require("express");
const jsonwebtoken = require("jsonwebtoken");

const jwtValidator = (req, res = response, next) => {
  // x-token header
  const token = req.header("x-token");

  if (!token) {
    return res.status(401).json({ ok: false, msg: "Request hasn't a token." });
  }

  try {
    const payload = jsonwebtoken.verify(token, process.env.SECRET_JWT_SEED);

    req.uid = payload.uid;
    req.name = payload.name;
  } catch (error) {
    return res
      .status(401)
      .json({ ok: false, msg: "Request token isn't valid." });
  }

  next();
};

module.exports = {
  jwtValidator,
};
