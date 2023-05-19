const mongoose = require("mongoose");

async function main(){
    
    try{
        //banco de dados "exposto" apenas para teste, trocar banco,senha e user para variavel de ambiente dps
        await mongoose.connect(
            "mongodb+srv://matheusfsantana:6lk15DKV0w2J6JPK@cluster0.1qylkbe.mongodb.net/?retryWrites=true&w=majority"
        );

        console.log("DB Connected!");
        
    }catch(error){
        console.log(`Erro ${error}`);
    }

}

module.exports = main;