var fullscreen = {
	init : function(elem) {
	    if ((document.fullScreenElement !== undefined && document.fullScreenElement === null) || (document.msFullscreenElement !== undefined && document.msFullscreenElement === null) || (document.mozFullScreen !== undefined && !document.mozFullScreen) || (document.webkitIsFullScreen !== undefined && !document.webkitIsFullScreen)) {
	        if (elem.requestFullScreen) {
	            elem.requestFullScreen();
	        } else if (elem.mozRequestFullScreen) {
	            elem.mozRequestFullScreen();
	        } else if (elem.webkitRequestFullScreen) {
	            elem.webkitRequestFullScreen(Element.ALLOW_KEYBOARD_INPUT);
	        } else if (elem.msRequestFullscreen) {
	            elem.msRequestFullscreen();
	        }
	    } else {
	        if (document.cancelFullScreen) {
	            document.cancelFullScreen();
	        } else if (document.mozCancelFullScreen) {
	            document.mozCancelFullScreen();
	        } else if (document.webkitCancelFullScreen) {
	            document.webkitCancelFullScreen();
	        } else if (document.msExitFullscreen) {
	            document.msExitFullscreen();
	        }
	    }
	},

	handler : function() {
	    if( window.innerHeight != screen.height ) {
	        // console.log('fullscreen');	
	        $('#goFull').hide();
			$('.presentation').addClass('fullscreen');
	    } else {
	        // console.log('exit fullscreen');	
	        $('#goFull').show();
			$('.presentation').removeClass('fullscreen');
	    }
	}
}

var slideshow = {
	previous: function(e) {
		e.preventDefault();
		var currentIndex = $('#slide').data('slideindex');
		var prevIndex = parseInt(currentIndex) - 1;
		var current = Slides.find({index: currentIndex.toString()}).fetch();
		var prev = Slides.find({index: prevIndex.toString()}).fetch();
	    if(prev.length) {
	    	Meteor.call('updateCurrentSlide', {
				'id' : current[0]._id,
				'current': '0'
			});
			Meteor.call('updateCurrentSlide', {
				id : prev[0]._id,
				current: '1'
			});
	    	$('#slide').data('slideindex', prevIndex);
	    } else {
	    	console.log('not exist');
	    }
	},

	next: function(e) {
		e.preventDefault();
		var currentIndex = $('#slide').data('slideindex');
		var nextIndex = parseInt(currentIndex) + 1;
		var current = Slides.find({index: currentIndex.toString()}).fetch();
		var next = Slides.find({index: nextIndex.toString()}).fetch();
// console.log(currentIndex, currentIndex.toString(), current, nextIndex);

	    if(next.length) {
	    	Meteor.call('updateCurrentSlide', {
				'id' : current[0]._id,
				'current': '0'
			});
			Meteor.call('updateCurrentSlide', {
				id : next[0]._id,
				current: '1'
			});
	    	$('#slide').data('slideindex', nextIndex);
	    } else {
	    	console.log('not exist');
	    }
	},

	current: function(e) {
		e.preventDefault();
		var slideindex = $('#slide').data('slideindex');
	    console.log('current');
	}
}


Template.presentationView.onRendered(function() {

	document.addEventListener('webkitfullscreenchange', fullscreen.handler, false);
    document.addEventListener('mozfullscreenchange', fullscreen.handler, false);
    document.addEventListener('fullscreenchange', fullscreen.handler, false);
    document.addEventListener('MSFullscreenChange', fullscreen.handler, false);

    globalHotkeys = new Hotkeys();
    globalHotkeys.add({
	    combo : 'left',
	    callback : slideshow.previous
	});
	globalHotkeys.add({
	    combo : 'down',
	    callback : slideshow.previous
	});

	globalHotkeys.add({
	    combo : 'right',
	    callback : slideshow.next
	});
	globalHotkeys.add({
	    combo : 'up',
	    callback : slideshow.next
	});
	globalHotkeys.add({
	    combo : 'enter',
	    callback : slideshow.current
	});

});

Template.presentationView.helpers({

	slide : function() {
		
		console.log(Slides.findOne({
			current: '1'
		}));
		
		return Slides.findOne({
			current: '1'
		});
	},

	image: function (id) {
		return Images.findOne({
			_id: id
		});
	}

});

Template.presentationView.events({

	'click #goFull' : function(){
		fullscreen.init(document.body);
	}
});