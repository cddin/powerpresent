Template.clientView.helpers({

});

Template.clientView.events({
	
	"click .test-btn": function(event){
		Meteor.call("addNotes", "aa", "bb", "cc", function(){
			
			console.log("test");
		});
	}
});