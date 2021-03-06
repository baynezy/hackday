var tagsearch = {
	init : function() {
		tagsearch.createForm();
		
		$("form#frm-tag-search").on("submit", function (e) {
			console.log("Submit Search")
			e.preventDefault();
			if (!tagsearch.editing) {
				var searchEvent = jQuery.Event("tagsearch");
				searchEvent.search = $("#annotation-title").val();
				
				var tagTimelineEvent = jQuery.Event("tagtimeline");
				var myVideo = document.getElementById("myVideo");
				
				tagsearch.currentTime = myVideo.currentTime;
				tagsearch.annotationId = new Date().getTime().toString();
				
				tagTimelineEvent.current_time = tagsearch.currentTime;
				tagTimelineEvent.annotation_id = tagsearch.annotationId;
				tagTimelineEvent.name = $("#annotation-title").val();
				
				$("body").trigger(tagTimelineEvent);
				$("body").trigger(searchEvent);
				
				tagsearch.editForm();
			}
			else {
				var updateTagEvent = jQuery.Event("updateTag");
				updateTagEvent
				updateTagEvent.current_time = tagsearch.currentTime;
				updateTagEvent.annotation_id = tagsearch.annotationId;
				updateTagEvent.name = $("#annotation-title").val();
				updateTagEvent.quote = $("#quote-text").val();
				updateTagEvent.comment = $("#comment-text").val();
				
				$("body").trigger(updateTagEvent);
			}
			
			return false;
		});
			
		$("#search-results").delegate("button", "click", function() {
			var uri = $(this).attr("data-dbpedia");
			var id = $(this).attr("data-id");
			var entitySelectedEvent = jQuery.Event("entitySelected");
			entitySelectedEvent.uri = uri;
			entitySelectedEvent.id = id;
			
			$("body").trigger(entitySelectedEvent);
		});
		
		$("body").on("tagsearch", function (event) {
			console.log("Tag Search Event");
			$("#search-results").html("");
			$.get("/api/search/phrase/" + event.search, function(data) {
				var dataCardSearchEvent = jQuery.Event("dataCardSearchEvent");
				dataCardSearchEvent.items = data;
				
				$("body").trigger(dataCardSearchEvent);
				
				$(data).each(function(index, item) {
					$("#search-results").append(tagsearch.topLevelItem(item));
				});
			});
		});
		
		$("body").on("dataCardSearchEvent", function(event) {
			console.log("Data Card Search Event");
			for (var i = 0; i < event.items.length; i++) {
				$.get("/api/search/datacard/" + event.items[i].title, function(data) {
					$(data).each(function(index, item) {
						if (typeof(item.Item) != "undefined") {
							var card = {
								id : item.Item.dataCardID.S,
								title : "Data Card: " + item.Item.name.S,
								description : item.Item.embedCode.S,
								uri : ""
							};
							$("#search-results").append(tagsearch.topLevelItem(card));
						}
					});
				});
			}
		});
		
		$("body").on("tagtimeline", function (event) {
			console.log("Tag Timeline Event");
			$.ajax({
				type: "POST",
				url: "/api/annotations/",
				data: {
					current_time:event.current_time,
					annotation_id : event.annotation_id,
					name : event.name
				},
				success: function () {
					
				}
			});
		});
		
		$("body").on("updateTag", function (event) {
			console.log("Update Tag Event");
			$.ajax({
				type: "PUT",
				url: "/api/annotations/",
				data: {
					current_time:event.current_time,
					annotation_id : event.annotation_id,
					name : event.name,
					quote : event.quote,
					comment : event.comment
				},
				success: function () {
					
				}
			});
		});
		
		$("body").on("entitySelected", function (event) {
			console.log("Entity Selected Event");
			$.get("/api/search/articles?facets=" + event.uri, function(data) {
				
				$(data.hits).each(function (index, item) {
					$("#results-" + event.id).append('<div class="panel panel-default"><div class="panel-heading clearfix"><h3 class="panel-title pull-left">' + item.title + '</h3><button class="btn btn-success pull-right">Select</button></div><div class="list-group"><div class="list-group-item"><p class="list-group-item-text">' + item.description + '</p></div></div></div>');
				});
				
				$("#results-" + event.id).show();
			});
		});
	},
	
	createForm : function() {
		tagsearch.editing = false;
		$("#edit-only").hide();
		$("#edit-annotation").hide();
		$("#create-new-annotation").show();
	},
	
	editForm : function() {
		tagsearch.editing = true;
		$("#edit-only").show();
		$("#edit-annotation").show();
		$("#create-new-annotation").hide();
	},
	
	topLevelItem : function(item) {
		return '<div class="panel panel-default"><div class="panel-heading clearfix"><h3 class="panel-title pull-left">' + item.title + '</h3><button class="btn btn-success pull-right" data-dbpedia="' + item.uri + '" data-id="'+ item.id + '">Enable</button></div><div class="list-group"><div class="list-group-item"><p class="list-group-item-text">' + item.description + '</p></div></div></div><div id="results-'+ item.id + '" style="display:none;" class="news-cards"></div>';
	}
};