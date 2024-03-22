const express = require("express");
const HttpError = require("./models/http-errors");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const placesRoutes = require("./routes/places-routes");
const usersRoutes = require("./routes/users-routes");

const app = express();

app.use(bodyParser.json());

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requestesd-With, Content-Type, Accept, Authorization"
  );
  res.setHeader("Access-Contorl-Allow-Methods", "GET, POST, PACTCH, DELETE");
  next();
});

app.use("/api/places", placesRoutes);
app.use("/api/users", usersRoutes);

app.use((req, res, next) => {
  const error = new HttpError("Could not find this route.", 404);
  throw error;
});

app.use((error, req, res, next) => {
  if (res.headerSent) {
    return next(error);
  }
  res
    .status(error.code || 5000)
    .json({ message: error.message || "An unknown error occured!" });
});

mongoose
  .connect(
    "mongodb://root:brNuxrnv8olXFOY3fdfYak7T@denali.liara.cloud:34346/mern?authSource=admin&replicaSet=rs0&directConnection=true"
  )
  .then(() => {
    app.listen(5000);
    console.log("server started on port 5000");
  })
  .catch((err) => {
    console.log("we have module error :", err);
  });
