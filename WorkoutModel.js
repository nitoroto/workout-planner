const mongoose = require('mongoose');

const { Schema } = mongoose;

const exerciseSchema = new Schema({
    name: { type: String, required: true },
    sets: { type: Number, required: true },
    reps: { type: Number, required: true },
    weight: { type: Number, required: true },
    duration: { type: Number, required: true },
}, { timestamps: true });

const workoutSchema = new Schema({
    workoutName: { type: String, required: true },
    description: String,
    duration: { type: Number, required: true },
    exercises: [exerciseSchema],
    user: { type: Schema.Types.ObjectId, ref: 'User' }
}, { timestamps: true });

const WorkoutModel = mongoose.model('Workout', workoutSchema);

module.exports = WorkoutModel;