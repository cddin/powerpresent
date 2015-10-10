Meteor.publish('notes', function() {
  return Notes.find();
})


  
  Meteor.methods({
  // ADD
  addNotes: function (slider_id, text, user_id) {
    
    return Notes.insert({
      slider_id: slider_id,
      text: text,
      user_id: user_id,
    });
  },
});