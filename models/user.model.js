const mongoose = require("mongoose")
const userSchema = new  mongoose.Schema({
    username : {
        type : String,
        required : true
    },
    password : {
        type : String,
        required: true,
        minlength: [8,"password must be atleast 8 character long!"]
    },
    email : {
        type : String,
        required: true,
        minlength: [8,"email must be atleast 8 character long!"]
    },
    role : {
        type : String,
        default : "customer"
    }
})

const User = mongoose.model("User",userSchema)
module.exports = User