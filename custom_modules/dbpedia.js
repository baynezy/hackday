var request = require("request-promise"),
	parseXml = require("xml2js").parseString,
	q = require("q");

exports.getEntities = function(entity, callback) {
	var uri = "http://lookup.dbpedia.org/api/search/PrefixSearch?QueryClass=&MaxHits=5&QueryString=" + entity;
	
	var options = {
		uri : uri,
		method : "GET",
		transform : function (data) {
			var deferred = q.defer();
			parseXml(data, function(err, result) {
				deferred.resolve = result.ArrayOfResult.Result;
			});
			
			return deferred.promise;
		}
	};
	
	return request(options);
};