const path = require("path");
const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const coursesRoutes = require("./routes/courses");
const userRoutes = require("./routes/user");

const app = express();

mongoose.connect('mongodb+srv://Apurv:mongodb@cluster0-hexwf.mongodb.net/courseapp-mean-angular-node?retryWrites=true"', {

}).then(() => console.log('connected to database'))
  .catch((err) => console.error(err));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));


app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-requested-With, Content-Type, Accept, Authorization"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PATCH, PUT, DELETE, OPTIONS, PUT"
  );

  next();
});

app.use("/api/courses", coursesRoutes);
app.use("/api/user", userRoutes);

module.exports = app;
