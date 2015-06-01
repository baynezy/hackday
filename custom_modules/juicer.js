var apiKey = "3O320TNQSzygKXF8frRiNBQnAANSyUl7",
	request = require("request"),
	crypto = require("crypto");

exports.getArticles = function (params, callback) {
	var uri = "http://data.test.bbc.co.uk/bbcrd-juicer/articles?apikey=" + apiKey;
	
	if (params.q != undefined) uri += "&q=" + params.q;
	if (params.size != undefined) uri += "&size=" + params.size;
	if (params.offset != undefined) uri += "&offset=" + params.offset;
	if (params.published_after != undefined) uri += "&published_after=" + params.published_after;
	if (params.published_before != undefined) uri += "&published_before=" + params.published_before;
	if (params.recent_first != undefined) uri += "&recent_first=" + params.recent_first;
	if (params["like-text"] != undefined) uri += "&like-text=" + params["like-text"];
	
	request(uri, function (error, response, body) {
		if (!error && response.statusCode == 200) {
			callback(body);
		}
	});
};


exports.getArticle = function (uri, callback) {
	var hash = crypto.createHash("sha1").update(uri).digest("hex");
	
	var uri = "http://data.test.bbc.co.uk/bbcrd-juicer/articles/" + hash + "?apikey=" + apiKey;
	
	request(uri, function (error, response, body) {
		if (!error && response.statusCode == 200) {
			callback(body);
		}
	});
};