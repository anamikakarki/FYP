const asyncHandler = require("express-async-handler");
const User = require("../models/userModel");




const registerUser = asyncHandler ( async (req, res) => {

    const { name, email, password} = req.body

    //validation
    if(!name || !email || !password) {
        res.status(400)
        throw new Error("Please fill in all required fields")
    }

    if(password.length < 6){
        res.status(400)
        throw new Error("Password must be upto 6 Characters")
    }

    //check if user email already exists
    const userExists = await User.findOne({email})

    if(userExists){
        res.status(400)
        throw new Error("The email has already been registered")
    }


    // if user doesn't exists create new user
    const user = await User.create({
        name,
        email,
        password,
    })
    //  if user created
    if (user){
        const {_id, name, email, photo, bio, phone} = user
        res.status(201).json({

            _id,
            name, 
            email, 
            photo, 
            bio, 
            phone
            
        })
    } else{
        res.status(400)
        throw new Error("Invalid User Data")
    }
});
module.exports = {

registerUser,


}