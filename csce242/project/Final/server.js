

const express = require("express");
const app = express();
const multer = require("multer");
const path = require('path');
const mongoose = require("mongoose");
const Joi = require("joi");
const cors = require("cors");


mongoose.connect("mongodb+srv://kaybalz645:dreamSMP645@kaylee.ixxu8d8.mongodb.net/?retryWrites=true&w=majority")
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((error) => {
    console.log("Couldn't connect to MongoDB", error);
  });


const jobSchema = new mongoose.Schema({
  //_id: mongoose.SchemaTypes.ObjectId,
  name: String,
  description: String,
});

const Job = mongoose.model("Job", jobSchema, "test.jobs");


app.use(express.static(path.join(__dirname, 'publicMain')));
app.use(express.json());
app.use(cors());

const upload = multer({ dest: __dirname + "/public/images" });


app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

app.get("/api/jobs", (req, res) => {
  getJobs(res);
});

app.get("/api/jobs/:id", (req, res) => {
  getJob(req.params.id, res);
});

app.post("/api/jobs", (req, res) => {
  const result = validateJob(req.body);
  if (result.error) {
    res.status(400).send(result.error.details[0].message);
    return;
  }

  const job = new Job({
    name: req.body.name,
    description: req.body.description,
  });

  createJob(job, res);
});

app.put("/api/jobs/:id", (req, res) => {
  const result = validateJob(req.body);
  if (result.error) {
    res.status(400).send(result.error.details[0].message);
    return;
  }
  updateJob(req, res);
});

app.delete("/api/jobs/:id", (req, res) => {
  removeJob(res, req.params.id);
});
const removeJob = async (res, id) => {
  const job = await Job.findByIdAndDelete(id);
  res.send(job);
};

const getJobs = async (res) => {
  try {
    const jobs = await Job.find();
    res.send(jobs);
  } catch (err) {
    res.status(500).send(err);
  }
};
async function getJob(id, res) {
  const job = await Job.findOne({ _id: id });
  res.send(job);
}

function createJob(job, res) {
  job.save()
  .then(savedJob => {
    res.send(savedJob);
  })
  .catch(err => {
    console.error('Error saving job:', err);
    res.status(500).send("Internal Server Error");
  });
}

function updateJob(req, res) {
  let fieldsToUpdate = {
    name: req.body.name,
    description: req.body.description,
  };

  Job.findByIdAndUpdate(req.params.id, fieldsToUpdate, { new: true }, (err, updatedJob) => {
    if (err) {
      console.error('Error updating job:', err);
      res.status(500).send("Internal Server Error");
    } else if (!updatedJob) {
      res.status(404).send("Job not found");
    } else {
      res.send(updatedJob);
    }
  });
}

function validateJob(job) {
  const schema = Joi.object({
    name: Joi.string().min(3).required(),
    description: Joi.string().min(3).required(),
  });

  return schema.validate(job);
}


app.use(express.static("publicMain"));

app.get('/joinOurTeam', serveFolder('joinOurTeam'));

app.get('/contactUs', serveFolder('contactUs'));

function serveFolder(folderName) {
  return (req, res) => {
    const filePath = path.join(__dirname, 'Final', folderName, 'index.html');
    res.sendFile(filePath);
  };
}


app.listen(3000, () => {
  console.log("Server is listening on port 3000");
});



 