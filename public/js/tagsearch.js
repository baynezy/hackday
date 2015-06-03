var tagsearch = {
	init : function() {
		$("form#frm-tag-search").on("submit", function () {
			var event = jQuery.Event("tagsearch");
			event.search = $("#entity-search").val();
			
			$("body").trigger(event);
			
			return false;
		});
		
		$("body").on("tagsearch", function (event) {
			$("#search-results").text(event.search);
		});
	}
};