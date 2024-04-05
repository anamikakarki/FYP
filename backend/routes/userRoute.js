const express = require("express");
const router = express.Router();
const {registerUser} = require("../controllers/userController");


//from where the information from frontend is received 
router.post("/register" , registerUser)


module.exports = router