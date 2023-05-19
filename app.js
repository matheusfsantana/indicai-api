const express = require("express");
const cors = require("cors");
const app = express();

app.use(cors());

app.use(express.json());

const db = require("./src/db/db");

db();

app.listen(3000, function(){
    console.log("Server online");
}); 

// senha banco 6lk15DKV0w2J6JPK