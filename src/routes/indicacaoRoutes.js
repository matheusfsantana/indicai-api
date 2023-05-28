const router = require("express").Router();
const indicacaoController = require("../controllers/indicacaoController");

router
    .route("/indicacao")
    .post((req, res) => indicacaoController.create(req, res));

router.route('/getIndicacao')
    .get((req, res) => {
        res.send('oi');
    });

module.exports = router;