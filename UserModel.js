const mongoose = require('mongoose');
const UserSchema = new mongoose.Schema({
  // ...existing fields...
  workouts: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Workout',
    index: true,
  }],
});

const User = mongoose.model('User', UserSchema);

async function addWorkoutToUser(userId, workoutId) {
  try {
    const user = await User.findById(userId);
    if (!user) throw new Error('User not found');
    user.workouts.push(workoutId);
    await user.save();
    console.log('Workout added successfully.');
  } catch (error) {
    console.error('Error adding workout to user:', error.message);
  }
}

module.exports = {
  User,
  addWorkoutToUser,
};