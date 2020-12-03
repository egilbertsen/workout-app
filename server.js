const express = require("express");
const mongoose = require("mongoose");
const path = require("path");
const bodyParser = require("body-parser");

const PORT = process.env.PORT || 3000;

const app = express();
const db = reqiure("./models")

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


// HTML Routes

// app.get("*", function(req, res) {
//   res.sendFile(path.join(__dirname, "./public/index.html"))
// })

app.get("/", (req,res) => {
  res.sendFile(path.join(__dirname, "./public/index.html"));
});

app.get("/exercise", (req,res) => {
  res.sendFile(path.join(__dirname, "./public/exercise.html"));
});

app.get("/stats", (req,res) => {
  res.sendFile(path.join(__dirname, "./public/stats.html"))
})



// API ROUTES

// https://mongoosejs.com/docs/models.html
app.post("/api/workouts", (req, res) => {
  let data = req.body;
  db.Workout.create(data).then(update => {
      res.json(update);
  }).catch(err => {
      res.json(err);
  })
});

// https://docs.mongodb.com/manual/reference/operator/update/push/
app.put("/api/workouts/:id", (req,res) => {
  let dataId= req.params.id;
  let data = req.body;
  
  db.Exercise.create(data).then(() =>
      db.Workout.findOneAndUpdate(
          {_id: dataId},
          {$push: {exercises: _id}},
          {new: true}
      )).then( update => {
          res.json(update);
      }).catch(err => {
          res.json(err)
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

