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
				$("#search-results ul").html("");
				$(data).each(function(index, item) {
					$("#search-results ul").append('<li data-dbpedia="' + item.uri + '">' + item.title + '</ul>');
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