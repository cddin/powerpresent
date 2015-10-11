Meteor.publish('slides', function() {
  return Slides.find({}, {
  	sort: {index: 1}
  });
});

Meteor.methods({
	addSlide: function(params) {
		console.log(process.env);
		
		Slides.insert({
			"name": params.name,
			"index": params.index,
			"filename": params.filename,
			"file": params.file,
			"current": "0"
		});
		return 'OK';
	},

	removeSlide: function(id) {
		Slides.remove({
			'_id' : id
		});
	},

	updateSlide: function(params) {
		// console.log(params);
		Slides.update({
			_id: params.id
		},{
			$set: {
				'index': params.position
			}
		});
	}
});