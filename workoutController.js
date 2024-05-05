const express = require('express');
const mongoose = require('mongoose');
const Workout = require('./models/Workout');

mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });

const router = express.Router();

const logRequest = (type, route) => {
  console.log(`${new Date().toISOString()} - ${type} request to ${route}`);
};

router.post('/workouts', async (req, res) => {
  try {
    const workout = new Workout({
      ...req.body,
      user: req.user._id,
    });
    await workout.save();
    logRequest('POST', '/workouts');
    res.status(201).send(workout);
  } catch (error) {
    res.status(400).send(error);
  }
});

router.get('/workouts', async (req, res) => {
  try {
    const workouts = await Workout.find({ user: req.user._id });
    logRequest('GET', '/workouts');
    res.send(workouts);
  } catch (error) {
    res.status(500).send(error);
  }
});

router.patch('/workouts/:id', async (req, res) => {
  try {
    const workout = await Workout.findOneAndUpdate(
      { _id: req.params.id, user: req.user._id }, 
      req.body, 
      { new: true }
    );
    if (!workout) {
      return res.status(404).send();
    }
    logRequest('PATCH', `/workouts/${req.params.id}`);
    res.send(workout);
  } catch (error) {
    res.status(400).send(error);
  }
});

router.delete('/workouts/:id', async (req, res) => {
  try {
    const workout = await Workout.findOneAndDelete({ _id: req.params.id, user: req.user._id });
    if (!workout) {
      return res.status(404).send();
    }
    logRequest('DELETE', `/workouts/${req.params.id}`);
    res.send(workout);
  } catch (error) {
    res.status(500).send(error);
  }
});

module.exports = router;