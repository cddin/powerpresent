Meteor.publish('slides', function() {
  return Slides.find();
})

Meteor.methods({
	addSlide: function(params){
		Slides.insert({
			"name": params.name,
			"index": params.index,
			"filename": params.filename,
			"current": "0"
		});
		return 'OK';
	}
});