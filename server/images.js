// Meteor.publish('images', function(id) {
// 	console.log(id);
// 	return Images.findOne({
// 		'_id' : id
// 	});
// });

Meteor.publish('images', function() {
	return Images.find();
});