// config/database.js
// var mongoose = require("mongoose");
import mongoose from "mongoose";
import databaseConfig from "src/config/database.config";
// mongoose.set("useCreateIndex", true);
var chalk = require("chalk");
var connected = chalk.bold.cyan;
var error = chalk.bold.yellow;
var disconnected = chalk.bold.red;
var termination = chalk.bold.magenta;

function connect() {
  mongoose.connect(databaseConfig.DB_Url);
  mongoose.connection.on("connected", function () {
    console.log(connected("Mongoose default connection is open to ", databaseConfig.DB_Url));
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

// Export default
export default {
  connect,
} as const;