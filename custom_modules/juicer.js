var apiKey = "3O320TNQSzygKXF8frRiNBQnAANSyUl7",
	request = require("request");

exports.getArticles = function (params, callback) {
	var uri = "http://data.test.bbc.co.uk/bbcrd-juicer/articles?apikey=" + apiKey;
	
	if (params.q != undefined) uri += "&q=" + params.q;
	if (params.size != undefined) uri += "&size=" + params.size;
	
	request(uri, function (error, response, body) {
		if (!error && response.statusCode == 200) {
			callback(body);
		}
	});
};