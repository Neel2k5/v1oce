const mongoose = require("mongoose");

async function connectToMongoDB(databaseURL) {
    await mongoose.connect(databaseURL).then(
        ()=>{
            console.log(`Sucessfully Connected to Mongo DB at ${databaseURL}`);
        }
    ).catch(
        (err)=>{
            console.log(`Error Connecting to Mongo DB at ${databaseURL}\nError: ${err}`);
        }
    )
}

module.exports = {connectToMongoDB}