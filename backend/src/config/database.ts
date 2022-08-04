// config/database.js
// var mongoose = require("mongoose");
import mongoose from "mongoose";
// mongoose.set("useCreateIndex", true);
var chalk = require("chalk");
var dbURL = require("./properties").DB;
var connected = chalk.bold.cyan;
var error = chalk.bold.yellow;
var disconnected = chalk.bold.red;
var termination = chalk.bold.magenta;

module.exports = function () {
  mongoose.connect(dbURL);
  mongoose.connection.on("connected", function () {
    console.log(connected("Mongoose default connection is open to ", dbURL));
    console.log("Server Db Connected.!!!");
  });

  mongoose.connection.on("error", function (err) {
    console.log(
      error("Mongoose default connection has occured " + err + " error")
    );
  });

  mongoose.connection.on("disconnected", function () {
    console.log(disconnected("Mongoose default connection is disconnected"));
  });

  process.on("SIGINT", function () {
    mongoose.connection.close(function () {
      console.log(
        termination(
          "Mongoose default connection is disconnected due to application termination"
        )
      );
      process.exit(0);
    });
  });

};
