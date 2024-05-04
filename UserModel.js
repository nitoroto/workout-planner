const UserSchema = new mongoose.Schema({
  // ...existing fields...
  workouts: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Workout',
    index: true, // Suggest indexing this array for faster queries; actual performance gain depends on your use case
  }],
});

module.exports = mongoose.model('User', UserSchema);