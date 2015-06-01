var apiKey = "3O320TNQSzygKXF8frRiNBQnAANSyUl7",
	http = require("http");

exports.getArticles = function (params, res) {
	var options = {
		host : "data.test.bbc.co.uk",
		path  : "/bbcrd-juicer/articles?"
	};
	
	if (params.q != undefined) options.path += "&q=" + params.q;
	if (params.size != undefined) options.path += "&size=" + params.size;
	
	var callback = function (response) {
		var str = "";
		
		response.on ("data", function (chunk) {
			str += chunk;
		});
		
		res.json(str);
	};
	
	http.request(options, callback);
};