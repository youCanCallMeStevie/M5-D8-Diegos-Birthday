const express = require("express");
const { Transform } = require("json2csv");
const { pipeline } = require("stream");
const uniqid = require("uniqid");
const attendeesRouter = express.Router();
const multer = require("multer");
const { getGuestList, writeGuestList } = require("../../lib/utils");
const sgMail = require("@sendgrid/mail")

const path = require("path");
const attendeesPath = path.join(__dirname, "attendees.json");

const { check, validationResult } = require("express-validator");
const attendeeValidation = [
  check("firstName").exists().withMessage("First name is required"),
  check("secondName").exists().withMessage("Surname is required"),
  check("email").exists().withMessage("email is required"),
  check("tOA").exists().withMessage("time on arrival is required"),
];

attendeesRouter.post("/", async (req, res, next) => {
  try {
    // const validationErrors = validationResult(req);
    const guests = await getGuestList();
    // const guestFound = guests.find(guest => (guest._id = req.body._id));
    // if (!validationErrors.isEmpty()) {
    //   const err = new Error();
    //   err.httpStatusCode = 400;
    //   err.message = validationErrors;
    //   next(err);
     {
     const guests = await getGuestList();
      let newGuest = {
        ...req.body,
        _id: uniqid(),
        addedOn: new Date(),
      }
      console.log(req.body);
      guests.push(newGuest);
      await writeGuestList(guests);
      console.log(guests);
      res.status(201).send("Guest added to Diego's list");
    }
  } catch (error) {
    console.log(error);
    next(error);
  }
});


attendeesRouter.post("/sendEmail", async (req, res, next) => {
    try {
      sgMail.setApiKey(process.env.SENDGRID_API_KEY)
  
      const msg = {
        to: "",
        from: "",
        subject: "Sending with Twilio SendGrid is Fun",
        text: "and easy to do anywhere, even with Node.js",
        html: "<strong>and easy to do anywhere, even with Node.js</strong>",
      }
  
      await sgMail.send(msg)
      res.send("sent")
    } catch (error) {
      next(error)
    }
  })


attendeesRouter.get("/csv", async (req, res, next) => {
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

attendeesRouter.post("/:attendeesId/createPDF", async (req, res, next) => {
  try {
  } catch (error) {}
});

module.exports = attendeesRouter;
