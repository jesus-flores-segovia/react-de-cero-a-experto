const { response } = require("express");
const { validationResult } = require("express-validator");

const register = (req, res = response) => {
  const { name, email, password } = req.body;
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).send({ ok: false, errors: errors.mapped() });
  }

  res.status(201).send({ ok: true, msg: "register", name, email, password });
};

const login = (req, res = response) => {
  const { email, password } = req.body;
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).send({ ok: false, errors: errors.mapped() });
  }

  res.status(201).send({ ok: true, msg: "login", email, password });
};

const newToken = (req, res = response) => {
  res.send({ ok: true, msg: "new token" });
};

module.exports = {
  register,
  login,
  newToken,
};
