const router = require("express").Router();
const indicacaoController = require("../controllers/indicacaoController");

router
    .route("/indicacao")
    .post((req, res) => indicacaoController.create(req, res));

router.route("/indicacao")
    .get(indicacaoController.getAll);

router.route("/near")
    .get(indicacaoController.getNearLocations);

router.route("/search")
    .get(indicacaoController.getFilterData);

router.route("/categorias")
    .get(indicacaoController.getFilterCategoria);

module.exports = router;