const express = require("express");

const cors = require("cors")

const connectMongoDB = require('./db.js')

const jwt = require('jsonwebtoken');

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
app.get("/api/v1/courses/", async (req, res) => {
    try {
        const { key, page, limit } = req.query;
        const skip = (page - 1) * limit;
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

//Course Details api
app.get("/api/v1/courses/:path", async (req, res) => {
  try {
      const path = req.params.path;
      const course = await Course.findOne({ path: path });
      
      if (!course) {
          return res.status(404).json({ error: "Course not found" });
      }
      
      res.status(200).json(course);
  } catch (error) {
      console.error("Error in /api/v1/courses/:path:", error);
      res.status(500).json({ error: "Internal Server Error" });
  }
});


// signup
const User = require("./model/user.model.js");
app.post("/api/v1/signup", async (req, resp) => {
    try {
        const user = new User(req.body);
        const token = user.generateAuthToken();

        user.activeSessionToken = token;
        await user.save();

        let result = user.toObject();
        delete result.password;

        resp.status(201).json({ message: "User registered successfully.", data: { ...result, token } });
        console.log("User registered successfully.");
    } catch (error) {
        console.error(error);
        resp.status(500).json({ error: "Internal Server Error" });
    }
});

// Login
app.post("/api/v1/login", async (req, resp) => {
    try {
        const { email, password } = req.body;
        if (email && password) {
            const user = await User.findOne({ email });

            if (user && user.password === password) {
                if (user.activeSessionToken) {
                    const previousToken = user.activeSessionToken;
                    const newToken = user.generateAuthToken();
                    user.activeSessionToken = newToken;
                    await user.save();

                    return resp.send({ token: newToken, email: user.email, role: user.role, username: user.name });
                }

                const token = user.generateAuthToken();
                user.activeSessionToken = token;
                await user.save();

                resp.send({ token, email: user.email, role: user.role, username: user.name });
            } else {
                resp.status(404).send({ result: 'User not found or incorrect password' });
            }
        } else {
            resp.status(400).send({ result: 'Missing email or password in the request body' });
        }
    } catch (error) {
        console.error(error);
        resp.status(500).send({ result: 'Internal Server Error' });
    }
});

// Protected Route
const verifyToken = (req, res, next) => {
    const token = req.header('x-auth-token');
    if (!token) return res.status(401).send({ result: 'Access denied. No token provided.' });
    try {
        const decoded = jwt.verify(token, 'JWT_SECRET_KEY');
        req.user = decoded;
        next();
    } catch (ex) {
        res.status(400).send({ result: 'Invalid token.' });
    }
};

app.get('/api/v1/protected-route', verifyToken, (req, res) => {
    const user = req.user;
    if (user && user._id) {
        res.json({ message: 'This is a protected route' });
    } else {
        res.status(401).send({ result: 'Access denied. Invalid user.' });
    }
});

const PORT = process.env.PORT || 5000


app.listen(PORT, () =>{
	console.log("server is running....", PORT)
})