var apiUri = "http://wikipedia-miner.cms.waikato.ac.nz/services/wikify?",
	request = require("request-promise");

exports.extractEntities = function (uri, callback) {
	var queryString = "source=" + encodeURIComponent(uri);
	queryString += "&sourceMode=url";
	queryString += "&responseFormat=json";
	
	var apiCall = apiUri + queryString;
	
	var options = {
		uri : apiCall,
		method : "GET",
		transform : function (data) {
			return JSON.parse(data).detectedTopics;
		}
	};
	
	return request(options);
};