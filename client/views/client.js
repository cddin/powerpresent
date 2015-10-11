Template.clientView.helpers({

	slides: function () {
		var slideList = Slides.find({},{sort:{index:1}});
		console.log(slideList.fetch());
		return slideList;
	}

});

Template.clientView.events({

	"click .btn-current": function (event) {
		updateCurrent();
	},
	"click .btn-footnote": function (event) {
		
		console.log(pgwSlideshow.getCurrentSlide());
		
		var sl = Slides.find({index:pgwSlideshow.getCurrentSlide()});
		console.log(sl.fetch()[0]._id);
		
		// Router.go("addnoteView", {_id:sl.fetch()[0]._id}, {query: 'test=abcdefg'});
		// this.params.query.test
		
		Router.go("addnoteView", {_id:sl.fetch()[0]._id});
	},
	
	'submit form': function(e) {
			e.preventDefault();
			Meteor.call("addNotes", $('#formnote').data("slideid"), $(e.target).find('[name=note]').val(), "test", function () {
			});
		}
});

Template.clientView.onRendered(function () {
	console.log("onRendered");
	
	$(document).ready(function () {
		setTimeout(function(){ refreshSlide(); }, 500);
	});
	
	Slides.find().observeChanges({
		changed: function (id, fields) {
			console.log(id);
			console.log(fields);
			updateCurrent();
		}
	});
	
// 	globalHotkeys = new Hotkeys();
// 	globalHotkeys.add({
//     combo : "a",
//     callback : function(){
//         alert("You pressed A");
//     }
// })
	
});

var pgwSlideshow;

function refreshSlide(){
	
	console.log("refreshslide");
	
	if(Slides.find({}).fetch().length>0){
		if(!pgwSlideshow){
			pgwSlideshow = $('.pgwSlideshow').pgwSlideshow();
			updateCurrent()
		}else{
			pgwSlideshow.reload();
			updateCurrent();
		}
	}
}

function updateCurrent(){
	var sl = Slides.find({current:"1"});
	console.log(sl.fetch());
	if(sl.fetch().length==0){
		return;
	}
	//else{
		pgwSlideshow.displaySlide(parseInt(sl.fetch()[0].index));
	// }
}

