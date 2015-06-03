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
	}
};