var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
var mysql = require("mysql");

var apiRouter = require("./routes/api");
var devicesRouter = require("./routes/devices");
var readingsRouter = require("./routes/readings");

var app = express();

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/api", apiRouter);
app.use("/api", devicesRouter);
app.use("/api", readingsRouter);

module.exports = app;
