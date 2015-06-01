var express = require("express"),
	juicer = require("./custom_modules/juicer"),
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

var server = app.listen(3000, function() {
	
});