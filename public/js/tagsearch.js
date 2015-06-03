var tagsearch = {
	init : function() {
		$("form#frm-tag-search").on("submit", function () {
			var event = jQuery.Event("tagsearch");
			event.search = $("#entity-search").val();
			
			$("body").trigger(event);
			
			return false;
		});
		
		$("body").on("tagsearch", function (event) {
			$.get("/api/search/phrase/" + event.search, function(data) {
				console.log(data);
				$("#search-results dl").html("");
				$(data).each(function(index, item) {
					$("#search-results dl").append('<dt data-dbpedia="' + item.uri + '">' + item.title + '</dt><dd>' + item.description + '</dd>');
				});
			});
		});
	}
};