const { Indicacao: IndicacaoModel } = require("../models/Indicacao");

const indicacaoController = {

    create: async (req, res) => {

        try {
            const indicacao = {
                image: req.body.image,
                endereco: req.body.endereco,
                descricao: req.body.descricao,
                categoria: req.body.categoria,
                localizacao: req.body.localizacao,
            };

            const response = await IndicacaoModel.create(indicacao);

            res.status(201).json({ response, msg: "indicação criada com sucesso"});
        }
        catch(error) {
            console.log(error);
        }
    }

}

module.exports = indicacaoController;