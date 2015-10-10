Meteor.publish('slides', function() {
  return Slides.find();
})

Meteor.methods({
  
});


// db.slides.insert(
//   {
// "name": "slide1",
// "index": 1,
// "filename": "img01.png",
// "current": "0"
// }
// )


