Template.adminView.helpers({
	// slides: function(){
	// 	return Slides.find();
	// }
});

Template.adminView.events({
	'submit #add-slide-form' : function(e, tmpl) {
		e.preventDefault();
		// var filename = tmpl.find('#filename').value + '.png',
		// 	index = tmpl.find('#index').value;
		var params = {
			'name' 		: tmpl.find('#filename').value,
			'filename' 	: tmpl.find('#filename').value + '.png',
			'index' 	: tmpl.find('#index').value
		}

		Meteor.call('addSlide', params);
	}
});