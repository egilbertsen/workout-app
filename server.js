const express = require("express");
const mongoose = require("mongoose");
const path = require("path");
const Workout = require("./models");

const PORT = process.env.PORT || 3000;

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static("public"));

mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/workouts", 
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false
  }
);


app.listen(PORT, () => {
  console.log(`App running on port ${PORT}`);
});

const db = require("./models")

// HTML ROUTES
app.get("/", (req,res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

app.get("/exercise", (req,res) => {
  res.sendFile(path.join(__dirname, "public", "exercise.html"));
});

app.get("/stats", (req,res) => {
  res.sendFile(path.join(__dirname, "public", "stats.html"))
})


// API ROUTES

// https://mongoosejs.com/docs/models.html
app.post("/api/workouts", (req, res) => {
  var data = req.body;
  var date = new Date();
  const workout = new Workout({day: date }, {exercises: data })
  workout.save(function (err){
    if(err) res.json(err)
  }).then(update => {
    res.json(update);
  })
});

// https://docs.mongodb.com/manual/reference/operator/update/push/
app.put("/api/workouts/:id", (req,res) => {
  let url = req.params;
  let data = req.body;

  db.Workout.update(
    {_id: url.id}, 
    {$push: { exercises: [
      {
        type: data.type,
        name: data.name,
        duration: data.duration,
        weight: data.weight,
        sets: data.sets,
        reps: data.reps,
        distance: data.distance
      }
    ]}}
    ).then(update => {
    res.json(update);
  }).catch(err => {
    res.json(err);
  })
});


app.get("/api/workouts/range", (req, res) => {
  db.Workout.find().then(workoutRes => {
    res.json(workoutRes);
  }).catch(err => {
    res.json(err);
  })
})

// https://stackoverflow.com/questions/10920651/get-the-latest-record-from-mongodb-collection/53474483
app.get("/api/workouts", (req,res) => {
  db.Workout.find().limit(1).then(workoutRes => {
    res.json(workoutRes);
    }).catch(err => {
    res.json(err);
  })
});
