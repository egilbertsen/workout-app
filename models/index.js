const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const workoutSchema = new Schema({
  excercises: [
  {
    type: {
      type: String,
      trim: true,
      required: "Enter an excercise type"
    },
    name: {
      type: String,
      trim: true,
      required: "Enter a name for excercise"
    },
    duration: {
      type: Number,
      required: "Please enter an excercise duration"
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
  }],
  day: {
    type: Date,
    default: Date.now
  }

});

const Workout = mongoose.model("Workout", workoutSchema);

module.exports = Workout;

