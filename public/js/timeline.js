var timeline = {
	
	init : function () {
		$("#btn_createTag").on("click", function () {
			
			var event = jQuery.Event("tagtimeline");
			var myVideo = document.getElementById("myVideo");
			console.log(myVideo.currentTime);
			event.current_time = myVideo.currentTime;
			
			$("body").trigger(event);
			
			return false;
			
		});
		
		$("body").on("tagtimeline", function (event) {
			
			$.ajax({
  					type: "POST",
 					 url: "/api/annotations/",
 					 data: {current_time:event.current_time},
  					success: function () {
	  				console.log("success");
  					}
			});
		});
	}
};