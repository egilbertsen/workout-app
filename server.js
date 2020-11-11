const express = require("express");
const mongoose = require("mongoose");
const path = require("path");

const PORT = process.env.PORT || 3000;

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static("public"));

mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/workout", {
  useNewUrlParser: true,
  useFindAndModify: false
});


app.listen(PORT, () => {
  console.log(`App running on port ${PORT}`);
});

const db = require("./models")

// HTML ROUTES
app.get("/", (req,res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

app.get("/excercise", (req,res) => {
  res.sendFile(path.join(__dirname, "public", "excercise.html"));
});

app.get("/stats", (req,res) => {
  res.sendFile(path.join(__dirname, "public", "stats.html"))
})
// API ROUTES

app.post("/api/workouts", (req, res) => {
  let data = req.body;
  db.Workout.create({
    day: new Date().setDate(new Date().getDate)
  }).then(update => {
    res.json(update);
  }).catch(err => {
    res.json(err);
  })
});


app.put("/api/workouts/:id", (req,res) => {
  let url = req.params;
  let data = req.body;

  db.Workout.updateOne({
    _id: url.id
  }, {
    $push: {excercises: [
      {
        "type": data.type,
        "name": data.name,
        "duration": data.duration,
        "weight": data.weight,
        "sets": data.sets,
        "reps": data.reps,
        "distance": data.distance
      }
    ]}
  }).then(update => {
    res.json(update);
  }).catch(err => {
    res.json(err);
  })
});

app.get("/api/workouts/range", (req, res) => {
  db.Workout.find({}).then(workoutRes => {
    res.json(workoutRes);
  }).catch(err => {
    res.json(err);
  })
})

app.get("/api/workouts", (req,res) => {
  db.Workout.find({}).sort({day:-1}).limit(1).then(workoutRes => {
    res.json(workoutRes);
    }).catch(err => {
    res.json(err);
  })
});
