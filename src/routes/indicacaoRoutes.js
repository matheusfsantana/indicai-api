const router = require("express").Router();
const indicacaoController = require("../controllers/indicacaoController");

router
    .route("/indicacao")
    .post((req, res) => indicacaoController.create(req, res));

router.route("/indicacao")
    .get(indicacaoController.getAll);

router.route("/near")
    .get(indicacaoController.getNearLocations);

module.exports = router;