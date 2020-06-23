// // bring scrape function from scripts 
// var scrape = require("../scripts/scrape");

// bring headlines and notes from controller
var headlinesController = require("../controllers/headline");
var notesController = require("../controllers/note");


module.exports = function(router) {
    //this route will render the homepage
    router.get("/", function(req, res){
        res.render("home");
    });
    // this route will render saved handlebars
    router.get("/saved", function(req, res) {
            res.render("saved", {data: true});
       
    });
    // this route will display whether there are no new articles or the number of new articles 
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
    // this route will gather the saved query 
    router.get("/api/headlines", function(req, res){
        var query = {};
        if(req.query.saved){
            query = req.query;
        }
        headlinesController.get(query, function(data){
            res.json(data)
        });
    });

    router.delete("/api/headlines/:id", function(req, res){
        var query = {};
        query._id = req.params.id;
        headlinesController.delete(query, function(err, data){
            res.json(data);
        });
    });

    router.patch("/api/headlines", function(req, res){
        headlinesController.update(req.body, function(err, data){
            res.json(data);
        });
    });

    router.get("/api/notes/:headline_id?", function(req, res){
        var query = {};
        if (req.params.headline_id){
            query._id = req.params.headline_id;
        }

        notesController.get(query, function(err, data){
            res.json(data);
        });
    });

    router.delete("/api/notes/:id", function(req, res){
        var query = {};
        query._id = req.params.id;
        notesController.delete(query, function(err, data){
            res.json(data);
        });
    });
    router.post("/api/notes", function(req, res){
        notesController.save(req.body, function(data){
            res.json(data);
        });
    });
}