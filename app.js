const express = require("express");
const cors = require("cors");
const app = express();

app.use(cors());

app.use(express.json());

const db = require("./src/db/db");

db();

const routes = require("./src/routes/router");

app.use("/api", routes);

app.listen(3000, function(){
    console.log("Server online");
}); 