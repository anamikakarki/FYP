const mongoose = require("mongoose")
const bcrypt = require("bcryptjs")


const userSchema = mongoose.Schema({

    name: {
        type: String,
        required: [true, "Please add a name"]
    },

    email: {
        type: String,
        required: [true, "Please add an email"],
        unique: true,
        trim: true,
        match: [
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
            "Please enter a valid email"
        ]

    },

    password: {

        type: String,
        required: [true, "Please add a Password"],
        minLength: [6, "Password must be upto six character"],
        maxLength: [23, "Password must be less than 23 character"],

    },

    photo: {

        type: String,
        required: [true, "Please add a Photo"],
        default: "https://i.ibb.co/4pDNDk1/avatar.png"
    },

    phone: {

        type: String,
        default: "+977"
    },

    bio: {

        type: String,
        
        default: "This is your Bio",

        maxLength: [200, "Bio must not be more than 200 Characters"],

    }
    
}, {

    timestamps: true

});

//encrypt the password before saving to Db
userSchema.pre("save", async function(next){

    if(!this.isModified("password")) {
        return next()
    }
    //hash the password
        const salt = await bcrypt.genSalt(10);
const hashedPassword = await bcrypt.hash(this.password, salt);
this.password = hashedPassword

})

const User = mongoose.model("User", userSchema)

module.exports = User;