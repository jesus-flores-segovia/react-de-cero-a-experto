/* 
    Routing for the users auth
    url: host + /api/auth
*/

const express = require("express");
const { check } = require("express-validator");
const { validator } = require("../middlewares/validator");
const router = express.Router();

const { register, login, newToken } = require("../controllers/auth");
const { jwtValidator } = require("../middlewares/jwtValidator");

router.post(
  "/register",
  [
    check("name", "Name is mandatory").not().isEmpty(),
    check("email", "Email is mandatory").isEmail(),
    check("password", "Password must be at least of 6 characters").isLength({
      min: 6,
    }),
    validator,
  ],
  register
);

router.post(
  "/",
  [
    check("email", "Email is mandatory").isEmail(),
    check("password", "Password must be at least of 6 characters").isLength({
      min: 6,
    }),
    validator,
  ],
  login
);

router.get("/newToken", jwtValidator, newToken);

module.exports = router;
