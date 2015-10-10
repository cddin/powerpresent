Meteor.publish('slides', function() {
  return Slides.find();
})