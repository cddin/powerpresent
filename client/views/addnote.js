Template.addnoteView.helpers({

});

Template.addnoteView.events({

// // Meteor.call("addNotes", "aa", "bb", "cc", function () {
		// });
		//console.log();
		'submit form': function(e) {
			e.preventDefault();
			Meteor.call("addNotes", $('#formnote').data("slideid"), $(e.target).find('[name=note]').val(), "test", function () {
			});
		}
});