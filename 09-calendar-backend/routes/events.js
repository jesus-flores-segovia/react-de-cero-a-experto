/* 
    Routing for the events
    url: host + /api/events
*/

const express = require("express");
const { check } = require("express-validator");
const { validator } = require("../middlewares/validator");
const router = express.Router();

const {
  getEvents,
  createEvent,
  updateEvent,
  deleteEvent,
} = require("../controllers/events");
const { jwtValidator } = require("../middlewares/jwtValidator");
const { isDate } = require("../helpers/validator");

router.use(jwtValidator);

// Get events
router.get("/", getEvents);

// Create an event
router.post(
  "/",
  [
    check("title", "The title is required").not().isEmpty(),
    check("start", "The start date is required").custom(isDate),
    check("end", "The end date is required").custom(isDate),
    validator,
  ],
  createEvent
);

// Update an event
router.put("/:id", updateEvent);

// Delete an event
router.delete("/:id", deleteEvent);

module.exports = router;
