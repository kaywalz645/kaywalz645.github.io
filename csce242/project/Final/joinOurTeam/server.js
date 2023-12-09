const express = require("express");
const app = express();
const multer = require("multer");
const Joi = require("joi");
app.use(express.static("public"));
app.use(express.json());
const cors = require("cors");
app.use(cors());
const mongoose = require("mongoose");

const upload = multer({ dest: __dirname + "/public/images" });

mongoose
  .connect("mongodb+srv://kaybalz645:5QQ4tJZKqN.3tKy@kaylee.ixxu8d8.mongodb.net/?retryWrites=true&w=majority")
  .then(() => {
    console.log("connected to mongodb");
  })
  .catch((error) => {
    console.log("couldn't connect to mongodb", error);
  });

const jobSchema = new mongoose.Schema({
  name: String,
  description: String,
  _id: mongoose.SchemaTypes.ObjectId,
});

const Job = mongoose.model("Job", jobSchema);

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

app.get("/api/jobs", (req, res) => {
  getJobs(res);
});

const getJobs = async (res) => {
  const jobs = await Job.find();
  res.send(jobs);
};

app.get("/api/jobs/:id", (req, res) => {
  getJob(req.params.id, res);
});

const getJob = async (id, res) => {
  const job = await Job.findOne({ _id: id });
  res.send(job);
};

app.post("/api/jobs", (req, res) => {
  const result = validateJob(req.body);
  console.log(result);
  if (result.error) {
    res.status(400).send(result.error.details[0].message);
    return;
  }

  const job = new Job({
    name: req.body.name,
    description: req.body.description,
    ingredients: req.body.ingredients.split(","),
  });

  createJob(job, res);
});

const createJob = async (job, res) => {
  const result = await job.save();
  res.send(job);
};

app.put("/api/jobs/:id", upload.single("img"), (req, res) => {
  const result = validateJob(req.body);
  console.log(result);
  if (result.error) {
    res.status(400).send(result.error.details[0].message);
    return;
  }
  updateJob(req, res);
});

const updateJob = async (req, res) => {
  let fieldsToUpdate = {
    name: req.body.name,
    description: req.body.description,
  };

  const result = await Job.updateOne({ _id: req.params.id }, fieldsToUpdate);

  res.send(result);
};

app.delete("/api/jobs/:id", (req, res) => {
  removeJob(res, req.params.id);
});

const removeJob = async (res, id) => {
  const job = await Job.findByIdAndDelete(id);
  res.send(job);
};

function validateJob(job) {
  const schema = Joi.object({
    name: Joi.string().min(3).required(),
    description: Joi.string().min(3).required(),
    ingredients: Joi.allow(""),
    _id: Joi.allow(""),
  });

  return schema.validate(job);
}

app.listen(3000, () => {
  console.log("I'm listening");
});