var tagsearch = {
	init : function() {
		$("form#frm-tag-search").on("submit", function () {
			var searchEvent = jQuery.Event("tagsearch");
			searchEvent.search = $("#annotation-title").val();
			
			var tagTimelineEvent = jQuery.Event("tagtimeline");
			var myVideo = document.getElementById("myVideo");
			console.log(myVideo.currentTime);
			tagTimelineEvent.current_time = myVideo.currentTime;
			
			$("body").trigger(tagTimelineEvent);
			$("body").trigger(searchEvent);
			
			$("#search-results").delegate("button", "click", function() {
				var uri = $(this).attr("data-dbpedia");
				var id = $(this).attr("data-id");
				var entitySelectedEvent = jQuery.Event("entitySelected");
				entitySelectedEvent.uri = uri;
				entitySelectedEvent.id = id;
				
				$("body").trigger(entitySelectedEvent);
			});
			
			return false;
		});
		
		$("body").on("tagsearch", function (event) {
			$.get("/api/search/phrase/" + event.search, function(data) {
				console.log(data);
				$("#search-results").html("");
				$(data).each(function(index, item) {
					$("#search-results").append('<div class="panel panel-default"><div class="panel-heading clearfix"><h3 class="panel-title pull-left">' + item.title + '</h3><button class="btn btn-success pull-right" data-dbpedia="' + item.uri + '" data-id="'+ item.id + '">Enable</button></div><div class="list-group"><div class="list-group-item"><p class="list-group-item-text">' + item.description + '</p></div></div></div><div id="results-'+ item.id + '" style="display:none;" class="news-cards"></div>');
				});
			});
		});
		
		$("body").on("tagtimeline", function (event) {
			$.ajax({
				type: "POST",
				url: "/api/annotations/",
				data: {current_time:event.current_time},
				success: function () {
					console.log("success - tagsearch js");
				}
			});
		});
		
		$("body").on("entitySelected", function (event) {
			console.log("Entity Selected");
			console.log(event);
			$.get("/api/search/articles?facets=" + event.uri, function(data) {
				console.log(data);
				
				$(data.hits).each(function (index, item) {
					$("#results-" + event.id).append('<div class="panel panel-default"><div class="panel-heading clearfix"><h3 class="panel-title pull-left">' + item.title + '</h3><button class="btn btn-success pull-right">Select</button></div><div class="list-group"><div class="list-group-item"><p class="list-group-item-text">' + item.description + '</p></div></div></div>');
				});
				
				$("#results-" + event.id).show();
			});
		});
	}
};