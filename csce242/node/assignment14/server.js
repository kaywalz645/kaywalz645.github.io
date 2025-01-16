const express = require("express");
const app = express();
const joi = require("joi");

app.use(express.static("public"));
app.use(express.json());

app.get("/", (req,res) => {
    res.sendFile(__dirname +"/index.html");

})
