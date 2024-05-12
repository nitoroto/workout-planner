const express = require('express');
const mongoose = require('mongoose');
const Workout = require('./models/Workout');

mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });

const router = express.Router();

const logRequest = (type, route) => {
  console.log(`${new Date().toISOString()} - ${type} request to ${route}`);
};

const errorHandler = (error, res, operation) => {
  console.error(`Error during ${operation}: ${error.message}`, error);
  res.status(500).send({ error: `An error occurred during ${operation}. Please try again.` });
};

async function createWorkout(req, res) {
  try {
    const workout = new Workout({
      ...req.body,
      user: req.user._id,
    });
    await workout.save();
    logRequest('POST', '/workouts');
    res.status(201).send(workout);
  } catch (error) {
    console.error('Error creating workout:', error);
    res.status(400).send({ error: 'Failed to create workout. Please check the data provided.' });
  }
}

async function fetchWorkouts(req, res) {
  try {
    const workouts = await Workout.find({ user: req.user._id });
    logRequest('GET', '/workouts');
    res.send(workouts);
  } catch (error) {
    errorHandler(error, res, 'fetching workouts');
  }
}

async function updateWorkout(req, res) {
  const updates = Object.keys(req.body);
  const allowedUpdates = ['name', 'duration', 'intensity'];
  const isValidOperation = updates.every((update) => allowedUpdates.includes(update));

  if (!isValidOperation) {
    return res.status(400).send({ error: 'Invalid updates!' });
  }

  try {
    const workout = await Workout.findOne({ _id: req.params.id, user: req.user._id });
    
    if (!workout) {
      return res.status(404).send();
    }
    
    updates.forEach((update) => workout[update] = req.body[update]);
    await workout.save();
    
    logRequest('PATCH', `/workouts/${req.params.id}`);
    res.send(workout);
  } catch (error) {
    errorHandler(error, res, 'updating the workout');
  }
}

async function deleteWorkout(req, res) {
  try {
    const workout = await Workout.findOneAndDelete({ _id: req.params.id, user: req.user._id });
    if (!workout) {
      return res.status(404).send();
    }
    logRequest('DELETE', `/workouts/${req.params.id}`);
    res.send(workout);
  } catch (error) {
    errorHandler(error, res, 'deleting the workout');
  }
}

router.post('/workouts', createWorkout);
router.get('/workouts', fetchWorkouts);
router.patch('/workouts/:id', updateWorkout);
router.delete('/workouts/:id', deleteWorkout);

module.exports = router;