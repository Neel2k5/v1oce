
const mongoose = require("mongoose");

const CommentSchema = new mongoose.Schema(
    {   
        commentUID : {
        type: String,//uuid
        required: true,
        unique: true,
        },
        content : {
            type: String,
            required: true,
        },
        authorName : {
            type : String,
            required: true,
        },
        authorUID : {//uuid
            type: String,
            required: true,
        },
        postUID : {
            type: String,//uuid
            required: true, 
        },
        createdAt : {
            type : Date,
            required : true, 
        },
    }
);

const CommentModel = mongoose.model("Comment",CommentSchema);

module.exports = {CommentModel};