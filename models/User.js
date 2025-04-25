const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
    {   
        userUID : {//uuid
            type : String,
            required: true,
            unique: true
        },
        userName : {
            type: String,
            required: true,
            unique: true,
        },
        email : {
            type: String,
            required: true,
            unique: true,
        },
        password : {
            type: String, // hashed
            required: true,
        },
        isAdmin : {
            type : Boolean,
            required : true, 
        }
    }
);

const UserModel = mongoose.model("User",UserSchema);

module.exports = {UserModel};