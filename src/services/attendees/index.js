const express = require("express");
const uniqid = require("uniqid");
const attendeesRouter = express.Router();
const multer = require("multer");
const { getGuestList, writeGuestList } = require("../../lib/utils");

const path = require("path");
const attendeesPath = path.join(__dirname, "attendees.json");

const { check, validationResult } = require("express-validator");
const attendeeValidation = [
  check("firstName").exists().withMessage("First name is required"),
  check("secondName").exists().withMessage("Surname is required"),
  check("email").exists().withMessage("email is required"),
  check("tOA").exists().withMessage("time on arrival is required"),
];

router.post("/", attendeeValidation, async (req, res, next) => {
  try {
    const validationErrors = validationResult(req);
    const guests = await getGuestList();
    const guestFound = guests.find(guest => (guest._id = req.body._id));
    if (!validationErrors.isEmpty() && guestFound) {
      const err = new Error();
      err.httpStatusCode = 400;
      err.message = validationErrors;
      next(err);
    } else {
      guests.push({
        ...req.body,
        _id: uniqid(),
        createdAt: new Date(),
        updatedAt: new Date(),
        reviews: [],
      });
      await writeGuestList();
      res.status(201).send("Guest added to Diego's list");
    }
  } catch (error) {
    console.log(error);
    next(error);
  }
});

router.get("/csv", async (req, res, next) => {
  try {
    const guests = await getGuests();
    if (guests) {
      res.send(guests);
    } else {
      const err = new Error();
      next(err);
    }
  } catch (error) {
    console.log(error);
    next(error);
  }
});

router.post("/:attendeesId/createPDF", async (req, res, next) => {
  try {
  } catch (error) {}
});

module.exports = attendeesRouter;
