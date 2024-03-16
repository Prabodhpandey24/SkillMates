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
const WhyUs = require("./model/whyUS.model.js");

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

//Course Details added api
app.post("/api/v1/courses", async (req, res) => {
    try {
      const newCourse = new Course(req.body);
      const savedCourse = await newCourse.save();
      res.status(201).json(savedCourse);
    } catch (error) {
      res.status(500).json({ error: error.message });
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
//classes api
app.get("/api/v1/classes", async (req, res) => {
    try {
        const classes = await Class.find();
        res.json(classes);
    } catch (error) {
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

                    return resp.send({ token: newToken, email: user.email, role: user.role, name: user.name });
                }

                const token = user.generateAuthToken();
                user.activeSessionToken = token;
                await user.save();

                resp.send({ token, email: user.email, role: user.role, name: user.name });
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

app.get('/api/v1/whyUs', async (req, res) => {
    try {
        const data = await WhyUs.find();
        res.status(200).json(data);
    } catch (error) {
        console.error("Error in /api/v1/whyUs:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

// Teacher API
const Teacher = require("./model/teachers.model.js");

app.post('/api/v1/teachers', async (req, res) => {
    try {
        const { teacher_details } = req.body;
        
        if (!teacher_details || !Array.isArray(teacher_details) || teacher_details.length === 0) {
            return res.status(400).json({ error: 'Invalid data format' });
        }

        const newTeacher = new Teacher({ teacher_deatils: teacher_details }); 
        await newTeacher.save();

        res.status(201).json(newTeacher);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

app.get('/api/v1/teachers', async (req, res) => {
    try {
        const teachers = await TeacherModel.find();
        res.json(teachers);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Teacher API for teacher dashboard login.
const TeacherLogin = require('./model/teacherlogin.model.js'); 

app.post("/api/v1/edudash", async (req, resp) => {
    try {
        if (req.body.password && req.body.email) {
            console.log("Req Body :",req.body);
            let eduuser = await TeacherLogin.findOne({
                email: req.body.email,
                password: req.body.password
            });
            console.log("eduuser :",eduuser);
            if (eduuser) {
                resp.send(eduuser);
            } else {
                resp.send({ result: "eduuser not found.." });
            }
        } else {
            resp.send({ result: "user & password not found.." });
        }
    } catch (error) {
        console.error("Error in teacher login:", error);
        resp.status(500).send({ result: "Internal server error" });
    }
});
app.get('/api/v1/teacherlogins', async (req, res) => {
    try {
        // Fetch teacher logins
        const teacherLogins = await TeacherLogin.find();

        // Fetch bookings
        const bookings = await Booking.find();

        // Combine data based on eduId and courseId
        const combinedData = teacherLogins.map(teacherLogin => {
            console.log("Teacher Login:", teacherLogin);
            const matchingBookings = bookings.filter(booking => {
                console.log("Booking:", booking);
                // Access eduId and courseId from the bookings array
                console.log("Comparing:", teacherLogin.eduId, booking.bookings[0].eduId, teacherLogin.courseId, booking.bookings[0].courseId);
                if (booking.bookings[0].eduId === teacherLogin.eduId && booking.bookings[0].courseId === teacherLogin.courseId) {
                    console.log("Matching Booking Found!");
                    console.log("Educator Name:", booking.bookings[0].educatorName);
                    console.log("Course Name:", booking.bookings[0].courseName);
                    console.log("DateTime:", booking.bookings[0].datetime);
                    return true;
                }
                return false;
            });
            console.log("Matching Bookings:", matchingBookings);
            return { ...teacherLogin.toObject(), bookings: matchingBookings };
        });

        console.log("Combined Data:", combinedData);
        res.json(combinedData);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

//Liveclasses
const Liveclass = require('./model/liveclasses.model.js'); 
app.get("/api/v1/liveclasses", async (req, res) => {
    try {
      const liveClasses = await Liveclass.find();
      res.json(liveClasses);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  });
  

app.get("/api/v1/liveclasses/:path", async (req, res) => {
    try {
        const path = req.params.path;
        const liveclass = await Liveclass.findOne({ path: path });
        
        if (!liveclass) {
            return res.status(404).json({ error: "Liveclass not found" });
        }
        
        res.status(200).json(liveclass);
    } catch (error) {
        console.error("Error in /api/v1/liveclasses/:path:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

//booking api
const Booking = require('./model/bookings.model.js');
app.post("/api/v1/bookings", async (req, res) => {
    try {
        const { bookings } = req.body;
        console.log("req")

        if (!bookings || !Array.isArray(bookings) || bookings.length === 0) {
            return res.status(400).json({ error: 'Invalid data format' });
        }

        const newBooking = new Booking({ bookings: bookings }); 
        await newBooking.save();

        res.status(201).json(newBooking);

    } catch (error) {
      console.error("Error creating booking:", error);
      res.status(400).json({ error: error.message });
    }
  });
  
app.get("/api/v1/bookings", async (req, res) => {
    try {
      const bookings = await Booking.find();
      console.log("Bookings", bookings.booking);
      var datetime = new Date();
      console.log(datetime);
      res.json(bookings); 
    } catch (error) {
      console.error("Error fetching bookings:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
});

//Datetime 
const { DateTime } = require('luxon'); 
app.get("/api/v1/datetime", async (req, res) => {
    try {
        var datetime = DateTime.now().setZone('Asia/Kolkata');
        console.log(datetime.toISO());
        res.json(datetime.toISO());
    } catch (error) {
        console.error("Error fetching datetime:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

app.post('/api/v1/approve', async (req, res) => {
    console.log("Hey1", req.body);
    try {
        const teacherLogins = await TeacherLogin.find();
        console.log("updated data ", teacherLogins[0].activeClassDash[0]);
        const { eduId, courseId, educatorName, courseName, userName, dateTime, message } = req.body;
        const newClassData = {
            serialNo: '1',
            dateDay: 'Monday',
            courseName: 'Mathematics',
            schoolName: 'ABC School',
            classDuration: '1 hour',
            activeLink: 'https://example.com/class',
            educatorName: 'Alice Smith',
            datetime: '2024-02-12T10:00:00Z',
            message: 'This is a message for the class'
        };

        const matchedTeacherLogin = teacherLogins.find(teacherLogin => eduId === teacherLogin.eduId && courseId === teacherLogin.courseId);

        if (matchedTeacherLogin) {
            // Use updateOne to update the document
            await TeacherLogin.updateOne(
                { eduId: eduId, courseId: courseId },
                { $push: { activeClassDash: newClassData } }
            );

            console.log("Matching Booking Found and Updated!");
            res.status(201).json({ message: 'Approved and inserted into teacherlogin table' });
        } else {
            console.log("Matching Booking Not Found!");
            res.status(404).json({ error: 'Matching Booking Not Found' });
        }
    } catch (error) {
        console.error('Error approving:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

//school api:
app.post('/api/v1/submitSchoolForm', async (req, res) => {
    console.log("Body data", req.body);
    try {
        const { eduId, courseId, schoolName, classDuration, activeLink, educatorName, courseName, userName, datetime, message } = req.body;

        // Find the teacherlogin document with matching eduId and courseId
        const teacher = await TeacherLogin.findOne({ eduId, courseId });
        console.log("teacher found", teacher);

        if (!teacher) {
            return res.status(404).json({ message: 'Teacher not found with provided eduId and courseId' });
        }

        // If teacher found, insert the form into activeschoolClassDash
        teacher.activeschoolClassDash.push({
            schoolName,
            classDuration,
            activeLink,
            educatorName,
            courseName,
            userName,
            datetime,
            message
        });

        // Save the updated teacher document
        await teacher.save();

        // Respond with success message
        return res.status(200).json({ message: 'School form submitted successfully' });
    } catch (error) {
        console.error('Error submitting school form:', error);
        return res.status(500).json({ message: 'Internal server error' });
    }
});

app.get('/api/v1/submitSchoolForm', async (req, res) => {
    try {
        const teachers = await TeacherLogin.find({}, { activeClassDash: 0 }); // Excluding activeClassDash
        res.json(teachers);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server Error' });
    }
});



const PORT = process.env.PORT || 5000


app.listen(PORT, () =>{
	console.log("server is running....", PORT)
})