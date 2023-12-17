const express = require("express");

const cors = require("cors")

const connectMongoDB = require('./db.js')

const app = express();

require("dotenv").config()

app.use(cors())

connectMongoDB()

app.use(express.json())

// course and search api
const Course = require("./model/courses.model.js");

// app.get("/api/v1/courses", async (req, res) => {
//     try {
//         const { key, page, limit } = req.query;
//         const skip = (page - 1) * limit;
//         const data = await Course.find(
// 			"$or":[
// 				{name: {$regex: key, $option: "$i"}}
// 			]
// 		).skip(skip).limit(parseInt(limit));
//         res.status(200).json(data);
//     } catch (error) {
//         console.error(error);
//         res.status(500).json({ error: "Internal Server Error" });
//     }
// });
app.get("/api/v1/courses", async (req, res) => {
    try {
        const { key, page, limit } = req.query;
        const skip = (page - 1) * limit;
        // Check if key is a string before using it in the regex
        const regexKey = typeof key === 'string' ? key : '';
        const data = await Course.find({
            $or: [
                { name: { $regex: regexKey, $options: "i" } }
            ]
        }).skip(skip).limit(parseInt(limit));
        res.status(200).json(data);
    } catch (error) {
        console.error("Error in /api/v1/courses:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

//signup
const User = require("./model/user.model.js");
app.post("/api/v1/signup", async (req, resp) => {
  try {
    const user = new User(req.body);
    const result = await user.save();
    resp.status(201).json({ message: "User registered successfully.", data: result });
    console.log("User registered successfully.");
  } catch (error) {
    console.error(error);
    resp.status(500).json({ error: "Internal Server Error" });
  }
});

//signin


//logout








const PORT = process.env.PORT || 5000


app.listen(PORT, () =>{
	console.log("server is running....", PORT)
})