var express = require("express"),
	juicer = require("./custom_modules/juicer"),
	miner = require("./custom_modules/wikiminer"),
	dbpedia = require("./custom_modules/dbpedia"),
	app = express();


app.get("/", function(req, res) {
	var params = {
		q : "chelsea",
		size : 10
	};
	juicer.getArticles(params, function(articles){
		res.json(articles);
	});
});

app.get("/article", function(req, res) {
	var uri = "http://www.bbc.co.uk/news/business-31980802";
	
	juicer.getArticle(uri, function(article) {
		res.json(article);
	});
});

app.get("/miner", function (req, res) {
	var uri = "http://www.bbc.co.uk/news/uk-scotland-scotland-politics-32970337";
	
	miner.extractEntities(uri, function (data) {
		res.json(data);
	});
});

app.get("/dbpedia", function (req, res) {
	var entity = "David Cameron";
	
	dbpedia.getEntities(entity, function(data) {
		res.json(data);
	});
});

var server = app.listen(3000, function() {
	
});