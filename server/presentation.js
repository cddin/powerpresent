Meteor.methods({
	
	updateCurrentSlide: function(params) {
		console.log(params);
		Slides.update({
			_id: params.id
		},{
			$set: {
				'current': params.current
			}
		});
	}
});
