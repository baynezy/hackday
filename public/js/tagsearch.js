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
				$("#search-results").html("");
				$(data).each(function(index, item) {
					$("#search-results").append('<div class="panel panel-default"><div class="panel-heading clearfix"><h3 class="panel-title pull-left">Entity</h3><a class="btn btn-danger pull-right" href="javascript:;">Disable</a></div><div class="list-group"><div class="list-group-item"><p class="list-group-item-text">Title</p><h4 class="list-group-item-heading">' + item.title + '</h4></div><div class="list-group-item"><p class="list-group-item-text">' + item.description + '</p></div></div></div>');
				});
			});
		});
	}
};