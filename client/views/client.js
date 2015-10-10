Template.clientView.helpers({

	slides: function () {
		var slideList = Slides.find({});
		console.log(slideList.fetch());
		return slideList;
	}

});

Template.clientView.events({

	"click .btn-current": function (event) {
		// Meteor.call("addNotes", "aa", "bb", "cc", function () {
		// });
		updateCurrent();
	}
});

Template.clientView.onRendered(function () {
	console.log("onRendered");
	
	$(document).ready(function () {
		setTimeout(function(){ refreshSlide(); }, 500);
	});
	
	Slides.find().observeChanges({
		changed: function (id, fields) {
			updateCurrent();
		}
	});
});

var pgwSlideshow;

function refreshSlide(){
	
	console.log("refreshslide");
	
	if(Slides.find({}).fetch().length>0){
		if(!pgwSlideshow){
			pgwSlideshow = $('.pgwSlideshow').pgwSlideshow();
		}else{
			pgwSlideshow.reload();
		}
	}
}

function updateCurrent(){
	var sl = Slides.find({current:"1"});
	console.log(sl.fetch());
	if(sl.fetch().length==0){
		pgwSlideshow.displaySlide(1);
	}else{
		pgwSlideshow.displaySlide(sl.fetch()[0].index);
	}
}
