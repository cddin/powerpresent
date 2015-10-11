Template.slidesView.helpers({
	slides: function(){
		return Slides.find();
	},

	images: function (id) {
		// console.log(id);
		return Images.findOne({
			_id: id
		});
	}
});

Template.slidesView.events({

});