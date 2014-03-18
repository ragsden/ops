"use strict";

var winston = require("winston"),
    util = require("util");

util.log("Initializing Logger...");

//maxsize:10mb
var fileTrasportOptions = {
  filename:"logs/ops.log",
  maxsize:10485760,
  maxFiles:20,
};

var logger = new (winston.Logger)({
  transports:[
    new (winston.transports.Console)({timestamp: true, colorize: true}),
    new (winston.transports.File)(fileTrasportOptions)
  ]
});

module.exports = logger;