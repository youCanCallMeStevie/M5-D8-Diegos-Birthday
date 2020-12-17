//IMPORTS

const express = require("express");
const cors = require("cors");
const listEndpoints = require("express-list-endpoints");
const attendeesRoutes = require("./services/attendees");
const path = require("path");

const {
    notFoundHandler,
    unauthorizedHandler,
    forbiddenHandler,
    catchAllHandler,
  } = require("./errorHandling");

const server = express();
const port = process.env.PORT || 3009;

server.use(express.json()); //always above routes!!

//ROUTES
server.use("/attendees", attendeesRoutes)


// ERROR HANDLERS
server.use(notFoundHandler);
server.use(unauthorizedHandler);
server.use(forbiddenHandler);
server.use(catchAllHandler);

console.log(listEndpoints(server))




server.listen(port, () => {
  if (process.env.NODE_ENV === "production") {
    console.log(`Running on cloud on port ${port}`)
  } else {
    console.log(`Running locally on port ${port}`)
  }
})