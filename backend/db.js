const mongoose = require("mongoose")

const connectMongoDB = async () =>{
    try{
        await mongoose.connect(process.env.MONGODB_URI)
        console.log("MongoDB Connect Successfully...")
    } catch (error){
        console.log("connection failed")
    }
}

module.exports = connectMongoDB