var request = require("request"),
	parseXml = require("xml2js").parseString;

exports.getEntities = function(entity, callback) {
	var uri = "http://lookup.dbpedia.org/api/search/PrefixSearch?QueryClass=&MaxHits=5&QueryString=" + entity;
	
	request(uri, function (error, response, body) {
		if (!error && response.statusCode == 200) {
			parseXml(body, function(err, result) {
				callback(result);	
			});
		}
	});
};