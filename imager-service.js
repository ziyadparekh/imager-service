"use strict";

var express = require("express"),
    errorHandler = require("errorHandler"),
    bodyParser = require("body-parser"),
    morgan = require("morgan"),
    path = require("path"),
    app;

var ImagerRoutes = require("./routes/ImagerRoutes");

app = express();

process.on("uncaughtException", function (err) {
    console.log(err);
    process.exit(0);
});

app.use(errorHandler({ "showStack": true }));
app.use(bodyParser.urlencoded({ "extended": false }));
app.use(bodyParser.json());

app.use(morgan("combined"));

app.use("/api", ImagerRoutes);

module.exports = app;