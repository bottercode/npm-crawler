const { default: mongoose } = require("mongoose");
const dotenv = require("dotenv")

export const dbConnection = mongoose.connect(process.env.MONGO_URL, ()=>{
    console.log("Connected")
})