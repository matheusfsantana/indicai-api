const { Indicacao  } = require("../models/Indicacao");
const mongoose = require("mongoose");
const opencage = require('opencage-api-client');

const API_KEY = process.env.OPENCAGE_API_KEY;

async function getLatLng(address) {
    try {
        const data = await opencage.geocode({ q: address, key: API_KEY});

        if (data.status.code === 200 && data.results.length > 0) {
            const latlng = data.results[0].geometry;
            return latlng;
        } else {
            console.log('Status:', data.status.message);
        }
    } catch (error) {
        console.log('Error:', error.message);
        if (error.status.code === 402) {
            console.log('hit free trial daily limit');
        }
        throw error;
    }
}


const indicacaoController = {
    create: async (req, res) => {
      const session = await mongoose.startSession();
      session.startTransaction();
  
      try {
        const { image, endereco, descricao, categoria} = req.body;
        const latlng = await getLatLng(req.body.endereco);
        console.log(latlng);

  
        const indicacao = {
          image,
          endereco,
          descricao,
          categoria,
          localizacao: {
            type: "Point",
            coordinates: [parseFloat(latlng.lat), parseFloat(latlng.lng)]
        }};

        console.log(indicacao);
  
        const response = await Indicacao.create([indicacao], { session });
  
        await session.commitTransaction();
        session.endSession();
  
        res.status(201).json({ response, msg: "indicação criada com sucesso" });
      } catch (error) {
        await session.abortTransaction();
        session.endSession();
        console.log(error);
      }
    },
  };

module.exports = indicacaoController;