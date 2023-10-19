// index.js
// where your node app starts

// init project
const invalidDateError = { error: "Invalid Date" };
var express = require("express");
var app = express();
require("dotenv").config();

let getDateFromParam = (dateInputString) => {
  if (dateInputString.match(/^\d+$/)) {
    return new Date(Number(dateInputString));
  } else {
    return new Date(dateInputString);
  }
};

let getDateJson = (dateObj) => {
  return { unix: dateObj.valueOf(), utc: dateObj.toUTCString() };
};

let handleDate = (req, res) => {
  let dateObj = getDateFromParam(req.params.date);
  if (dateObj == "Invalid Date") {
    res.json(invalidDateError);
  } else {
    res.json(getDateJson(dateObj));
  }
};

let handleNoDate = (res) => {
  res.json(getDateJson(new Date(Date.now())));
};

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC
var cors = require("cors");
const e = require("express");
app.use(cors({ optionsSuccessStatus: 200 })); // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static("public"));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + "/index.html");
});

// your first API endpoint...
app.get("/api/:date?", function (req, res) {
  if (req.params.date === undefined) {
    handleNoDate(res);
  } else {
    handleDate(req, res);
  }
});

// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log("Your app is listening on port " + listener.address().port);
});
