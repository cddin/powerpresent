

Template.adminView.onRendered(function () {
    this.$('#slides-list').sortable({
        stop: function(e, ui) {

        	var i = 1;
        	$(this).find('.slide-item').each(function(){
        		var id = $(this).data('id');
          		var index = $(this).data('index');

          		var params = {
					'id' 		: $(this).data('id'),
					'index' 	: $(this).data('index'),
					'position' 	: i
				}

          		Meteor.call('updateSlide', params);
          		i++;
          	});
        }
    });
});

Template.adminView.helpers({
	totalSlides: function(){
		// console.log(Slides.find().count());
		return Slides.find().count() + 1;
	}
});

Template.adminView.events({
	'submit #add-slide-form' : function(e, tmpl) {
		e.preventDefault();

		var file = $('#file').get(0).files[0];
		var fileObj = Images.insert(file);

		console.log('Upload result: ', fileObj);

		var params = {
			// 'name' 		: tmpl.find('#filename').value,
			// 'filename' 	: tmpl.find('#filename').value + '.png',
			'filename'  : fileObj._id,
			'index' 	: tmpl.find('#index').value,
			'file'		: fileObj
		}
		
		Meteor.call('addSlide', params);

		// tmpl.find('#filename').value = '';
		tmpl.find('#index').value = '';
		tmpl.find('#file').value = '';
		// tmpl.find('#filename').focus();
	},

	'click .delete-slide' : function(e, tmpl) {
		e.preventDefault();
		if(confirm('Are you sure want to delete this item?')) {
			var id = $(e.currentTarget).data('id');
			Meteor.call('removeSlide', id);
		} else {
			return false;
		}
	}

});