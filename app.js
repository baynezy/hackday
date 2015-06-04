var express = require("express"),
	juicer = require("./custom_modules/juicer"),
	miner = require("./custom_modules/wikiminer"),
	dbpedia = require("./custom_modules/dbpedia"),
	parser = require("./custom_modules/entity-parser"),
	mustacheExpress = require('mustache-express'),
	databaseaccess = require("./custom_modules/database-access"),
	bodyParser = require('body-parser'),
	url = require("url"),
	app = express();
	
app.engine('html', mustacheExpress());
	
app.set('views', './views')
app.set('view engine', 'html');

app.use(express.static('./public'));

app.use(bodyParser.urlencoded({ extended: false }));

app.get('/', function (req, res) {
  res.render('index', {
	  head : {
		  title : "Prime Minister's Questions"
	  }  
  });
});

app.post("/api/annotations", function (req, res) {
	console.log("POST: ");
  	console.log(req.body);
	  var d = new Date();
	  
	databaseaccess.createAnnotationForVideo(d.getTime().toString(), req.body.current_time, 'video_id-1');
	res.json({})
});

app.get("/api/search/tag/:tag", function (req, res) {
	dbpedia.getEntities(req.params.tag, function (data) {
		res.json(data);
	});
});

app.get("/api/search/phrase/:phrase", function (req, res) {
	parser.getEntitiesFromText(req.params.phrase, function(err, data) {
		res.json(data);
	});
});

app.get("/api/search/articles", function (req, res) {
	var url_parts = url.parse(req.url, true);
	var query = url_parts.query;
	
	juicer.getArticles(query, function(articles){
		res.json(articles);
	});
});

/* EXAMPLES

app.get("/examples", function(req, res) {
	var params = {
		q : "chelsea",
		size : 10
	};
	juicer.getArticles(params, function(articles){
		res.json(articles);
	});
});

app.get("/examples/article", function(req, res) {
	var uri = "http://www.bbc.co.uk/news/business-31980802";
	
	juicer.getArticle(uri, function(article) {
		res.json(article);
	});
});

app.get("/examples/miner", function (req, res) {
	var uri = "http://www.bbc.co.uk/news/uk-scotland-scotland-politics-32970337";
	
	miner.extractEntities(uri, function (data) {
		res.json(data);
	});
});

app.get("/examples/miner", function (req, res) {
	var text = "Harriet Harman asks about child benefit";
	
	miner.extractEntitiesFromText(text, function (data) {
		res.json(data);
	});
});

app.get("/examples/dbpedia", function (req, res) {
	var entity = "David Cameron";
	
	dbpedia.getEntities(entity, function(data) {
		res.json(data);
	});
});

app.get("/examples/entityparser", function (req, res) {
	var uri = "http://www.bbc.co.uk/news/uk-scotland-scotland-politics-32970337";
	
	parser.getEntities(uri, function(err, result) {
		res.json(result);
	});
});

app.get("/examples/entityparser", function (req, res) {
	var text = "peter bone talks about human rights";
	
	parser.getEntitiesFromText(text, function(err, result) {
		res.json(result);
	});
});

*/

var server = app.listen(8081, function() {
	
});