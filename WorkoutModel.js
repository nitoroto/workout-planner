const mongoose = require('mongoose');

const { Schema } = mongoose;

const ExerciseSchema = new Schema({
    exerciseName: { type: String, required: true },
    numberOfSets: { type: Number, required: true },
    repetitionsPerSet: { type: Number, required: true },
    weightInKg: { type: Number, required: true },
    durationInSeconds: { type: Number, required: true },
}, { timestamps: true });

const WorkoutPlanSchema = new Schema({
    planName: { type: String, required: true },
    planDescription: String,
    totalDurationInMinutes: { type: Number, required: true },
    exerciseList: [ExerciseSchema],
    planOwner: { type: Schema.Types.ObjectId, ref: 'User' }
}, { timestamps: true });

const WorkoutPlanModel = mongoose.model('WorkoutPlan', WorkoutPlanSchema);

module.exports = WorkoutPlanModel;