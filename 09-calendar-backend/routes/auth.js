/* 
    Routing for the users auth
    url: host + /api/auth
*/

const express = require("express");
const { check } = require("express-validator");
const router = express.Router();

const { register, login, newToken } = require("../controllers/auth");

router.post(
  "/register",
  [
    check("name", "Name is mandatory").not().isEmpty(),
    check("email", "Email is mandatory").isEmail(),
    check("password", "Password must be at least of 6 characters").isLength({
      min: 6,
    }),
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
  ],
  login
);

router.get("/newToken", newToken);

module.exports = router;
