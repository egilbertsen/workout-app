const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const workoutSchema = new Schema({
  day: {
    type: Date,
    default: Date.now
  },
  exercises: [
  {
    type: Schema.Types.ObjectId,
    ref: "Exercise"
  }]
});

const Workout = mongoose.model("Workout", workoutSchema);

const exerciseSchema = new Schema({
    type: {
      type: String,
      trim: true,
      required: "Please enter an exercise type"
    },
    name: {
      type: String,
      trim: true,
      required: "Please enter an exercise name"
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

})

const Exercise = mongoose.model("Exercise", exerciseSchema);

module.exports = {
  Workout: Workout,
  Exercise: Exercise
};

