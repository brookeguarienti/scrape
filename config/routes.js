// bring scrape function from scripts 
var scrape = require("../scripts/scrape");

// bring headlines and notes from controller
var headlinesController = require("../controllers/headline");
var notesController = require("../controllers/note");


module.exports = function(router) {
    //this route will render the homepage
    router.get("/scrape", function(req, res){
        res.render("home");
    });
    // this route will render saved handlebars
    router.get("/saved", function(req, res) {
        res.render("saved");
    });

    router.get("/api/fetch", function(req,res){
        headlinesController.fetch(function(err, docs){
            if(!docs || docs.insertedCount === 0 ){
                res.json({
                    message: "No new articles today. We will see you another day!"
                });
            }
            else {
                res.json({
                    message: docs.insertedCount + " newly added articles"
                });
            }
        });
    });
}