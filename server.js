// require dependencies
var express = require("express");

// set up our port to be either the host's designated or 3040
var PORT = process.env.PORT || 3040;

// instantiate express app
var app = express();

// set up express router
var router = express.Router();

// desifnate our public dolfer as a static directory 
app.use(express.static(_dirname + "/public"));

// have every request go through our router middleware
app.use(router);

// listen on the port
app.listen(PORT,  function(){
  console.log("listening on port:" + PORT);
});