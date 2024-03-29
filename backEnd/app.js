const express = require("express");
const HttpError = require("./models/http-errors");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const fs = require("fs")

const path = require("path")

const placesRoutes = require("./routes/places-routes");
const usersRoutes = require("./routes/users-routes");

const app = express();

app.use(bodyParser.json());

app.use("/uploads/images" , express.static(path.join("uploads", "images")))

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PATCH, DELETE");
  next();
});

app.use("/api/places", placesRoutes);
app.use("/api/users", usersRoutes);

app.use((req, res, next) => {
  const error = new HttpError("Could not find this route.", 404);
  throw error;
});

app.use((error, req, res, next) => {
  if (req.file) {
    fs.unlink(req.file.path, (err) => {
      console.log(err);
    });
  }
  if (res.headerSent) {
    return next(error);
  }
  res
    .status(error.code || 500)
    .json({ message: error.message || "An unknown error occured!" });
});

mongoose
  .connect(
    `mongodb://${process.env.DB_USER}:${process.env.DB_PASSWORD}@denali.liara.cloud:34346/${process.env.DB_NAME}?authSource=admin&replicaSet=rs0&directConnection=true`
  )
  .then(() => {
    app.listen(5000);
    console.log("server started on port 5000");
  })
  .catch((err) => {
    console.log("we have module error :", err);
  });
