var miner = require("./wikiminer"),
	dbpedia = require("./dbpedia"),
	async = require("async");

exports.getEntities = function(uri, callback) {
	miner.extractEntities(uri, function (entities) {
		async.map(entities, function(item, callback) {
			var newEntity = {
				id : item.id,
				title : item.title,
				weight : item.weight,
				uri : ""
			};
			
			dbpedia.getEntities(item.title, function(entity) {
				if (entity.length > 0) {
					newEntity.uri = entity[0].URI[0];
				}
				
				callback(null, newEntity);
			});
		
		}, function(err, results) {
			callback(null, results);
		});
	});
};

exports.getEntitiesFromText = function(text, callback) {
	miner.extractEntitiesFromText(text, function (entities) {
		async.map(entities, function(item, callback) {
			var newEntity = {
				id : item.id,
				title : item.title,
				weight : item.weight,
				uri : ""
			};
			
			dbpedia.getEntities(item.title, function(entity) {
				for (var i = 0; i < entity.length; i++) {
					var uri = entity[i].URI[0];
					var parts = uri.split("/");
					var lastPart = parts[parts.length - 1].replace("_", " ");
					
					if (lastPart.toLowerCase() == item.title.toLowerCase()) {
						newEntity.uri = uri;
						break;
					}
				}
				if (newEntity.uri.length > 0) {
					callback(null, newEntity);
				}
				
			});
		
		}, function(err, results) {
			callback(null, results);
		});
	});
};