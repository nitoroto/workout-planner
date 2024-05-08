const mongoose = require('mongoose');

const { Schema } = mongoose;

const ExerciseDetailsSchema = new Schema({
    exerciseName: { type: String, required: true },
    numberOfSets: { type: Number, required: true },
    repetitionsPerSet: { type: Number, required: true },
    weightInKg: { type: Number, required: true },
    durationInSeconds: { type: Number, required: true },
}, { timestamps: true });

const WorkoutProgramSchema = new Schema({
    planName: { type: String, required: true },
    planDescription: String,
    totalDurationInMinutes: { type: Number, required: true },
    exerciseList: [ExerciseDetailsSchema],
    planOwner: { type: Schema.Types.ObjectId, ref: 'User' }
}, { timestamps: true });

const WorkoutProgramModel = mongoose.model('WorkoutPlan', WorkoutProgramSchema);

module.exports = WorkoutProgramModel;