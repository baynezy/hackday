var tagsearch = {
	init : function() {
		$("form#frm-tag-search").on("submit", function () {
			var event = jQuery.Event("tagsearch");
			event.search = $("#annotation-title").val();
			
			var event_create = jQuery.Event("tagtimeline");
			var myVideo = document.getElementById("myVideo");
			console.log(myVideo.currentTime);
			event_create.current_time = myVideo.currentTime;
			
			$("body").trigger(event_create);
			$("body").trigger(event);
			
			return false;
		});
		
		$("body").on("tagsearch", function (event) {
			$.get("/api/search/phrase/" + event.search, function(data) {
				console.log(data);
				$("#search-results").html("");
				$(data).each(function(index, item) {
					$("#search-results").append('<div class="panel panel-default"><div class="panel-heading clearfix"><h3 class="panel-title pull-left">' + item.title + '</h3><a class="btn btn-success pull-right" href="javascript:;">Enable</a></div><div class="list-group"><div class="list-group-item"><p class="list-group-item-text">' + item.description + '</p></div></div></div>');
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
	}
};