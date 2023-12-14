const express = require("express");

const app = express();

app.get("/", (req,res)=>{
	res.send('helo')
})

app.listen(
	5000,
	()=> console.log("hiiis")
);