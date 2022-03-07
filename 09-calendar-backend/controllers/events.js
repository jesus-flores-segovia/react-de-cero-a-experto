const { request, response } = require("express");
require("mongoose");
const Event = require("../models/Event");

const getEvents = async (req = request, res = response) => {
  const events = await Event.find().populate("user", "name");

  res.status(201).send({ ok: true, events });
};

const createEvent = async (req = request, res = response) => {
  let event = new Event(req.body);
  event.user = req.uid;

  try {
    event = await event.save();
    return res.status(201).send({
      ok: true,
      event,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      ok: false,
      msg: "An error has ocurred. Please, talk with the administrator.",
    });
  }
};

const updateEvent = async (req = request, res = response) => {
  const { id } = req.params;
  const uid = req.uid;
  try {
    let event = await Event.findById(id);

    if (!event) {
      return res.status(404).send({
        ok: false,
        msg: "Event not exists",
      });
    }

    if (event.user.toString() !== uid) {
      return res.status(401).send({
        ok: false,
        msg: "You don't have the sufficient privileges",
      });
    }

    event = {
      ...req.body,
      user: uid,
    };

    event = await Event.findByIdAndUpdate(id, event, { new: true });
    return res.status(200).send({
      ok: true,
      event,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      ok: false,
      msg: "An error has ocurred. Please, talk with the administrator.",
    });
  }
};

const deleteEvent = async (req = request, res = response) => {
  const { id } = req.params;
  const uid = req.uid;

  try {
    let event = await Event.findById(id);

    if (!event) {
      return res.status(404).send({
        ok: false,
        msg: "Event not exists",
      });
    }

    if (event.user.toString() !== uid) {
      return res.status(401).send({
        ok: false,
        msg: "You don't have the sufficient privileges",
      });
    }

    event = await Event.findByIdAndDelete(id, { new: true });
    return res.status(200).send({
      ok: true,
      event,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      ok: false,
      msg: "An error has ocurred. Please, talk with the administrator.",
    });
  }
};

module.exports = {
  getEvents,
  createEvent,
  updateEvent,
  deleteEvent,
};
