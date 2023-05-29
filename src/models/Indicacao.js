const mongoose = require('mongoose')

const { Schema } = mongoose;

const indicacaoSchema  = new Schema({
    image: {
        type: String,
        required: true
    },
    endereco: {
        //rua + bairro + cidade
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
            required: false
        },
        coordinates: {
            type: [Number], //[longitude,latitude]
            required: false
        }
    }


}, { collection: 'indicacao' });

indicacaoSchema.index({ localizacao: '2dsphere' });

const Indicacao = mongoose.model("Indicacao", indicacaoSchema);

module.exports = 
{
    Indicacao,
    indicacaoSchema
};


