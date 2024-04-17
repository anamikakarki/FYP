const dotenv = require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser"); //convert info coming from frontend requests
const cors = require("cors");
const productRoute = require("./routes/productRoute");
const userRoute = require("./routes/userRoute")
const contactRoute = require("./routes/contactRoute");
const errorHandler = require("./middleWare/errorMiddleware")
const cookieParser = require("cookie-parser")
const path = require("path");

const app = express();

const PORT  = process.env.PORT || 5000;


//MiddleWares

app.use(express.json())
app.use(cookieParser())
app.use(express.urlencoded({extended: false}))
app.use(bodyParser.json())

app.use(cors());

app.use("/uploads", express.static(path.join(__dirname, "uploads")));

//routes Middleware

app.use("/api/users", userRoute)
app.use("/api/contactus", contactRoute);
app.use("/api/products", productRoute);

//Routes 

app.get("/", (req, res) => {
    res.send("Home Page");
})

//error Middleware

app.use(errorHandler);


//connect to MongoDB and Start Server.

mongoose
    .connect(process.env.MONGO_URL)
    .then(() => {

        app.listen(PORT, ()=>{

            console.log(`Server running on port ${PORT}`)
        })
    })
    .catch((err) => console.log(err))