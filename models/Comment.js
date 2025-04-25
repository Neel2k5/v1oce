
const mongoose = require("mongoose");

const CommentSchema = new mongoose.Schema(
    {
        content : {
            type: String,
            required: true,
        },
        author : {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: "User"
        },
        post : {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: "Post"
        },
        createdAt : {
            type : Date,
            required : true, 
        },
    }
);

const CommentModel = mongoose.model("Comment",CommentSchema);

module.exports = {CommentModel};