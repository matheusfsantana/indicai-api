const mongoose = require('mongoose')

const { indicacaoSchema } = new mongoose.Schema({
    image: {
        type: String,
        required: true
    },
    nome: {
        type: String,
        required: true
    },
    descricao: {
        type: String,
        required: true
    },
    categoria: {
        type: String,
        required: true
    },
    localizacao: {
        type: {
            type: String,
            enum: ['Point'], 
            required: true
        },
        coordinates: {
            type: [Number], //[longitude,latitude]
            required: true
        }
    }

}, { collection: 'indicacao' });

const Indicacao = mongoose.model("Indicacao", indicacaoSchema);

moudle.exports = 
{
    Indicacao,
    indicacaoSchema
};


