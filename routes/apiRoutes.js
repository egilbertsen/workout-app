var db = require("../models");

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
app.put("/api/workouts/:id", (req, res) => {
  let dataId = req.params.id;
  let data = req.body;
  let savedEx = [];


  db.Workout.find({ _id: dataId }).then(workoutRes => {
    savedEx = workoutRes[0].exercises;
    let updatedEx = [...savedEx, data];
    pushUpdate(updatedEx)
  }).catch(err => {
    res.json(err);
  })

  function pushUpdate(updatedEx) {
    db.workout.findByIdAndUpdate(dataId, { exercises: updatedEx }).then(update => {
      res.json(update);
    }).catch(err => {
      res.json(err);
    })
  }

});

app.get("/api/workouts/range", (req, res) => {
  db.Workout.find().then(workoutRes => {
    res.json(workoutRes);
  }).catch(err => {
    res.json(err);
  })
})

// https://stackoverflow.com/questions/10920651/get-the-latest-record-from-mongodb-collection/53474483
app.get("/api/workouts", (req, res) => {
  db.Workout.find().limit(1).then(workoutRes => {
    res.json(workoutRes);
  }).catch(err => {
    res.json(err);
  })
});
