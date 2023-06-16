const { Indicacao } = require("../models/Indicacao");
const mongoose = require("mongoose");
const opencage = require('opencage-api-client');

const API_KEY = process.env.OPENCAGE_API_KEY;

async function getLatLng(address) {
  try {
    const data = await opencage.geocode({ q: address, key: API_KEY });

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
      const { image, endereco, descricao, categoria } = req.body;
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
        }
      };

      console.log(indicacao);

      const response = await Indicacao.create([indicacao], { session });

      await session.commitTransaction();
      session.endSession();

      res.status(201).json({ response, mensagem: "indicação criada com sucesso" });
    } catch (error) {
      await session.abortTransaction();
      session.endSession();
      console.log(error);
      res.status(500).json({mensagem: "Não foi possivel criar a indicação"})
    }
  },

   getAll: async (req, res) => {
    try {
      const result = await Indicacao.find({});
      console.log(result);
      res.json(result);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: error.message });
    }
  },

  getNearLocations: async (req, res) => {
    try {
      
      const longitude = parseFloat(req.query.longitude);
      const latitude = parseFloat(req.query.latitude);
     

      //exemplo de rota:
      //url/api/near?longitude=-8.0584933&latitude=-34.8848193
      const result = await Indicacao.find({
        localizacao: {
          $near: {
            $geometry: {
              type: 'Point',
              coordinates: [longitude, latitude],
            },
          $maxDistance: 10000
          },
        },
      });
      res.json(result);
    } catch (error) {
      console.log(error);
      res.status(500).json( `${error}`);
    }
  },

  getFilterData: async (req, res) =>{
   
    try {

      const search = req.query.item;

      const escapedSearch = search.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

      const regex = new RegExp(`\\b${escapedSearch}\\w*\\b`, 'gi');
    
      //exemplo de rota:
      //url/api/search?item=rec
      const resultados = await Indicacao.find({ 
        $or: [
          {categoria: regex},
          {endereco: regex },
          {descricao: regex}
        ]
      }).exec();
  
      res.json(resultados);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Ocorreu um erro ao executar a pesquisa' });
    }
  },

  getFilterCategoria: async (req,res) =>{
    try {
      const search  = req.query.items;
  
      const searchArray = search.split(',');

      //o nome na url deve estar exatamente igual ao banco de dados (sem espaços dps da virgula e com a primeira letra maiuscula)
      //url/api/categorias?items=Alimentacao,Pores do sol,Natureza
      const resultados = await Indicacao.find({ categoria: {$in: searchArray}  });
  
      res.json(resultados);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Ocorreu um erro ao filtrar a string de busca' });
    }
  },

  getIndicacaoById: async (req, res) => {
    try {
      const photoId = req.params.id;
      const photoData = await Indicacao.findById(photoId);
      res.status(200).send(photoData);
    } catch(error) {
      console.log(error.message)
    }
  }
};

module.exports = indicacaoController;