const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  workoutList: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Workout',
    index: true,
  }],
});

const UserModel = mongoose.model('User', UserSchema);

async function linkWorkoutToUser(userId, workoutId) {
  try {
    const user = await UserModel.findById(userId);
    if (!user) throw new Error('User not found');
    
    user.workoutList.push(workoutId);
    await user.save();
    console.log('Workout added successfully to user.');
  } catch (error) {
    console.error('Error while linking workout to user:', error.message);
  }
}

module.exports = {
  UserModel,
  linkWorkoutToUser,
};