function makeScrollable(wrapper_mission, scrollable){
	// Get jQuery elements
	var wrapper_mission = $(wrapper_mission), scrollable = $(scrollable);
	
	// Hide images until they are not loaded
	scrollable.hide();
	var loading = $('<div class="loading">Loading...</div>').appendTo(wrapper_mission);
	
	// Set function that will check if all images are loaded
	var interval = setInterval(function(){
		var images = scrollable.find('img');
		var completed = 0;
		
		// Counts number of images that are succesfully loaded
		images.each(function(){
			if (this.complete) completed++;	
		});
		
		if (completed == images.length){
			clearInterval(interval);
			// Timeout added to fix problem with Chrome
			setTimeout(function(){
				
				loading.hide();
								
				scrollable.slideDown('slow', function(){
					enable();	
				});					
			}, 1000);	
		}
	}, 100);
	
	function enable(){
		// height of area at the top at bottom, that don't respond to mousemove
		var inactiveMargin = 100;					
		// Cache for performance
		var wrapper_missionWidth = wrapper_mission.width();
		var wrapper_missionHeight = wrapper_mission.height();
		// Using outer height to include padding too
		var scrollableHeight = 3*scrollable.outerHeight() + 2*inactiveMargin;
		// Do not cache wrapper_missionOffset, because it can change when user resizes window
		// We could use onresize event, but it's just not worth doing that 
		// var wrapper_missionOffset = wrapper_mission.offset();
		
		var lastTarget;
		//When user move mouse over menu			
		wrapper_mission.mousemove(function(e){
			// Save target
			lastTarget = e.target;

			var wrapper_missionOffset = wrapper_mission.offset();
		
			// Scroll menu
			var top = (e.pageY -  wrapper_missionOffset.top) * (scrollableHeight - wrapper_missionHeight) / wrapper_missionHeight - inactiveMargin;
			if (top < 0){
				top = 0;
			}			
			wrapper_mission.scrollTop(top);
		});		
	}
}
	
$(function(){	
	makeScrollable("div.sc_menu_wrapper_mission", "div.sc_menu");
});