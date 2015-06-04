var parser = require("./entity-parser"),
	db = require("./database-access"),
	async = require("async");
	


exports.getResults = function(phrase, callback) {
	parser.getEntitiesFromText(phrase, function (entities) {
		async.map(entities, function(item, callback) {
			db.getDataCards(item.title, function(entity) {
				if (typeof(entity.Item) != "undefined") {
					callback(null, {
						id : entity.Item.dataCardID.S,
						title : "Data Card: " + entity.Item.name.S,
						description : entity.Item.embedCode.S,
						uri : ""
					});
				}
			});
		
		}, function(err, results) {
			console.log("entities");
			console.log(entities);
			console.log("results");
			console.log(results);
			var final = entities.concat(results);
			callback(null, final);
		});
	});
};