const mongoose = require("mongoose");
require('dotenv').config();
const connectionString = process.env.DB_URI;

async function main(){
    
    try{
        await mongoose.connect(
            connectionString
        );

        console.log("DB Connected!");
        
    }catch(error){
        console.log(`Erro ${error}`);
    }

}

module.exports = main;