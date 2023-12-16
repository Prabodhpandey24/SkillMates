const express = require("express");

const cors = require("cors")

const connectMongoDB = require('./db.js')

const app = express();

require("dotenv").config()

app.use(cors())

connectMongoDB()

app.use(express.json())

const PORT = process.env.PORT || 5000


app.listen(PORT, () =>{
	console.log("server is running....", PORT)
})