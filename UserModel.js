const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  workoutList: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Workout',
    index: true,
  }],
}, { timestamps: true });

const UserModel = mongoose.model('User', UserSchema);

async function linkWorkoutToUser(userId, workoutId) {
  try {
    const user = await UserModel.findById(userId);
    if (!user) throw new Error('User not found');
    
    if (!user.workoutList.includes(workoutId)) {
      user.workoutList.push(workoutId);
      await user.save();
      console.log('Workout added successfully to user.');
    } else {
      console.log('Workout already exists in user\'s list.');
    }
  } catch (error) {
    console.error('Error while linking workout to user:', error.message);
  }
}

async function unlinkWorkoutFromUser(userId, workoutId) {
  try {
    const user = await UserModel.findById(userId);
    if (!user) throw new Error('User not found');

    const index = user.workoutList.indexOf(workoutId);
    if (index > -1) {
      user.workoutList.splice(index, 1);
      await user.save();
      console.log('Workout removed successfully from user.');
    } else {
      console.log('Workout not found in user\'s list.');
    }
  } catch (error) {
    console.error('Error while unlinking workout from user:', error.message);
  }
}

async function getUserWorkouts(userId) {
  try {
    const userWorkouts = await UserModel.findById(userId).populate('workoutList').exec();
    if (!userWorkouts) throw new Error('User not found');
    
    console.log('User workouts: ', userWorkouts.workoutList);
    return userWorkouts.workoutList;
  } catch (error) {
    console.error('Error while fetching user workouts:', error.message);
  }
}

module.exports = {
  UserModel,
  linkWorkoutToUser,
  unlinkWorkoutFromUser,
  getUserWorkouts,
};