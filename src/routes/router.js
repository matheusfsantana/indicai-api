const router = require("express").Router();

const indicacaoRouter = require("./indicacaoRoutes");

router.use("/", indicacaoRouter);

/*const userRoutes = require("./userRoutes");*/

module.exports = router;