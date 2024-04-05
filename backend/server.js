const dotenv = require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser"); //convert info coming from frontend requests
const cors = require("cors");
const userRoute = require("./routes/userRoute")

const app = express();

const PORT  = process.env.PORT || 5000;


//MiddleWares

app.use(express.json())
app.use(express.urlencoded({extended: false}))
app.use(bodyParser.json())


//routes Middleware

app.use("/api/users", userRoute)

//Routes 

app.get("/", (req, res) => {
    res.send("Home Page");
})




//connect to MongoDB and Start Server.

mongoose
    .connect(process.env.MONGO_URL)
    .then(() => {

        app.listen(PORT, ()=>{

            console.log(`Server running on port ${PORT}`)
        })
    })
    .catch((err) => console.log(err))