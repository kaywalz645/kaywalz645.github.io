const express = require("express");
const Joi = require("joi");
const multer = require("multer");
const app = express();
app.use(express.static("public"));

const upload = multer({ dest: __dirname + "/public/images" });

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

app.listen(3000, () => {
  console.log("im listening");
});

let people = [
  {
    _id: 1,
    name: "Samatha Young",
    age: "47",
    fcolor: "Green",
    activity: "Knitting",
    fFoods: [" Yogurt", " Candy", " Pizza"],
    img: "images/old-lady.jpeg",
  },

  {
    _id: 2,
    name: "Samuel Old",
    age: "2",
    fcolor: "Orange",
    activity: "Throwing things",
    fFoods: [" Peas", " Yogurt", " Banana"],
    img: "images/baby-boy.jpg",
  },

  {
    _id: 3,
    name: "Henry Foul",
    age: "20",
    fcolor: "Yellow",
    activity: "Running",
    fFoods: [" Steak", " Mashed Potatos", " Beef Jerky"],
    img: "images/man.jpg",
  },

  {
    _id: 4,
    name: "Katelyn Grow",
    age: "16",
    fcolor: "Purple",
    activity: "Dancing",
    fFoods: [" Cereal", " Spagetti", " Bread"],
    img: "images/teen-girl.jpg",
  },

  {
    _id: 5,
    name: "Aaron Steve",
    age: "32",
    fcolor: "Brown",
    activity: "Coding",
    fFoods: [" Ramen", " Coffee", " Pasta"],
    img: "images/aged-guy.jpg",
  },
];
app.get("/api/people", (req, res) => {
  res.send(people);
});

app.get("/api/people", (req,res) => {
    const id = parseInt(req.params.id);
    
    const person = people.find((p)=> p._id === id);

    if(!person) {
        res.status(404).send("the recipe with the given id was not found");
    }
    res.send(person);
});

app.post("/api/people", upload.single("img"), (req, res) => {
  const results = validatePerson(res.body);

  if (results.error) {
    res.status(400).send(results.error.details[0].message);
    return;
  }

  const person = {
    _id: people.length + 1,
    name: req.body.name,
    age: req.body.age,
    fcolor: req.body.fColor,
    activity: req.body.fActivity,
    fFoods: req.body.fFoods.split(","),
    img: req.body.img,
  }

  people.push(person);
  res.send(person);
});

app.put("/api/people/:id", upload.single("img"), (req, res) => {
  const id = parseInt(req.params.id);
  const person = people.find((p) => p._id === id);
  const result = validatePerson(req.body);

  if (result.error) {
    res.status(400).send(result.error.details[0].message);
    return;
  }

  person.name = req.body.name;
  person.age = req.body.age;
  person.fcolor = req.body.fcolor;
  person.activity = req.body.activity;
  person.fFoods = req.body.fFoods.split(",");
  person.img = req.body.img;
  if (req.file) {
    person.img = "images/" + req.file.filename;
  }
  res.send(person);
});

const validatePerson = (person) => {
  const schema = Joi.object({
    _id: Joi.string().allow(""),
    name: Joi.string().required(),
    age: Joi.number().required(),
    fcolor: Joi.string().required(),
    activity: Joi.string().required(),
    fFoods: Joi.array().items(Joi.string()).required(),
    img: Joi.string().allow(""),
  });

  return schema.validate(person);
};
