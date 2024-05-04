const mongoose = require('mongoose');

const { Schema } = mongoose;

const exerciseDetailSchema = new Schema({
    name: { type: String, required: true },
    sets: { type: Number, required: true },
    reps: { type: Number, required: true },
    weight: { type: Number, required: true },
    duration: { type: Number, required: true },
}, { timestamps: true });

const workoutPlanSchema = new Schema({
    workoutName: { type: String, required: true },
    description: String,
    duration: { type: Number, required: true },
    exercises: [exerciseDetailSchema],
    user: { type: Schema.Types.ObjectId, ref: 'User' }
}, { timestamps: true });

const WorkoutPlanModel = mongoose.model('WorkoutPlan', workoutPlanSchema);

module.exports = WorkoutPlanModel;