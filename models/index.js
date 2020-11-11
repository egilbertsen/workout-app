const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const workoutSchema = new Schema({
  day: {
    type: Date,
    default: Date.now
  },
  exercises: [
  {
    type: {
      type: String,
      trim: true,
      required: "Please enter an exercise type"
    },
    name: {
      type: String,
      trim: true,
      required: "Please enter a name for exercise"
    },
    duration: {
      type: Number,
      required: "Please enter an exercise duration"
    },
    weight: {
      type: Number
    },
    sets: {
      type: Number
    },
    reps: {
      type: Number
    },
    distance: {
      type: Number
    }
  }]

});

const Workout = mongoose.model("workouts", workoutSchema);

module.exports = Workout;

