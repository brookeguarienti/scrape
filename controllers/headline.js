// bring in scrape script and makeDate scripts
var scrape = require("../scripts/scrape");
var makeDate = require("../scripts/date");

// bring in headline and note mongoose
var headline = require("../models/Headline");

module.exports = {
    fetch: function(cb) {
        scrape(function(data) {
            var articles = data;
            for (var i=0; i < articles.length; i++) {
                articles[i].date = makeDate();
                articles[i].saved = false;
            }
            // console.log(articles);
            
            headline.collection.insertMany(articles, {ordered:false}, function(err, docs){
                cb(err, docs);
            });
        });
    },
    delete: function(query, cb) {
        headline.remove(query, cb);
    },
    get: function(query, cb) {
        if (query.saved && query.saved === "false"){
            query.saved = false
        }
        if (query.saved && query.saved === "true"){
            query.saved = true
        }
        headline.find(query)
        .sort({
            _id: -1
        })
        .exec(function(err, doc) {
            
            cb(doc);
        });
    },
    update: function(query, cb) {
        
        headline.update({_id: query._id}, {
            $set: query
        }, {}, cb);
        console.log(query);
        
    }
}