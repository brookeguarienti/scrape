// require dependencies
var express = require("express");
var mongoose = require("mongoose");
var expressHandlebars = require("express-handlebars");
var bodyParser = require("body-parser");

// set up our port to be either the host's designated or 3040
var PORT = process.env.PORT || 3030;

// instantiate express app
var app = express();

// set up express router
var router = express.Router();

// require routes file and pass router object through
require("./config/routes")(router);

// desifnate our public dolfer as a static directory
app.use(express.static(__dirname + "/public"));

// connect handlebars to our express app
app.engine(
  "handlebars",
  expressHandlebars({
    defaultLayout: "main",
  })
);
app.set("view engine", "handlebars");

//use bodyParser in or app
app.use(
  bodyParser.urlencoded({
    extended: false,
  })
);

// have every request go through our router middleware
app.use(router);

//if deployed, use the deployed database. otherwise use the local mongoHeadlines database
var db = process.env.MONGODB_URI || "mongodb://localhost/mongoHeadlines";

// connect mongoose to our database
mongoose.connect(db, function (error) {
  //log any errors conencting with mongoose
  if (error) {
    console.log(error);
  }
  // or log a success msg
  else {
    console.log("mongoose connection is successful");
  }
});

// listen on the port
app.listen(PORT, function () {
  console.log("listening on port:" + PORT);
});
