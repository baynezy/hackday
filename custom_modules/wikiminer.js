var apiUri = "http://wikipedia-miner.cms.waikato.ac.nz/services/wikify?",
	request = require("request");

exports.extractEntities = function (uri, callback) {
	var queryString = "source=" + encodeURIComponent(uri);
	queryString += "&sourceMode=url";
	queryString += "&responseFormat=json";
	
	var apiCall = apiUri + queryString;
	
	request(apiCall, function (error, response, body) {
		if (!error && response.statusCode == 200) {
			callback(JSON.parse(body).detectedTopics);
		}
	});
};