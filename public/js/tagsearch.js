var tagsearch = {
	init : function() {
		
		$("#create-new-annotation").on("click", function () {
			
			var event_tagsearch = jQuery.Event("tagsearch");
			event.search = $("#annotation-title").val();
			
			var event_create = jQuery.Event("tagtimeline");
			var myVideo = document.getElementById("myVideo");
			console.log(myVideo.currentTime);
			event_create.current_time = myVideo.currentTime;
			
			$("body").trigger(event_create);
			$("body").trigger(event_tagsearch);
			
			return false;
			
		});
		
		$("#update-annotation").on("click", function () {
			
			//NOT FINISHED
			return false;
			
		});
		
		$("body").on("tagsearch", function (event) {
			$.get("/api/search/phrase/" + event.search, function(data) {
				console.log(data);
				$("#search-results dl").html("");
				$(data).each(function(index, item) {
					$("#search-results dl").append('<div class="panel panel-default"><div class="panel-heading clearfix"><h3 class="panel-title pull-left">Entity</h3><a class="btn btn-danger pull-right" href="javascript:;">Disable</a></div><div class="list-group"><div class="list-group-item"><p class="list-group-item-text">Title</p><h4 class="list-group-item-heading">' + item.title + '</h4></div><div class="list-group-item"><p class="list-group-item-text">' + item.description + '</p></div></div></div>');
				});
			});
		});
		
		$("body").on("update_annotation", function (event) {
			
			//NOT FINISHED
			$.ajax({
    			type: "PUT",
   				url: "/api/put_annotations/",
    			contentType: "application/json",
    			data: {"data": "mydata"},
				success: function () {
	  				console.log("success PUT - tagsearch js");
  					}
			});
				
		
		$("body").on("tagtimeline", function (event) {
			
			$.ajax({
  					type: "POST",
 					 url: "/api/annotations/",
 					 data: {current_time:event.current_time},
  					success: function () {
	  				console.log("success - POST tagsearch js");
  					}
			});
		});
	}
};