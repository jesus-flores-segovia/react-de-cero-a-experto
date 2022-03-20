const bcrypt = require("bcryptjs/dist/bcrypt");
const { response } = require("express");
const { createJWT } = require("../helpers/jwt");
const User = require("../models/User");

const register = async (req, res = response) => {
  const { email, password } = req.body;

  try {
    let user = await User.findOne({ email });

    if (user) {
      return res.status(400).send({
        ok: false,
        msg: "An user with this email already exists.",
      });
    } else {
      user = new User(req.body);

      // Encrypt the user password
      const salt = bcrypt.genSaltSync();
      user.password = bcrypt.hashSync(password, salt);

      await user.save();

      // Create a JWT
      const token = await createJWT(user.id, user.name);

      res.status(201).send({ ok: true, uid: user.id, name: user.name, token });
    }
  } catch (error) {
    console.log(error);
    res.status(500).send({
      ok: false,
      msg: "An error has ocurred. Please, talk with the administrator.",
    });
  }
};

const login = async (req, res = response) => {
  const { email, password } = req.body;

  try {
    let user = await User.findOne({ email });

    if (!user) {
      return res.status(400).send({
        ok: false,
        msg: "The user or email is incorrect.",
      });
    }

    // Match the encrypted password and user password
    const isValidPassword = bcrypt.compareSync(password, user.password);

    if (!isValidPassword) {
      return res.status(400).send({
        ok: false,
        msg: "The user or email is incorrect.",
      });
    }

    // Create a JWT
    const token = await createJWT(user.id, user.name);

    return res
      .status(201)
      .send({ ok: true, uid: user.id, name: user.name, token });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      ok: false,
      msg: "An error has ocurred. Please, talk with the administrator.",
    });
  }

  res.status(201).send({ ok: true, msg: "login", email, password });
};

const newToken = async (req, res = response) => {
  const uid = req.uid;
  const name = req.name;

  try {
    const token = await createJWT(uid, name);
    return res.status(200).send({ ok: true, token, uid, name });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      ok: false,
      msg: "An error has ocurred. Please, talk with the administrator.",
    });
  }
};

module.exports = {
  register,
  login,
  newToken,
};
