const router = require("express").Router();
const userController = require("../controllers/userController");

router
    .route("/createUser")
    .post((req, res) => userController.createUser(req, res));

router
    .route("/login")
    .post((req,res) => userController.login(req,res));
    
module.exports = router;