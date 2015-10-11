Router.configure({
  layoutTemplate: 'layout',
  loadingTemplate: 'loading',
  waitOn: function() { 
			return Meteor.subscribe('slides');
		}
});

Router.route('/', {name: 'home', controller: 'MainController'});
Router.route('/admin', {name: 'adminView'});
Router.route('/presentation', {name: 'presentationView'});
Router.route('/client', {name: 'clientView'});
Router.route('/note/:_id', {
  name: 'notesView',
  waitOn: function () {
    return [
      Meteor.subscribe('notes', this.params._id)
    ];
  },
  data: function () {
    return Notes.findOne(this.params._id);
  }
  });
  
Router.route('/addNote/:_id', {
    name: 'addnoteView',
    waitOn: function () {
      return [
        Meteor.subscribe('notes', this.params._id)
      ];
    },
    data: function () {
      // return Notes.findOne(this.params._id);
      console.log(this.params);
      return {slideId:this.params._id};
    }
});

MainController = RouteController.extend({
  action: function() {
  	this.render('home', {
	    data: function () {
	      return { posts: ['post red', 'post blue'] }
	    }
  	});
  }
});



