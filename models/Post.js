
const mongoose = require("mongoose");

const PostSchema = new mongoose.Schema(
    {
        postUID : {
            type: String,//uuid
            required: true,
            unique: true,
        },
        title : {
            type: String,
            required: true,
        },
        content : {
            type: String,
            required: true,
        },
        authorName : {
            type : String,
            required: true,
        },
        authorID : {//uuid
            type: String,
            required: true,
        },
        createdAt : {
            type : Date,
            required : true, 
        },
        updatedAt : {
            type : Date,
            required : true, 
        },
        isPublished : {
            type:Boolean,
            required: true,
        },
    }
);

const PostModel = mongoose.model("Post",PostSchema);

module.exports = {PostModel};