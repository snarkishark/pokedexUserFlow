$(function(){
	$("div").addClass("hidden");
	$(".home").removeClass("hidden");
	$.each($(".button"), function(i, val){
		var i=1;
		var val = $(".button").length;
		var button = this;
		var toShow ="."+$(button).attr('class').split(" ")[1];
		$(button).on('click', function(e){
			$("div").addClass("hidden");
			$(toShow).removeClass("hidden");
		});
		i+=1;
	});
	
});
