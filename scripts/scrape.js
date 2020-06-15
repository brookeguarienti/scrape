// require request and cheerio
var request = require("request");
var cheerio = require("cheerio");

var scrape = function(cb) {
    request("https://www.bbc.com/news", function(err, res, body){
        var $ = cheerio.load(body);

        var articles = [];

        $(".gs-c-promo").each(function(i, element){
            // console.log(this);
            
            var head = $(this).find(".gs-c-promo-heading")[0];
            head = $(head).text();
            console.log( "headline: " + head);
            
            var sum = $(this).find(".gs-c-promo-summary")[0];
            sum = $(sum).text().trim();
            console.log("summary: " + sum);
            

            if(head && sum){
                var headNeat = head.replace(/(\r\n|\n|\r|\t|s+)/gm, " ").trim();
                var sumNeat = sum.replace(/(\r\n|\n|\r|\t|s+)/gm, " ").trim();

                var dataToAdd = {
                    headline: headNeat,
                    summary: sumNeat
                };
                articles.push(dataToAdd);
            }
        });
        cb(articles);
    });
};

module.exports = scrape;